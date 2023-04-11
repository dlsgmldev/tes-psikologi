import React from "react";
import { Radar } from "react-chartjs-2";

const data = ({ data }) => {
  const dataRadar = {
    labels: data?.radar_data?.label,
    datasets: [
      {
        label: "My First Dataset",
        data: data?.radar_data?.data,
        fill: true,
        borderColor: "#ffc107",
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
      <div className="card border rounded shadow">
        <div className="bg-warning rounded">
          <p className="text-center text-uppercase fw-bold mt-2">
            data Holland test (RIASEC)
          </p>
        </div>
        <div className="p-2 px-3">
          <p className="fw-bold">Name: {data?.fullname}</p>
          <p className="fw-bold">Skor Jawaban:</p>
          <div className="d-flex justify-content-center">
            <table class="table table-bordered w-75 text-center">
              <thead>
                <tr className="bg-warning">
                  <th scope="col">R</th>
                  <th scope="col">I</th>
                  <th scope="col">A</th>
                  <th scope="col">S</th>
                  <th scope="col">E</th>
                  <th scope="col">C</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{data?.skorjawaban.R}</th>
                  <th>{data?.skorjawaban.I}</th>
                  <th>{data?.skorjawaban.A}</th>
                  <th>{data?.skorjawaban.S}</th>
                  <th>{data?.skorjawaban.E}</th>
                  <th>{data?.skorjawaban.C}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center p-2 my-2">
            <Radar data={dataRadar} className="w-50 h-50" />
          </div>
          <p className="fw-bold">Interpretasi Umum:</p>
          <p className="text-center">Kombinasi Tipe Minat Tertinggi</p>
          <div className="d-flex justify-content-center">
            <table className="table table-bordered w-15">
              <thead>
                <tr>
                  <th colspan="2" className="text-center bg-warning">
                    {data?.firstkey}
                    <br />
                    {data?.firstkeystring}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <th scope="row" className="bg-pink">
                    {data?.secondkey}
                  </th>
                  <th scope="row" className="bg-yellow">
                    {data?.thirdkey}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center">Konsistensi:</p>
          <p className="text-center fst-italic">{data?.tingkat_konsistensi}</p>
          <div className="card mx-3 p-3 bg-light border-0">
            <p>{data?.deskripsi}</p>
          </div>
          <p className="fw-bold mt-3">Profesi Terkait:</p>
          <div className="card mx-3 p-1 bg-light border-0">
            <p className="text-center">{data?.pekerjaan}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default data;
