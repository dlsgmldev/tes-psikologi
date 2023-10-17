import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Navigation from "../../../components/Navigation";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { PaginationControl } from "react-bootstrap-pagination-control";
import FileUploader from "../../../components/FileUploader";
import dayjs from "dayjs";

const ScheduleDetail = () => {
  const [dataScheduleDetail, setDataScheduleDetail] = useState("");
  const [dataUser, setDataUser] = useState([""]);
  const [totalData, setTotalData] = useState(0);
  const [current, setCurrent] = useState(1);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [idUser, setIdUser] = useState("");
  const token = localStorage.getItem("token");
  const { id, id2 } = useParams();

  const getDataScheduleDetail = () => {
    axios
      .get(`${process.env.REACT_APP_URL}ac/admin/schedule/detail/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setDataScheduleDetail(res.data.data);
        setLoading(false);
      });
  };

  const getDataUser = (pageSize, pageIndex, searchIndex) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/admin/schedule/list_user/${id}/${
          pageSize ?? 10
        }/${pageIndex ?? 1}`,
        {
          headers: { Authorization: "Bearer " + token },
          params: { search: searchIndex },
        }
      )
      .then((res) => {
        setDataUser(res.data.data);
        setTotalData(res.data.totaldata);
        setLoading(false);
      });
  };

  useEffect(() => {
    getDataScheduleDetail();
    getDataUser();
  }, []);

  const handleUpdate = () => {
    axios
      .put(
        `${process.env.REACT_APP_URL}ac/admin/schedule/update/${id}`,
        {
          id_company: 0,
          name: name ? name : dataScheduleDetail?.name,
          start_time: startTime ? startTime : Math.floor(new Date(dataScheduleDetail?.start_time).getTime() / 1000),
          end_time: endTime ? endTime : Math.floor(new Date(dataScheduleDetail?.end_time).getTime() / 1000),
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {});
  };

  const handleUploadExcel = (file) => {
    const PPData = new FormData();
    PPData.append("excelFile", file);
    PPData.append("id_schedule", id);
    PPData.append("id_company", id2);
    axios
      .post(
        `${process.env.REACT_APP_URL}ac/admin/schedule/upload_file_excel`,
        PPData,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        window.location.reload(false);
        alert("success");
      })
      .catch((err) => {
        alert("failed");
      });
  };

  const handleDelete = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}ac/admin/schedule/delete_user/${id}/${idUser}`,
        { id_schedule: id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      {loading === true ? (
        <div className="text-center p-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <div>
          <Navigation
            link="client-management"
            name="Company Management"
            name2="User Management"
            link2={`user-management/${id2}`}
            name3="Schedule Detail"
          />
          <div className="card border-0 py-2 mx-3 shadow-lg mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <p className="text-blue fw-bold fs-4 mb-0">
                  {dataScheduleDetail?.name}
                </p>
                <div
                  className="btn bg-blue text-white me-2"
                  onClick={() => setShowUpdate(true)}
                >
                  <i class="fas fa-plus me-2"></i>
                  Edit Schedule
                </div>
              </div>
              <p className="mt-3 fw-bold">Name: {dataScheduleDetail?.name}</p>
              {/* <div className="d-flex"> */}
              <p className="fw-bold">
                Start Time: {dataScheduleDetail?.start_time}
              </p>
              <p className="fw-bold">
                End Time: {dataScheduleDetail?.end_time}
              </p>
              {/* </div> */}
            </div>

            {/* for modal */}
            <Modal show={showUpdate} onHide={() => setShowUpdate(false)}>
              <Modal.Body>
                <p className="fs-4 fw-bold">Update Schedule</p>
                <div className="my-3">
                  <label>Start Access:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        value={dayjs(dataScheduleDetail?.start_time)}
                        ampm={false}
                        onChange={(dateString) =>
                          setStartTime(
                            Math.floor(new Date(dateString).getTime() / 1000)
                          )
                        }
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="my-3">
                  <label>End Access:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        value={dayjs(dataScheduleDetail?.end_time)}
                        ampm={false}
                        onChange={(dateString) =>
                          setEndTime(
                            Math.floor(new Date(dateString).getTime() / 1000)
                          )
                        }
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="my-3">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={dataScheduleDetail?.name}
                    className="w-100 mt-1 rounded-3 p-2 border form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <div
                    className="btn bg-blue mx-2 text-white px-4"
                    onClick={handleUpdate}
                  >
                    OK
                  </div>
                  <div
                    className="btn bg-blue mx-2 text-white px-4"
                    onClick={() => setShowUpdate(false)}
                  >
                    Cancel
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>

          <div className="card border-0 py-2 mx-3 shadow-lg mb-4">
            <div className="card-body">
              <p className="text-blue fw-bold fs-4">
                Users on {dataScheduleDetail?.name}
              </p>
              <div className="d-flex justify-content-between">
                <div className="input-group w-70">
                  <input
                    className="form-control"
                    placeholder="Search"
                    onChange={(e) => getDataUser(10, 1, e.target.value)}
                  />
                  <span className="input-group-text">
                    <i class="fas fa-search text-secondary"></i>
                  </span>
                </div>
                <div className="d-flex">
                  <FileUploader handleFile={handleUploadExcel} />
                </div>
              </div>
              {dataUser.length !== 0 ? (
                <table class="table table-bordered mt-3 rounded rounded-3 overflow-hidden">
                  <thead>
                    <tr className="bg-blue text-white text-center">
                      <th className="fw-normal" width="5%">
                        No.
                      </th>
                      <th className="fw-normal">Name</th>
                      {/* <th className="fw-normal">Username</th> */}
                      <th className="fw-normal">Email</th>
                      {/* <th className="fw-normal">Telp</th>
                      <th className="fw-normal">Jabatan</th>
                      <th className="fw-normal">Unit</th>
                      <th className="fw-normal">Divisi</th> */}
                      <th className="fw-normal" width="8%">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {dataUser.map((item) => (
                    <tbody>
                      <tr>
                        <td className="text-center">{item.number}</td>
                        <td>{item.fullname}</td>
                        {/* <td>{item.username}</td> */}
                        <td>{item.email}</td>
                        {/* <td>{item.telp}</td>
                        <td>{item.jabatan}</td>
                        <td>{item.unit}</td>
                        <td>{item.divisi}</td> */}
                        <td>
                          <i
                            class="far fa-trash-alt ms-4 pointer text-secondary"
                            onClick={() => {
                              setShow(true);
                              setIdUser(item.id);
                            }}
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              ) : (
                <p className="text-center mt-4 mb-2 text-secondary">No Data</p>
              )}
              <PaginationControl
                page={current}
                total={totalData}
                limit={10}
                changePage={(page, size) => {
                  getDataUser(size, page);
                  setCurrent(page);
                }}
              />
            </div>

            {/* for modal */}
            <Modal show={show} onHide={() => setShow(false)}>
              <Modal.Body>
                <p className="fs-4 fw-bold">Confirmation</p>
                <p>Are you sure you want to delete this?</p>
                <div className="d-flex justify-content-center">
                  <div
                    className="btn bg-blue mx-2 text-white px-4"
                    onClick={handleDelete}
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
        </div>
      )}
    </>
  );
};

export default ScheduleDetail;
