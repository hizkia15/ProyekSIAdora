import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Field, Dropdown } from "../../../../components/AllComponent";
import handlerQuery from "../../../../lib/db";
import {
  faCity,
  faFaceFrown,
  faMapMarkedAlt,
  faPhone,
  faSignature,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

import { Button, Modal, Popconfirm, Result } from "antd";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutPercobaan from "../../../../components/LayoutPercobaan";

export default function TambahSupplier({ DaftarKota }) {
  const [field, setField] = useState({
    "Kode Supplier": "",
    "Nama Supplier": "",
    Alamat: "",
    Kota: DaftarKota[0].id_kota,
    "No HP": "",
    "Kode Supplier Checked": false,
  });
  const [modal, setModal] = useState({
    pesan: undefined,
    isSuccess: true,
    open: false,
  });

  const submit =
    field["Kode Supplier Checked"] === true &&
    field["Nama Supplier"] !== "" &&
    field.Alamat !== "" &&
    field["No HP"] !== "";
  const Router = useRouter();
  const onChangeKodeSupplier = async (Kode) => {
    if (Kode === "") {
      return "default";
    }
    const res = await axios.post("/api/CheckKodeSupp", {
      kode_supplier: Kode,
    });
    return res.data;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/TambahSupplier", {
        Kode_Supplier: field["Kode Supplier"],
        Nama_Supplier: field["Nama Supplier"],
        Alamat: field.Alamat,
        Kota: field.Kota,
        No_HP: field["No HP"],
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
  return (
    <>
      <Head>
        <title>Tambah Supplier</title>
      </Head>
      <h1 className="title">Tambah Supplier</h1>

      <Field
        nama="Kode Supplier"
        value={field["Kode Supplier"]}
        onChange={setField}
        IconLeft={faTags}
        field={field}
        maxLength="5"
        fungsiCheck={onChangeKodeSupplier}
      />
      <Field
        nama="Nama Supplier"
        value={field["Nama Supplier"]}
        onChange={setField}
        IconLeft={faSignature}
        field={field}
        maxLength="20"
      />
      <Field
        nama="Alamat"
        value={field["Alamat"]}
        onChange={setField}
        IconLeft={faMapMarkedAlt}
        field={field}
        maxLength="100"
      />
      <Dropdown
        nama="Kota"
        value={field.Kota}
        onChange={setField}
        field={field}
        arr={DaftarKota}
        mappingElement={["id_kota", "nama_kota"]}
        icon={faCity}
      />

      <Field
        nama="No HP"
        value={field["No HP"]}
        onChange={setField}
        field={field}
        IconLeft={faPhone}
        maxLength="13"
      />
      <Popconfirm
        title="Mengumpulkan Data Supplier"
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
                    Lanjut Menambahkan Data Supplier
                  </Button>,
                  <Button
                    key="kembali"
                    type="default"
                    style={{ marginTop: "5px" }}
                    icon={<ArrowLeftOutlined />}
                    onClick={() => Router.push("/Supplier/DataSupplier")}
                  >
                    Kembali Ke Data Supplier
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

export async function getServerSideProps() {
  const query =
    "select id_kota,nama_kota,tipe from kota order by nama_kota,tipe";

  try {
    const getData = await handlerQuery({ query, values: [] });
    const DaftarKota = JSON.parse(JSON.stringify(getData));
    for (let item in DaftarKota) {
      DaftarKota[item].nama_kota =
        DaftarKota[item].tipe + " " + DaftarKota[item].nama_kota;
    }

    return {
      props: {
        DaftarKota,
      },
    };
  } catch (e) {
    return {
      props: {
        DaftarKota: [{ id_kota: "", nama_kota: "", tipe: "" }],
      },
    };
  }
}

TambahSupplier.getLayout = function getLayout(page) {
  return (
    <LayoutPercobaan clicked="/Supplier/DataSupplier" sub="Supplier">
      {page}
    </LayoutPercobaan>
  );
};
