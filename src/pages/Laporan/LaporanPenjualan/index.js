import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import "dayjs/locale/id";
import { Button, DatePicker, Empty, Space } from "antd";
import {
  ExportExcel,
  Pagination,
  rupiah,
  setHeaderForLaporan,
} from "../../../../components/AllComponent";
import "jspdf-autotable";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import handlerQuery from "../../../../lib/db";
import { FilePdfOutlined } from "@ant-design/icons";
import { NumericFormat } from "react-number-format";
import LayoutPercobaan from "../../../../components/LayoutPercobaan";
const { RangePicker } = DatePicker;
export default function LaporanPenjualan({
  hasil,
  jumlah,
  total,
  jumlahPagination,
}) {
  let semuaData;
  const router = useRouter();
  const awal = router.query.Awal;
  const akhir = router.query.Akhir;
  const [filterTanggal, setFilterTanggal] = useState(
    awal === undefined && akhir === undefined
      ? null
      : [dayjs(awal), dayjs(akhir)]
  );
  const disabledDownload = !Array.isArray(hasil) || hasil.length === 0;
  const generatePDF = async (tanggal) => {
    let Awal;
    let Akhir;
    if (tanggal !== null) {
      Awal = tanggal[0].format("YYYY-MM-DD");
      Akhir = tanggal[1].format("YYYY-MM-DD");
    } else {
      Awal = "";
      Akhir = "";
    }
    const res = await axios.get(
      `/api/DataLapPenjualan?Awal=${Awal}&Akhir=${Akhir}&tujuan=PDF`
    );

    const { hasil, jumlah, total } = res.data;

    const arr = [];
    let awal = 0;
    let akhir = 8;
    while (awal < hasil.length) {
      let arrInside;
      arrInside = hasil.slice(awal, akhir);
      arr.push(arrInside);
      let simpan = akhir;
      awal = simpan;
      akhir += 12;
    }

    const doc = setHeaderForLaporan("l");
    const width = doc.internal.pageSize.getWidth();
    doc.setFont("times", "normal");
    doc.setFontSize(15);
    doc.text("Laporan Penjualan", width / 2, 110, { align: "center" });
    doc.text(
      tanggal === null
        ? "Keseluruhan"
        : `Periode ${tanggal[0].format(
            "DD-MM-YYYY"
          )} sampai ${tanggal[1].format("DD-MM-YYYY")}
            `,
      width / 2,
      130,
      { align: "center" }
    );
    for (let idx = 0; idx < arr.length; idx++) {
      const hasil = arr[idx];
      let rowSpanTanggal = 1;

      let i = 0;
      while (i < hasil.length - 1) {
        rowSpanTanggal = 1;
        for (let j = i + 1; j < hasil.length; j++) {
          if (hasil[i].time_stamp === hasil[j].time_stamp) {
            rowSpanTanggal = rowSpanTanggal + 1;
          } else {
            break;
          }
        }
        if (rowSpanTanggal !== 1) {
          hasil[i].time_stamp = {
            content: hasil[i].time_stamp,
            rowSpan: rowSpanTanggal,
          };
        }
        i = i + rowSpanTanggal;
      }

      let rowSpanNoTransaksi = 1;
      i = 0;

      while (i < hasil.length - 1) {
        rowSpanNoTransaksi = 1;
        for (let j = i + 1; j < hasil.length; j++) {
          if (hasil[i].no_transaksi === hasil[j].no_transaksi) {
            rowSpanNoTransaksi = rowSpanNoTransaksi + 1;
          } else {
            break;
          }
        }
        if (rowSpanNoTransaksi !== 1) {
          hasil[i].no_transaksi = {
            content: hasil[i].no_transaksi,
            rowSpan: rowSpanNoTransaksi,
          };
          hasil[i].biaya_racik = {
            content: hasil[i].biaya_racik,
            rowSpan: rowSpanNoTransaksi,
          };
          hasil[i].diskon = {
            content: hasil[i].diskon,
            rowSpan: rowSpanNoTransaksi,
          };
          hasil[i].total = {
            content: hasil[i].total,
            rowSpan: rowSpanNoTransaksi,
          };
          hasil[i].jenis_pelanggan = {
            content: hasil[i].jenis_pelanggan,
            rowSpan: rowSpanNoTransaksi,
          };
          hasil[i].jenis_pembayaran = {
            content: hasil[i].jenis_pembayaran,
            rowSpan: rowSpanNoTransaksi,
          };
        }
        i = i + rowSpanNoTransaksi;
      }

      doc.autoTable({
        columns: [
          { header: "Tanggal", dataKey: "time_stamp" },
          { header: "No Transaksi", dataKey: "no_transaksi" },
          { header: "Jenis Pelanggan", dataKey: "jenis_pelanggan" },
          { header: "Jenis Pembayaran", dataKey: "jenis_pembayaran" },
          { header: "Nama Item", dataKey: "nama_item" },
          { header: "Jumlah", dataKey: "jumlah" },
          { header: "Harga Per Satuan", dataKey: "harga_per_satuan" },
          { header: "Subtotal", dataKey: "subtotal" },
          { header: "Biaya Racik", dataKey: "biaya_racik" },
          { header: "Diskon", dataKey: "diskon" },
          { header: "Total", dataKey: "total" },
        ],
        startY: idx === 0 ? 150 : null,
        body: hasil,
        columnStyles: {
          time_stamp: { halign: "center", valign: "middle" },
          no_transaksi: { halign: "center", valign: "middle" },
          jenis_pelanggan: { halign: "center", valign: "middle" },
          jenis_pembayaran: { halign: "center", valign: "middle" },
          nama_item: { halign: "center", valign: "middle" },
          jumlah: { halign: "center", valign: "middle" },
          harga_per_satuan: { halign: "center", valign: "middle" },
          subtotal: { halign: "center", valign: "middle" },
          total: { halign: "center", valign: "middle" },
          biaya_racik: { halign: "center", valign: "middle" },
          diskon: { halign: "center", valign: "middle" },
        },
        headStyles: { halign: "center", valign: "middle" },
        theme: "grid",
      });
      if (idx !== arr.length - 1) {
        doc.addPage();
      }
    }

    let y = doc.lastAutoTable.finalY;
    doc.setFontSize(10);
    doc.text(`JUMLAH ITEM\t:\t${jumlah[0].jumlah || 0} `, 30, (y += 20));
    doc.text(`TOTAL AKHIR\t:\t${total[0].total} `, 30, (y += 20));

    doc.output("dataurlnewwindow", { filename: "Laporan Penjualan" });
  };
  const onChangeDate = (date, dateString) => {
    setFilterTanggal(date);
    const bagi = router.asPath.split("?");
    const hrefDepan = bagi[0];
    const hrefBelakang = new URLSearchParams(bagi[1]);
    if (date !== null) {
      const dateAwal = date[0].format("YYYY-MM-DD");
      const dateAkhir = date[1].format("YYYY-MM-DD");
      hrefBelakang.set("Awal", dateAwal);
      hrefBelakang.set("Akhir", dateAkhir);
    } else {
      hrefBelakang.delete("Awal");
      hrefBelakang.delete("Akhir");
    }
    hrefBelakang.set("p", 1);
    router.push(hrefDepan + "?" + hrefBelakang.toString());
  };

  try {
    semuaData = hasil.map((x, index) => {
      return (
        <tr key={index}>
          {x.time_stamp !== null && (
            <td className="is-vcentered" rowSpan={x.rowSpanTimeStamp}>
              {x.time_stamp}
            </td>
          )}
          {x.no_transaksi !== null && (
            <td className="is-vcentered" rowSpan={x.rowSpanNoTransaksi}>
              {x.no_transaksi}
            </td>
          )}
          {x.jenis_pelanggan !== null && (
            <td className="is-vcentered" rowSpan={x.rowSpanNoTransaksi}>
              {x.jenis_pelanggan.toUpperCase()}
            </td>
          )}
          {x.jenis_pembayaran !== null && (
            <td className="is-vcentered" rowSpan={x.rowSpanNoTransaksi}>
              {x.jenis_pembayaran.toUpperCase()}
            </td>
          )}
          <td className="is-vcentered">{x.nama_item}</td>
          <td className="is-vcentered">{x.jumlah}</td>
          <td className="is-vcentered">{rupiah.format(x.harga_per_satuan)}</td>
          <td className="is-vcentered">{rupiah.format(x.subtotal)}</td>
          {x.biaya_racik !== null && (
            <td className="is-vcentered" rowSpan={x.rowSpanNoTransaksi}>
              {rupiah.format(x.biaya_racik)}
            </td>
          )}

          {x.diskon !== null && (
            <td className="is-vcentered" rowSpan={x.rowSpanNoTransaksi}>
              {rupiah.format(x.diskon)}
            </td>
          )}
          {x.total !== null && (
            <td className="is-vcentered" rowSpan={x.rowSpanNoTransaksi}>
              {rupiah.format(x.total)}
            </td>
          )}
        </tr>
      );
    });
  } catch (e) {
    semuaData = (
      <tr>
        <td colSpan="11" className="is-vcentered">
          <div className="field">{hasil}</div>
          <Button type="primary" onClick={() => router.reload()}>
            Muat Ulang
          </Button>
          {hasil}
        </td>
      </tr>
    );
  }
  return (
    <>
      <Head>
        <title>Laporan Penjualan</title>
      </Head>
      <h1 className="title">Laporan Penjualan</h1>
      <Space direction="vertical" style={{ display: "flex" }}>
        <label className="label">Periode</label>
        <RangePicker
          onChange={onChangeDate}
          size="large"
          format="DD-MM-YYYY"
          value={filterTanggal}
        />
        <Space>
          <Button
            type="primary"
            danger
            onClick={() => generatePDF(filterTanggal)}
            disabled={disabledDownload}
            icon={<FilePdfOutlined />}
          >
            Download PDF
          </Button>
          <ExportExcel
            tujuan="penjualan"
            headerTambahan={["total", "jumlah"]}
            disabled={disabledDownload}
            fileName="Laporan Penjualan"
            href={`/api/DataLapPenjualan?Awal=${
              Array.isArray(filterTanggal)
                ? filterTanggal[0].format("YYYY-MM-DD")
                : ""
            }&Akhir=${
              Array.isArray(filterTanggal)
                ? filterTanggal[1].format("YYYY-MM-DD")
                : ""
            }&tujuan=EXCEL`}
            title={
              Array.isArray(filterTanggal)
                ? `Laporan Penjualan Periode ${filterTanggal[0].format(
                    "DD-MM-YYYY"
                  )} sampai ${filterTanggal[1].format("DD-MM-YYYY")}`
                : "Laporan Penjualan Keseluruhan"
            }
          />
        </Space>
        {hasil.length !== 0 ? (
          <div className="table-container">
            <table className="table has-text-centered is-fullwidth is-bordered">
              <thead>
                <tr>
                  <th className="has-text-centered is-vcentered">Tanggal</th>
                  <th className="has-text-centered is-vcentered">
                    No Transaksi
                  </th>
                  <th className="has-text-centered is-vcentered">
                    Jenis Pelanggan
                  </th>
                  <th className="has-text-centered is-vcentered">
                    Jenis Pembayaran
                  </th>
                  <th className="has-text-centered is-vcentered">Nama Item</th>
                  <th className="has-text-centered is-vcentered">Jumlah</th>
                  <th className="has-text-centered is-vcentered">
                    Harga Per Satuan
                  </th>
                  <th className="has-text-centered is-vcentered">Subtotal</th>
                  <th className="has-text-centered is-vcentered">
                    Biaya Racik
                  </th>
                  <th className="has-text-centered is-vcentered">Diskon</th>
                  <th className="has-text-centered is-vcentered">Total</th>
                </tr>
              </thead>
              <tbody>{semuaData}</tbody>
            </table>
          </div>
        ) : (
          <Empty />
        )}
        <p style={{ fontWeight: "bolder" }}>
          Jumlah :{" "}
          {
            <NumericFormat
              value={jumlah[0].jumlah || 0}
              displayType="text"
              decimalSeparator=","
              thousandSeparator="."
            />
          }
        </p>
        <p style={{ fontWeight: "bolder" }}>
          Total : {rupiah.format(total[0].total || 0)}
        </p>
        <Pagination
          href={router.asPath}
          currentPage={router.query.p}
          jumlah={jumlahPagination[0].jumlahPagination}
        />
      </Space>
    </>
  );
}

