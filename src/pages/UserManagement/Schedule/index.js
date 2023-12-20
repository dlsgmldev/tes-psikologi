import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useNavigate, useParams } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const ScheduleManagement = () => {
  const navigate = useNavigate();
  const [dataSchedule, setDataSchedule] = useState([""]);
  const [totalDataSchedule, setTotalDataSchedule] = useState(0);
  const [currentSchedule, setCurrentSchedule] = useState(1);
  const [idSchedule, setIdSchedule] = useState("");
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const getDataSchedule = (pageSize, pageIndex, searchIndex) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/admin/schedule/list/${id}/${pageSize ?? 10}/${
          pageIndex ?? 1
        }`,
        {
          headers: { Authorization: "Bearer " + token },
          params: { search: searchIndex },
        }
      )
      .then((res) => {
        setDataSchedule(res.data.data);
        setTotalDataSchedule(res.data.totaldata);
        // setLoading(false);
      });
  };

  useEffect(() => {
    getDataSchedule();
  }, []);

  const handleAdd = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}ac/admin/schedule/add`,
        {
          id_company: parseInt(id),
          name: name,
          start_time: startTime,
          end_time: endTime,
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

  const handleDelete = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}ac/admin/schedule/delete/${idSchedule}`,
        { id_schedule: idSchedule },
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
    <div className="card border-0 py-2 mx-3 shadow-lg mb-4">
      <div className="card-body">
        <p className="text-blue fw-bold fs-4">Schedule Management</p>
        <div className="d-flex justify-content-between">
          <div className="input-group w-70">
            <input
              className="form-control"
              placeholder="Search"
              onChange={(e) => getDataSchedule(10, 1, e.target.value)}
            />
            <span className="input-group-text">
              <i class="fas fa-search text-secondary"></i>
            </span>
          </div>
          <div className="d-flex">
            <div
              className="btn bg-blue text-white me-2"
              onClick={() => setShowAdd(true)}
            >
              <i class="fas fa-plus me-2"></i>
              Add Schedule
            </div>
          </div>
        </div>
        {dataSchedule.length !== 0 ? (
          <table class="table table-bordered mt-3 rounded rounded-3 overflow-hidden">
            <thead>
              <tr className="bg-blue text-white text-center">
                <th className="fw-normal" width="5%">No.</th>
                <th className="fw-normal">Name</th>
                <th className="fw-normal">Start Access</th>
                <th className="fw-normal">End Access</th>
                <th className="fw-normal" width="17%">Action</th>
              </tr>
            </thead>
            {dataSchedule.map((item) => (
              <tbody>
                <tr>
                  <td className="text-center">{item.number}</td>
                  <td>{item.name}</td>
                  <td>{item.start_time}</td>
                  <td>{item.end_time}</td>
                  <td>
                    <i
                      class="far fa-trash-alt ms-4 pointer text-secondary"
                      onClick={() => {
                        setShow(true);
                        setIdSchedule(item.id);
                      }}
                    ></i>
                    <i
                      class="fa-solid fa-circle-info ms-4 pointer text-secondary"
                      onClick={() =>
                        navigate(`/schedule-detail/${item.id}/${id}`)
                      }
                    ></i>
                    <i
                      class="fa-solid fa-download ms-4 pointer text-secondary"
                      onClick={() => {
                        window.location.href = `https://apidls.onegml.com/ac/admin/schedule/download_report_schedule?id_schedule=${item.id}&authorization=${token}`;
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
          page={currentSchedule}
          total={totalDataSchedule}
          limit={10}
          changePage={(page, size) => {
            getDataSchedule(size, page);
            setCurrentSchedule(page);
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

      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Body>
          <p className="fs-4 fw-bold">Add Schedule</p>
          <div className="my-3">
            <label>Start Access:</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
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
              className="w-100 mt-1 rounded-3 p-2 border form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <div
              className="btn bg-blue mx-2 text-white px-4"
              onClick={handleAdd}
            >
              OK
            </div>
            <div
              className="btn bg-blue mx-2 text-white px-4"
              onClick={() => setShowAdd(false)}
            >
              Cancel
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ScheduleManagement;
