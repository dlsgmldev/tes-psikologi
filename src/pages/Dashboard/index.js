import axios from "axios";
import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Modal, Spinner } from "react-bootstrap";
import Select from "react-select";
import { ExportToExcel } from "../../components/ExportExcel";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState("");
  const [totalDataResponden, setTotalDataResponden] = useState(0);
  const [totalDataSelesai, setTotalDataSelesai] = useState(0);
  const [totalDataDalamProses, setTotalDataDalamProses] = useState(0);
  const [totalDataBelumMulai, setTotalDataBelumMulai] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pieChart, setPieChart] = useState([""]);
  const [responden, setResponden] = useState([""]);
  const [respondenExport, setRespondenExport] = useState([""]);
  const [selesai, setSelesai] = useState([""]);
  const [selesaiExport, setSelesaiExport] = useState([""]);
  const [dalamProses, setDalamProses] = useState([""]);
  const [dalamProsesExport, setDalamProsesExport] = useState([""]);
  const [belumMulai, setBelumMulai] = useState([""]);
  const [belumMulaiExport, setBelumMulaiExport] = useState([""]);
  const [companyList, setCompanyList] = useState([""]);
  const [testList, setTestList] = useState([""]);
  const [selectedCompany, setSelectedCompany] = useState([""]);
  const [selectedTest, setSelectedTest] = useState([""]);
  const [selectedOptionCompany, setSelectedOptionCompany] = useState([""]);
  const [selectedOptionTest, setSelectedOptionTest] = useState([""]);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");
  const idCompany = JSON.parse(localStorage.getItem("id_company"));
  const role = localStorage.getItem("role");

  const dataType =
    type === "selesai"
      ? selesai
      : type === "mulai"
      ? belumMulai
      : type === "proses"
      ? dalamProses
      : responden;

  const handleFilterCompany = (selectedOption) => {
    const value = selectedOption.map((item) => item.value);
    setSelectedCompany(value.toString());
    setSelectedOptionCompany(selectedOption);
  };

  const handleFilterTest = (selectedOption) => {
    const value = selectedOption.map((item) => item.value);
    setSelectedTest(value.toString());
    setSelectedOptionTest(selectedOption);
  };

  const getData = (
    pageSize,
    pageIndex,
    filterCompany,
    filterTest,
    searchIndex
  ) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/admin/data_total_responden/${
          pageSize ?? 10
        }/${pageIndex ?? 1}`,
        {
          headers: { Authorization: "Bearer " + token },
          params: {
            search: searchIndex,
            filter_company: idCompany ?? filterCompany,
            filter_test: filterTest,
          },
        }
      )
      .then((res) => {
        const fileExport = res.data.data.map((item) => ({
          no: 1,
          name: item.fullname,
          email: item.email,
          test: item.name_test,
          status:
            item.status === "2"
              ? "Selesai"
              : item.status === "0"
              ? "Belum mulai"
              : "Dalam proses",
          company: item.name_company,
        }));
        setRespondenExport(fileExport);
        setResponden(res.data.data);
        setTotalDataResponden(res.data.totaldata);
        setLoading(false);
      });
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/admin/data_total_selesai/${
          pageSize ?? 10
        }/${pageIndex ?? 1}`,
        {
          headers: { Authorization: "Bearer " + token },
          params: {
            search: searchIndex,
            filter_company: idCompany ?? filterCompany,
            filter_test: filterTest,
          },
        }
      )
      .then((res) => {
        const fileExport = res.data.data.map((item) => ({
          no: 1,
          name: item.fullname,
          email: item.email,
          test: item.name_test,
          status:
            item.status === "2"
              ? "Selesai"
              : item.status === "0"
              ? "Belum mulai"
              : "Dalam proses",
          company: item.name_company,
        }));
        setSelesaiExport(fileExport);
        setSelesai(res.data.data);
        setTotalDataSelesai(res.data.totaldata);
        setLoading(false);
      });
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/admin/data_total_dalam_proses/${
          pageSize ?? 10
        }/${pageIndex ?? 1}`,
        {
          headers: { Authorization: "Bearer " + token },
          params: {
            search: searchIndex,
            filter_company: idCompany ?? filterCompany,
            filter_test: filterTest,
          },
        }
      )
      .then((res) => {
        const fileExport = res.data.data.map((item) => ({
          no: 1,
          name: item.fullname,
          email: item.email,
          test: item.name_test,
          status:
            item.status === "2"
              ? "Selesai"
              : item.status === "0"
              ? "Belum mulai"
              : "Dalam proses",
          company: item.name_company,
        }));
        setDalamProsesExport(fileExport);
        setDalamProses(res.data.data);
        setTotalDataDalamProses(res.data.totaldata);
        setLoading(false);
      });
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/admin/data_total_belum_mulai/${
          pageSize ?? 10
        }/${pageIndex ?? 1}`,
        {
          headers: { Authorization: "Bearer " + token },
          params: {
            search: searchIndex,
            filter_company: idCompany ?? filterCompany,
            filter_test: filterTest,
          },
        }
      )
      .then((res) => {
        const fileExport = res.data.data.map((item) => ({
          no: 1,
          name: item.fullname,
          email: item.email,
          test: item.name_test,
          status:
            item.status === "2"
              ? "Selesai"
              : item.status === "0"
              ? "Belum mulai"
              : "Dalam proses",
          company: item.name_company,
        }));
        setBelumMulaiExport(fileExport);
        setBelumMulai(res.data.data);
        setTotalDataBelumMulai(res.data.totaldata);
        setLoading(false);
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
      .get(`${process.env.REACT_APP_URL}ac/get_test_option/${idCompany ?? 0}`, {
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

  useEffect(() => {
    getCompany();
    getTest();
    getData();
    axios
      .get(`${process.env.REACT_APP_URL}ac/box_info/${idCompany ?? 0}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setInfo(res.data);
      });
    axios
      .get(`${process.env.REACT_APP_URL}ac/pie_chart/${idCompany ?? 0}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setPieChart(res.data);
      });
  }, [token]);

  const dataPie = {
    labels: pieChart.label,
    datasets: [
      {
        backgroundColor: ["#B2E672", "#FFFD88", "#FF8C8C"],
        hoverBackgroundColor: ["#B6E2A1", "#FFFBC1", "#F7A4A4"],
        data: pieChart.data,
      },
    ],
  };

  return (
    <>
      {loading === true ? (
        <div className="text-center p-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <div>
          <div className="col-xl-12 col-md-6 p-3">
            <div className="card border-left-presentase shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col">
                    <div className="text-xs fw-bold text-uppercase mb-1">
                      Persentase Penyelesaian
                    </div>
                    <div className="d-flex justify-content-start">
                      <div className="h5 mb-0 fw-bold text-secondary">
                        {info.persentase_penyelesaian}%
                      </div>
                      <div class="progress w-100 mt-1 ms-2">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${info.persentase_penyelesaian}%`,
                            backgroundColor: "#0E8388",
                          }}
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
          <div className="row px-3">
            <div className="col-xl-3 col-md-6 mb-4">
              <div
                className="card border-left-responden shadow h-100 py-2 pointer"
                onClick={() => (setType("responden"), setCurrent(1), getData())}
              >
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col">
                      <div className="text-xs fw-bold text-uppercase mb-1">
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
                className="card border-left-selesai shadow h-100 py-2 pointer"
                onClick={() => (setType("selesai"), setCurrent(1), getData())}
              >
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col">
                      <div className="text-xs fw-bold text-uppercase mb-1">
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
                className="card border-left-proses shadow h-100 py-2 pointer"
                onClick={() => (setType("proses"), setCurrent(1), getData())}
              >
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col">
                      <div className="text-xs fw-bold text-uppercase mb-1">
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
                className="card border-left-mulai shadow h-100 py-2 pointer"
                onClick={() => (setType("mulai"), setCurrent(1), getData())}
              >
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col">
                      <div className="text-xs fw-bold text-uppercase mb-1">
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
          <div className="card border-0 py-2 mx-3 shadow-lg my-3">
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
                    className="form-control border"
                    placeholder="Search"
                    onChange={(e) => {
                      setSearch(e.target.value);
                      getData(
                        10,
                        1,
                        selectedCompany,
                        selectedTest,
                        e.target.value
                      );
                    }}
                  />
                  <span className="input-group-text">
                    <i class="fas fa-search text-secondary"></i>
                  </span>
                </div>
                <div className="d-flex">
                  {role === "1" ? (
                    <ExportToExcel
                      apiData={
                        type === "selesai"
                          ? selesaiExport
                          : type === "mulai"
                          ? belumMulaiExport
                          : type === "proses"
                          ? dalamProsesExport
                          : respondenExport
                      }
                      fileName={
                        type === "selesai"
                          ? "data-selesai"
                          : type === "mulai"
                          ? "data-belum-mulai"
                          : type === "proses"
                          ? "data-dalam-proses"
                          : "data-responden"
                      }
                    />
                  ) : (
                    ""
                  )}

                  <div
                    className="btn bg-blue text-white px-3 ms-2"
                    onClick={() => setShow(true)}
                  >
                    Filter
                  </div>
                </div>
              </div>
              <table class="table table-bordered mt-2 rounded rounded-3 overflow-hidden">
                <thead>
                  <tr className="bg-blue text-white text-center">
                    {/* <th scope="col">No.</th> */}
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Test</th>
                    <th scope="col">Status</th>
                    <th scope="col">Company</th>
                    {role === "1" ? (
                      <th scope="col" width="8%">
                        Action
                      </th>
                    ) : (
                      ""
                    )}
                  </tr>
                </thead>
                {dataType.map((item) => (
                  <tbody>
                    <tr>
                      {/* <th className="fw-normal text-center">1</th> */}
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
                      {role === "1" ? (
                        <th className="fw-bold text-center">
                          {item.status === "2" ? (
                            <i
                              class="fas fa-arrow-right bg-secondary text-white rounded-circle p-1 pointer"
                              onClick={() => {
                                window.open(
                                  `${item.slug_report}/${item.id}`,
                                  "_blank"
                                );
                              }}
                            ></i>
                          ) : (
                            "-"
                          )}
                        </th>
                      ) : (
                        ""
                      )}
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
                  getData(size, page, selectedCompany, selectedTest, search);
                  setCurrent(page);
                }}
              />
            </div>
          </div>

          {/* for modal */}
          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Body>
              {role === "1" ? (
                <>
                  <p className="fs-4 fw-bold">Filter by company</p>
                  <Select
                    defaultValue={selectedOptionCompany}
                    isMulti
                    name="company"
                    options={companyList}
                    className="basic-multi-select mb-3"
                    classNamePrefix="select"
                    onChange={handleFilterCompany}
                  />
                </>
              ) : (
                ""
              )}
              <p className="fs-4 fw-bold">Filter by Test</p>
              <Select
                defaultValue={selectedOptionTest}
                isMulti
                name="company"
                options={testList}
                className="basic-multi-select mb-3"
                classNamePrefix="select"
                onChange={handleFilterTest}
              />
              <div className="d-flex justify-content-center">
                <div
                  className="btn bg-blue mx-2 text-white px-4"
                  onClick={() => {
                    getData(10, 1, selectedCompany, selectedTest, search);
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
        </div>
      )}
    </>
  );
};

export default Dashboard;
