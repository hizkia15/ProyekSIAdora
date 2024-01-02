import Head from "next/head";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { Field } from "../../../../components/AllComponent";
import { faFaceFrown, faPills } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Popconfirm, Result } from "antd";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutPercobaan from "../../../../components/LayoutPercobaan";

export default function TambahJenis() {
  const [field, setField] = useState({
    "Nama Jenis Item": "",
    "Nama Jenis Item Checked": false,
  });
  const [modal, setModal] = useState({
    pesan: undefined,
    isSuccess: true,
    open: false,
  });
  const submit = field["Nama Jenis Item Checked"] === true;
  const router = useRouter();

  const onChangeNamaJenis = async (Nama) => {
    if (Nama === "") {
      return "default";
    }
    const res = await axios.post("/api/CheckJenis", {
      sendNamaJenis: Nama,
      tujuan: "add",
    });
    return res.data;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/TambahJenisItem", {
        namaJenis: field["Nama Jenis Item"],
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
        <title>Tambah Jenis Item</title>
      </Head>
      <h1 className="title">Tambah Jenis Item</h1>

      <Field
        nama="Nama Jenis Item"
        value={field["Nama Jenis Item"]}
        onChange={setField}
        field={field}
        IconLeft={faPills}
        maxLength="15"
        fungsiCheck={onChangeNamaJenis}
      />
      <Popconfirm
        title="Mengumpulkan Data Jenis"
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
                    onClick={() => router.reload()}
                  >
                    Lanjut Menambahkan Data Jenis Item
                  </Button>,
                  <Button
                    key="kembali"
                    type="default"
                    style={{ marginTop: "5px" }}
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.push("/Produk/JenisItem")}
                  >
                    Kembali Ke Halaman Jenis Item
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
TambahJenis.getLayout = function getLayout(page) {
  return (
    <LayoutPercobaan clicked="/Produk/JenisItem" sub="Produk">
      {page}
    </LayoutPercobaan>
  );
};
