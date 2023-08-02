import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const UpdateUser = () => {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const token = localStorage.getItem("token");
  const { id, id2 } = useParams();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    fullname: "",
    telp: "",
    unit: "",
    jabatan: "",
    divisi: "",
    nip: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}ac/usermanagement/detail/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setDataUser(res.data);
      });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    axios
      .put(
        `${process.env.REACT_APP_URL}ac/usermanagement/update/${id}`,
        {
          email: form.email ? form.email : dataUser.email,
          username: form.username ? form.username : dataUser.username,
          password: form.password ? form.password : "",
          fullname: form.fullname ? form.fullname : dataUser.fullname,
          telp: form.telp ? form.telp : dataUser.telp,
          unit: form.unit ? form.unit : dataUser.unit,
          jabatan: form.jabatan ? form.jabatan : dataUser.jabatan,
          divisi: form.divisi ? form.divisi : dataUser.divisi,
          nip: form.nip ? form.nip : dataUser.nip,
          // start_access: startTime? startTime: dataUser.start_access,
          // end_access: endTime? endTime: dataUser.end_access,
          id_company: id2,
          role: 2,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        navigate(`/user-management/${id2}`);
      })
      .catch((err) => {});
  };

  return (
    <div className="card border-0 py-2 mx-3 shadow-lg my-4">
      <div className="card-body">
        <p className="text-blue fw-bold fs-4">Update User</p>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                defaultValue={dataUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                placeholder="username"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                defaultValue={dataUser.username}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label>Password:</label>
              <input
                type="text"
                name="password"
                placeholder="password"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                defaultValue={dataUser.password}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label>Name:</label>
              <input
                type="text"
                name="fullname"
                placeholder="name"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                defaultValue={dataUser.fullname}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label>Telp:</label>
              <input
                type="text"
                name="telp"
                placeholder="telp"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                defaultValue={dataUser.telp}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label>Unit:</label>
              <input
                type="text"
                name="unit"
                placeholder="unit"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                defaultValue={dataUser.unit}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label>Jabatan:</label>
              <input
                type="text"
                name="jabatan"
                placeholder="jabatan"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                defaultValue={dataUser.jabatan}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label>Divisi:</label>
              <input
                type="text"
                name="divisi"
                placeholder="divisi"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                defaultValue={dataUser.divisi}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label>NIP:</label>
              <input
                type="text"
                name="nip"
                placeholder="nip"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                defaultValue={dataUser.nip}
                onChange={handleChange}
              />
            </div>
            {/* <div className="my-3">
              <label>Start Access:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                  defaultValue={dayjs(dataUser.start_access)}
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
                  defaultValue={dayjs(dataUser.end_access)}
                    onChange={(dateString) =>
                      setEndTime(
                        Math.floor(new Date(dateString).getTime() / 1000)
                      )
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div> */}
          </div>
        </div>
        <div
          className="btn bg-blue w-25 float-right text-white"
          onClick={handleUpdate}
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
