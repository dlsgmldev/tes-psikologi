import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Radar } from "react-chartjs-2";
import line from "../../assets/Asset 25.png";
import line2 from "../../assets/Asset 27.png";
import lineTitle from "../../assets/Asset 69.png";
import bgLeft from "../../assets/Asset 60.png";
import bgRight from "../../assets/Asset 28.png";
import r from "../../assets/Asset 67.png";
import i from "../../assets/Asset 62.png";
import a from "../../assets/Asset 66.png";
import s from "../../assets/Asset 65.png";
import e from "../../assets/Asset 64.png";
import c from "../../assets/Asset 63.png";
import img from "../../assets/Asset 61.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import logo from "../../assets/Logo Assesment Center-06.png";
import { PDFExport } from "@progress/kendo-react-pdf";

const ReportHolland = () => {
  const [dataReport, setDataReport] = useState("");
  const token = localStorage.getItem("token");
  const componentRef = useRef();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}ac/admin/holland_summary/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setDataReport(res.data);
      });
  }, []);

  const generatePDF = () => {
    document.getElementById("pdfHidden").style.display = "block";
    if (componentRef.current) {
      componentRef.current.save();
    }
    // document.getElementById("pdfHidden").style.display = "none";
  };

  const dataRadar = {
    labels: dataReport.radar_data?.label,
    datasets: [
      {
        data: dataReport?.radar_data?.data,
        fill: true,
        borderColor: "#ffc107",
      },
    ],
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        r: {
          pointLabels: {
            font: {
              size: 14,
            },
          },
        },
      },
      scale: {
        min: 0,
      },
    },
  };

  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };
  // getBase64FromUrl('https://apidls.onegml.com/ac/holland_image/antropologi.png').then(console.log)

  function convertImageToBase64(imgUrl, callback) {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      ctx.drawImage(image, 0, 0);
      const dataUrl = canvas.toDataURL();
      callback && callback(dataUrl);
    };
    image.src = imgUrl;
  }

  // convertImageToBase64('https://apidls.onegml.com/ac/holland_image/antropologi.png', console.log)

  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  
  btoa('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', function(dataUrl) {
    console.log( dataUrl)
  })

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
        fileName="report-holland"
        ref={componentRef}
      >
      <div className="card border-0 rounded shadow">
        <div id="pdfHidden" className="a4">
          <Row>
            <div className="col-8 container p-5 my-auto">
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
                style={{ fontSize: "40px", color: "#213555" }}
              >
                Holland
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
        <div id="pdfHidden2" className="page-break">
          <Row>
            <div className="col-1">
              <img src={bgLeft} height="100%" width="130%" />
            </div>
            <div className="col p-3">
              <p className="text-center fs-3 fw-bold">Holland Test</p>
              <div
                className="card p-3 shadow border-0 text-white"
                style={{ backgroundColor: "#0C134F" }}
              >
                <span>
                  Tes Holland adalah tes minat bakat dan ditujukan untuk melihat
                  kemungkinan karir-karir yang cocok untuk Anda! Model pilihan
                  karir Holland menunjukkan bahwa seseorang akan mencari
                  lingkungan kerja yang sesuai dengan keterampilan, kemampuan,
                  sikap, dan nilai yang diyakini.
                </span>
              </div>
              <p className="fs-5 mt-4 fw-bold">
                Ada 6 tipe kepribadian dari tes Holland:
              </p>
              <div
                className="container shadow rounded p-3 d-flex mb-2"
                style={{ backgroundColor: "#A6D0DD" }}
              >
                <img src={r} height="auto" width={35} />
                <div className="card ms-3">
                  <span className="ms-3">
                    <b>The Realistic (R) ( The Doers )</b> <br />
                    Individu dengan kepribadian realistis cenderung memiliki
                    kemampuan teknis dan fisik yang kuat. Mereka lebih suka
                    bekerja dengan alat dan benda-benda daripada berinteraksi
                    dengan orang lain secara langsung.
                  </span>
                </div>
              </div>
              <div
                className="container shadow rounded p-3 d-flex mb-2"
                style={{ backgroundColor: "#A6D0DD" }}
              >
                <img src={i} height="auto" width={35} />
                <div className="card ms-3">
                  <span className="ms-3">
                    <b>The Investigative (I) ( The Thinkers )</b> <br />
                    Orang dengan kepribadian investigatif cenderung suka
                    mengeksplorasi ide-ide dan teori-terori baru. Mereka lebih
                    suka bekerja dalam lingkungan yang menekankan penelitian,
                    analisis, dan pemecahan masalah.
                  </span>
                </div>
              </div>
              <div
                className="container shadow rounded p-3 d-flex mb-2"
                style={{ backgroundColor: "#A6D0DD" }}
              >
                <img src={a} height="auto" width={35} />
                <div className="card ms-3">
                  <span className="ms-3">
                    <b>The Artistic (A) ( The Creators )</b> <br />
                    Individu dengan kepribadian artistik cenderung memiliki
                    imajinasi dan kreativitas yang kuat. Mereka menikmati
                    ekspresi diri melalui seni, musik, tulisan, atau
                    bentuk-bentuk kreatif lainnya.
                  </span>
                </div>
              </div>
              <div
                className="container shadow rounded p-3 d-flex mb-2"
                style={{ backgroundColor: "#A6D0DD" }}
              >
                <img src={s} height="auto" width={35} />
                <div className="card ms-3">
                  <span className="ms-3">
                    <b>The Social (S) ( The Helpers )</b> <br />
                    Orang dengan kepribadian sosial cenderung memiliki
                    keterampilan interpersonal yang baik dan menikmati bekerja
                    dengan orang lain. Mereka cenderung terlibat dalam profesi
                    yang berhubungan dengan membantu, memberdayakan, atau
                    mengajar orang lain.
                  </span>
                </div>
              </div>
              <div
                className="container shadow rounded p-3 d-flex mb-2"
                style={{ backgroundColor: "#A6D0DD" }}
              >
                <img src={e} height="auto" width={35} />
                <div className="card ms-3">
                  <span className="ms-3">
                    <b>The Enterprising (E) ( The Persuaders )</b> <br />
                    The Enterprising (E) ( The Persuaders ) Individu dengan
                    kepribadian enterprising cenderung memiliki jiwa
                    kepemimpinan dan minat dalam aktivitas bisnis. Mereka suka
                    mengambil risiko, menjual ide atau produk, dan mencapai
                    tujuan yang lebih tinggi.
                  </span>
                </div>
              </div>
              <div
                className="container shadow rounded p-3 d-flex mb-2"
                style={{ backgroundColor: "#A6D0DD" }}
              >
                <img src={c} height="auto" width={35} />
                <div className="card ms-3">
                  <span className="ms-3">
                    <b>The Conventional (C) ( The Organizers )</b> <br />
                    Orang dengan kepribadian konvensional cenderung menyukai
                    tugas-tugas yang terstruktur dan rutin. Mereka memiliki
                    kecenderungan untuk mengikuti aturan, prosedur, dan sistem
                    yang sudah ada.
                  </span>
                </div>
              </div>
              <div
                className="card p-3 shadow border-0 text-white mt-3"
                style={{ backgroundColor: "#7C96AB" }}
              >
                <span>
                  Jawablah pernyataan-pernyataan berikut secepat mungkin
                  sehingga Anda dapat melihat profil kepribadian yang
                  menggambarkan preferensi karier Anda berdasarkan tingkat
                  kesesuaian dengan enam tipe kepribadian Holland.
                </span>
              </div>
              <div className="d-flex justify-content-center mt-2">
                <img src={img} height="auto" width="60%" />
              </div>
            </div>
          </Row>
        </div>

        <div className="rounded page-break" style={{ backgroundColor: "#0E2954" }}>
          <p className="text-center text-uppercase fw-bold mt-2 text-white mb-2">
            data Holland test (RIASEC)
          </p>
        </div>
        <div className="p-2 px-3">
          <p className="fw-bold mt-1 text-center">Skor Jawaban:</p>
          <Row>
            <Col md={5} className="d-flex align-items-start">
              <div className="d-flex justify-content-center p-3 rounded shadow-lg p-4 pb-2 ms-2">
                <ul className="fw-bold lh-xl no-bullets m-0 ps-1">
                  <li className="d-flex">
                    <div className="fw-bold round-div2 rounded-circle text-white text-center">
                      R
                    </div>
                    <span className="ms-1">ealistic</span>
                  </li>
                  <li className="d-flex">
                    <div className="fw-bold round-div2 rounded-circle text-white text-center">
                      I
                    </div>
                    <span className="ms-1">nvestigative</span>
                  </li>
                  <li className="d-flex">
                    <div className="fw-bold round-div2 rounded-circle text-white text-center">
                      A
                    </div>
                    <span className="ms-1">rtistic</span>
                  </li>
                  <li className="d-flex">
                    <div className="fw-bold round-div2 rounded-circle text-white text-center">
                      S
                    </div>
                    <span className="ms-1">ocial</span>
                  </li>
                  <li className="d-flex">
                    <div className="fw-bold round-div2 rounded-circle text-white text-center">
                      E
                    </div>
                    <span className="ms-1">nterprising</span>
                  </li>
                  <li className="d-flex">
                    <div className="fw-bold round-div2 rounded-circle text-white text-center">
                      C
                    </div>
                    <span className="ms-1">onventional</span>
                  </li>
                </ul>
                <ul className="fw-bold lh-xl no-bullets">
                  <li>: {dataReport?.skorjawaban?.R}</li>
                  <li>: {dataReport?.skorjawaban?.I}</li>
                  <li>: {dataReport?.skorjawaban?.A}</li>
                  <li>: {dataReport?.skorjawaban?.S}</li>
                  <li>: {dataReport?.skorjawaban?.E}</li>
                  <li>: {dataReport?.skorjawaban?.C}</li>
                </ul>
              </div>
            </Col>
            <Col className="radar-chart">
              <Radar data={dataRadar} options={dataRadar.options} />
            </Col>
          </Row>
          <img src={line} width="100%" />
          <p className="fw-bold mt-3 text-center">Interpretasi Umum:</p>
          <Row className="mx-1">
            <Col md={4}>
              <p className="text-center">Kombinasi Tipe Minat Tertinggi</p>
              <div className="d-flex justify-content-center gap-2">
                <div className="round-div">
                  <div
                    className="fw-bold p-3 rounded-circle text-white text-center fs-4"
                    style={{ backgroundColor: "#0700C4" }}
                  >
                    {dataReport?.firstkey?.label}
                  </div>
                  <p className="text-center mb-0">
                    {dataReport?.firstkey?.value}
                  </p>
                </div>
                <div className="round-div">
                  <div
                    className="fw-bold p-3 rounded-circle h-auto text-white text-center fs-4"
                    style={{ backgroundColor: "#0052FF" }}
                  >
                    {dataReport?.secondkey?.label}
                  </div>
                  <p className="text-center mb-0">
                    {dataReport?.secondkey?.value}
                  </p>
                </div>
                <div className="round-div">
                  <div
                    className="fw-bold p-3 rounded-circle h-auto text-white text-center fs-4"
                    style={{ backgroundColor: "#00CCFF" }}
                  >
                    {dataReport?.thirdkey?.label}
                  </div>
                  <p className="text-center mb-0">
                    {dataReport?.thirdkey?.value}
                  </p>
                </div>
              </div>
            </Col>
            <Col className="ps-0">
              <div className="card p-3 bg-light border-0">
                <span>{dataReport?.deskripsi}</span>
              </div>
            </Col>
          </Row>
          <img src={line} width="100%" />
          <p className="fw-bold mt-3 text-center">
            Bidang Kerja sesuai dengan Profil Anda:
          </p>
          <Row className="row-cols-6 d-flex justify-content-center gap-2 mb-3">
            {dataReport?.pekerjaan?.map((item) => {
              if (item.image !== null) {
                return (
                  <Col className="card text-center p-4 border shadow">
                    <img src={item.image_url} />
                    <p className="mt-auto mb-0">{item.name}</p>
                  </Col>
                );
              }
            })}
          </Row>
          {/* <img src={line2} width="100%" /> */}
          <span className="d-flex justify-content-center text-xs mt-2">
            Copyright © Assessment Center Solutions 2023. All rights reserved.
          </span>
        </div>
      </div>
      </PDFExport>
    </div>
  );
};

export default ReportHolland;
