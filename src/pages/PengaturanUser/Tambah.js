import Head from "next/head";
import Layout from "../../../components/Layout";
import { useReducer, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import {
  Username,
  Password,
  Role,
  Usernamereducer,
  userinitValue,
  passwordReducer,
  passinitValue,
} from "../../../components/TambahUserComp";
import {
  faEye,
  faEyeSlash,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Popconfirm, Result } from "antd";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import LayoutPercobaan from "../../../components/LayoutPercobaan";

export default function Tambah() {
  const [state, dispacth] = useReducer(Usernamereducer, userinitValue);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setShow] = useState(false);
  const [passState, dispacthPass] = useReducer(passwordReducer, passinitValue);
  const [role, setRole] = useState("pemilik");
  const [isModalClosed, setModalClosed] = useState(true);
  const [isSubmitSuccess, setisSubmitSuccess] = useState(false);
  const [isShowRetype, setShowRetype] = useState(false);
  const [passRetype, setPassRetype] = useState("");
  const router = useRouter();
  const isDisabled =
    state.warnaTextbox === "input is-success" &&
    password.length === 8 &&
    passRetype === password
      ? false
      : true;
  const changeisShow = (e) => {
    setShow(!isShow);
  };
  const changeisShowRetype = (e) => {
    setShowRetype(!isShowRetype);
  };
  const Eye = ({ onClick }) => {
    return (
      <FontAwesomeIcon
        icon={faEye}
        onClick={onClick}
        pointerEvents="all"
        cursor="pointer"
      />
    );
  };
  const EyeSlash = ({ onClick }) => {
    return (
      <FontAwesomeIcon
        icon={faEyeSlash}
        onClick={onClick}
        pointerEvents="all"
        cursor="pointer"
      />
    );
  };

  // const eyeSlash = (
  //   <FontAwesomeIcon
  //     icon="eye-slash"
  //     onClick={changeisShow}
  //     pointerEvents="all"
  //     cursor="pointer"
  //   />
  // );
  const typeOfIcon =
    isShow === false ? (
      <EyeSlash onClick={changeisShow} />
    ) : (
      <Eye onClick={changeisShow} />
    );

  const onChangeUsername = async (e) => {
    setUsername(e.target.value);
    dispacth({ type: "loading" });
    if (e.target.value === "" || e.target.value.length > 15) {
      setUsername(e.target.value);
      dispacth({ type: "not allowed" });
      return;
    }
    try {
      const response = await axios.post("/api/CheckUsername", {
        sendUsername: e.target.value,
        tujuan: "add",
      });
      if (response.data === "BISA") {
        dispacth({ type: "available" });
      } else if (response.data === "TIDAK BISA") {
        dispacth({ type: "not available" });
      }
    } catch (e) {
      dispacth({ type: "error" });
    }
  };
  const onChangePassword = (e) => {
    if (e.target.value.length < 8 || e.target.value.length > 8) {
      dispacthPass({ type: "tidak boleh" });
    } else {
      dispacthPass({ type: "boleh" });
    }
    setPassword(e.target.value);
  };
  const onChangeRetype = (e) => {
    setPassRetype(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/TambahUser", {
        username,
        password,
        role,
      });
      setisSubmitSuccess(true);
    } catch (e) {
      setisSubmitSuccess(false);
    } finally {
      setModalClosed(false);
    }
  };
  const onChangeRole = (e) => {
    setRole(e.target.value);
  };

  const typeOfIcon2 =
    isShowRetype === false ? (
      <EyeSlash onClick={changeisShowRetype} />
    ) : (
      <Eye onClick={changeisShowRetype} />
    );

  const hasilRetype =
    passRetype === password && password.length === 8 ? (
      <p className="help is-success" style={{ fontSize: "15px" }}>
        Password sudah sama!
      </p>
    ) : password !== passRetype && password.length === 8 ? (
      <p className="help is-danger" style={{ fontSize: "15px" }}>
        Password tidak sama!
      </p>
    ) : (
      ""
    );
  const warnaTexboxtRetype =
    passRetype === password && password.length === 8
      ? "input is-success"
      : password !== passRetype && password.length === 8
      ? "input is-danger"
      : "input";

  return (
    <>
      <Head>
        <title>Tambah User</title>
      </Head>
      <h1 className="title">Tambah User</h1>
      <Username
        className={state.warnaTextbox}
        value={username}
        onChange={onChangeUsername}
        icon={state.icon}
        hasil={state.hasil}
      />
      <Role onChange={onChangeRole} value={role} />
      <Password
        className={passState.warnaTextbox}
        type={isShow === true ? "text" : "password"}
        value={password}
        onChange={onChangePassword}
        icon={typeOfIcon}
        hasil={passState.hasil}
      />
      <Password
        className={warnaTexboxtRetype}
        type={isShowRetype === true ? "text" : "password"}
        value={passRetype}
        onChange={onChangeRetype}
        icon={typeOfIcon2}
        hasil={hasilRetype}
        label="Retype-Password"
        disabled={passState.warnaTextbox === "input is-success" ? false : true}
      />
      <Popconfirm
        title="Mengumpulkan Data User"
        description="Apakah anda yakin?"
        okText="Iya"
        cancelText="Tidak"
        onConfirm={onSubmit}
      >
        <Button type="primary" disabled={isDisabled} size="large">
          Submit
        </Button>
      </Popconfirm>
      <Modal open={!isModalClosed} closeIcon={false} footer={null}>
        <Result
          status={isSubmitSuccess === true ? "success" : "error"}
          title={
            isSubmitSuccess === true
              ? "BERHASIL MENAMBAHKAN USER"
              : "GAGAL MENAMBAHKAN USER"
          }
          extra={
            isSubmitSuccess === true
              ? [
                  <Button
                    type="primary"
                    key="lanjut"
                    icon={<ReloadOutlined />}
                    onClick={() => router.reload()}
                  >
                    Lanjut Menambahkan Data User
                  </Button>,
                  <Button
                    key="kembali"
                    type="default"
                    style={{ marginTop: "5px" }}
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.push("/PengaturanUser")}
                  >
                    Kembali Ke Halaman Pengaturan User
                  </Button>,
                ]
              : [
                  <Button
                    danger
                    type="primary"
                    onClick={() => setModalClosed(true)}
                    icon={<FontAwesomeIcon icon={faFaceFrown} />}
                  >
                    OK
                  </Button>,
                ]
          }
        />
      </Modal>
    </>
  );
}
Tambah.getLayout = function getLayout(page) {
  return <LayoutPercobaan clicked="/PengaturanUser">{page}</LayoutPercobaan>;
};
