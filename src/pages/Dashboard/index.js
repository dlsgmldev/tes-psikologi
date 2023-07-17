import axios from "axios";
import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import ReportHolland from "../../components/Report/reportHolland";
import ReportPDR from "../../components/Report/reportPDR";

const Dashboard = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState("");
  const [totalDataResponden, setTotalDataResponden] = useState(0);
  const [totalDataSelesai, setTotalDataSelesai] = useState(0);
  const [totalDataDalamProses, setTotalDataDalamProses] = useState(0);
  const [totalDataBelumMulai, setTotalDataBelumMulai] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pieChart, setPieChart] = useState([""]);
  const [responden, setResponden] = useState([""]);
  const [selesai, setSelesai] = useState([""]);
  const [dalamProses, setDalamProses] = useState([""]);
  const [belumMulai, setBelumMulai] = useState([""]);
  const [companyList, setCompanyList] = useState([""]);
  const [testList, setTestList] = useState([""]);
  const [selectedCompany, setSelectedCompany] = useState([""]);
  const [selectedOption, setSelectedOption] = useState([""]);
  const [type, setType] = useState("");
  const [report, setReport] = useState("");
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");
  const idCompany = localStorage.getItem("id_company");
  const role = localStorage.getItem("role");

  const dataType =
    type === "selesai"
      ? selesai
      : type === "mulai"
      ? belumMulai
      : type === "proses"
      ? dalamProses
      : responden;

  const handleChange = (selectedOption) => {
    const value = selectedOption.map((item) => item.value);
    setSelectedCompany(value.toString());
    setSelectedOption(selectedOption);
  };

  const getData = (pageSize, pageIndex, searchIndex, filterIndex) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/data_total_responden/${
          idCompany === "null" ? 0 : idCompany
        }/${pageSize ?? 10}/${pageIndex ?? 1}`,
        {
          headers: { Authorization: "Bearer " + token },
          params: { search: searchIndex, filter_company: filterIndex },
        }
      )
      .then((res) => {
        setResponden(res.data.data);
        setTotalDataResponden(res.data.totaldata);
      });
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/data_total_selesai/${
          idCompany === "null" ? 0 : idCompany
        }/${pageSize ?? 10}/${pageIndex ?? 1}`,
        {
          headers: { Authorization: "Bearer " + token },
          params: { search: searchIndex, filter_company: filterIndex },
        }
      )
      .then((res) => {
        setSelesai(res.data.data);
        setTotalDataSelesai(res.data.totaldata);
      });
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/data_total_dalam_proses/${
          idCompany === "null" ? 0 : idCompany
        }/${pageSize ?? 10}/${pageIndex ?? 1}`,
        {
          headers: { Authorization: "Bearer " + token },
          params: { search: searchIndex, filter_company: filterIndex },
        }
      )
      .then((res) => {
        setDalamProses(res.data.data);
        setTotalDataDalamProses(res.data.totaldata);
      });
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/data_total_belum_mulai/${
          idCompany === "null" ? 0 : idCompany
        }/${pageSize ?? 10}/${pageIndex ?? 1}`,
        {
          headers: { Authorization: "Bearer " + token },
          params: { search: searchIndex, filter_company: filterIndex },
        }
      )
      .then((res) => {
        setBelumMulai(res.data.data);
        setTotalDataBelumMulai(res.data.totaldata);
      });
  };

  const getCompany = (pageSize, pageIndex, searchIndex) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/company/list/${pageSize ?? 5}/${
          pageIndex ?? 1
        }`,
        {
          headers: { Authorization: "Bearer " + token },
          params: { search: searchIndex },
        }
      )
      .then((res) => {
        const company = res.data.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setCompanyList(company);
      });
  };

  const getTest = () => {
    axios
      .get(`${process.env.REACT_APP_URL}ac/get_test_option`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        const option = res.data.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setTestList(option);
      });
  };

  const getDataReport = (id) => [
    axios
      .get(`${process.env.REACT_APP_URL}ac/holland_summary/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setReport(res.data);
      }),
  ];

  useEffect(() => {
    getCompany();
    getTest();
    getData();
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/box_info/${
          idCompany === "null" ? 0 : idCompany
        }`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setInfo(res.data);
      });
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/pie_chart/${
          idCompany === "null" ? 0 : idCompany
        }`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setPieChart(res.data);
      });
  }, [token]);

  const dataPie = {
    labels: pieChart.label,
    datasets: [
      {
        // label: 'Rainfall',
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data: pieChart.data,
      },
    ],
  };
  console.log(dataType);

  return (
    <>
      <div className="col-xl-12 col-md-6 mb-1 p-3">
        <div className="card border-left-success shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs fw-bold text-success text-uppercase mb-1">
                  Persentase Penyelesaian
                </div>
                <div className="d-flex justify-content-start">
                  <div className="h5 mb-0 fw-bold text-secondary">
                    {info.persentase_penyelesaian}%
                  </div>
                  <div class="progress w-100 mt-1 ms-2">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${info.persentase_penyelesaian}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <i class="fas fa-tasks fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row p-3">
        <div className="col-xl-3 col-md-6 mb-4">
          <div
            className="card border-left-primary shadow h-100 py-2 pointer"
            onClick={() => setType("responden")}
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs fw-bold text-blue text-uppercase mb-1">
                    Total Responden
                  </div>
                  <div className="h5 mb-0 fw-bold text-secondary">
                    {info.total_responden}
                  </div>
                </div>
                <div className="col-auto">
                  <i class="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div
            className="card border-left-warning shadow h-100 py-2 pointer"
            onClick={() => setType("selesai")}
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs fw-bold text-warning text-uppercase mb-1">
                    Total Selesai
                  </div>
                  <div className="h5 mb-0 fw-bold text-secondary">
                    {info.total_selesai}
                  </div>
                </div>
                <div className="col-auto">
                  <i class="fas fa-check fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div
            className="card border-left-info shadow h-100 py-2 pointer"
            onClick={() => setType("proses")}
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs fw-bold text-info text-uppercase mb-1">
                    Total Dalam Proses
                  </div>
                  <div className="h5 mb-0 fw-bold text-secondary">
                    {info.total_dalam_proses}
                  </div>
                </div>
                <div className="col-auto">
                  <i class="fas fa-edit fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div
            className="card border-left-danger shadow h-100 py-2 pointer"
            onClick={() => setType("mulai")}
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs fw-bold text-danger text-uppercase mb-1">
                    Total Belum Mulai
                  </div>
                  <div className="h5 mb-0 fw-bold text-secondary">
                    {info.total_belum_mulai}
                  </div>
                </div>
                <div className="col-auto">
                  <i class="fas fa-times fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card border-0 py-2 mx-3 shadow-lg p-2">
        <div className="card-body d-flex justify-content-center">
          <Pie data={dataPie} className="w-25 h-25" />
        </div>
      </div>
      <div className="card border-0 py-2 mx-3 shadow-lg my-5">
        <div className="card-body">
          <p className="text-blue fw-bold">
            Data{" "}
            {type === "mulai"
              ? "Belum Mulai"
              : type === "selesai"
              ? "Selesai"
              : type === "proses"
              ? "Dalam Proses"
              : "Responden"}
          </p>
          <div className="d-flex justify-content-between">
            <div className="input-group w-70">
              <input
                className="form-control"
                placeholder="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                  getData(10, 1, e.target.value, selectedCompany);
                }}
              />
              <span className="input-group-text">
                <i class="fas fa-search text-secondary"></i>
              </span>
            </div>
            {role === "1" ? (
              <button
                className="btn bg-blue text-white p-1 w-10"
                onClick={() => setShow(true)}
              >
                Filter
              </button>
            ) : (
              ""
            )}
          </div>
          <table class="table table-bordered mt-2 rounded rounded-3 overflow-hidden">
            <thead>
              <tr className="bg-blue text-white">
                <th scope="col">Unit</th>
                <th scope="col">Jabatan</th>
                <th scope="col">Nip</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Test</th>
                <th scope="col">Status</th>
                <th scope="col">Company</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            {dataType.map((item) => (
              <tbody>
                <tr>
                  <th className="fw-normal">{item.unit}</th>
                  <th className="fw-normal">{item.jabatan}</th>
                  <th className="fw-normal">{item.nip}</th>
                  <th className="fw-normal">{item.fullname}</th>
                  <th className="fw-normal">{item.email}</th>
                  <th className="fw-normal">{item.name_test}</th>
                  <th className="fw-normal">
                    {item.status === "2"
                      ? "Selesai"
                      : item.status === "0"
                      ? "Belum mulai"
                      : "Dalam proses"}
                  </th>
                  <th className="fw-normal">{item.name_company}</th>
                  <th className="fw-bold text-center">
                    {item.status === "2" ? (
                      <i
                        class="fas fa-arrow-right bg-secondary text-white rounded-circle p-1 pointer"
                        onClick={() => {
                          getDataReport(item.id);
                        }}
                      ></i>
                    ) : (
                      "-"
                    )}
                  </th>
                </tr>
              </tbody>
            ))}
          </table>
          <PaginationControl
            page={current}
            total={
              type === "selesai"
                ? totalDataSelesai
                : type === "mulai"
                ? totalDataBelumMulai
                : type === "proses"
                ? totalDataDalamProses
                : totalDataResponden
            }
            limit={10}
            changePage={(page, size) => {
              getData(size, page);
              setCurrent(page);
            }}
          />
        </div>
      </div>
      {report ? <ReportPDR data={report} /> : ""}

      {/* for modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <p className="fs-4 fw-bold">Filter by company</p>
          <Select
            defaultValue={selectedOption}
            isMulti
            name="company"
            options={companyList}
            className="basic-multi-select mb-3"
            classNamePrefix="select"
            onChange={handleChange}
          />
          <p className="fs-4 fw-bold">Filter by Test</p>
          <Select
            // defaultValue={selectedOption}
            isMulti
            name="company"
            options={testList}
            className="basic-multi-select mb-3"
            classNamePrefix="select"
            // onChange={handleChange}
          />
          <div className="d-flex justify-content-center">
            <div
              className="btn bg-blue mx-2 text-white px-4"
              onClick={() => {
                getData(10, 1, search, selectedCompany);
                setShow(false);
              }}
            >
              OK
            </div>
            <div
              className="btn bg-blue mx-2 text-white px-4"
              onClick={() => setShow(false)}
            >
              Cancel
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Dashboard;
