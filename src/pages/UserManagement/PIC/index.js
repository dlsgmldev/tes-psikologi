import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useNavigate, useParams } from "react-router-dom";

const PICManagement = () => {
  const navigate = useNavigate();
  const [dataPIC, setDataPIC] = useState([""]);
  const [totalDataPIC, setTotalDataPIC] = useState(0);
  const [currentPIC, setCurrentPIC] = useState(1);
  const [show, setShow] = useState(false);
  const [idUser, setIdUser] = useState("");
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const getDataPIC = (pageSize, pageIndex, searchIndex) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/usermanagement/list_pic/${id}/${
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
        // setLoading(false);
      });
  };

  useEffect(() => {
    getDataPIC();
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

  return (
    <div className="card border-0 py-2 mx-3 shadow-lg mb-4">
      <div className="card-body">
        <p className="text-blue fw-bold fs-4">PIC Management</p>
        <div className="d-flex justify-content-between">
          <div className="input-group w-70">
            <input
              className="form-control"
              placeholder="Search"
              onChange={(e) => getDataPIC(10, 1, e.target.value)}
            />
            <span className="input-group-text">
              <i class="fas fa-search text-secondary"></i>
            </span>
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
        {dataPIC.length !== 0 ? (
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
            {dataPIC.map((item) => (
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
                      onClick={() => navigate(`/update-pic/${item.id}/${id}`)}
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
  );
};

export default PICManagement;
