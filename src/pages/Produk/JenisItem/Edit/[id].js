import Head from "next/head";

import handlerQuery from "../../../../../lib/db";
import { Field } from "../../../../../components/AllComponent";

import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import {
  faFaceFrown,
  faPills,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Popconfirm, Result } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutPercobaan from "../../../../../components/LayoutPercobaan";
export default function Edit({ hasil }) {
  const [field, setField] = useState({
    "Nama Jenis Item": hasil[0].nama,
    "Nama Jenis Item Checked": true,
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
      tujuan: "edit",
      id: router.query.id,
    });
    return res.data;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/api/EditJenis", {
        namaJenis: field["Nama Jenis Item"],
        id: router.query.id,
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
        <title>Edit Jenis Item</title>
      </Head>
      <h1 className="title">Edit Jenis Item</h1>

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
        title="Mengedit Data Jenis Item"
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
                    onClick={() => router.push("/Produk/JenisItem")}
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
  const query = "select nama from jenis where id_jenis=?";
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
    <LayoutPercobaan clicked="/Produk/JenisItem" sub="Produk">
      {page}
    </LayoutPercobaan>
  );
};
