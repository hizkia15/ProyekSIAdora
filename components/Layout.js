import { ImageOfAdora, Menu, MenuWithDropdown } from "./LayoutComponent";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Modal, FieldKhusus } from "./AllComponent";
import { Password, passwordReducer, passinitValue } from "./TambahUserComp";
import { useEffect, useReducer, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCapsules,
  faChartLine,
  faCashRegister,
  faPills,
  faPrescriptionBottle,
  faCubes,
  faFileInvoiceDollar,
  faAddressBook,
  faCity,
  faUserTie,
  faWallet,
  faBox,
  faClipboardList,
  faSignOutAlt,
  faUserGear,
  faEye,
  faEyeSlash,
  faUser,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import dayjs from "dayjs";
import { message } from "antd";
const Layout = ({ children, clicked }) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const loading = () => {
    messageApi.open({
      type: "loading",
      content: "loading...",
      duration: 0,
      key: "message",
    });
  };
  const clickedMenu = clicked;
  const dropdownProduk = [
    { nama: "Daftar Item", icon: faCapsules, link: "/Produk/DaftarItem?p=1" },
    { nama: "Jenis Item", icon: faPills, link: "/Produk/JenisItem" },
    {
      nama: "Satuan Item",
      icon: faPrescriptionBottle,
      link: "/Produk/SatuanItem",
    },
    { nama: "Rak", icon: faCubes, link: "/Produk/Rak" },
  ];
  const dropdownTransaksi = [
    {
      nama: "Rekap Transaksi Stok Opname",
      icon: faFileInvoiceDollar,
      link: "/Transaksi/TransaksiStokOpname?p=1",
    },
    {
      nama: "Rekap Transaksi Pembelian",
      icon: faFileInvoiceDollar,
      link: "/Transaksi/TransaksiPembelian?p=1",
    },
    {
      nama: "Rekap Transaksi Penjualan",
      icon: faFileInvoiceDollar,
      link: "/Transaksi/TransaksiPenjualan?p=1",
    },
  ];
  const dropdownLaporan = [
    {
      nama: "Laporan Penjualan",
      icon: faFileAlt,
      link: "/Laporan/LaporanPenjualan?p=1",
    },
    {
      nama: "Laporan Pembelian",
      icon: faFileAlt,
      link: "/Laporan/LaporanPembelian?p=1",
    },
    {
      nama: "Laporan Item Terlaris",
      icon: faFileAlt,
      link: "/Laporan/LaporanItemTerlaris",
    },
  ];
  const dropdownSupplier = [
    {
      nama: "Data Supplier",
      icon: faAddressBook,
      link: "/Supplier/DataSupplier/",
    },
    { nama: "Kota", icon: faCity, link: "/Supplier/Kota" },
  ];

  const { data: session, status, update } = useSession({ required: true });
  const Router = useRouter();

  // Ganti Username
  const [modalFormUsername, setModalFormUsername] = useState(false);
  const [fieldUsername, setFieldUsername] = useState({
    "Username Baru": "",
    "Username Baru Checked": false,
  });
  const submitUsername = fieldUsername["Username Baru Checked"] === true;
  const [hasilUsername, setHasilUsername] = useState(undefined);
  //

  // Ganti Password
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

  const [modalFormPassword, setModalFormPassword] = useState(false);
  // field Password
  const [password, setPassword] = useState("");
  const [passstate, dispacthpass] = useReducer(passwordReducer, passinitValue);
  const [isShow, setShow] = useState(false);
  const changeisShow = (e) => {
    setShow(!isShow);
  };
  const typeOfIcon =
    isShow === false ? (
      <EyeSlash onClick={changeisShow} />
    ) : (
      <Eye onClick={changeisShow} />
    );
  const onChangePassword = (e) => {
    if (e.target.value.length < 8 || e.target.value.length > 8) {
      dispacthpass({ type: "tidak boleh" });
    } else {
      dispacthpass({ type: "boleh" });
    }
    setPassword(e.target.value);
  };
  //
  // field Retype
  const [passRetype, setPassRetype] = useState("");
  const [isShowRetype, setShowRetype] = useState(false);
  const isDisabled =
    password.length === 8 && passRetype === password ? false : true;

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

  const [hasilPass, setHasilPass] = useState(undefined);
  const cleanupPass = () => {
    dispacthpass({ type: "default" });
    setPassword("");
    setPassRetype("");
    setShow(false);
    setShowRetype(false);
    setHasilPass(undefined);
    setModalFormPassword(false);
  };
  const AksesPemilik = (
    <>
      <Menu
        clickedMenu={clickedMenu}
        nama="Dashboard"
        icon={faChartLine}
        link="/Dashboard"
      />
      {/* <Menu
        clickedMenu={clickedMenu}
        nama="Kasir2"
        icon={faCashRegister}
        link="/Kasir/Kasir2"
      /> */}
      <Menu
        clickedMenu={clickedMenu}
        nama="Kasir"
        icon={faCashRegister}
        link="/Kasir?p=1&Jenis=umum"
      />
      <MenuWithDropdown
        clickedMenu={clickedMenu}
        dropdown={dropdownSupplier}
        nama="Supplier"
        icon={faUserTie}
      />
      <MenuWithDropdown
        clickedMenu={clickedMenu}
        nama="Rekap Transaksi"
        dropdown={dropdownTransaksi}
        icon={faWallet}
      />
      <MenuWithDropdown
        clickedMenu={clickedMenu}
        nama="Produk"
        dropdown={dropdownProduk}
        icon={faBox}
      />
      <MenuWithDropdown
        clickedMenu={clickedMenu}
        nama="Laporan"
        dropdown={dropdownLaporan}
        icon={faClipboardList}
      />
    </>
  );
  const AksesTTK = (
    <>
      <MenuWithDropdown
        clickedMenu={clickedMenu}
        dropdown={dropdownSupplier}
        nama="Supplier"
        icon={faUserTie}
      />
      <MenuWithDropdown
        clickedMenu={clickedMenu}
        nama="Rekap Transaksi"
        dropdown={dropdownTransaksi}
        icon={faWallet}
      />
    </>
  );
  const AksesKasir = (
    <Menu
      clickedMenu={clickedMenu}
      nama="Kasir"
      icon={faCashRegister}
      link="/Kasir"
    />
  );
  const idUser = status === "authenticated" && session.user.idUser;
  const CheckUsername = async (Username) => {
    if (Username === "") {
      return "default";
    }
    const res = await axios.post("/api/CheckUsername", {
      sendUsername: Username,
      tujuan: "edit",
      id: idUser,
    });
    return res.data;
  };
  const runCode = () => {
    const Username = document.getElementById("Username");

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    nativeInputValueSetter.call(Username, "");

    const event = new Event("input", { bubbles: true });
    Username.dispatchEvent(event);
  };
  const onsubmitUsername = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch("/api/ChangeUsername", {
        UsernameBaru: fieldUsername["Username Baru"],
        IdUser: idUser,
      });
      update({ Username: fieldUsername["Username Baru"] });
      runCode();
      setHasilUsername(undefined);
      setModalFormUsername(false);
    } catch (e) {
      setHasilUsername(e.response.data);
    }
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/api/ChangePassword", {
        passwordBaru: password,
        UserId: idUser,
      });
      cleanupPass();
    } catch (e) {
      setHasilPass(e.response.data);
    }
  };

  const handleChangeRoute = () => {
    loading();
  };
  const handleComplete = () => {
    messageApi.destroy();
  };
  useEffect(() => {
    router.events.on("routeChangeStart", handleChangeRoute);
    router.events.on("routeChangeComplete", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleChangeRoute);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router]);

  return (
    <>
      {contextHolder}
      <div className="columns" style={{ marginTop: "0" }}>
        <div className="column is-2" style={{ height: "100vh" }}>
          <aside className="menu" style={{ height: "73vh", overflow: "auto" }}>
            <ul className="menu-list">
              <ImageOfAdora />
              {status === "authenticated" && session.user.role === "pemilik"
                ? AksesPemilik
                : status === "authenticated" && session.user.role === "kasir"
                ? AksesKasir
                : status === "authenticated" && session.user.role === "ttk"
                ? AksesTTK
                : null}
            </ul>
          </aside>

          <aside
            className="menu"
            style={{
              height: "24vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <ul className="menu-list">
              {status === "authenticated" &&
                session.user.role === "pemilik" && (
                  <Menu
                    clickedMenu={clickedMenu}
                    nama="Pengaturan User"
                    icon={faUserGear}
                    link="/PengaturanUser"
                  />
                )}

              <Menu
                clickedMenu={clickedMenu}
                nama="Log Out"
                onClick={signOut}
                icon={faSignOutAlt}
              />
            </ul>
          </aside>
        </div>
        <div
          className="column bgLayout"
          style={{
            backgroundColor: "#f3f3f3",
            height: "100vh",
            padding: "13vh",
            overflowY: "auto",
          }}
        >
          <div
            className="container"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <div className="dropdown is-hoverable">
              <div className="dropdown-trigger">
                <button
                  className="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu2"
                >
                  <span style={{ width: "10vw" }}>
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ marginRight: "5px" }}
                    />
                    {status === "authenticated" && session.user.username}
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                <div className="dropdown-content">
                  <div
                    className="dropdown-item"
                    style={{ textAlign: "center" }}
                  >
                    <strong>
                      USER ID : <br />
                      {status === "authenticated" && session.user.idUser}
                    </strong>
                    <hr className="dropdown-divider" />
                    <strong>
                      USERNAME : <br />
                      {status === "authenticated" && session.user.username}
                    </strong>
                    <hr className="dropdown-divider" />
                    <strong>
                      ROLE : <br />
                      {status === "authenticated" &&
                        session.user.role.toUpperCase()}
                    </strong>
                    <hr className="dropdown-divider" />
                    <div style={{ textAlign: "center" }}>
                      <button
                        className="button is-success"
                        style={{ marginBottom: "5px" }}
                        onClick={() => setModalFormUsername(true)}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ color: "#ffffff", marginRight: "5px" }}
                        />
                        Ganti Username
                      </button>
                      <button
                        className="button is-success"
                        onClick={() => setModalFormPassword(true)}
                      >
                        <FontAwesomeIcon
                          icon={faKey}
                          style={{ color: "#ffffff", marginRight: "5px" }}
                        />
                        Ganti Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal show={modalFormUsername === true && "is-active"}>
            <form onSubmit={onsubmitUsername}>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Ganti Username</p>
                  <button
                    type="button"
                    className="delete"
                    aria-label="close"
                    onClick={() => {
                      runCode();
                      setModalFormUsername(false);
                      setHasilUsername(undefined);
                    }}
                  />
                </header>
                <section className="modal-card-body">
                  <FieldKhusus
                    nama="Username Baru"
                    value={fieldUsername["Username Baru"]}
                    onChange={setFieldUsername}
                    IconLeft={faUser}
                    field={fieldUsername}
                    maxLength="15"
                    fungsiCheck={CheckUsername}
                    id="Username"
                  />
                  <p className="help is-danger">{hasilUsername}</p>
                </section>
                <footer className="modal-card-foot">
                  <button
                    className="button is-success"
                    disabled={!submitUsername}
                  >
                    Save changes
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={() => {
                      runCode();
                      setModalFormUsername(false);
                      setHasilUsername(undefined);
                    }}
                  >
                    Cancel
                  </button>
                </footer>
              </div>
            </form>
          </Modal>
          <Modal show={modalFormPassword === true && "is-active"}>
            <form onSubmit={onSubmitPassword}>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Ganti Password</p>
                  <button
                    type="button"
                    className="delete"
                    aria-label="close"
                    onClick={() => {
                      cleanupPass();
                    }}
                  />
                </header>
                <section className="modal-card-body">
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
                  <p className="help is-danger">{hasilPass}</p>
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success" disabled={isDisabled}>
                    Save changes
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={() => cleanupPass()}
                  >
                    Cancel
                  </button>
                </footer>
              </div>
            </form>
          </Modal>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
// 688
