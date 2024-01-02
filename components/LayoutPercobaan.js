import React, { useState, useEffect } from "react";
import {
  LineChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Image, Layout, Menu, Space, Tooltip, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faBox,
  faCapsules,
  faCashRegister,
  faCity,
  faClipboardList,
  faCubes,
  faFileAlt,
  faFileInvoiceDollar,
  faPills,
  faPrescriptionBottle,
  faSignOutAlt,
  faUserGear,
  faUserTie,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { Profile } from "./LayoutComponent";
import { signOut, useSession } from "next-auth/react";
const { Content, Sider, Header } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
    title: label,
  };
}
const items = [
  getItem("Dashboard", "/Dashboard", <LineChartOutlined />),
  getItem(
    "Kasir",
    "/Kasir?p=1&Jenis=umum",
    <FontAwesomeIcon icon={faCashRegister} />
  ),
  getItem("Supplier", "Supplier", <FontAwesomeIcon icon={faUserTie} />, [
    getItem(
      "Data Supplier",
      "/Supplier/DataSupplier",
      <FontAwesomeIcon icon={faAddressBook} />
    ),
    getItem("Kota", "/Supplier/Kota", <FontAwesomeIcon icon={faCity} />),
  ]),
  getItem(
    "Rekap Transaksi",
    "Rekap Transaksi",
    <FontAwesomeIcon icon={faWallet} />,
    [
      getItem(
        "Stok Opname",
        "/Transaksi/TransaksiStokOpname?p=1",
        <FontAwesomeIcon icon={faFileInvoiceDollar} />
      ),
      getItem(
        "Pembelian",
        "/Transaksi/TransaksiPembelian?p=1",
        <FontAwesomeIcon icon={faFileInvoiceDollar} />
      ),
      getItem(
        "Penjualan",
        "/Transaksi/TransaksiPenjualan?p=1",
        <FontAwesomeIcon icon={faFileInvoiceDollar} />
      ),
    ]
  ),
  getItem("Produk", "Produk", <FontAwesomeIcon icon={faBox} />, [
    getItem(
      "Daftar Item",
      "/Produk/DaftarItem?p=1",
      <FontAwesomeIcon icon={faCapsules} />
    ),
    getItem(
      "Jenis Item",
      "/Produk/JenisItem",
      <FontAwesomeIcon icon={faPills} />
    ),
    getItem(
      "Satuan Item",
      "/Produk/SatuanItem",
      <FontAwesomeIcon icon={faPrescriptionBottle} />
    ),
    getItem("Rak", "/Produk/Rak", <FontAwesomeIcon icon={faCubes} />),
  ]),
  getItem("Laporan", "Laporan", <FontAwesomeIcon icon={faClipboardList} />, [
    getItem(
      "Penjualan",
      "/Laporan/LaporanPenjualan?p=1",
      <FontAwesomeIcon icon={faFileAlt} />
    ),
    getItem(
      "Pembelian",
      "/Laporan/LaporanPembelian?p=1",
      <FontAwesomeIcon icon={faFileAlt} />
    ),
    getItem(
      "Item Terlaris",
      "/Laporan/LaporanItemTerlaris",
      <FontAwesomeIcon icon={faFileAlt} />
    ),
  ]),
  getItem(
    "Pengaturan User",
    "/PengaturanUser",
    <FontAwesomeIcon icon={faUserGear} />
  ),
];
const LayoutPercobaan = ({ children, clicked, sub }) => {
  const [collapsed, setCollapsed] = useState(false);

  const [menuDipilih, setMenuDipilih] = useState(clicked);

  const router = useRouter();
  const { data: session, status } = useSession({ required: true });

  const role = status === "authenticated" && session.user.role;

  const chosenItemsBasedOnRole =
    role === "pemilik"
      ? [...items]
      : role === "ttk"
      ? [items[2], items[3]]
      : role === "kasir"
      ? [items[1]]
      : [];
  const [messageApi, contextHolder] = message.useMessage();
  const handleChangeRoute = () => {
    messageApi.open({
      type: "loading",
      content: "loading...",
      duration: 0,
      key: "message",
    });
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
      <Layout style={{ height: "100vh" }} hasSider={true}>
        <Sider
          collapsed={collapsed}
          onCollapse={(value) => {
            setCollapsed(value);
          }}
          theme="light"
          style={{ overflowY: "auto" }}
          width={230}
        >
          <Space
            align="center"
            direction="vertical"
            style={{ display: "flex" }}
          >
            <Image
              src="/image/Logo_ADORA_NOBG.png"
              width={collapsed ? 50 : 100}
              height={collapsed ? 50 : 100}
              preview={false}
            />
          </Space>

          <Menu
            theme="light"
            selectedKeys={[menuDipilih]}
            defaultOpenKeys={[sub]}
            mode="inline"
            items={chosenItemsBasedOnRole}
            onClick={async (i) => {
              await router.push(i.key);
              setMenuDipilih(i.key);
            }}
            style={{
              fontWeight: "bold",
              fontFamily: "Arial",
            }}
          />
        </Sider>

        <Layout
          style={{
            backgroundImage: "url(/image/bgLayout.jpg)",
            backgroundColor: "#f3f3f3",
            // backgroundColor: "#bbbfb6",
            backgroundBlendMode: "soft-light",
            backgroundRepeat: "repeat",
          }}
        >
          <Header
            style={{
              backgroundColor: "transparent",
              position: "relative",
            }}
          >
            <Tooltip placement="right" title="Collapse Menu">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,

                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                size="large"
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Log Out">
              <Button
                type="text"
                icon={<FontAwesomeIcon icon={faSignOutAlt} />}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,

                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
                onClick={signOut}
              />
            </Tooltip>
            <Profile />
          </Header>
          <Content
            style={{
              backgroundColor: "transparent",
              padding: "13vh",
              paddingTop: "5vh",
              overflow: "auto",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default LayoutPercobaan;
