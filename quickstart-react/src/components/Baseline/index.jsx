/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

import { portfolio } from "../Portfolio";
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();
export function Baseline() {
  const [tema, setTema] = useState("light");
  const [data, setData] = useState([
    ["loading", "loading"],
    [0, 0],
  ]);

  useEffect(() => {
    const getTime = async () => {
      const teste = await monday.get("context");
      setTema(teste.data.theme);
    };

    const fetchData = async () => {
      try {
        const boardRes = await monday.get("context");
        console.log(boardRes.data.boardIds);
        const response = await portfolio(boardRes.data.boardIds);

        setData(response);
      } catch (error) {
        console.log(error);
      }
    };
    getTime();
    fetchData();
  }, []);

  const series = [
    {
      name: "Planejado",
      data: data[1],
    },
    {
      name: "Atrasado",
      data: data[2],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadiusApplication: "around",
        barHeight: 25,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: "13px",
              fontWeight: 900,
              color: tema === "light" ? "#263238" : "#fff",
            },
          },
        },
      },
    },

    colors: ["#2EF8A0", "#FF0534"],

    stroke: {
      width: 1,
      colors: tema === "light" ? "#263238" : "#fff",
    },
    title: {
      text: "Portfólio",
      align: "center",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: undefined,
        color: tema === "light" ? "#263238" : "#fff",
      },
    },
    xaxis: {
      categories: data[0],
      labels: {
        style: {
          colors: tema === "light" ? "#263238" : "#fff",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: tema === "light" ? "#263238" : "#fff",
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val) {
          return val + " dias";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "left",
      offsetX: 50,
      labels: {
        colors: tema === "light" ? "#263238" : "#fff",
      },
    },
  };

  return (
    <>
      <Chart options={options} series={series} type="bar" height={430} />
    </>
  );

  //   var chart = new ApexCharts(document.querySelector("#chart"), options);
  //   chart.render();
}
