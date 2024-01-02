import Head from "next/head";
import handlerQuery from "../../../../../lib/db";
import { Field, Dropdown } from "../../../../../components/AllComponent";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { Button, Modal, Popconfirm, Result } from "antd";
import {
  faCapsules,
  faChartBar,
  faCubes,
  faFaceFrown,
  faPercent,
  faPills,
  faPrescriptionBottle,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutPercobaan from "../../../../../components/LayoutPercobaan";

export default function Edit({ hasil, rak, satuan, jenis }) {
  const [field, setField] = useState({
    Nama: hasil[0].nama,
    "Stok Minimum": hasil[0].stok_min,
    Rak: hasil[0].id_rak,
    Satuan: hasil[0].id_satuan,
    Jenis: hasil[0].id_jenis_item,
    "Nama Checked": true,
    Margin: hasil[0].margin,
  });
  const [modal, setModal] = useState({
    pesan: undefined,
    isSuccess: true,
    open: false,
  });
  const submit =
    field["Nama Checked"] === true &&
    field.Margin > 0 &&
    field["Stok Minimum"] > 0;

  const Router = useRouter();
  const onChangeNamaItem = async (Nama) => {
    if (Nama === "") {
      return "default";
    }
    const res = await axios.post("/api/CheckNamaItem", {
      NamaItem: Nama,
      IdItem: Router.query.id,
    });
    return res.data;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/api/EditItem", {
        Nama: field.Nama,
        Stok_Minimum: field["Stok Minimum"],
        Rak: field.Rak,
        Satuan: field.Satuan,
        Jenis: field.Jenis,
        IdItem: Router.query.id,
        Margin: field.Margin,
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
        <title>Edit Item</title>
      </Head>
      <h1 className="title">Edit Item</h1>

      <Field
        nama="Nama"
        value={field.Nama}
        onChange={setField}
        field={field}
        IconLeft={faCapsules}
        maxLength="50"
        fungsiCheck={onChangeNamaItem}
      />
      <Field
        nama="Stok Minimum"
        value={field["Stok Minimum"]}
        onChange={setField}
        field={field}
        IconLeft={faChartBar}
        type="number"
        min="0"
      />
      <Field
        nama="Margin"
        value={field.Margin}
        onChange={setField}
        field={field}
        IconLeft={faPercent}
        type="number"
        min="0"
      />

      <Dropdown
        nama="Rak"
        value={field.Rak}
        onChange={setField}
        field={field}
        arr={rak}
        mappingElement={["id_rak", "nama_rak"]}
        icon={faCubes}
      />

      <Dropdown
        nama="Satuan"
        value={field.Satuan}
        onChange={setField}
        field={field}
        arr={satuan}
        mappingElement={["id_satuan", "nama"]}
        icon={faPrescriptionBottle}
      />

      <Dropdown
        nama="Jenis"
        value={field.Jenis}
        onChange={setField}
        field={field}
        arr={jenis}
        mappingElement={["id_jenis", "nama"]}
        icon={faPills}
      />

      <Popconfirm
        title="Mengedit Data Item"
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
                    onClick={() => Router.push("/Produk/DaftarItem?p=1")}
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
    "select item.nama,stok_min,item.id_rak,item.id_satuan,item.id_jenis_item,margin," +
    "rak.nama_rak as namaRak,satuan.nama as namaSatuan,jenis.nama as namaJenis " +
    "from item inner join rak on item.id_rak=rak.id_rak inner join satuan on item.id_satuan=satuan.id_satuan " +
    "inner join jenis on item.id_jenis_item=jenis.id_jenis " +
    "where id_item=?";
  const values = [context.query.id];

  const queryRak = "select id_rak,nama_rak from rak order by id_rak";
  const querySatuan = "select id_satuan,nama from satuan order by id_satuan";
  const queryJenis = "select id_jenis,nama from jenis order by id_jenis";

  try {
    const getData = await handlerQuery({ query, values });
    const hasil = JSON.parse(JSON.stringify(getData));
    const getRak = await handlerQuery({ query: queryRak, values: [] });
    const rak = JSON.parse(JSON.stringify(getRak));
    const getSatuan = await handlerQuery({ query: querySatuan, values: [] });
    const satuan = JSON.parse(JSON.stringify(getSatuan));
    const getJenis = await handlerQuery({ query: queryJenis, values: [] });
    const jenis = JSON.parse(JSON.stringify(getJenis));

    return {
      props: {
        hasil,
        rak,
        satuan,
        jenis,
      },
    };
  } catch (e) {
    return {
      props: {
        hasil: e.message,
        rak: [{ id_rak: "", nama_rak: "" }],
        satuan: [{ id_satuan: "", nama: "" }],
        jenis: [{ id_jenis: "", nama: "" }],
      },
    };
  }
}

Edit.getLayout = function getLayout(page) {
  return (
    <LayoutPercobaan clicked="/Produk/DaftarItem?p=1" sub="Produk">
      {page}
    </LayoutPercobaan>
  );
};
