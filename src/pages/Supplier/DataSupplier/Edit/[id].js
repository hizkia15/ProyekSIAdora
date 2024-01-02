import Head from "next/head";
import handlerQuery from "../../../../../lib/db";
import { Field, Dropdown } from "../../../../../components/AllComponent";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Modal, Popconfirm, Result } from "antd";
import axios from "axios";
import {
  faCity,
  faFaceFrown,
  faMapMarkedAlt,
  faPhone,
  faSignature,
  faTags,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutPercobaan from "../../../../../components/LayoutPercobaan";
export default function Edit({ hasil, DaftarKota }) {
  const [field, setField] = useState({
    "Kode Supplier": hasil[0].kode_supplier,
    "Nama Supplier": hasil[0].nama_supplier,
    Alamat: hasil[0].alamat,
    Kota: hasil[0].id_kota,
    "No HP": hasil[0].no_hp,
    "Kode Supplier Checked": true,
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
      id_supplier: Router.query.id,
    });
    return res.data;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/api/EditSupplier", {
        Kode_Supplier: field["Kode Supplier"],
        Nama_Supplier: field["Nama Supplier"],
        Alamat: field.Alamat,
        Kota: field.Kota,
        No_HP: field["No HP"],
        Id_Supplier: Router.query.id,
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
        <title>Edit Supplier</title>
      </Head>
      <h1 className="title">Edit Supplier</h1>

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
        title="Mengedit Data Supplier"
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
                    onClick={() => Router.push("/Supplier/DataSupplier")}
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
  const query =
    "select kode_supplier, nama_supplier,alamat, no_hp, supplier.id_kota,kota.tipe,kota.nama_kota " +
    "from supplier inner join kota on supplier.id_kota=kota.id_kota where id_supplier=?";
  const values = [context.query.id];

  const query2 =
    "select id_kota,nama_kota,tipe from kota order by nama_kota,tipe";

  try {
    const getData = await handlerQuery({ query, values });
    const hasil = JSON.parse(JSON.stringify(getData));

    const getData2 = await handlerQuery({ query: query2, values: [] });
    const DaftarKota = JSON.parse(JSON.stringify(getData2));

    for (let item in DaftarKota) {
      DaftarKota[item].nama_kota =
        DaftarKota[item].tipe + " " + DaftarKota[item].nama_kota;
    }

    return {
      props: {
        hasil,
        DaftarKota,
      },
    };
  } catch (e) {
    return {
      props: {
        hasil: e.message,
        DaftarKota: [{ id_kota: "", nama_kota: "", tipe: "" }],
      },
    };
  }
}

Edit.getLayout = function getLayout(page) {
  return (
    <LayoutPercobaan clicked="/Supplier/DataSupplier" sub="Supplier">
      {page}
    </LayoutPercobaan>
  );
};
