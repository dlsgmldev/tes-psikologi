import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { Radar } from "react-chartjs-2";
import { useParams } from "react-router-dom";

const Reportkecerdasan = () => {
  const [dataReport, setDataReport] = useState("");
  const token = localStorage.getItem("token");
  const componentRef = useRef();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}ac/admin/kecerdasan_summary/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setDataReport(res.data.data);
      });
  }, []);

  const generatePDF = () => {
    html2canvas(componentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 0, 0, 600, 0, undefined, false);
      pdf.save("report-tes-kecerdasan.pdf");
    });
  };

  const dataRadar = {
    labels: dataReport?.radar_data?.label,
    datasets: [
      {
        label: "Data",
        data: dataReport?.radar_data?.data,
        fill: true,
        borderColor: "blue",
      },
      {
        label: "Baseline",
        data: dataReport?.radar_data?.data,
        fill: true,
        border: "dashed red",
      },
    ],
    options: {
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.yLabel;
          },
        },
      },
      scale: {
        pointLabels: {
          fontSize: 15,
        },
        ticks: {
          beginAtZero: true,
          max: 20,
          min: 0,
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div className="p-3">
      <button
        className="btn btn-info text-white fw-bold mb-2"
        onClick={generatePDF}
      >
        Export PDF
      </button>
      <div
        id="report"
        className="card border rounded shadow capture"
        ref={componentRef}
      >
        <div className="rounded" style={{ backgroundColor: "#0E2954" }}>
          <p className="text-center text-uppercase fw-bold mt-2 text-white mb-2">
            data tes kecerdasan
          </p>
        </div>
        <div className="p-2 px-3">
          <p className="fw-bold">Name: {dataReport?.fullname}</p>
          <p className="fw-bold">Tanggal: {dataReport?.fullname}</p>
          <ol>
            {dataReport?.data_category?.map((item) => (
              <li>
                <p>
                  {item.name}: {item.category_total}
                </p>
                <p>{">"}60= tinggi</p>
                <p>31-60= rata-rata</p>
                <p>{"<"}30= kurang</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Reportkecerdasan;
