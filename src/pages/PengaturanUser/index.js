import Head from "next/head";
import handlerQuery from "../../../lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

import axios from "axios";
import { useRouter } from "next/router";
import { Button, Empty, FloatButton, notification } from "antd";
import {
  CheckCircleTwoTone,
  CloseCircleFilled,
  EditFilled,
  PlusOutlined,
} from "@ant-design/icons";
import LayoutPercobaan from "../../../components/LayoutPercobaan";
export default function PengaturanUser({ hasil }) {
  let semuaAkun;
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({ message, description, placement: "top" });
  };

  const router = useRouter();
  async function changeStatus(id, toActive) {
    try {
      let res;
      if (toActive === true) {
        res = await axios.patch("/api/UpdateStatusUser", { id, status: 1 });
      } else if (toActive === false) {
        res = await axios.patch("/api/UpdateStatusUser", { id, status: 0 });
      }
      openNotificationWithIcon("success", "Sukses", res.data);
      router.push(router.asPath);
    } catch (e) {
      openNotificationWithIcon("error", "Gagal", e.response.data);
      router.push(router.asPath);
    }
  }
  try {
    semuaAkun = hasil.map((x, index) => {
      return (
        <tr
          key={x.idUser}
          style={{
            backgroundColor: x.status === 0 ? "rgb(255, 77, 79)" : "white",
            color: x.status === 0 ? "white" : "rgb(54,54,54)",
          }}
        >
          <td className="is-vcentered">{index + 1}</td>
          <td className="is-vcentered">{x.username}</td>
          <td className="is-vcentered">{x.role.toUpperCase()}</td>
          <td className="is-vcentered">
            {x.status === 1 ? (
              <CheckCircleTwoTone twoToneColor="#42f554" />
            ) : (
              <CloseCircleFilled style={{ color: "white" }} />
            )}
          </td>
          <td className="is-vcentered" style={{ width: "20%" }}>
            <Button
              icon={<EditFilled />}
              block
              onClick={() => router.push(`/PengaturanUser/Edit/${x.idUser}`)}
            />
            {x.status === 1 ? (
              <Button
                type="primary"
                danger
                block
                onClick={() => changeStatus(x.idUser, false)}
              >
                Non-Aktifkan
              </Button>
            ) : (
              <Button
                type="primary"
                style={{ backgroundColor: "rgb(72, 199, 142)" }}
                block
                onClick={() => changeStatus(x.idUser, true)}
              >
                Aktifkan
              </Button>
            )}
          </td>
        </tr>
      );
    });
  } catch (e) {
    semuaAkun = (
      <>
        <tr>
          <td colSpan="5" className="is-vcentered">
            <div className="field">{hasil}</div>
            <Button type="primary" onClick={() => router.reload()}>
              Muat Ulang
            </Button>
          </td>
        </tr>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Pengaturan User</title>
      </Head>
      <h1 className="title">Pengaturan User</h1>
      {contextHolder}
      {hasil.length !== 0 ? (
        <div className="table-container">
          <table className="table has-text-centered is-fullwidth">
            <thead>
              <tr>
                <th className="has-text-centered is-vcentered">No</th>
                <th className="has-text-centered is-vcentered">Username</th>
                <th className="has-text-centered is-vcentered">Akses</th>
                <th className="has-text-centered is-vcentered">Status</th>
                <th className="has-text-centered is-vcentered">Aksi</th>
              </tr>
            </thead>
            <tbody>{semuaAkun}</tbody>
          </table>
        </div>
      ) : (
        <Empty />
      )}

      <FloatButton
        shape="circle"
        type="primary"
        style={{ right: 24, width: "50px", height: "50px" }}
        icon={<PlusOutlined />}
        tooltip="Tambah User"
        onClick={() => router.push("/PengaturanUser/Tambah")}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const query =
    "select username,role,idUser,status from user where idUser!=? order by idUser";
  const session = await getServerSession(context.req, context.res, authOptions);
  const idUser = session.user.idUser;
  const values = [idUser];
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

PengaturanUser.getLayout = function getLayout(page) {
  return <LayoutPercobaan clicked="/PengaturanUser">{page}</LayoutPercobaan>;
};
