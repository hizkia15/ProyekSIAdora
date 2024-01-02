import Head from "next/head";
import handlerQuery from "../../../../lib/db";

import { useRouter } from "next/router";
import { Button, Empty, FloatButton } from "antd";
import { EditFilled, PlusOutlined } from "@ant-design/icons";
import LayoutPercobaan from "../../../../components/LayoutPercobaan";
export default function JenisItem({ hasil }) {
  let semuaAkun;

  const router = useRouter();

  try {
    semuaAkun = hasil.map((x, index) => {
      return (
        <tr key={x.id_jenis}>
          <td className="is-vcentered">{index + 1}</td>
          <td className="is-vcentered">{x.nama}</td>
          <td className="is-vcentered" style={{ width: "20%" }}>
            <Button
              icon={<EditFilled />}
              onClick={() =>
                router.push(`/Produk/JenisItem/Edit/${x.id_jenis}`)
              }
              block
            />
          </td>
        </tr>
      );
    });
  } catch (e) {
    semuaAkun = (
      <tr>
        <td colSpan="4" className="is-vcentered">
          <div className="field">{hasil}</div>
          <Button type="primary" onClick={() => router.reload()}>
            Muat Ulang
          </Button>
        </td>
      </tr>
    );
  }

  return (
    <>
      <Head>
        <title>Jenis Item</title>
      </Head>
      <h1 className="title">Jenis Item</h1>

      {hasil.length !== 0 ? (
        <div className="table-container">
          <table className="table has-text-centered is-fullwidth">
            <thead>
              <tr>
                <th className="has-text-centered is-vcentered">No</th>
                <th className="has-text-centered is-vcentered">Nama</th>
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
        tooltip="Tambah Jenis"
        onClick={() => router.push("/Produk/JenisItem/TambahJenis")}
      />
    </>
  );
}

export async function getServerSideProps() {
  const query = "select nama,id_jenis from jenis order by id_jenis";
  const values = [];
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

JenisItem.getLayout = function getLayout(page) {
  return (
    <LayoutPercobaan clicked="/Produk/JenisItem" sub="Produk">
      {page}
    </LayoutPercobaan>
  );
};
