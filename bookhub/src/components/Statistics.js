import Topbar from "../scenes/global/Topbar";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";
import { DoughnutController } from "chart.js";
import { BooksData } from "../scenes/dashboard/BookContext";
import { ArcElement, BarController, CategoryScale } from "chart.js";
Chart.register(ArcElement, BarController, CategoryScale, DoughnutController);

const Statistics = () => {
  const [chartData, setChartData] = useState(null);
  const [responseData, setResponseData] = useState([]);
  const [subject, setSubjects] = useState([]);
  const [subjectLength, setSubjectLength] = useState([]);

  const { booksData, setBooksData } = BooksData();
  useEffect(() => {
    const keys = [
      "humor",
      "fantasy",
      "love",
      "magic",
      "romance",
      "horror",
      "cooking",
      "finance",
      "management",
    ];
    const fetchData = async () => {
      if (booksData.length === 0) {
        try {
          const promises = keys.map((key) =>
            axios.get(`http://openlibrary.org/subjects/${key}.json?limit=5`)
          );

          const allResponses = await axios.all(promises);
          const responseData = allResponses.map((response) => response.data);
          setResponseData(responseData);
          setBooksData(responseData);

          const subjectsArr = responseData.map((item) => item.name);
          const subjectLengthArr = responseData.map((item) => item.work_count);

          setSubjects(subjectsArr);
          setSubjectLength(subjectLengthArr);
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      } else {
        setResponseData(booksData);

        const subjectsArr = responseData.map((item) => item.name);
        const subjectLengthArr = responseData.map((item) => item.work_count);

        setSubjects(subjectsArr);
        setSubjectLength(subjectLengthArr);
      }
    };

    fetchData();
  }, [booksData, setBooksData, responseData]);
  useEffect(() => {
    const fetchDataAndRenderChart = async () => {
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
      const borderColors = new Array(subject.length).fill(borderColor);

      setChartData({
        labels: subject,
        datasets: [
          {
            label: "House Members",
            data: Object.values(subjectLength),
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      });
    };

    fetchDataAndRenderChart();
  }, [subject, subjectLength]);

  if (!chartData) return <div>Loading...</div>;

  const renderLegend = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
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
              className="mx-auto"
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
      <h1>Subject Books</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "500px",
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
