import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useNavigate, useParams } from "react-router-dom";
import FileUploader from "../../components/FileUploader";

const UserManagement = () => {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([""]);
  const [dataPIC, setDataPIC] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalData, setTotalData] = useState(0);
  const [totalDataPIC, setTotalDataPIC] = useState(0);
  const [current, setCurrent] = useState(1);
  const [currentPIC, setCurrentPIC] = useState(1);
  const [show, setShow] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [fileExcel, setFileExcel] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const { id } = useParams();

  const getData = (pageSize, pageIndex, searchIndex) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}holland/usermanagement/list/${id}/${
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
        setIsLoading(false);
      });
  };

  const getDataPIC = (pageSize, pageIndex, searchIndex) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}holland/usermanagement/list_pic/${id}/${
          pageSize ?? 10
        }/${pageIndex ?? 1}`,
        {
          headers: { Authorization: "Bearer " + token },
          params: { search: searchIndex },
        }
      )
      .then((res) => {
        setDataPIC(res.data.data);
        setTotalDataPIC(res.data.totaldata);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
    getDataPIC();
  }, []);

  const handleDelete = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}holland/usermanagement/delete/${idUser}`,
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
        `${process.env.REACT_APP_URL}holland/usermanagement/upload_file_excel`,
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
      {role === "1" ? (
        <div className="card border-0 py-2 mx-3 shadow-lg my-4">
          <div className="card-body">
            <p className="text-blue fw-bold fs-4">PIC Management</p>
            <div className="d-flex justify-content-between">
              <div className="input-group w-70">
                <span className="input-group-text">
                  <i class="fas fa-search text-secondary"></i>
                </span>
                <input
                  className="form-control"
                  placeholder="Search"
                  onChange={(e) => getData(10, 1, e.target.value)}
                />
              </div>
              <div className="d-flex">
                <div
                  className="btn bg-blue text-white me-2"
                  onClick={() => navigate(`/add-pic/${id}`)}
                >
                  <i class="fas fa-plus me-2"></i>
                  Add PIC
                </div>
              </div>
            </div>
            <table class="table table-bordered mt-3 rounded rounded-3 overflow-hidden">
              <thead>
                <tr className="bg-blue text-white">
                  <th className="fw-normal">No.</th>
                  <th className="fw-normal">Fullname</th>
                  <th className="fw-normal">Username</th>
                  <th className="fw-normal">Email</th>
                  <th className="fw-normal">Telp</th>
                  <th className="fw-normal">Jabatan</th>
                  <th className="fw-normal">Unit</th>
                  <th className="fw-normal">Divisi</th>
                  <th className="fw-normal">Aksi</th>
                </tr>
              </thead>
              {dataPIC.map((item) => (
                <tbody>
                  <tr>
                    <td>{item.number}</td>
                    <td>{item.fullname}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.telp}</td>
                    <td>{item.jabatan}</td>
                    <td>{item.unit}</td>
                    <td>{item.divisi}</td>
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
                        onClick={() => navigate(`/update-pic/${item.id}/${id}`)}
                      ></i>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <PaginationControl
              page={currentPIC}
              total={totalDataPIC}
              limit={10}
              changePage={(page, size) => {
                getDataPIC(size, page);
                setCurrentPIC(page);
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
      ) : (
        ""
      )}

      <div className="card border-0 py-2 mx-3 shadow-lg my-4">
        <div className="card-body">
          <p className="text-blue fw-bold fs-4">User Management</p>
          <div className="d-flex justify-content-between">
            <div className="input-group w-70">
              <span className="input-group-text">
                <i class="fas fa-search text-secondary"></i>
              </span>
              <input
                className="form-control"
                placeholder="Search"
                onChange={(e) => getData(10, 1, e.target.value)}
              />
            </div>
            <div className="d-flex">
              <div
                className="btn bg-blue text-white me-2"
                onClick={() => navigate(`/add-user/${id}`)}
              >
                <i class="fas fa-plus me-2"></i>
                Add User
              </div>
              <FileUploader handleFile={handleUploadExcel} />
            </div>
          </div>
          <table class="table table-bordered mt-3 rounded rounded-3 overflow-hidden">
            <thead>
              <tr className="bg-blue text-white">
                <th className="fw-normal">No.</th>
                <th className="fw-normal">Fullname</th>
                <th className="fw-normal">Username</th>
                <th className="fw-normal">Email</th>
                <th className="fw-normal">Telp</th>
                <th className="fw-normal">Jabatan</th>
                <th className="fw-normal">Unit</th>
                <th className="fw-normal">Divisi</th>
                <th className="fw-normal">Aksi</th>
              </tr>
            </thead>
            {dataUser.map((item) => (
              <tbody>
                <tr>
                  <td>{item.number}</td>
                  <td>{item.fullname}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.telp}</td>
                  <td>{item.jabatan}</td>
                  <td>{item.unit}</td>
                  <td>{item.divisi}</td>
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
                      onClick={() => navigate(`/update-user/${item.id}/${id}`)}
                    ></i>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
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
    </>
  );
};

export default UserManagement;
