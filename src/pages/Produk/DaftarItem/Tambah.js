import Head from "next/head";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Field, Dropdown } from "../../../../components/AllComponent";
import handlerQuery from "../../../../lib/db";
import {
  faCapsules,
  faChartBar,
  faCubes,
  faFaceFrown,
  faPercent,
  faPills,
  faPrescriptionBottle,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Popconfirm, Result } from "antd";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutPercobaan from "../../../../components/LayoutPercobaan";

export default function TambahItem({ rak, satuan, jenis }) {
  const [field, setField] = useState({
    Nama: "",
    "Stok Minimum": 0,
    Rak: rak[0].id_rak,
    Satuan: satuan[0].id_satuan,
    Jenis: jenis[0].id_jenis,
    "Nama Checked": false,
    Margin: 0,
  });
  const [modal, setModal] = useState({
    pesan: undefined,
    isSuccess: true,
    open: false,
  });
  const submit =
    field["Nama Checked"] === true &&
    field.Margin > 0 &&
    field["Stok Minimum"] > 0;
  const Router = useRouter();
  const onChangeNamaItem = async (Nama) => {
    if (Nama === "") {
      return "default";
    }
    const res = await axios.post("/api/CheckNamaItem", {
      NamaItem: Nama,
    });
    return res.data;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/TambahItem", {
        Nama: field.Nama,
        Stok_Minimum: field["Stok Minimum"],
        Rak: field.Rak,
        Satuan: field.Satuan,
        Jenis: field.Jenis,
        Margin: field.Margin,
      });
      setModal({
        pesan: res.data,
        isSuccess: true,
        open: true,
      });
    } catch (e) {
      setModal({
        pesan: e.response.data,
        isSuccess: false,
        open: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Tambah Item</title>
      </Head>
      <h1 className="title">Tambah Item</h1>

      <Field
        nama="Nama"
        value={field.Nama}
        onChange={setField}
        field={field}
        IconLeft={faCapsules}
        maxLength="50"
        fungsiCheck={onChangeNamaItem}
      />
      <Field
        nama="Stok Minimum"
        value={field["Stok Minimum"]}
        onChange={setField}
        field={field}
        IconLeft={faChartBar}
        type="number"
        min="0"
      />
      <Field
        nama="Margin"
        value={field.Margin}
        onChange={setField}
        IconLeft={faPercent}
        type="number"
        field={field}
        min="0"
      />
      <Dropdown
        nama="Rak"
        value={field.Rak}
        onChange={setField}
        field={field}
        arr={rak}
        mappingElement={["id_rak", "nama_rak"]}
        icon={faCubes}
      />
      <Dropdown
        nama="Satuan"
        value={field.Satuan}
        onChange={setField}
        field={field}
        arr={satuan}
        mappingElement={["id_satuan", "nama"]}
        icon={faPrescriptionBottle}
      />
      <Dropdown
        nama="Jenis"
        value={field.Jenis}
        onChange={setField}
        field={field}
        arr={jenis}
        mappingElement={["id_jenis", "nama"]}
        icon={faPills}
      />
      <Popconfirm
        title="Mengumpulkan Data Item"
        description="Apakah anda yakin?"
        okText="Iya"
        cancelText="Tidak"
        onConfirm={onSubmit}
      >
        <Button type="primary" disabled={!submit} size="large">
          Submit
        </Button>
      </Popconfirm>
      <Modal open={modal.open} closeIcon={false} footer={null}>
        <Result
          status={modal.isSuccess === true ? "success" : "error"}
          title={modal.pesan}
          extra={
            modal.isSuccess === true
              ? [
                  <Button
                    type="primary"
                    key="lanjut"
                    icon={<ReloadOutlined />}
                    onClick={() => Router.reload()}
                  >
                    Lanjut Menambahkan Data Item
                  </Button>,
                  <Button
                    key="kembali"
                    type="default"
                    style={{ marginTop: "5px" }}
                    icon={<ArrowLeftOutlined />}
                    onClick={() => Router.push("/Produk/DaftarItem?p=1")}
                  >
                    Kembali Ke Halaman Daftar Item
                  </Button>,
                ]
              : [
                  <Button
                    danger
                    type="primary"
                    onClick={() => setModal({ ...modal, open: false })}
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
TambahItem.getLayout = function getLayout(page) {
  return (
    <LayoutPercobaan clicked="/Produk/DaftarItem?p=1" sub="Produk">
      {page}
    </LayoutPercobaan>
  );
};

export async function getServerSideProps() {
  const query1 = "select id_rak,nama_rak from rak order by id_rak";
  const query2 = "select id_satuan,nama from satuan order by id_satuan";
  const query3 = "select id_jenis,nama from jenis order by id_jenis";
  try {
    const getRak = await handlerQuery({ query: query1, values: [] });
    const rak = JSON.parse(JSON.stringify(getRak));
    const getSatuan = await handlerQuery({ query: query2, values: [] });
    const satuan = JSON.parse(JSON.stringify(getSatuan));
    const getJenis = await handlerQuery({ query: query3, values: [] });
    const jenis = JSON.parse(JSON.stringify(getJenis));
    return {
      props: {
        rak,
        satuan,
        jenis,
      },
    };
  } catch (e) {
    return {
      props: {
        rak: [{ id_rak: "", nama_rak: "" }],
        satuan: [{ id_satuan: "", nama: "" }],
        jenis: [{ id_jenis: "", nama: "" }],
      },
    };
  }
}
