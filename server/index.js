import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import OpenAI from "openai";
import Stripe from "stripe";
import twilio from "twilio";

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());

const stripe = new Stripe(
  "sk_test_51MgD4LSIzFf6nnIGnNxfpm0UfsgEQKW5jcg490IOCXurwSB4Lf2BQdBfBcAyMKalLiyp5XjY5DVqrgrYJyczf00D00MH9GwQIK"
);

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

app.listen("3080", () => console.log("listenting on port 3080"));

app.get("/", (req, res) => {
  res.send("Hello Yash");
});

app.post("/", async (req, res) => {
  const { message, state } = req.body;

  if (!state || !state.service) {
    // First message from user
    try {
      const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `${message}. I want you to tell me that which kind of service a user need from the sentence mention above and answer me in one word from this options (Doctor, Lawyer, Job-requirement, House-rental) and if you could not find answer from 4 options then return "unrecog"`,
        max_tokens: 100,
        temperature: 0.5,
      });
      const service = response.choices[0].text.trim();
      if (service === "unrecog") {
        res.json({
          message:
            "Sorry we couldn't recognise your problem to get accurate results.",
          state: {},
        });
      } else {
        res.json({
          message: `In which city you will prefer ${service} service?`,
          state: { service },
        });
      }
    } catch (e) {
      console.log(e);
      res.send(e).status(400);
    }
  } else {
    // Second message from user
    try {
      const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `${message}. From the above sentence  extract the city name and answer in one word, if you are not able to find city name then return "nocity".`,
        max_tokens: 100,
        temperature: 0.5,
      });
      const city = response.choices[0].text.trim();
      if (city === "nocity") {
        res.json({
          message: "Sorry we couldn't recognise the city from your message.",
          state: { service: state.service },
        });
      } else {
        res.json({
          message: `Your service request for ${state.service} in ${city} has been saved.`,
          link: "/service",
          state: { service: state.service, city },
        });
      }
    } catch (e) {
      console.log(e);
      res.send(e).status(400);
    }
  }
});

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Doctor Appointment",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173",
  });

  res.json({ id: session.id });
});
