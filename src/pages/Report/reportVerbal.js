import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/Logo Assesment Center-06.png";
import infomedia from "../../assets/infomedia.jpg";
import lineTitle from "../../assets/Asset 69.png";
import bgRight from "../../assets/Asset 28.png";
import { Row } from "react-bootstrap";
import { PDFExport } from "@progress/kendo-react-pdf";
import { drawDOM, exportPDF } from "@progress/kendo-drawing";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const ReportVerbal = () => {
  const [dataReport, setDataReport] = useState("");
  const [dataUri, setDataUri] = useState("");
  const token = localStorage.getItem("token");
  const componentRef = useRef();
  const { id } = useParams();

  // const exportPDF = () => {
  //   let gridElement = document.querySelector(".report");
  //   drawDOM(gridElement, {
  //     paperSize: "A4",
  //     scale: 0.6,
  //     margin: "0.5cm",
  //     forcePageBreak: ".page-break",
  //   })
  //     .then((group) => {
  //       return exportPDF(group);
  //     })
  //     .then((dataUri) => {
  //       console.log(dataUri.split(";base64,")[1]);
  //       setDataUri(dataUri.split(";base64,")[1]);
  //     });
  // };

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
        fileName={`${dataReport?.fullname}-verbal`}
        ref={componentRef}
      >
        <div id="report" className="card border-0 rounded shadow report">
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
                  Verbal Test
                </p>
                <p
                  className="fw-bold text-uppercase mb-0"
                  style={{ fontSize: "30px", color: "#6DA9E4" }}
                >
                  Report
                </p>
                <img src={lineTitle} height="auto" width="70%" />
                <p className="fw-bold mt-3 fs-5">
                  {dataReport?.fullname}
                </p>
                <p className="fw-bold mb-0 fs-5">
                  Email: <span className="">{dataReport?.email}</span>
                </p>
                <p className="fw-bold mb-0 fs-5">
                  Perusahaan:{" "}
                  <span className="">{dataReport?.subcompany}</span>
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
              data verbal test
            </p>
          </div>
          <div className="p-2 px-3 text-center">
            <div className="d-flex mt-3">
              {dataReport?.data_category?.map((item) => (
                <div
                  className="card mx-1 text-white p-2 py-3 w-25 border-0 rounded-3"
                  style={{ backgroundColor: "#176B87" }}
                >
                  <p className="mb-1">
                    {item.name}
                  </p>
                  <p className="mb-0 fs-5 fw-bold">
                    {item.category_total}
                  </p>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <div
                className="card border-0 shadow p-3 w-25"
                style={{ backgroundColor: "#3AA6B9" }}
              >
                <p className="fw-bold text-white">Total Skor Jawaban Benar:</p>
                <div
                  className="p-3 rounded-pill fw-bold mx-auto"
                  style={{ width: "65px", backgroundColor: "#9BCDD2" }}
                >
                  <span className="fs-5">
                    {dataReport?.total_keseluruhan}
                  </span>
                </div>
              </div>
              <div
                className="card border-0 shadow p-3 w-50 text-white"
                style={{ backgroundColor: "#3AA6B9" }}
              >
                <p className="fw-bold mb-3">Kesimpulan: </p>
                <b className="mb-0 mt-1">
                  {dataReport?.fullname}
                </b>
                <span>
                  memiliki kecerdasan numerik dalam kategori{" "}
                  <b>{dataReport?.kesimpulan}</b>
                </span>
              </div>
            </div>

            <div
              className="card p-3 border-0 bg-light text-center mx-auto shadow-lg mt-3"
              style={{ width: "25%" }}
            >
              <p className="fw-bold">Norma Skor Keseluruhan:</p>
              <ul className="text-center-ul mb-0">
                {dataReport?.legend?.map((item) => (
                  <li>
                    {item.name}: {item.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PDFExport>
    </div>
  );
};

export default ReportVerbal;
