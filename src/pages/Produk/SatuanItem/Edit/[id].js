import Head from "next/head";

import handlerQuery from "../../../../../lib/db";

import { useRouter } from "next/router";
import { useState } from "react";

import axios from "axios";

import { Field } from "../../../../../components/AllComponent";
import {
  faFaceFrown,
  faPrescriptionBottle,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Popconfirm, Result } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutPercobaan from "../../../../../components/LayoutPercobaan";

export default function Edit({ hasil }) {
  const [field, setField] = useState({
    "Nama Satuan": hasil[0].nama,
    "Nama Satuan Checked": true,
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
      tujuan: "edit",
      id: router.query.id,
    });

    return res.data;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/api/EditSatuan", {
        namaSatuan: field["Nama Satuan"],
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
        <title>Edit Satuan Item</title>
      </Head>
      <h1 className="title">Edit Satuan Item</h1>

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
        title="Mengedit Data Satuan Item"
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
                    onClick={() => router.push("/Produk/SatuanItem")}
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
  const query = "select nama from satuan where id_satuan=?";
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
    <LayoutPercobaan clicked="/Produk/SatuanItem" sub="Produk">
      {page}
    </LayoutPercobaan>
  );
};
