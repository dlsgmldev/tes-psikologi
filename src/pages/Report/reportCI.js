import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/Logo Assesment Center-06.png";
import infomedia from "../../assets/infomedia.jpg";
import lineTitle from "../../assets/Asset 69.png";
import bgRight from "../../assets/Asset 28.png";
import { Row } from "react-bootstrap";
import { PDFExport } from "@progress/kendo-react-pdf";

const ReportCI = () => {
  const [dataReport, setDataReport] = useState("");
  const token = localStorage.getItem("token");
  const componentRef = useRef();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}ac/admin/ci_summary/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setDataReport(res.data.data);
      });
  }, []);

  const generatePDF = () => {
    if (componentRef.current) {
      componentRef.current.save();
    }
  };

  return (
    <div className="p-3">
      <button
        className="btn btn-info text-white fw-bold mb-2"
        onClick={generatePDF}
      >
        Export PDF
      </button>
      <PDFExport
        scale={0.6}
        paperSize="A4"
        margin="0.5cm"
        forcePageBreak=".page-break"
        fileName={`${dataReport?.fullname}-critical-incident`}
        ref={componentRef}
      >
        <div id="report" className="card border-0 rounded shadow">
          <div id="pdfHidden" className="a4">
            <div className="row">
              <div className="col container p-5 my-auto">
                <div className="d-flex">
                  {/* <img
                  className="my-auto p-1"
                  alt=""
                  src={logo}
                  width="auto"
                  height={80}
                ></img>
                <div className="mx-3 fw-bold vr"></div> */}
                  <img
                    className="my-auto p-1"
                    alt=""
                    src={infomedia}
                    width="auto"
                    height={35}
                  ></img>
                </div>
                <p
                  className="fw-bold text-uppercase mb-0 mt-1"
                  style={{ fontSize: "40px", color: "#213555" }}
                >
                  Critical Incident
                </p>
                <p
                  className="fw-bold text-uppercase mb-0"
                  style={{ fontSize: "30px", color: "#6DA9E4" }}
                >
                  Report
                </p>
                <img src={lineTitle} height="auto" width="70%" />
                <p className="fw-bold mt-3 fs-5 ">{dataReport?.fullname}</p>
                <p className="fw-bold mb-0 fs-5">
                  Email: <span className="">{dataReport?.email}</span>
                </p>
                <p className="fw-bold mb-0 fs-5">
                  Perusahaan: <span className="">{dataReport?.subcompany}</span>
                </p>
                <p className="fw-bold mb-0 fs-5">
                  Jabatan yang dilamar:{" "}
                  <span className="">{dataReport?.jabatan}</span>
                </p>
                <p className="fw-bold fs-5">
                  Tanggal penyelesaian:{" "}
                  <span className="">{dataReport?.date_finish}</span>
                </p>
              </div>
              <div className="col-4">
                <img src={bgRight} height="auto" width="100%" />
              </div>
            </div>
          </div>

          <div
            className="rounded page-break"
            style={{ backgroundColor: "#0E2954" }}
          >
            <p className="text-center text-uppercase fw-bold mt-2 text-white mb-2">
              data critical incident
            </p>
          </div>
          <div className="p-2 px-3">
            <div className="mt-3">
              {dataReport?.answer?.map((item) => (
                <div
                  className="rounded border-0  p-3 text-white mb-3 d-flex"
                  style={{ backgroundColor: "#94ADD7" }}
                >
                  <p className="fw-bold me-2">{item.number}.</p>
                  <div>
                    <p className="fw-bold mb-1">Question: {item.question}</p>
                    <p className="mb-0">Answer: {item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PDFExport>
    </div>
  );
};

export default ReportCI;
