import Head from "next/head";
import { Field, Dropdown, rupiah } from "../../../../components/AllComponent";
import { useState } from "react";
import handlerQuery from "../../../../lib/db";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  faFaceFrown,
  faReceipt,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Popconfirm, Result, Select, notification } from "antd";
import { NumericFormat } from "react-number-format";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutPercobaan from "../../../../components/LayoutPercobaan";
export default function Tambah({ supplier, item }) {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = () => {
    api["error"]({
      message: "Gagal memasukkan produk",
      description: "Produk sudah pernah dimasukkan!",
      placement: "top",
    });
  };

  const [field, setField] = useState({
    "No Faktur": "",
    "No Faktur Checked": false,
    Supplier: supplier[0].id_supplier,
  });
  const [modal, setModal] = useState({
    pesan: undefined,
    isSuccess: true,
    open: false,
  });
  const router = useRouter();
  const { data: session, status } = useSession({ required: true });
  const idUser = status === "authenticated" && session.user.idUser;
  const [detail, setDetail] = useState([
    {
      IdItem: undefined,
      Jenis: undefined,
      Satuan: undefined,
      Jumlah_Item: undefined,
      Harga_Beli: undefined,
      Subtotal: undefined,
      Margin: undefined,
    },
  ]);

  const CheckedDetail = () => {
    let rightDetail = 0;
    for (let i = 0; i < detail.length; i++) {
      if (
        detail[i].IdItem !== undefined &&
        (detail[i].Jenis !== undefined ||
          detail[i].Jenis !== "GAGAL MENDAPAT INFO") &&
        (detail[i].Satuan !== undefined ||
          detail[i].Satuan !== "GAGAL MENDAPAT INFO") &&
        (detail[i].Margin !== undefined ||
          detail[i].Margin !== "GAGAL MENDAPAT INFO") &&
        detail[i].Jumlah_Item !== undefined &&
        detail[i].Harga_Beli !== undefined &&
        detail[i].Subtotal !== undefined
      ) {
        rightDetail = rightDetail + 1;
      }
    }
    if (rightDetail !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const detailChecked = CheckedDetail();

  const submit = field["No Faktur Checked"] === true && detailChecked === true;

  const onChangeName = async (Id, index) => {
    const arrDetail = [...detail];

    if (Id === undefined) {
      const hasil = {
        ...detail[index],
        IdItem: Id,
        Jenis: undefined,
        Satuan: undefined,
        Margin: undefined,
      };
      arrDetail[index] = hasil;
      setDetail(arrDetail);
    } else {
      const sameId = arrDetail.filter((item) => {
        if (item.IdItem === Id) {
          return true;
        }
      });
      if (sameId.length > 0) {
        const hasil = {
          ...detail[index],
          IdItem: null,
        };
        arrDetail[index] = hasil;
        setDetail(arrDetail);
        openNotificationWithIcon();
      } else {
        try {
          const res = await axios.get("/api/GetInfoItem?idItem=" + Id);
          const data = res.data;
          const hasil = {
            ...detail[index],
            IdItem: Id,
            Jenis: data[0].nama_jenis,
            Satuan: data[0].nama_satuan,
            Margin: data[0].margin,
          };
          arrDetail[index] = hasil;
          setDetail(arrDetail);
        } catch (er) {
          const hasil = {
            ...detail[index],
            IdItem: Id,
            Jenis: er.response.data,
            Satuan: er.response.data,
            Margin: er.response.data,
          };
          arrDetail[index] = hasil;
          setDetail(arrDetail);
        }
      }
    }
  };
  const onChangeJumlah = (jumlah, index) => {
    const arrDetail = [...detail];
    const hasil = {
      ...detail[index],
      Jumlah_Item: jumlah,
      Subtotal: jumlah * detail[index].Harga_Beli,
    };
    arrDetail[index] = hasil;

    setDetail(arrDetail);
  };
  const onChangeHarga = (harga, index) => {
    const arrDetail = [...detail];
    const hasil = {
      ...detail[index],
      Harga_Beli: harga,
      Subtotal: harga * detail[index].Jumlah_Item,
    };
    arrDetail[index] = hasil;
    setDetail(arrDetail);
  };
  const tambahBaris = () => {
    const detailBaru = [...detail];
    const objBaru = {
      IdItem: undefined,
      Jenis: undefined,
      Satuan: undefined,
      Jumlah_Item: undefined,
      Harga_Beli: undefined,
      Subtotal: undefined,
      Margin: undefined,
    };
    detailBaru.push(objBaru);
    setDetail(detailBaru);
  };
  const hapusBaris = (index) => {
    const arrDetail = [...detail];
    arrDetail.splice(index, 1);
    setDetail(arrDetail);
  };
  const onChangeFaktur = async (Faktur) => {
    if (Faktur === "") {
      return "default";
    }
    const res = await axios.post("/api/CheckFaktur", {
      sendFaktur: Faktur,
    });
    return res.data;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const arrDetail = [];

    for (let i = 0; i < detail.length; i++) {
      if (
        detail[i].IdItem !== undefined &&
        (detail[i].Jenis !== undefined ||
          detail[i].Jenis !== "GAGAL MENDAPAT INFO") &&
        (detail[i].Satuan !== undefined ||
          detail[i].Satuan !== "GAGAL MENDAPAT INFO") &&
        (detail[i].Margin !== undefined ||
          detail[i].Margin !== "GAGAL MENDAPAT INFO") &&
        detail[i].Jumlah_Item !== undefined &&
        detail[i].Harga_Beli !== undefined &&
        detail[i].Subtotal !== undefined
      ) {
        arrDetail.push(detail[i]);
      }
    }
    try {
      const res = await axios.post("/api/TambahTransaksiPemb", {
        faktur: field["No Faktur"],
        idUser,
        supplier: field.Supplier,
        sendDetail: arrDetail,
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

  const filterOption = (input, option) =>
    (option?.nama ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Head>
        <title>Tambah Transaksi Pembelian</title>
      </Head>
      <h1 className="title">Tambah Transaksi Pembelian</h1>
      {contextHolder}

      <Field
        nama="No Faktur"
        value={field["No Faktur"]}
        onChange={setField}
        IconLeft={faReceipt}
        field={field}
        maxLength="50"
        fungsiCheck={onChangeFaktur}
      />
      <Dropdown
        nama="Supplier"
        value={field.Supplier}
        onChange={setField}
        arr={supplier}
        field={field}
        mappingElement={["id_supplier", "nama_supplier"]}
        icon={faUserTie}
      />

      <div id="detail" className="field">
        <label className="label">Detail</label>
        <table className="table has-text-centered is-fullwidth">
          <thead>
            <tr>
              <th className="has-text-centered is-vcentered"></th>
              <th className="has-text-centered is-vcentered">Nama Item</th>
              <th className="has-text-centered is-vcentered">Jenis</th>
              <th className="has-text-centered is-vcentered">Satuan</th>
              <th className="has-text-centered is-vcentered">Margin (%)</th>
              <th className="has-text-centered is-vcentered">Jumlah Item</th>
              <th className="has-text-centered is-vcentered">
                Harga Beli/Satuan (RP)
              </th>
              <th className="has-text-centered is-vcentered">Subtotal</th>
              <th className="has-text-centered is-vcentered"></th>
            </tr>
          </thead>
          <tbody>
            {detail.map((x, index) => {
              return (
                <tr key={index}>
                  <td className="is-vcentered">
                    {x.IdItem !== undefined &&
                      (x.Jenis !== undefined ||
                        x.Jenis !== "GAGAL MENDAPAT INFO") &&
                      (x.Satuan !== undefined ||
                        x.Satuan !== "GAGAL MENDAPAT INFO") &&
                      (x.Margin !== undefined ||
                        x.Margin !== "GAGAL MENDAPAT INFO") &&
                      x.Jumlah_Item !== undefined &&
                      x.Harga_Beli !== undefined &&
                      x.Subtotal !== undefined && (
                        <CheckCircleOutlined style={{ color: "green" }} />
                      )}
                  </td>
                  <td className="is-vcentered" style={{ width: "30%" }}>
                    <div className="field">
                      <div className="control">
                        <Select
                          allowClear
                          showSearch
                          options={item}
                          fieldNames={{ label: "nama", value: "id_item" }}
                          filterOption={filterOption}
                          placeholder="Pilih Item"
                          size="large"
                          style={{ width: "100%" }}
                          value={detail[index].IdItem}
                          dropdownStyle={{ textAlign: "center" }}
                          onChange={(value) => onChangeName(value, index)}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="is-vcentered">{x.Jenis}</td>
                  <td className="is-vcentered">{x.Satuan}</td>
                  <td className="is-vcentered">{x.Margin}</td>
                  <td className="is-vcentered">
                    <NumericFormat
                      allowNegative={false}
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={0}
                      className="input has-text-centered"
                      value={x.Jumlah_Item}
                      onValueChange={(value) => {
                        onChangeJumlah(value.floatValue, index);
                      }}
                      isAllowed={(values) =>
                        values.floatValue === undefined || values.floatValue > 0
                      }
                    />
                  </td>
                  <td className="is-vcentered">
                    <NumericFormat
                      allowNegative={false}
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={0}
                      className="input has-text-centered"
                      value={x.Harga_Beli}
                      onValueChange={(value) => {
                        onChangeHarga(value.floatValue, index);
                      }}
                      prefix="Rp "
                      suffix=",00"
                      isAllowed={(values) =>
                        values.floatValue === undefined || values.floatValue > 0
                      }
                    />
                  </td>
                  <td className="is-vcentered">
                    {!isNaN(x.Subtotal) ? rupiah.format(x.Subtotal) : undefined}
                  </td>
                  <td className="is-vcentered">
                    <button
                      type="button"
                      className="delete"
                      aria-label="close"
                      onClick={(e) => hapusBaris(index)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          className="button is-medium"
          type="button"
          onClick={() => tambahBaris()}
        >
          +
        </button>
      </div>

      <Popconfirm
        title="Menambah Transaksi Pembelian"
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
                    Lanjut Menambahkan Transaksi Pembelian
                  </Button>,
                  <Button
                    key="kembali"
                    type="default"
                    style={{ marginTop: "5px" }}
                    icon={<ArrowLeftOutlined />}
                    onClick={() =>
                      router.push("/Transaksi/TransaksiPembelian?p=1")
                    }
                  >
                    Kembali Ke Halaman Transaksi Pembelian
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
    "select id_supplier,nama_supplier from supplier where status=1 order by id_supplier";
  const queryItem =
    "select id_item,nama from item where status=1 order by id_item";
  try {
    const getSupplier = await handlerQuery({ query, values: [] });
    const supplier = JSON.parse(JSON.stringify(getSupplier));
    const getItem = await handlerQuery({ query: queryItem, values: [] });
    const item = JSON.parse(JSON.stringify(getItem));
    return {
      props: {
        supplier,
        item,
      },
    };
  } catch (e) {
    return {
      props: {
        supplier: [{ id_supplier: "", nama_supplier: "" }],
        item: [{ id_item: "", nama: "" }],
      },
    };
  }
}

Tambah.getLayout = function getLayout(page) {
  return (
    <LayoutPercobaan
      clicked="/Transaksi/TransaksiPembelian?p=1"
      sub="Rekap Transaksi"
    >
      {page}
    </LayoutPercobaan>
  );
};
