import { useState } from "react";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { loadStripe } from "@stripe/stripe-js";

const SidePanel = ({ ticketPrice }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("select");
  const [selectedDate, setSelectedDate] = useState(null);

  const stripePromise = loadStripe(
    "pk_test_51MgD4LSIzFf6nnIGtFNmaxqWcDzHueadpTVy0Yfo20vyWMvWzi2FOTWniUA5HfUbYbPhag2IjLjlvMSWH9rtNmkV00zwpMUTvv"
  );

  async function handleSubmit() {
    if (selectedTimeSlot === "select") {
      toast.error("Please select a time slot");
      return;
    }
    if (selectedDate === null) {
      toast.error("Please select the date");
      return;
    }

    const message = `You have received a new appointment for ${selectedTimeSlot} on ${selectedDate}`;

    emailjs
      .send(
        "service_wtcooqo",
        "template_5cdbill",
        {
          to_email: "yp54139@gmail.com",
          message: message,
        },
        "vjqjPgv-D0ivZB5nr"
      )
      .then((response) => {
        console.log("success");
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
      });

    const stripe = await stripePromise;

    const response = await fetch(
      "http://localhost:3080/create-checkout-session",
      { method: "POST" }
    );
    const session = await response.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error("Error:", error);
    }
  }

  const today = new Date();

  return (
    <div className="shadow-xl p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Rate</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          Rs.{ticketPrice}
        </span>
      </div>
      <div className="flex flex-row items-center justify-between mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Select a Date:
        </p>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date"
          minDate={today}
        />
      </div>

      <div className="flex flex-row items-center justify-between mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <select
          value={selectedTimeSlot}
          onChange={(e) => setSelectedTimeSlot(e.target.value)}
        >
          <option value="select">Select</option>
          <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
          <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
          <option value="11:00 AM - 12:00 AM">11:00 AM - 12:00 PM</option>
          <option value="11:00 AM - 12:00 AM">12:00 PM - 1:00 PM</option>
          <option value="11:00 AM - 12:00 AM">1:00 PM - 2:00 PM</option>
          <option value="11:00 AM - 12:00 AM">2:00 AM - 3:00 PM</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button
        onClick={handleSubmit}
        className=" bg-[#0067ff] py-[15px] px-[35px] rounded-[50px] text-white font-[600] mt-[38px] w-full"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
