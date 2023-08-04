import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/Logo Assesment Center-06.png";
import infomedia from "../../assets/infomedia.jpg";
import lineTitle from "../../assets/Asset 69.png";
import bgRight from "../../assets/Asset 28.png";
import { Row } from "react-bootstrap";
import { PDFExport } from "@progress/kendo-react-pdf";

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
        fileName="report-verbal"
        ref={componentRef}
      >
      <div
        id="report"
        className="card border-0 rounded shadow"
      >
        <div id="pdfHidden" className="a4">
          <Row>
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
                Test Report
              </p>
              <img src={lineTitle} height="auto" width="70%" />
              <p className="fw-bold mt-3 fs-5">{dataReport?.fullname}</p>
              <p className="fw-bold mb-0 fs-5">Email: {dataReport?.email}</p>
              <p className="fw-bold mb-0 fs-5">
                Perusahaan: {dataReport?.name_company}
              </p>
              <p className="fw-bold mb-0 fs-5">
                Jabatan: {dataReport?.jabatan}
              </p>
            </div>
            <div className="col-4">
              <img src={bgRight} height="auto" width="100%" />
            </div>
          </Row>
        </div>

        <div className="rounded page-break" style={{ backgroundColor: "#0E2954" }}>
          <p className="text-center text-uppercase fw-bold mt-2 text-white mb-2">
            data verbal test
          </p>
        </div>
        <div className="p-2 px-3 text-center">
          <p className="fw-bold">Tanggal: {dataReport?.date_finish}</p>
          <div className="d-flex">
            {dataReport?.data_category?.map((item) => (
              <div
                className="card mx-1 text-white p-2 py-3 w-25 border-0 rounded-3"
                style={{ backgroundColor: "#176B87" }}
              >
                <p className="mb-1">{item.name}</p>
                <p className="mb-0 fs-5 fw-bold">{item.category_total}</p>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <div className="card border-0 shadow p-3 w-25" style={{backgroundColor:"#3AA6B9"}}>
              <p className="fw-bold text-white">Total Skor Jawaban Benar:</p>
              <div
                className="p-3 rounded-pill fw-bold mx-auto"
                style={{ width: "65px", backgroundColor:"#9BCDD2" }}
              >
                <span className="fs-5">{dataReport?.total_keseluruhan}</span>
              </div>
            </div>
            <div className="card border-0 shadow p-2 w-50 text-white" style={{backgroundColor:"#3AA6B9"}}>
              <p className="my-auto">
                <p className="fw-bold mb-3">Kesimpulan: </p>
                Saudara {""}
                <b>{dataReport?.fullname}</b> {""}
                memiliki kecerdasan verbal dalam kategori{" "}
                <b>{dataReport?.kesimpulan}</b>
              </p>
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
