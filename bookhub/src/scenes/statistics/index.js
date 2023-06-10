import Topbar from "../global/Topbar";
import React from "react";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";
import { DoughnutController } from "chart.js";
import { Bar } from "react-chartjs-2";
// import { Chart } from "chart.js";
import { ArcElement, BarController, CategoryScale } from "chart.js";
Chart.register(ArcElement, BarController, CategoryScale, DoughnutController);
// Chart.register(ArcElement, DoughnutController);

const generateColorVariations = (baseColor, alpha, steps) => {
  const [r, g, b] = baseColor;
  const result = [];

  for (let i = 1; i <= steps; i++) {
    const factor = i / steps;
    result.push(
      `rgba(${Math.round(r * factor)}, ${Math.round(g * factor)}, ${Math.round(
        b * factor
      )}, ${alpha})`
    );
  }

  return result;
};

const Statistics = () => {
  const [chartData, setChartData] = useState(null);
  const subjects = [
    "Humor",
    "Fantasy",
    "Love",
    "Magic",
    "Romance",
    "Horror",
    "Cooking",
    "Finance",
    "Management",
  ];
  const subjectLengths = [
    23182, 13104, 16326, 16589, 20339, 2269, 34860, 77369, 95462,
  ];

  useEffect(() => {
    const fetchDataAndRenderChart = async () => {
      const baseColor = [0, 0, 200];
      const borderColor = "rgba(0, 0, 0, 1)";
      const backgroundColors = [
        "#1B4F72",
        "#1F618D",
        "#2980B9",
        "#7FB3D5",
        "#512E5F",
        "#76448A",
        "#AF7AC5",
        "#884EA0",
        "#AF7AC5",
      ];
      const borderColors = new Array(subjects.length).fill(borderColor);

      setChartData({
        labels: subjects,
        datasets: [
          {
            label: "House Members",
            data: Object.values(subjectLengths),
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      });
    };

    fetchDataAndRenderChart();
  }, []);

  if (!chartData) return <div>Loading...</div>;

  const renderLegend = () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {chartData.labels.map((subject, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                  marginRight: "10px",
                }}
              ></div>
              <div>{subject}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="text-center">
      <Topbar title={"Books Statistics"} />
      <h3>Subject Books</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "600px",
          position: "relative",
          margin: "auto",
          paddingLeft: "4%",
        }}
      >
        <div
          style={{
            width: "500px",
            height: "500px",
            position: "relative",
            padding: "10px",
          }}
        >
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: true,
              },
            }}
          />
        </div>
      </div>
      {renderLegend()}
    </div>
  );
};

export default Statistics;
