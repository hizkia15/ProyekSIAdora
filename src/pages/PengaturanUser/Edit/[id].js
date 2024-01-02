import Head from "next/head";

import handlerQuery from "../../../../lib/db";
import {
  Password,
  Role,
  passwordReducer,
  passinitValue,
} from "../../../../components/TambahUserComp";
import { useRouter } from "next/router";
import { useState, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faEye,
  faEyeSlash,
  faFaceFrown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Popconfirm, Result } from "antd";
import LayoutPercobaan from "../../../../components/LayoutPercobaan";
export default function Edit({ hasil }) {
  const [password, setPassword] = useState("");
  const [isShow, setShow] = useState(false);
  const [passState, dispacthPass] = useReducer(passwordReducer, passinitValue);
  const [role, setRole] = useState(hasil[0].role);
  const [isModalClosed, setModalClosed] = useState(true);
  const [isSubmitSuccess, setisSubmitSuccess] = useState(false);
  const [isShowRetype, setShowRetype] = useState(false);
  const [passRetype, setPassRetype] = useState("");
  const router = useRouter();

  const isDisabled =
    (password.length === 8 && passRetype === password) ||
    (password === "" && passRetype === "");

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

  const typeOfIcon =
    isShow === false ? (
      <EyeSlash onClick={changeisShow} />
    ) : (
      <Eye onClick={changeisShow} />
    );

  const onChangePassword = (e) => {
    if (e.target.value === "") {
      dispacthPass({ type: "default" });
    } else if (e.target.value.length < 8 || e.target.value.length > 8) {
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
      await axios.patch("/api/EditUser", {
        password,
        role,
        id: router.query.id,
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
        password sudah sama!
      </p>
    ) : password !== passRetype && password.length === 8 ? (
      <p className="help is-danger" style={{ fontSize: "15px" }}>
        password tidak sama!
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
        <title>Edit User</title>
      </Head>
      <h1 className="title">{`Edit User ${hasil[0].username}`}</h1>

      <Role onChange={onChangeRole} value={role} />
      <Password
        className={passState.warnaTextbox}
        type={isShow === true ? "text" : "password"}
        value={password}
        onChange={onChangePassword}
        icon={typeOfIcon}
        hasil={passState.hasil}
        label="Password Pengganti"
      />
      <Password
        className={warnaTexboxtRetype}
        type={isShowRetype === true ? "text" : "password"}
        value={passRetype}
        onChange={onChangeRetype}
        icon={typeOfIcon2}
        hasil={hasilRetype}
        label="Retype-Password Pengganti"
        disabled={passState.warnaTextbox === "input is-success" ? false : true}
      />

      <Popconfirm
        title="Mengedit Data User"
        description="Apakah anda yakin?"
        okText="Iya"
        cancelText="Tidak"
        onConfirm={onSubmit}
      >
        <Button type="primary" disabled={!isDisabled} size="large">
          Submit
        </Button>
      </Popconfirm>
      <Modal open={!isModalClosed} closeIcon={false} footer={null}>
        <Result
          status={isSubmitSuccess === true ? "success" : "error"}
          title={
            isSubmitSuccess === true
              ? "BERHASIL MENGUPDATE USER"
              : "GAGAL MENGUPDATE USER"
          }
          extra={
            isSubmitSuccess === true
              ? [
                  <Button
                    type="primary"
                    key="lanjut"
                    icon={<FontAwesomeIcon icon={faThumbsUp} />}
                    onClick={() => router.push("/PengaturanUser")}
                  >
                    OK
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

export async function getServerSideProps(context) {
  const query = "select username,role from user where idUser=?";
  const values = [context.query.id];
  try {
    const getData = await handlerQuery({ query, values });
    const hasil = JSON.parse(JSON.stringify(getData));

    return {
      props: {
        hasil,
      },
    };
  } catch (e) {
    return {
      props: {
        hasil: e.message,
      },
    };
  }
}

Edit.getLayout = function getLayout(page) {
  return <LayoutPercobaan clicked="/PengaturanUser">{page}</LayoutPercobaan>;
};
