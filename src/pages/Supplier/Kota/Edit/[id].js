import Head from "next/head";
import handlerQuery from "../../../../../lib/db";
import { FieldKhusus } from "../../../../../components/AllComponent";
import { useRouter } from "next/router";
import { useState } from "react";

import axios from "axios";
import {
  faCity,
  faFaceFrown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Popconfirm, Result } from "antd";
import LayoutPercobaan from "../../../../../components/LayoutPercobaan";
export default function Edit({ hasil }) {
  let [tipe, setTipe] = useState(hasil[0].tipe);
  const [field, setField] = useState({
    "Nama Kota atau Kab": hasil[0].nama_kota,
    "Nama Kota atau Kab Checked": true,
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
      tujuan: "edit",
      tipe: tipe,
      id: Router.query.id,
    });
    return res.data;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/api/EditKota", {
        namaKota: field["Nama Kota atau Kab"],
        id: Router.query.id,
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
        <title>Edit Kota</title>
      </Head>
      <h1 className="title">Edit Kota</h1>

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
        title="Mengedit Kota"
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
                    icon={<FontAwesomeIcon icon={faThumbsUp} />}
                    onClick={() => Router.push("/Supplier/Kota")}
                  >
                    OK
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

export async function getServerSideProps(context) {
  const query = "select nama_kota,tipe from kota where id_kota=?";
  const values = [context.query.id];
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

Edit.getLayout = function getLayout(page) {
  return (
    <LayoutPercobaan clicked="/Supplier/Kota" sub="Supplier">
      {page}
    </LayoutPercobaan>
  );
};
