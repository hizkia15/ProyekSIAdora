import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Pagination,
  rupiah,
  setHeaderForLaporan,
} from "../../../components/AllComponent";
import { Button, Radio, Space, Modal, Result, Card, Divider } from "antd";
import { NumericFormat } from "react-number-format";
import "jspdf-autotable";
import {
  PlusSquareOutlined,
  MinusSquareOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import handlerQuery from "../../../lib/db";

import axios from "axios";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import LayoutPercobaan from "../../../components/LayoutPercobaan";
import "dayjs/locale/id";
import jsPDF from "jspdf";
export default function Kasir({ dataProduk, jumlah }) {
  const router = useRouter();

  const [data, setData] = useState({
    Jenis_Pelanggan: router.query.Jenis,
    Tipe_Pembayaran: "cash",
    Potongan: 0,
    PotonganRupiah: 0,
    TotalSebelumPotongan: 0,
    Biaya_Racik: 0,
    Total_Tagihan: 0,
    Bayar: 0,
  });
  const [detailPenjualan, setDetailPenjualan] = useState([]);

  const [search, setSearch] = useState(router.query.Search);
  const { data: session, status } = useSession({ required: true });
  const idUser = status === "authenticated" && session.user.idUser;
  const [openModal, setOpenModal] = useState(false);

  const [modal, setModal] = useState({
    pesan: undefined,
    isSuccess: true,
    isModalClosed: true,
  });

  const hitungTotal = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i].subtotal;
    }

    const potongan = Math.ceil((sum * data.Potongan) / 100);
    const total = sum - potongan + data.Biaya_Racik;
    setData({
      ...data,
      Total_Tagihan: total,
      TotalSebelumPotongan: sum,
      PotonganRupiah: potongan,
    });
  };
  const belumbisaBayar = !(
    !isNaN(data.TotalSebelumPotongan) &&
    !isNaN(data.PotonganRupiah) &&
    !isNaN(data.Bayar) &&
    !isNaN(data.Biaya_Racik) &&
    detailPenjualan.length > 0 &&
    (data.Bayar >= data.Total_Tagihan ||
      (data.Bayar === 0 && data.Tipe_Pembayaran !== "cash"))
  );

  const produk = [...dataProduk];

  const halamanKeBerapa = (parseInt(router.query.p) - 1) * 10;
  let index = halamanKeBerapa;
  const produkMapping = produk.map((item) => {
    index = index + 1;
    return (
      <tr key={item.id_item}>
        <td className="is-vcentered">{index}</td>
        <td className="is-vcentered">{item.id_item}</td>
        <td className="is-vcentered">{item.nama_item}</td>
        <td className="is-vcentered">{item.stok}</td>
        <td className="is-vcentered">{item.nama_satuan}</td>
        <td className="is-vcentered">{item.nama_jenis}</td>
        <td className="is-vcentered has-text-right">
          {rupiah.format(item.harga)}
        </td>
        <td className="is-vcentered">{item.nama_rak}</td>
        <td className="is-vcentered">
          <Button
            type="primary"
            onClick={() => onTambahDetailPenjualan(item)}
            icon={<PlusOutlined />}
          />
        </td>
      </tr>
    );
  });

  const detailPenjualanMapping = detailPenjualan.map((item, index) => {
    return (
      <tr key={item.id_item}>
        <td className="is-vcentered" style={{ width: "5%" }}>
          {index + 1}
        </td>
        <td className="is-vcentered" style={{ width: "5%" }}>
          {item.id_item}
        </td>
        <td className="is-vcentered" style={{ width: "10%" }}>
          {item.nama_item}
        </td>
        <td className="is-vcentered has-text-right" style={{ width: "10%" }}>
          {rupiah.format(item.harga)}
        </td>
        <td className="is-vcentered" style={{ width: "45%" }}>
          <Space size="small">
            <Button
              icon={<MinusSquareOutlined />}
              onClick={() => kurangiJumlah(index)}
            />

            <NumericFormat
              className="input has-text-centered"
              thousandSeparator="."
              decimalSeparator=","
              allowLeadingZeros={false}
              allowNegative={false}
              decimalScale={0}
              onValueChange={(value) =>
                onChangeJumlahItem(value.floatValue, index)
              }
              value={item.jumlah}
              isAllowed={(values) =>
                values.floatValue === undefined ||
                (values.floatValue > 0 && values.floatValue <= item.batas)
              }
            />
            <Button
              onClick={() => tambahJumlah(index)}
              icon={<PlusSquareOutlined />}
            />
          </Space>
        </td>
        <td className="is-vcentered has-text-right" style={{ width: "20%" }}>
          {!isNaN(item.subtotal) && rupiah.format(item.subtotal)}
        </td>
        <td className="is-vcentered" style={{ width: "5%" }}>
          <button
            type="button"
            className="delete"
            aria-label="close"
            onClick={(e) => hapusBarisPadaDetailPenjualan(index)}
          />
        </td>
      </tr>
    );
  });

  const kurangiJumlah = (index) => {
    const arr = [...detailPenjualan];
    if (isNaN(arr[index].jumlah)) {
      arr[index].jumlah = 1;
      arr[index].subtotal = arr[index].harga * arr[index].jumlah;
      setDetailPenjualan(arr);
      hitungTotal(arr);
    } else {
      if (arr[index].jumlah - 1 >= 1) {
        arr[index].jumlah = arr[index].jumlah - 1;
        arr[index].subtotal = arr[index].harga * arr[index].jumlah;
        setDetailPenjualan(arr);
        hitungTotal(arr);
      } else if (arr[index].jumlah - 1 === 0) {
        hapusBarisPadaDetailPenjualan(index);
      }
    }
  };
  const tambahJumlah = (index) => {
    const arr = [...detailPenjualan];
    if (isNaN(arr[index].jumlah)) {
      arr[index].jumlah = 1;
      arr[index].subtotal = arr[index].harga * arr[index].jumlah;
      setDetailPenjualan(arr);
      hitungTotal(arr);
    } else {
      if (arr[index].jumlah + 1 <= arr[index].batas) {
        arr[index].jumlah = arr[index].jumlah + 1;
        arr[index].subtotal = arr[index].harga * arr[index].jumlah;
        setDetailPenjualan(arr);
        hitungTotal(arr);
      }
    }
  };
  const hapusBarisPadaDetailPenjualan = (index) => {
    const arr = [...detailPenjualan];
    arr.splice(index, 1);
    setDetailPenjualan(arr);
    hitungTotal(arr);
  };
  const onChangeJumlahItem = (value, idx) => {
    const arr = [...detailPenjualan];
    arr[idx].jumlah = value;
    arr[idx].subtotal = arr[idx].harga * value;

    setDetailPenjualan(arr);

    hitungTotal(arr);
  };
  const onChangeJenisPelanggan = (e) => {
    clearDetailPenjualan();
    if (e.target.value === "umum") {
      setData({
        ...data,
        Jenis_Pelanggan: e.target.value,
        Biaya_Racik: 0,
        PotonganRupiah: 0,
        TotalSebelumPotongan: 0,
        Total_Tagihan: 0,
      });
    } else {
      setData({
        ...data,
        Jenis_Pelanggan: e.target.value,
        PotonganRupiah: 0,
        TotalSebelumPotongan: 0,
        Total_Tagihan: 0,
      });
    }

    const bagi = router.asPath.split("?");
    const hrefDepan = bagi[0];
    const hrefBelakang = new URLSearchParams(bagi[1]);

    hrefBelakang.set("Jenis", e.target.value);

    hrefBelakang.set("p", 1);
    router.push(hrefDepan + "?" + hrefBelakang);
  };

  const clearDetailPenjualan = () => {
    setDetailPenjualan([]);
  };

  const onChangeTipePembayaran = (e) => {
    if (e.target.value !== "cash") {
      setData({ ...data, Tipe_Pembayaran: e.target.value, Bayar: 0 });
    } else {
      setData({ ...data, Tipe_Pembayaran: e.target.value });
    }
  };

  const onChangePotongan = (value) => {
    let sum = 0;
    for (let i = 0; i < detailPenjualan.length; i++) {
      sum += detailPenjualan[i].subtotal;
    }
    const potongan = Math.ceil((sum * value) / 100);
    const total = sum - potongan + data.Biaya_Racik;
    setData({
      ...data,
      Potongan: value,
      Total_Tagihan: total,
      TotalSebelumPotongan: sum,
      PotonganRupiah: potongan,
    });
  };

  const onChangeBiayaRacik = (value) => {
    let sum = 0;
    for (let i = 0; i < detailPenjualan.length; i++) {
      sum += detailPenjualan[i].subtotal;
    }
    const potongan = Math.ceil((sum * data.Potongan) / 100);
    const total = sum - potongan + value;
    setData({
      ...data,
      Biaya_Racik: value,
      Total_Tagihan: total,
      TotalSebelumPotongan: sum,
      PotonganRupiah: potongan,
    });
  };

  const onChangeBayar = (value) => {
    setData({ ...data, Bayar: value });
  };

  const onClickBayar = (e) => {
    setOpenModal(true);
  };

  const closeModal = (e) => {
    setOpenModal(false);
  };
  const onTambahDetailPenjualan = (item) => {
    const arr = [...detailPenjualan];

    let idxItemSama;
    const sameItem = arr.filter((i, idx) => {
      if (i.id_item === item.id_item) {
        idxItemSama = idx;
        return true;
      }
    });

    if (sameItem.length === 0) {
      const itemBaru = {
        id_item: item.id_item,
        nama_item: item.nama_item,
        harga: item.harga,
        jumlah: 1,
        batas: item.stok,
        subtotal: item.harga,
        satuan: item.nama_satuan,
      };
      arr.push(itemBaru);
      setDetailPenjualan(arr);
      hitungTotal(arr);
    } else {
      tambahJumlah(idxItemSama);
    }
  };

  let tungguSelesaiMengetik;
  let waktuTunggu = 1000;
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onKeyUp = () => {
    clearTimeout(tungguSelesaiMengetik);
    tungguSelesaiMengetik = setTimeout(selesaiTunggu, waktuTunggu);
  };

  const onKeyDown = () => {
    clearTimeout(tungguSelesaiMengetik);
  };

  const selesaiTunggu = () => {
    const bagi = router.asPath.split("?");
    const hrefDepan = bagi[0];
    const hrefBelakang = new URLSearchParams(bagi[1]);

    if (search !== "") {
      hrefBelakang.set("Search", search);
    } else {
      hrefBelakang.delete("Search");
    }

    hrefBelakang.set("p", 1);
    router.push(hrefDepan + "?" + hrefBelakang);
  };

  const submitDetailPenjualan = async () => {
    try {
      const res = await axios.post("/api/TambahTransaksiPenjualan", {
        data,
        detailPenjualan,
        idUser,
      });
      setModal({
        pesan: res.data,
        isSuccess: true,
        isModalClosed: false,
      });
    } catch (e) {
      setModal({
        pesan: e.response.data,
        isSuccess: false,
        isModalClosed: false,
      });
    }
  };

  const reset = () => {
    setDetailPenjualan([]);
    setData({
      Jenis_Pelanggan: "umum",
      Tipe_Pembayaran: "cash",
      Potongan: 0,
      PotonganRupiah: 0,
      TotalSebelumPotongan: 0,
      Biaya_Racik: 0,
      Total_Tagihan: 0,
      Bayar: 0,
    });
    router.push("/Kasir?p=1&Jenis=umum");
    setOpenModal(false);
    setModal({ ...modal, isModalClosed: true });
  };

  const printKonfirmasiPembayaran = () => {
    const doc = new jsPDF();
    console.log(detailPenjualan);
    doc.autoTable({
      columns: [
        { header: "Nama Item", dataKey: "nama_item" },
        { header: "Jumlah", dataKey: "jumlah" },
        { header: "Satuan", dataKey: "satuan" },
        { header: "Harga", dataKey: "harga" },
        { header: "Subtotal", dataKey: "subtotal" },
      ],
      body: detailPenjualan,
      columnStyles: {
        nama_item: { halign: "center", valign: "middle" },
        jumlah: { halign: "center", valign: "middle" },
        satuan: { halign: "center", valign: "middle" },
        harga: { halign: "center", valign: "middle" },
        subtotal: { halign: "center", valign: "middle" },
      },
      headStyles: { halign: "center", valign: "middle" },
      theme: "plain",
      didParseCell: (HookData) => {
        if (HookData.section === "body") {
          if (
            HookData.column.dataKey === "subtotal" ||
            HookData.column.dataKey === "harga"
          ) {
            HookData.cell.text = rupiah.format(HookData.cell.text);
          }
        }
      },
    });

    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.text(
      `Total Sebelum Potongan : ${rupiah.format(data.TotalSebelumPotongan)}`,
      10,
      doc.lastAutoTable.finalY + 10
    );
    doc.text(
      `Potongan : -${rupiah.format(data.PotonganRupiah)}`,
      10,
      doc.lastAutoTable.finalY + 20
    );
    doc.text(
      `Potongan : -${rupiah.format(data.PotonganRupiah)}`,
      10,
      doc.lastAutoTable.finalY + 20
    );
    doc.text(
      `Biaya Racik : +${rupiah.format(data.Biaya_Racik)}`,
      10,
      doc.lastAutoTable.finalY + 30
    );
    doc.text(
      `Total Tagihan : ${rupiah.format(data.Total_Tagihan)}`,
      10,
      doc.lastAutoTable.finalY + 40
    );
    doc.text(
      `Bayar : ${rupiah.format(data.Bayar)}`,
      10,
      doc.lastAutoTable.finalY + 50
    );
    doc.text(
      `Tipe Pembayaran : ${data.Tipe_Pembayaran.toUpperCase()}`,
      10,
      doc.lastAutoTable.finalY + 60
    );
    doc.text(
      `Kembali : ${
        data.Tipe_Pembayaran !== "cash"
          ? rupiah.format(0)
          : rupiah.format(data.Bayar - data.Total_Tagihan)
      }`,
      10,
      doc.lastAutoTable.finalY + 70
    );

    doc.output("dataurlnewwindow", { filename: "Konfirmasi Pembayaran" });
  };

  return (
    <>
      <Head>
        <title>Kasir</title>
      </Head>
      <h1 className="title" id="print2">
        Kasir
      </h1>
      <div className="columns">
        <div
          className="column is-8"
          style={{
            height: "50vh",
            overflowY: "auto",
            backgroundColor: "white",
          }}
        >
          <table className="table is-fullwidth has-text-centered">
            <thead>
              <tr>
                <th className="has-text-centered is-vcentered">No</th>
                <th className="has-text-centered is-vcentered">Kode Item</th>
                <th className="has-text-centered is-vcentered">Nama Item</th>
                <th className="has-text-centered is-vcentered">Harga</th>
                <th className="has-text-centered is-vcentered">Jumlah</th>
                <th className="has-text-centered is-vcentered">Subtotal</th>
                <th className="has-text-centered is-vcentered"></th>
              </tr>
            </thead>
            <tbody>{detailPenjualanMapping}</tbody>
          </table>
        </div>
        <div className="column is-4">
          <div className="columns">
            <div className="column is-6">
              <div className="field">
                <label className="label">Jenis Pelanggan</label>
                <Radio.Group
                  onChange={onChangeJenisPelanggan}
                  value={data.Jenis_Pelanggan}
                >
                  <Radio value="umum">UMUM</Radio>
                  <Radio value="resep">RESEP</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="column is-6">
              <div className="field">
                <label className="label">Tipe Pembayaran</label>
                <Radio.Group
                  onChange={onChangeTipePembayaran}
                  value={data.Tipe_Pembayaran}
                >
                  <Radio value="cash">CASH</Radio>
                  <Radio value="qris">QRIS</Radio>
                  <Radio value="debit">DEBIT</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column is-6">
              <div className="field">
                <label className="label">Potongan (%)</label>
                <NumericFormat
                  className="input has-text-centered"
                  thousandSeparator="."
                  decimalSeparator=","
                  allowLeadingZeros={false}
                  allowNegative={false}
                  decimalScale={0}
                  onValueChange={(value) => onChangePotongan(value.floatValue)}
                  value={data.Potongan}
                  isAllowed={(values) =>
                    values.floatValue === undefined ||
                    (values.floatValue >= 0 && values.floatValue <= 100)
                  }
                />
              </div>

              {/* <div className="field">
                <label className="label">Potongan (RP)</label>
                {data.PotonganRupiah}
              </div>
              <div className="field">
                <label className="label">Total Sebelum Potongan</label>
                {data.TotalSebelumPotongan}
              </div> */}
            </div>
            <div className="column is-6">
              <div className="field">
                <label className="label">Biaya Racik</label>
                <NumericFormat
                  disabled={data.Jenis_Pelanggan === "umum"}
                  allowNegative={false}
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={0}
                  className="input has-text-centered"
                  value={data.Biaya_Racik}
                  onValueChange={(value) => {
                    onChangeBiayaRacik(value.floatValue);
                  }}
                  prefix="Rp "
                  suffix=",00"
                  isAllowed={(values) =>
                    values.floatValue === undefined || values.floatValue >= 0
                  }
                />
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column is-6">
              <div className="field">
                <label className="label">Total Tagihan</label>
                <NumericFormat
                  readOnly={true}
                  allowNegative={false}
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={0}
                  className="input has-text-centered"
                  value={data.Total_Tagihan}
                  prefix="Rp "
                  suffix=",00"
                  isAllowed={(values) =>
                    values.floatValue === undefined || values.floatValue >= 0
                  }
                />
              </div>
            </div>

            <div className="column is-6">
              <div className="field">
                <label className="label">Bayar</label>
                <NumericFormat
                  disabled={data.Tipe_Pembayaran !== "cash"}
                  allowNegative={false}
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={0}
                  className="input has-text-centered"
                  value={data.Bayar}
                  onValueChange={(value) => {
                    onChangeBayar(value.floatValue);
                  }}
                  prefix="Rp "
                  suffix=",00"
                  isAllowed={(values) =>
                    values.floatValue === undefined || values.floatValue >= 0
                  }
                />
              </div>
            </div>
          </div>

          <div className="field is-grouped is-grouped-multiline">
            <div className="control">
              <button
                className="button is-success"
                onClick={onClickBayar}
                disabled={belumbisaBayar}
              >
                Bayar
              </button>
            </div>
            <div className="control">
              <button className="button is-link" onClick={reset}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column is-10">
          <h1 className="title">Daftar Item</h1>
        </div>
        <div className="column is-2">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Cari</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control has-addons-centered">
                  <input
                    type="text"
                    className="input"
                    value={search}
                    onChange={onChangeSearch}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    maxLength="100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table className="table has-text-centered is-fullwidth">
        <thead>
          <tr>
            <th className="has-text-centered is-vcentered">No</th>
            <th className="has-text-centered is-vcentered">Kode Item</th>
            <th className="has-text-centered is-vcentered">Nama Item</th>
            <th className="has-text-centered is-vcentered">Stok</th>
            <th className="has-text-centered is-vcentered">Satuan</th>
            <th className="has-text-centered is-vcentered">Jenis</th>
            <th className="has-text-centered is-vcentered">Harga</th>
            <th className="has-text-centered is-vcentered">Rak</th>
            <th className="has-text-centered is-vcentered"></th>
          </tr>
        </thead>
        <tbody>{produkMapping}</tbody>
      </table>
      <Pagination
        href={router.asPath}
        currentPage={router.query.p}
        jumlah={jumlah[0].jumlah}
      />

      <Modal
        centered
        open={openModal}
        title="Konfirmasi Pembayaran"
        onCancel={closeModal}
        onOk={submitDetailPenjualan}
      >
        <Card id="print">
          <div className="content">
            <h2>Daftar Belanjaan</h2>
            {detailPenjualan.map((item, index) => (
              <div
                key={item.id_item}
                className="is-flex is-justify-content-space-between mb-5"
              >
                <div className="is-flex is-flex-direction-column">
                  <p className="p-0">{item.nama_item}</p>
                  <p>
                    {`${item.jumlah} ${item.satuan} x `}{" "}
                    {rupiah.format(item.harga)}
                  </p>
                </div>
                <p className="is-align-self-flex-end">
                  {rupiah.format(item.subtotal)}
                </p>
              </div>
            ))}
          </div>

          <Divider />
          <div className="is-flex is-justify-content-space-between">
            <p>Total Sebelum Potongan</p>
            <p>{rupiah.format(data.TotalSebelumPotongan)}</p>
          </div>
          <div className="is-flex is-justify-content-space-between">
            <p>{`Potongan ${data.Potongan}%`}</p>
            <p>{rupiah.format(data.PotonganRupiah)}</p>
          </div>
          <div className="is-flex is-justify-content-space-between mb-5">
            <p>Biaya Racik</p>
            {rupiah.format(data.Biaya_Racik)}
          </div>
          <div className="is-flex is-justify-content-space-between">
            <p>Total Tagihan</p>
            {rupiah.format(data.Total_Tagihan)}
          </div>
          <div className="is-flex is-justify-content-space-between mb-5">
            <p>Bayar</p>
            <p>{`${
              data.Tipe_Pembayaran !== "cash"
                ? rupiah.format(data.Total_Tagihan)
                : rupiah.format(data.Bayar)
            }`}</p>
          </div>
          <div className="is-flex is-justify-content-space-between mb-5">
            <p>Tipe Pembayaran</p>
            <p>{data.Tipe_Pembayaran.toUpperCase()}</p>
          </div>

          <div className="content is-flex is-justify-content-space-between">
            <p className="is-size-6">Kembali</p>
            <p className="has-text-weight-bold is-size-5  has-text-success">
              {data.Tipe_Pembayaran !== "cash"
                ? rupiah.format(0)
                : rupiah.format(data.Bayar - data.Total_Tagihan)}
            </p>
          </div>
          <Button type="primary" onClick={printKonfirmasiPembayaran}>
            Print
          </Button>
        </Card>
      </Modal>

      <Modal open={!modal.isModalClosed} closeIcon={false} footer={null}>
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
                    onClick={reset}
                  >
                    OK
                  </Button>,
                ]
              : [
                  <Button
                    danger
                    type="primary"
                    onClick={() => setModal({ ...modal, isModalClosed: true })}
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
  let query =
    "SELECT  item.id_item, item.nama as nama_item, stok, satuan.nama as nama_satuan, jenis.nama as nama_jenis, history_harga_jual.harga, rak.nama_rak,history_harga_jual.tgl_akhir " +
    "FROM item " +
    "INNER JOIN satuan ON item.id_satuan = satuan.id_satuan " +
    "INNER JOIN jenis ON item.id_jenis_item = jenis.id_jenis " +
    "INNER JOIN rak ON item.id_rak = rak.id_rak " +
    "INNER JOIN history_harga_jual ON item.id_item = history_harga_jual.id_item " +
    "where history_harga_jual.tgl_akhir is null and item.stok>0 ";

  let queryJumlah =
    "SELECT  count(item.id_item) as jumlah " +
    "FROM item " +
    "INNER JOIN satuan ON item.id_satuan = satuan.id_satuan " +
    "INNER JOIN jenis ON item.id_jenis_item = jenis.id_jenis " +
    "INNER JOIN rak ON item.id_rak = rak.id_rak " +
    "INNER JOIN history_harga_jual ON item.id_item = history_harga_jual.id_item " +
    "where history_harga_jual.tgl_akhir is null and item.stok>0 ";

  const { p, Search, Jenis } = context.query;
  const values = [];
  if (Jenis === "umum") {
    query = query + " and jenis.nama!=? ";
    queryJumlah = queryJumlah + " and jenis.nama!=? ";
    values.push("KERAS");
  }

  if (Search !== undefined) {
    query = query + " and item.nama like ? ";
    queryJumlah = queryJumlah + " and item.nama like ? ";
    values.push("%" + Search + "%");
  }

  query = query + " order by item.id_item LIMIT ?,10";
  values.push((parseInt(p) - 1) * 10);

  try {
    const getProduk = await handlerQuery({ query, values });
    const dataProduk = JSON.parse(JSON.stringify(getProduk));
    const getJumlah = await handlerQuery({ query: queryJumlah, values });
    const jumlah = JSON.parse(JSON.stringify(getJumlah));
    return {
      props: {
        dataProduk,
        jumlah,
      },
    };
  } catch (e) {
    return {
      props: {
        dataProduk: e.message,
        jumlah: [{ jumlah: 0 }],
      },
    };
  }
}

Kasir.getLayout = function getLayout(page) {
  return (
    <LayoutPercobaan clicked="/Kasir?p=1&Jenis=umum">{page}</LayoutPercobaan>
  );
};
