import Head from "next/head";
import handlerQuery from "../../../../../lib/db";

import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

import { Field } from "../../../../../components/AllComponent";
import {
  faCubes,
  faFaceFrown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Popconfirm, Result } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutPercobaan from "../../../../../components/LayoutPercobaan";
export default function Edit({ hasil }) {
  const [field, setField] = useState({
    "Nama Rak": hasil[0].nama_rak,
    "Nama Rak Checked": true,
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
      tujuan: "edit",
      id: router.query.id,
    });
    return res.data;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/api/EditRak", {
        namaRak: field["Nama Rak"],
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
        <title>Edit Rak</title>
      </Head>
      <h1 className="title">Edit Rak</h1>

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
        title="Mengedit Data Rak"
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
                    onClick={() => router.push("/Produk/Rak")}
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
  const query = "select nama_rak from rak where id_rak=?";
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
    <LayoutPercobaan clicked="/Produk/Rak" sub="Produk">
      {page}
    </LayoutPercobaan>
  );
};
