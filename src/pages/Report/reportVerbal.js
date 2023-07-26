import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { Radar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import logo from "../../assets/Logo Assesment Center-06.png";
import lineTitle from "../../assets/Asset 69.png";
import bgRight from "../../assets/Asset 28.png";
import { Row } from "react-bootstrap";

const ReportVerbal = () => {
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
    document.getElementById("pdfHidden").style.display = "block";
    html2canvas(componentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 0, 0, 600, 0, undefined, false);
      pdf.save("report-verbal-test.pdf");
    });
    document.getElementById("pdfHidden").style.display = "none";
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
        <div id="pdfHidden" style={{ display: "none" }} className="a4">
          <Row>
            <div className="col container p-5 my-auto">
              <div className="d-flex">
                <img
                  className="my-auto p-1"
                  alt=""
                  src={logo}
                  width="auto"
                  height={80}
                ></img>
                <div className="mx-3 fw-bold vr"></div>
                <img
                  className="my-auto p-1"
                  alt=""
                  src={dataReport?.logo_company}
                  width="auto"
                  height={48}
                ></img>
              </div>
              <p
                className="fw-bold text-uppercase mb-0"
                style={{ fontSize: "90px", color: "#213555" }}
              >
                Verbal Test
              </p>
              <p
                className="fw-bold text-uppercase mb-0"
                style={{ fontSize: "65px", color: "#6DA9E4" }}
              >
                Test Report
              </p>
              <img src={lineTitle} height="auto" width="70%" />
              <p className="fw-bold mt-3 fs-4">{dataReport?.fullname}</p>
              <p className="fw-bold mb-0 fs-4">
                Email: {dataReport?.email}
              </p>
              <p className="fw-bold mb-0 fs-4">
                Perusahaan: {dataReport?.name_company}
              </p>
              <p className="fw-bold mb-0 fs-4">
                Jabatan: {dataReport?.jabatan}
              </p>
            </div>
            <div className="col-4">
              <img src={bgRight} height="auto" width="100%" />
            </div>
          </Row>
        </div>
        <div className="rounded" style={{ backgroundColor: "#0E2954" }}>
          <p className="text-center text-uppercase fw-bold mt-2 text-white mb-2">
            data verbal test
          </p>
        </div>
        <div className="p-2 px-3">
          <p className="fw-bold">Name: {dataReport?.fullname}</p>
          <p className="fw-bold">Tanggal: {dataReport?.date_finish}</p>
          <ol>
            {dataReport?.data_category?.map((item) => (
              <li>
                <p>
                  {item.name}: {item.category_total}
                </p>
              </li>
            ))}
          </ol>
          <p className="fw-bold">
            Total Skor Jawaban Benar: {dataReport?.total_keseluruhan}
          </p>
          <p>Norma Skor Keseluruhan:</p>
          <ul>
            {dataReport?.legend?.map((item) => (
              <li>
                {item.name}: {item.value}
              </li>
            ))}
          </ul>
          <p>
            <b>Kesimpulan: </b>
            Saudara {""}
            <b>{dataReport?.fullname}</b> {""}
            memiliki kecerdasan dalam kategori <b>{dataReport?.kesimpulan}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportVerbal;
