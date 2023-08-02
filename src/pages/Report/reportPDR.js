import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import { Radar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import logo from "../../assets/Logo Assesment Center-06.png";
import lineTitle from "../../assets/Asset 69.png";
import bgRight from "../../assets/Asset 28.png";
import cloud from "../../assets/thought-bubble.png";
import scheme from "../../assets/earth-globe.png";
import thinking from "../../assets/idea-hand-drawn-symbol-of-a-side-head-with-a-lightbulb-inside.png";
import person from "../../assets/running-man.png";
import { PDFExport } from "@progress/kendo-react-pdf";

const ReportPDR = () => {
  const [dataReport, setDataReport] = useState("");
  const token = localStorage.getItem("token");
  const componentRef = useRef();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}ac/admin/pdr_summary/${id}`, {
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
    labels: dataReport?.dataRadar?.label,
    datasets: [
      {
        label: "Data",
        data: dataReport?.dataRadar?.data,
        fill: true,
        borderColor: "blue",
      },
      {
        label: "Baseline",
        data: [3.25, 3.25, 3.25, 3.25, 3.25, 3.25],
        borderColor: "red",
        borderDash: [3, 5],
        backgroundColor: "rgba(0, 0, 0, 0)",
      },
    ],
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        r: {
          pointLabels: {
            font: {
              size: 12,
            },
          },
        },
      },
      scale: {
        ticks: {
          beginAtZero: true,
          max: 4,
          min: 0,
          stepSize: 1,
        },
        min: 0,
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
      {/* <div
        style={{
          position: "absolute",
          left: "-1000px",
          top: 0,
        }}
      > */}
      <PDFExport
        scale={0.6}
        paperSize="A4"
        margin="0.5cm"
        forcePageBreak=".page-break"
        fileName="report-pdr"
        ref={componentRef}
      >
        <div id="report" className="card border-0 rounded shadow">
          <div id="pdfHidden" className="a4">
            <div className="row">
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
                    src={dataReport?.user?.logo_company}
                    width="auto"
                    height={48}
                    crossOrigin="anonymous"
                  ></img>
                </div>
                <p
                  className="fw-bold text-uppercase mb-0"
                  style={{ fontSize: "40px", color: "#213555" }}
                >
                  people digital readiness
                </p>
                <p
                  className="fw-bold text-uppercase mb-0"
                  style={{ fontSize: "30px", color: "#6DA9E4" }}
                >
                  Report
                </p>
                <img src={lineTitle} height="auto" width="70%" />
                <p className="fw-bold mt-3 fs-5">
                  {dataReport?.user?.fullname}
                </p>
                <p className="fw-bold mb-0 fs-5">
                  Email: {dataReport?.user?.email}
                </p>
                <p className="fw-bold mb-0 fs-5">
                  Perusahaan: {dataReport?.user?.name_company}
                </p>
                <p className="fw-bold mb-0 fs-5">
                  Jabatan: {dataReport?.user?.jabatan}
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
              data people digital readiness (pdr)
            </p>
          </div>
          <div className="p-2 px-4">
            {/* <p className="fw-bold">Digital Competency:</p> */}
            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "4rem", marginBottom: "7rem" }}
            >
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
                    <p>{dataReport?.dataScatter?.Paradox}</p>
                    <div
                      className="box-left"
                      style={{ backgroundColor: "#2e75b6" }}
                    >
                      <p>High</p>
                    </div>
                  </div>
                  <div class="col bg-blue text-white border border-white p-4 d-flex flex-column gap-2 justify-content-center position-relative">
                    <p>Enabler</p>
                    <p>{dataReport?.dataScatter?.Enabler}</p>
                  </div>
                  <div class="col bg-blue text-white border border-white p-4 d-flex flex-column gap-2 justify-content-center position-relative">
                    <p>Enhancer</p>
                    <p>{dataReport?.dataScatter?.Enhancer}</p>
                  </div>
                  <div class="col bg-blue text-white border border-white p-4 d-flex flex-column gap-2 justify-content-center position-relative">
                    <p>Leader</p>
                    <p>{dataReport?.dataScatter?.Leader}</p>
                  </div>
                  <div class="text-secondary col bg-light border border-white p-4 d-flex flex-column gap-2 justify-content-center position-relative">
                    <p>Comfort Zone</p>
                    <p>{dataReport?.dataScatter?.ComfortZone}</p>
                    <div
                      className="box-left text-secondary"
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
                    <p>{dataReport?.dataScatter?.Observer}</p>
                    <div
                      className="box-bottom text-secondary"
                      style={{ backgroundColor: "#9dc3e6" }}
                    >
                      <p>Emotional Response</p>
                    </div>
                  </div>
                  <div class="col bg-light border border-white p-4 d-flex flex-column gap-2 justify-content-center position-relative">
                    <p className="text-secondary">Fast Adopter</p>
                    <p className="text-secondary">
                      {dataReport?.dataScatter?.FastAdopter}
                    </p>
                    <div
                      className="box-bottom text-white"
                      style={{ backgroundColor: "#2e75b6" }}
                    >
                      <p>Attitudinal Readiness</p>
                    </div>
                  </div>
                  <div class="col bg-light border border-white p-4 d-flex flex-column gap-2 justify-content-center position-relative">
                    <p className="text-secondary">Learner</p>
                    <p className="text-secondary">
                      {dataReport?.dataScatter?.Learner}
                    </p>
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
            <p className="fw-bold">
              One GML mengidentifikasi 8 (delapan) area utama untuk mengukur
              tingkat pemahaman kompetensi digital dan tingkat adaptasi digital:
            </p>
            <ol>
              <li>
                <b>Leader</b>
                <br /> “Menguasai teknologi dan mampu mengaplikasikannya serta
                menjadi perintis transformasi digital.”
              </li>
              <li>
                <b>Learner</b>
                <br />
                “Mampu mengaplikasikan teknologi tetapi masih perlu meningkatkan
                lagi kompetensi digitalnya.”
              </li>
              <li>
                <b>Enhancer</b>
                <br />
                “Memiliki keyakinan bahwa kompetensi digital dibutuhkan,
                memiliki kompetensi digital yang dibutuhkan saat ini dan
                berpotensi untuk menjadi agen perubahan.”
              </li>
              <li>
                <b>Fast Adopter</b>
                <br />
                “Memiliki keyakinan bahwa kompetensi digital dibutuhkan,
                memiliki kompetensi digital yang masih rendah.”
              </li>
              <li>
                <b>Enabler</b>
                <br />
                Enabler “Memberikan reaksi emosional terhadap teknologi,
                memiliki kompetensi digital yang tinggi sehingga berpotensi
                untuk dapat memanfaatkan teknologi.”
              </li>
              <li>
                <b>Observer</b>
                <br />
                Observer “Memberikan reaksi emosional terhadap teknologi,
                memiliki kompetensi digital yang rendah sehingga belum terwujud
                dalam suatu tindakan.”
              </li>
              <li>
                <b>Paradox</b>
                <br />
                “Stabil dengan karakter dan pola pikir saat ini terkait
                teknologi meskipun memiliki kompetensi digital yang baik.”
              </li>
              <li>
                <b>Comfort Zone</b>
                <br />
                “Stabil dengan karakter dan pola pikir saat ini terkait
                teknologi dengan kompetensi digital yang masih rendah.”
              </li>
            </ol>

            <p className="fw-bold mt-5 fs-5 page-break">
              Digital Adaptability:
            </p>
            <div className="d-flex justify-content-center">
              <div className="rotated-left fst-italic text-secondary">
                Intra-processes
              </div>
              <div className="card me-2 border-0" style={{ width: "20%" }}>
                <img className="mx-auto mb-1" src={person} width={60} />
                <div
                  className="card border-blue p-3 text-center"
                  style={{
                    borderRadius: "25px",
                    backgroundColor: "#C5DFF8",
                  }}
                >
                  <span>
                    Personal
                    <br /> Innovativeness
                  </span>
                  <div className="bg-white w-50 mx-auto mt-2 mb-auto">
                    {
                      dataReport?.dataDigitalAdaptability
                        ?.personal_innovativeness
                    }
                  </div>
                </div>
              </div>
              <div className="card me-2 border-0" style={{ width: "20%" }}>
                <img className="mx-auto mb-1" src={cloud} width={60} />
                <div
                  className="card border-blue p-3 text-center"
                  style={{
                    borderRadius: "25px",
                    backgroundColor: "#A0BFE0",
                  }}
                >
                  <span>
                    Emotional
                    <br /> Response
                  </span>
                  <div className="bg-white w-50 mx-auto mt-2">
                    {dataReport?.dataDigitalAdaptability?.emotional_response}
                  </div>
                </div>
              </div>
              <div className="card me-2 border-0" style={{ width: "20%" }}>
                <img className="mx-auto mb-1" src={thinking} width={60} />
                <div
                  className="card border-blue p-3 text-center"
                  style={{
                    borderRadius: "25px",
                    backgroundColor: "#7895CB",
                  }}
                >
                  <span className="text-white">
                    Attitudinal
                    <br /> Readiness
                  </span>
                  <div className="bg-white w-50 mx-auto mt-2">
                    {dataReport?.dataDigitalAdaptability?.attitudinal_readiness}
                  </div>
                </div>
              </div>
              <div className="card border-0" style={{ width: "20%" }}>
                <img className="mx-auto mb-1" src={scheme} width={60} />
                <div
                  className="card border-blue p-3 text-center"
                  style={{
                    borderRadius: "25px",
                    backgroundColor: "#4A55A2",
                  }}
                >
                  <span className="text-white mt-auto">
                    Action
                    <br /> Readiness
                  </span>
                  <div className="bg-white w-50 mx-auto mt-2">
                    {dataReport?.dataDigitalAdaptability?.action_readiness}
                  </div>
                </div>
              </div>
              <div className="rotated-right fst-italic text-secondary">
                Visible Action
              </div>
            </div>
            <div>
              <div className="rotated-left2 fst-italic text-secondary">
                Cluster
              </div>
              <p className="mt-3 mb-0" style={{ marginLeft: "12%" }}>
                The Comfort Zone
              </p>
              <div
                className="line-horizontal arrow-left arrow-right"
                style={{ width: "17%" }}
              ></div>
              <p className="mb-0" style={{ marginLeft: "37%" }}>
                The Observer
              </p>
              <div
                className="line-horizontal arrow-left arrow-right"
                style={{ width: "38%" }}
              ></div>
              <p className="mb-0" style={{ marginLeft: "53%" }}>
                The Potential Agent
              </p>
              <div
                className="line-horizontal arrow-left arrow-right"
                style={{ width: "59%" }}
              ></div>
              <p className="mb-0" style={{ marginLeft: "80%" }}>
                The Pioneer
              </p>
              <div
                className="line-horizontal arrow-left arrow-right"
                style={{ width: "80%" }}
              ></div>
            </div>
            <p className="fw-bold mt-5">
              One GML mengidentifikasi 4 (empat) area utama untuk mengukur
              tingkat adaptasi digital:
            </p>
            <ol>
              <li>
                <b>Personal Innovativeness</b>
                <br />
                adalah kondisi yang cenderung stabil dengan karakter dan pola
                pikir saat ini terkait teknologi namun aktif dalam pencarian
                informasi atau pengalaman baru.
              </li>
              <li>
                <b>Emotional Response</b>
                <br />
                adalah reaksi emosi yang muncul, baik positif atau negatif,
                ketika dipicu dengan paparan teknologi.
              </li>
              <li>
                <b>Attitudinal Readiness</b>
                <br />
                adalah sikap individu yang percaya bahwa teknologi akan sangat
                bermanfaat bagi mereka.
              </li>
              <li>
                <b>Action Readiness</b>
                <br />
                adalah kepercayaan individu bahwa teknologi tidak hanya
                bermanfaat, tapi juga harus dikuasai agar tetap bisa bersaing.
              </li>
            </ol>

            <p className="fw-bold mt-5 fs-5 page-break">Digital Competency:</p>
            <div className="d-flex justify-content-center pb-0">
              <Radar
                data={dataRadar}
                options={dataRadar.options}
                className="w-100 h-100"
              />
            </div>
            <p className="fw-bold mt-5">
              One GML mengidentifikasi 6 (enam) area utama untuk mengukur
              kelihaian kompetensi digital sebagai berikut:
            </p>
            <ol>
              <li>
                <b>Information & Data Literacy</b>
                <br />
                Information & Data Literacy Kemampuan untuk mengidentifikasi,
                mengumpulkan, menyeleksi informasi menjadi sekumpulan data yang
                dapat dinilai relevansi sumber dan isinya. Pada tahap ini juga
                dinilai proses kemampuan seseorang dalam menghasilkan,
                mengelola, menyimpan, mengatur, menganalisis serta melindungi
                data yang bersifat umum maupun pribadi atau sensitif.
              </li>
              <li>
                <b>Communication & Collaboration</b>
                <br />
                Kemampuan untuk berinteraksi, berkomunikasi dan berkolaborasi
                melalui teknologi digital tapi tetap selaras dengan keragaman
                budaya dan generasi. Kemampuan untuk berpartisipasi di media
                sosial dengan menyeimbangkan etika untuk identitas dan reputasi
                pribadi ataupun organisasi.
              </li>
              <li>
                <b>Innovation & Digital Creation</b>
                <br />
                Kemampuan untuk menghasilkan cara, alat, dan/atau hasil kerja
                baru yang lebih berdampak melalui integrasi informasi atau data.
              </li>
              <li>
                <b>Data Security</b>
                <br />
                Kemampuan untuk melindungi gawai, konten dan data pribadi di
                lingkungan digital.
              </li>
              <li>
                <b>Data Analytics</b>
                <br />
                Perkembangan teknologi baru seperti Artificial Intelligence,
                Virtual Reality, Augmented reality, the Internet of Things, dan
                Big Data telah mendorong kebutuhan baru di sisi analisa data.
                Kemampuan untuk membaca data, mengolah data dan mengambil
                keputusan berdasarkan data.
              </li>
              <li>
                <b>Problem Solving</b>
                <br />
                Kemampuan untuk mengidentifikasi kebutuhan dan permasalahan saat
                ini, serta bagaimana memecahkan permasalahan secara konseptual
                di lingkungan digital. Kemampuan untuk menggunakan perangkat
                digital agar mendorong inovasi proses dan produk. Kemampuan
                untuk selalu terupdate dengan evolus teknologi digital.
              </li>
            </ol>
          </div>
        </div>
      </PDFExport>
      {/* </div> */}
    </div>
  );
};

export default ReportPDR;
