"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Card3Props {
  count: number;
  percentage: number;
  title: string;
  color: string;
}

const Card4: React.FC<Card3Props> = ({ count, percentage, title, color }) => {
  const data: ChartData<"doughnut"> = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, "#e0e0e0"],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    cutout: "70%",
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="bg-white border border-gray-300 rounded-md p-4 flex justify-between items-center shadow-sm">
      <div>
        <p className="text-xl font-bold text-gray-800">
          {count} <span className="text-[15px] font-normal">{percentage}%</span>
        </p>
        <p className=" text-gray-500 text-[10px]">{title}</p>
      </div>
      <div className="relative w-16 h-16">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default Card4;