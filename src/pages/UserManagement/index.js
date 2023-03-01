import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useNavigate } from "react-router-dom";
import FileUploader from "../../components/FileUploader";

const UserManagement = () => {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalData, setTotalData] = useState(0);
  const [current, setCurrent] = useState(1);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [fileExcel, setFileExcel] = useState("");
  const token = localStorage.getItem("token");

  const getData = (pageSize, pageIndex, searchIndex) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}holland/usermanagement/list/${
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

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}holland/usermanagement/delete/${id}`,
        { id_value: id },
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
        alert("success")
      })
      .catch((err) => {
        alert("failed");
      });
  };

  return (
    <div className="card border py-2 mx-3 shadow my-4">
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
          <div
            className="btn bg-blue text-white"
            onClick={() => navigate("/add-user")}
          >
            <i class="fas fa-plus me-2"></i>
            Add User
          </div>
          <FileUploader handleFile={handleUploadExcel}/>
        </div>
        <table class="table table-bordered mt-3">
          <thead>
            <tr className="bg-blue text-white">
              <th scope="col">No.</th>
              <th scope="col">Fullname</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Telp</th>
              <th scope="col">Jabatan</th>
              <th scope="col">Unit</th>
              <th scope="col">Divisi</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          {dataUser.map((item) => (
            <tbody>
              <tr>
                <th className="fw-normal">{item.number}</th>
                <th className="fw-normal">{item.fullname}</th>
                <th className="fw-normal">{item.username}</th>
                <th className="fw-normal">{item.email}</th>
                <th className="fw-normal">{item.telp}</th>
                <th className="fw-normal">{item.jabatan}</th>
                <th className="fw-normal">{item.unit}</th>
                <th className="fw-normal">{item.divisi}</th>
                <th className="fw-normal">
                  <i
                    class="far fa-trash-alt ms-2 pointer"
                    onClick={() => {
                      setShow(true);
                      setId(item.id);
                    }}
                  ></i>
                  <i
                    class="far fa-edit ms-3 pointer"
                    onClick={() => navigate(`/update-user/${item.id}`)}
                  ></i>
                </th>
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
  );
};

export default UserManagement;
