import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { Field } from "../../../../components/AllComponent";
import {
  faFaceFrown,
  faPrescriptionBottle,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Popconfirm, Result } from "antd";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutPercobaan from "../../../../components/LayoutPercobaan";

export default function TambahSatuan() {
  const [field, setField] = useState({
    "Nama Satuan": "",
    "Nama Satuan Checked": false,
  });
  const [modal, setModal] = useState({
    pesan: undefined,
    isSuccess: true,
    open: false,
  });

  const submit = field["Nama Satuan Checked"] === true;
  const router = useRouter();

  const onChangeNamaSatuan = async (Nama) => {
    if (Nama === "") {
      return "default";
    }
    const res = await axios.post("/api/CheckSatuan", {
      sendNamaSatuan: Nama,
      tujuan: "add",
    });

    return res.data;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/TambahSatuanItem", {
        namaSatuan: field["Nama Satuan"],
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
        <title>Tambah Satuan Item</title>
      </Head>
      <h1 className="title">Tambah Satuan Item</h1>

      <Field
        nama="Nama Satuan"
        value={field["Nama Satuan"]}
        onChange={setField}
        field={field}
        IconLeft={faPrescriptionBottle}
        maxLength="15"
        fungsiCheck={onChangeNamaSatuan}
      />
      <Popconfirm
        title="Mengumpulkan Data Satuan Item"
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
                    Lanjut Menambahkan Data Satuan Item
                  </Button>,
                  <Button
                    key="kembali"
                    type="default"
                    style={{ marginTop: "5px" }}
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.push("/Produk/SatuanItem")}
                  >
                    Kembali Ke Halaman Satuan Item
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
TambahSatuan.getLayout = function getLayout(page) {
  return (
    <LayoutPercobaan clicked="/Produk/SatuanItem" sub="Produk">
      {page}
    </LayoutPercobaan>
  );
};
