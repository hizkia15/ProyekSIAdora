import { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Password, passinitValue, passwordReducer } from "./TambahUserComp";
import { useReducer } from "react";
import { Button, List, Popover, Modal, notification } from "antd";
import {
  faCircleUser,
  faEye,
  faEyeSlash,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

export function ImageOfAdora() {
  return (
    <li>
      <figure className="image is-64x64" style={{ marginLeft: 60 }}>
        <img src="/image/Logo ADORA.jpg" alt="Logo Apotik Adora" />
      </figure>
    </li>
  );
}

export function Menu({ nama, link, clickedMenu, onClick, icon }) {
  const router = useRouter();
  const nameStyle =
    clickedMenu === nama ? (
      <span style={{ color: "green" }}>{nama}</span>
    ) : (
      nama
    );
  const bgColor = clickedMenu === nama ? "#f5f5f5" : "white";
  function handleClick() {
    router.push(link);
  }
  return (
    <li style={{ marginBottom: 10, marginLeft: 10, backgroundColor: bgColor }}>
      <a onClick={onClick ? onClick : handleClick}>
        <FontAwesomeIcon icon={icon} style={{ marginRight: "5px" }} />
        {nameStyle}
      </a>
    </li>
  );
}

export function MenuWithDropdown({ nama, clickedMenu, dropdown, icon }) {
  let bool = false;
  for (let i = 0; i < dropdown.length; i++) {
    if (dropdown[i].nama === clickedMenu) {
      bool = true;
      break;
    }
  }
  const [isDropdownOpen, setIsDropdownOpen] = useState(bool);
  const ClickHandler = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const pemetaanDropdown = dropdown.map((x) => {
    return (
      <Menu
        nama={x.nama}
        key={x.nama}
        clickedMenu={clickedMenu}
        icon={x.icon}
        link={x.link}
      ></Menu>
    );
  });
  return (
    <li style={{ marginBottom: 10, marginLeft: 10 }}>
      <a onClick={ClickHandler}>
        <FontAwesomeIcon icon={icon} style={{ marginRight: "5px" }} />
        {nama}
      </a>

      {isDropdownOpen && <ul>{pemetaanDropdown}</ul>}
    </li>
  );
}

export const Profile = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({ message, description, placement: "top" });
  };

  const { data: session, status } = useSession({ required: true });

  const [modalFormPassword, setModalFormPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passstate, dispacthpass] = useReducer(passwordReducer, passinitValue);
  const [isShow, setShow] = useState(false);
  const idUser = status === "authenticated" && session.user.idUser;
  const changeisShow = (e) => {
    setShow(!isShow);
  };
  const onChangePassword = (e) => {
    if (e.target.value.length < 8 || e.target.value.length > 8) {
      dispacthpass({ type: "tidak boleh" });
    } else {
      dispacthpass({ type: "boleh" });
    }
    setPassword(e.target.value);
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
  const onSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/api/ChangePassword", {
        passwordBaru: password,
        UserId: idUser,
      });
      cleanupPass();
      openNotificationWithIcon("success", "Sukses", res.data);
    } catch (er) {
      cleanupPass();
      openNotificationWithIcon("error", "Gagal", er.response.data);
    }
  };

  const [passRetype, setPassRetype] = useState("");
  const [isShowRetype, setShowRetype] = useState(false);

  const changeisShowRetype = (e) => {
    setShowRetype(!isShowRetype);
  };

  const onChangeRetype = (e) => {
    setPassRetype(e.target.value);
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

  const cleanupPass = () => {
    dispacthpass({ type: "default" });
    setPassword("");
    setPassRetype("");
    setShow(false);
    setShowRetype(false);
    setModalFormPassword(false);
  };

  const data = [
    {
      title: "ID USER",
      isi: status === "authenticated" && session.user.idUser,
    },
    {
      title: "USERNAME",
      isi: status === "authenticated" && session.user.username,
    },
    {
      title: "ROLE",
      isi: status === "authenticated" && session.user.role.toUpperCase(),
    },
    {
      title: "GANTIPASS",
      isi: (
        <Button
          type="primary"
          icon={<FontAwesomeIcon icon={faKey} />}
          onClick={() => setModalFormPassword(true)}
        >
          Ganti Password
        </Button>
      ),
    },
  ];
  const render = (item) => {
    const hasil =
      item.title !== "GANTIPASS" ? (
        <>
          <List.Item
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>{item.title}</div>
          </List.Item>
          <List.Item style={{ display: "flex", justifyContent: "center" }}>
            {item.isi}
          </List.Item>
        </>
      ) : (
        <>
          <List.Item>{item.isi}</List.Item>
        </>
      );
    return hasil;
  };
  const content = (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={render}
    />
  );

  return (
    <>
      {contextHolder}
      <Popover content={content} placement="leftBottom">
        <Button
          type="text"
          icon={<FontAwesomeIcon icon={faCircleUser} />}
          style={{
            fontSize: "30px",
            width: 64,
            height: 64,
            position: "absolute",
            top: 0,
            right: 64,
          }}
        />
      </Popover>
      <Modal
        title="Ganti Password"
        open={modalFormPassword}
        onCancel={cleanupPass}
        onOk={onSubmitPassword}
        okButtonProps={{
          disabled: !(password.length === 8 && password === passRetype),
        }}
      >
        <Password
          className={passstate.warnaTextbox}
          type={isShow === true ? "text" : "password"}
          value={password}
          onChange={onChangePassword}
          icon={typeOfIcon}
          hasil={passstate.hasil}
        />
        <Password
          className={warnaTexboxtRetype}
          type={isShowRetype === true ? "text" : "password"}
          value={passRetype}
          onChange={onChangeRetype}
          icon={typeOfIcon2}
          hasil={hasilRetype}
          label="Retype-Password"
          disabled={password.length === 8 ? false : true}
        />
      </Modal>
    </>
  );
};