export async function getServerSideProps(context) {
  let query =
    "SELECT time_stamp,jenis_pelanggan,jenis_pembayaran,transaksi_penjualan.no_transaksi,item.nama as nama_item,jumlah,harga_per_satuan,subtotal,total,biaya_racik,diskon " +
    "FROM detail_transaksi_penjualan inner join transaksi_penjualan on detail_transaksi_penjualan.no_transaksi=transaksi_penjualan.no_transaksi " +
    "inner join item on item.id_item =detail_transaksi_penjualan.id_item ";

  let queryJumlah =
    "SELECT sum(jumlah) as jumlah " +
    "FROM detail_transaksi_penjualan inner join transaksi_penjualan on detail_transaksi_penjualan.no_transaksi=transaksi_penjualan.no_transaksi ";

  let queryTotal = "SELECT sum(total) as total " + "FROM transaksi_penjualan ";

  let queryJumlahPagination =
    "SELECT count(transaksi_penjualan.no_transaksi) as jumlahPagination  " +
    "FROM detail_transaksi_penjualan inner join transaksi_penjualan on detail_transaksi_penjualan.no_transaksi=transaksi_penjualan.no_transaksi " +
    "inner join item on item.id_item =detail_transaksi_penjualan.id_item ";

  const { Awal, Akhir, p } = context.query;
  const values = [];
  if (Awal !== undefined && Akhir !== undefined) {
    query += " where time_stamp between ? and ? ";
    queryJumlah += " where time_stamp between ? and ? ";
    queryTotal += " where time_stamp between ? and ? ";
    queryJumlahPagination += " where time_stamp between ? and ? ";

    values.push(Awal + " 00:00:00");
    values.push(Akhir + " 23:59:59");
  }

  query +=
    " order by time_stamp,detail_transaksi_penjualan.no_transaksi LIMIT ?,10 ";

  values.push((parseInt(p) - 1) * 10);

  try {
    const getData = await handlerQuery({ query, values });
    const hasil = JSON.parse(JSON.stringify(getData));
    for (let idx = 0; idx < hasil.length; idx++) {
      hasil[idx].time_stamp = dayjs(hasil[idx].time_stamp)
        .locale("id")
        .format("LL");
    }
    let rowSpanTanggal = 1;

    let i = 0;
    while (i < hasil.length - 1) {
      rowSpanTanggal = 1;
      for (let j = i + 1; j < hasil.length; j++) {
        if (hasil[i].time_stamp === hasil[j].time_stamp) {
          rowSpanTanggal = rowSpanTanggal + 1;
          hasil[j].time_stamp = null;
        } else {
          break;
        }
      }
      if (rowSpanTanggal !== 1) {
        hasil[i].rowSpanTimeStamp = rowSpanTanggal;
      }
      i = i + rowSpanTanggal;
    }
    let rowSpanNoTransaksi = 1;
    i = 0;

    while (i < hasil.length - 1) {
      rowSpanNoTransaksi = 1;
      for (let j = i + 1; j < hasil.length; j++) {
        if (hasil[i].no_transaksi === hasil[j].no_transaksi) {
          rowSpanNoTransaksi = rowSpanNoTransaksi + 1;
          hasil[j].no_transaksi = null;
          hasil[j].biaya_racik = null;
          hasil[j].diskon = null;
          hasil[j].total = null;
          hasil[j].jenis_pelanggan = null;
          hasil[j].jenis_pembayaran = null;
        } else {
          break;
        }
      }
      if (rowSpanNoTransaksi !== 1) {
        hasil[i].rowSpanNoTransaksi = rowSpanNoTransaksi;
      }
      i = i + rowSpanNoTransaksi;
    }
    const getJumlah = await handlerQuery({ query: queryJumlah, values });
    const jumlah = JSON.parse(JSON.stringify(getJumlah));

    const getTotal = await handlerQuery({ query: queryTotal, values });

    const total = JSON.parse(JSON.stringify(getTotal));
    const getJumlahPagination = await handlerQuery({
      query: queryJumlahPagination,
      values,
    });

    const jumlahPagination = JSON.parse(JSON.stringify(getJumlahPagination));
    return {
      props: {
        hasil,
        jumlah,
        total,
        jumlahPagination,
      },
    };
  } catch (e) {
    return {
      props: {
        hasil: e.message,
        jumlah: [{ jumlah: 0 }],
        total: [{ total: 0 }],
        jumlahPagination: [{ jumlahPagination: 0 }],
      },
    };
  }
}

LaporanPenjualan.getLayout = function getLayout(page) {
  return (
    <LayoutPercobaan clicked="/Laporan/LaporanPenjualan?p=1" sub="Laporan">
      {page}
    </LayoutPercobaan>
  );
};
