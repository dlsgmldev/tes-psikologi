import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
    const [info, setInfo] = useState("")
    const [pieChart, setPieChart] = useState("")
    const [responden, setResponden] = useState("")
    const [selesai, setSelesai] = useState("")
    const [dalamProses, setDalamProses] = useState("")
    const [belumMulai, setBelumMulai] = useState("")
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_URL}holland/box_info`, {
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            console.log(res.data);
            setInfo(res.data);
          });
        axios
          .get(`${process.env.REACT_APP_URL}holland/pie_chart`, {
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            setResponden(res.data.data);
          });
        axios
          .get(`${process.env.REACT_APP_URL}holland/data_total_responden/10/1`, {
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            setResponden(res.data.totaldata);
          });
        axios
          .get(`${process.env.REACT_APP_URL}holland/data_total_selesai/10/1`, {
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            setSelesai(res.data.totaldata);
          });
        axios
          .get(`${process.env.REACT_APP_URL}holland/data_total_dalam_proses/10/1`, {
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            setDalamProses(res.data.totaldata);
          });
        axios
          .get(`${process.env.REACT_APP_URL}holland/data_total_belum_mulai/10/1`, {
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            setBelumMulai(res.data.totaldata);
          });
      }, []);

  return (
    <div class="wrapper">
      <div class="row h-100">
        <div class="col-2 bg-blue text-white p-3">
          <p className="fw-bold text-center">Dashboard Psikotes</p>
          <hr />
          <p className="ms-3">Dashboard</p>
          <hr />
        </div>
        <div class="col ps-0">
          <div className="shadow-sm p-4 text-white">p</div>
          <div className="row p-3">
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs fw-bold text-blue text-uppercase mb-1">
                        Total Responden
                      </div>
                      <div class="h5 mb-0 fw-bold text-secondary">
                        {info.total_responden}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs fw-bold text-blue text-uppercase mb-1">
                        Total Selesai
                      </div>
                      <div class="h5 mb-0 fw-bold text-secondary">
                        {info.total_selesai}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs fw-bold text-blue text-uppercase mb-1">
                        Total Dalam Proses
                      </div>
                      <div class="h5 mb-0 fw-bold text-secondary">
                        {info.total_dalam_proses}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs fw-bold text-blue text-uppercase mb-1">
                        Total Belum Mulai
                      </div>
                      <div class="h5 mb-0 fw-bold text-secondary">
                        {info.total_belum_mulai}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div className="container">
            p
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
