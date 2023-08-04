import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useNavigate, useParams } from "react-router-dom";
import FileUploader from "../../components/FileUploader";
import { Spinner } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import PICManagement from "./PIC";
import ScheduleManagement from "./Schedule";

const UserManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([""]);
  const [totalData, setTotalData] = useState(0);
  const [current, setCurrent] = useState(1);
  const [show, setShow] = useState(false);
  const [idUser, setIdUser] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const { id } = useParams();

  const getData = (pageSize, pageIndex, searchIndex) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/usermanagement/list/${id}/${
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
    getData();
  }, []);

  const handleDelete = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}ac/usermanagement/delete/${idUser}`,
        { id_value: idUser },
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

  const handleUploadExcel = (file) => {
    const PPData = new FormData();
    PPData.append("excelFile", file);
    PPData.append("id_company", id);
    axios
      .post(
        `${process.env.REACT_APP_URL}ac/usermanagement/upload_file_excel`,
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
          />

          <ScheduleManagement />
          {role === "1" ? <PICManagement /> : ""}

          <div className="card border-0 py-2 mx-3 shadow-lg mb-4">
            <div className="card-body">
              <p className="text-blue fw-bold fs-4">User Management</p>
              <div className="d-flex justify-content-between">
                <div className="input-group w-70">
                  <input
                    className="form-control"
                    placeholder="Search"
                    onChange={(e) => getData(10, 1, e.target.value)}
                  />
                  <span className="input-group-text">
                    <i class="fas fa-search text-secondary"></i>
                  </span>
                </div>
                <div className="d-flex">
                  <div
                    className="btn bg-blue text-white me-2"
                    onClick={() => navigate(`/add-user/${id}`)}
                  >
                    <i class="fas fa-plus me-2"></i>
                    Add User
                  </div>
                  {role === "1" ? (
                    <FileUploader handleFile={handleUploadExcel} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {dataUser.length !== 0 ? (
                <table class="table table-bordered mt-3 rounded rounded-3 overflow-hidden">
                  <thead>
                    <tr className="bg-blue text-white text-center">
                      <th className="fw-normal" width="5%">No.</th>
                      <th className="fw-normal">Name</th>
                      {/* <th className="fw-normal">Username</th> */}
                      <th className="fw-normal">Email</th>
                      {/* <th className="fw-normal">Telp</th>
                      <th className="fw-normal">Jabatan</th>
                      <th className="fw-normal">Unit</th>
                      <th className="fw-normal">Divisi</th> */}
                      <th className="fw-normal" width="13%">Action</th>
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
                          <i
                            class="far fa-edit ms-4 pointer text-secondary"
                            onClick={() =>
                              navigate(`/update-user/${item.id}/${id}`)
                            }
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
                  getData(size, page);
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

export default UserManagement;
