import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Field } from "../../../../components/AllComponent";
import { faCubes, faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Popconfirm, Result } from "antd";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutPercobaan from "../../../../components/LayoutPercobaan";

export default function TambahRak() {
  const [field, setField] = useState({
    "Nama Rak": "",
    "Nama Rak Checked": false,
  });
  const [modal, setModal] = useState({
    pesan: undefined,
    isSuccess: true,
    open: false,
  });

  const submit = field["Nama Rak Checked"] === true;
  const router = useRouter();

  const onChangeNamaRak = async (Nama) => {
    if (Nama === "") {
      return "default";
    }
    const res = await axios.post("/api/CheckRak", {
      sendNamaRak: Nama,
      tujuan: "add",
    });
    return res.data;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/TambahRakA", {
        namaRak: field["Nama Rak"],
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
        <title>Tambah Rak</title>
      </Head>
      <h1 className="title">Tambah Rak</h1>

      <Field
        nama="Nama Rak"
        value={field["Nama Rak"]}
        onChange={setField}
        field={field}
        IconLeft={faCubes}
        maxLength="15"
        fungsiCheck={onChangeNamaRak}
      />

      <Popconfirm
        title="Mengumpulkan Data Rak"
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
                    Lanjut Menambahkan Data Rak
                  </Button>,
                  <Button
                    key="kembali"
                    type="default"
                    style={{ marginTop: "5px" }}
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.push("/Produk/Rak")}
                  >
                    Kembali Ke Halaman Rak
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
TambahRak.getLayout = function getLayout(page) {
  return (
    <LayoutPercobaan clicked="/Produk/Rak" sub="Produk">
      {page}
    </LayoutPercobaan>
  );
};
