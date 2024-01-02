import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { FieldKhusus } from "../../../../components/AllComponent";
import { faCity, faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Popconfirm, Result } from "antd";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import LayoutPercobaan from "../../../../components/LayoutPercobaan";

export default function TambahKota() {
  let [tipe, setTipe] = useState("KAB.");
  const [field, setField] = useState({
    "Nama Kota atau Kab": "",
    "Nama Kota atau Kab Checked": false,
  });
  const [modal, setModal] = useState({
    pesan: undefined,
    isSuccess: true,
    open: false,
  });

  const submit = field["Nama Kota atau Kab Checked"] === true;

  const Router = useRouter();

  const onChangeNamaKota = async (Nama) => {
    if (Nama === "") {
      return "default";
    }
    const res = await axios.post("/api/CheckKota", {
      sendNamaKota: Nama,
      tujuan: "add",
      tipe: tipe,
    });
    return res.data;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/TambahKota", {
        namaKota: field["Nama Kota atau Kab"],
        tipe: tipe,
      });
      setModal({ pesan: res.data, isSuccess: true, open: true });
    } catch (e) {
      setModal({
        pesan: e.response.data,
        isSuccess: false,
        open: true,
      });
    }
  };

  const onChangeTipe = async (e) => {
    tipe = e.target.value;
    setTipe(e.target.value);
    runCode();
  };

  const runCode = () => {
    const a = document.getElementById("a");
    const event = new Event("input", { bubbles: true });
    a.dispatchEvent(event);
  };
  return (
    <>
      <Head>
        <title>Tambah Kota</title>
      </Head>
      <h1 className="title">Tambah Kota</h1>
      <div className="field control has-icons-left">
        <label className="label">Tipe</label>

        <div className="select">
          <select value={tipe} id="b" onChange={onChangeTipe}>
            <option value="KAB.">KAB.</option>
            <option value="KOTA">KOTA</option>
          </select>
          <span className="icon is-left">
            <FontAwesomeIcon icon={faCity} />
          </span>
        </div>
      </div>

      <FieldKhusus
        nama="Nama Kota atau Kab"
        value={field["Nama Kota atau Kab"]}
        onChange={setField}
        field={field}
        IconLeft={faCity}
        maxLength="50"
        fungsiCheck={onChangeNamaKota}
        id="a"
      />
      <Popconfirm
        title="Mengumpulkan Data Kota"
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
                    Lanjut Menambahkan Data Kota
                  </Button>,
                  <Button
                    key="kembali"
                    type="default"
                    style={{ marginTop: "5px" }}
                    icon={<ArrowLeftOutlined />}
                    onClick={() => Router.push("/Supplier/Kota")}
                  >
                    Kembali Ke Kota
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
TambahKota.getLayout = function getLayout(page) {
  return (
    <LayoutPercobaan clicked="/Supplier/Kota" sub="Supplier">
      {page}
    </LayoutPercobaan>
  );
};
