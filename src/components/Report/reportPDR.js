import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import { Radar } from "react-chartjs-2";

const ReportPDR = ({ data }) => {
  const componentRef = useRef(null);

  const generatePDF = () => {
    html2canvas(componentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 0, 0, 600, 0, undefined, false);
      pdf.save("report-digital-readiness.pdf");
    });
  };

  const dataRadar = {
    labels: data?.radar_data?.label,
    datasets: [
      {
        label: "Data",
        data: data?.radar_data?.data,
        fill: true,
        borderColor: "blue",
      },
      {
        label: "Baseline",
        data: data?.radar_data?.data,
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
      <button className="btn bg-blue mb-2 text-white" onClick={generatePDF}>
        Export PDF
      </button>
      <div
        id="report"
        className="card border rounded shadow capture"
        ref={componentRef}
      >
        <div className="rounded" style={{backgroundColor:"#0E2954"}}>
          <p className="text-center text-uppercase fw-bold mt-2 text-white">
            data people digital readiness (pdr)
          </p>
        </div>
        <div className="p-2 px-3">
          <p className="fw-bold">Name: {data?.fullname}</p>
          <p className="fw-bold">Digital Competency:</p>
          <div className="d-flex justify-content-center mt-6">
            <div className="mapping-wrapper">
              <p
                className="text-secondary"
                style={{
                  position: "absolute",
                  left: "-90px",
                  top: "-30px",
                  fontSize: "15px",
                }}
              >
                Digital Competency
              </p>
              <p
                className="text-secondary"
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  right: "-150px",
                  fontSize: "15px",
                }}
              >
                Digital Adaptability
              </p>
              <div class="mapping-grid text-center">
                <div class="col bg-blue text-white border border-white p-4 d-flex flex-column gap-2 justify-content-center position-relative">
                  <p>Paradox</p>
                  <p>0%</p>
                  <div
                    className="box-left"
                    style={{ backgroundColor: "#2e75b6" }}
                  >
                    <p>High</p>
                  </div>
                </div>
                <div class="col bg-blue text-white border border-white p-4 d-flex flex-column gap-2 justify-content-center position-relative">
                  <p>Enabler</p>
                  <p>0.67%</p>
                </div>
                <div class="col bg-blue text-white border border-white p-4 d-flex flex-column gap-2 justify-content-center position-relative">
                  <p>Enhancer</p>
                  <p>0%</p>
                </div>
                <div class="col bg-blue text-white border border-white p-4 d-flex flex-column gap-2 justify-content-center position-relative">
                  <p>Leader</p>
                  <p>55.03%</p>
                </div>
                <div class="text-secondary col bg-light border border-white p-4 d-flex flex-column gap-2 justify-content-center position-relative">
                  <p>Comfort Zone</p>
                  <p>1.34%</p>
                  <div
                    className="box-left"
                    style={{ backgroundColor: "#bdd7ee" }}
                  >
                    <p>Low</p>
                  </div>
                  <div
                    className="box-bottom"
                    style={{ backgroundColor: "#bdd7ee" }}
                  >
                    <p>Personal Innovative</p>
                  </div>
                </div>
                <div class="text-secondary col bg-light border border-white p-4 d-flex flex-column gap-2 justify-content-center position-relative">
                  <p>Observer</p>
                  <p>6.71%</p>
                  <div
                    className="box-bottom text-secondary"
                    style={{ backgroundColor: "#9dc3e6" }}
                  >
                    <p>Emotional Response</p>
                  </div>
                </div>
                <div class="col bg-light border border-white p-4 d-flex flex-column gap-2 justify-content-center position-relative">
                  <p className="text-secondary">Fast Adopter</p>
                  <p className="text-secondary">0%</p>
                  <div
                    className="box-bottom text-white"
                    style={{ backgroundColor: "#2e75b6" }}
                  >
                    <p>Attitudinal Readiness</p>
                  </div>
                </div>
                <div class="col bg-light border border-white p-4 d-flex flex-column gap-2 justify-content-center position-relative">
                  <p className="text-secondary">Learner</p>
                  <p className="text-secondary">36.24%</p>
                  <div
                    className="box-bottom text-white"
                    style={{ backgroundColor: "#1f4e79" }}
                  >
                    <p>Action Readiness</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center p-2 mt-7">
            <Radar data={dataRadar} className="w-50 h-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPDR;
