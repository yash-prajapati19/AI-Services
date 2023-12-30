import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  BarElement,
  CategoryScale,
  Chart as Chartjs,
  LinearScale,
  Title,
} from "chart.js";
Chartjs.register(LinearScale, CategoryScale, BarElement, Title);

const About = ({ about }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const gradient = {
    start: "#6ffcdb", // Start color of the gradient

    end: "#019fbb", // End color of the gradient
  };

  const data = {
    labels: [
      "9 AM - 10 AM",
      "10 AM - 11 AM",
      "11 AM - 12 PM",
      "12 PM - 1 PM",
      "1 PM - 2 PM",
      "2 PM - 3 PM",
    ],
    datasets: [
      {
        label: "# of Appointments",
        data: [],
        backgroundColor: (context) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#6ffcdb");
          gradient.addColorStop(0.5, "#48d9d2");
          gradient.addColorStop(1, "#019fbb");
          return gradient;
        },
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  // Update the dataset based on the selected date
  if (selectedDate.toDateString() === new Date("2023-09-13").toDateString()) {
    data.datasets[0].data = [12, 19, 3, 5, 10, 8];
  } else if (
    selectedDate.toDateString() === new Date("2023-09-14").toDateString()
  ) {
    data.datasets[0].data = [8, 15, 6, 9, 5, 7];
  } else if (
    selectedDate.toDateString() === new Date("2023-09-15").toDateString()
  ) {
    data.datasets[0].data = [5, 10, 4, 7, 3, 6];
  } else if (
    selectedDate.toDateString() === new Date("2023-09-16").toDateString()
  ) {
    data.datasets[0].data = [15, 1, 8, 6, 5, 2];
  } else if (
    selectedDate.toDateString() === new Date("2023-09-17").toDateString()
  ) {
    data.datasets[0].data = [8, 11, 6, 2, 8, 9];
  } else if (
    selectedDate.toDateString() === new Date("2023-09-18").toDateString()
  ) {
    data.datasets[0].data = [10, 9, 2, 12, 2, 5];
  } else if (
    selectedDate.toDateString() === new Date("2023-09-19").toDateString()
  ) {
    data.datasets[0].data = [12, 1, 7, 7, 1, 6];
  } else if (
    selectedDate.toDateString() === new Date("2023-09-20").toDateString()
  ) {
    data.datasets[0].data = [8, 10, 3, 11, 5, 3];
  }

  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Disable x-axis grid lines
        },
      },
      y: {
        grid: {
          display: false, // Disable y-axis grid lines
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <div>{about}</div>
      <div className="flex flex-col gap-4">
        <h1 className="font-bold">Appointments Graph:</h1>
        <div className="flex items-center gap-2">
          <p className="text__para mt-0 font-semibold text-headingColor">
            Select a Date:
          </p>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a date"
            minDate={new Date()}
          />
        </div>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default About;
