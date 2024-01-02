import "jspdf-autotable";
import Head from "next/head";
import { useState } from "react";
import "dayjs/locale/id";
import { Button, DatePicker, Empty, Space, Spin } from "antd";

import { setHeaderForLaporan } from "../../../../components/AllComponent";
const { RangePicker } = DatePicker;
import { ExportExcel } from "../../../../components/AllComponent";
import handlerQuery from "../../../../lib/db";
import { useRouter } from "next/router";
import { FilePdfOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import LayoutPercobaan from "../../../../components/LayoutPercobaan";

export default function LaporanItemTerlaris({ hasil }) {
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
    const doc = setHeaderForLaporan();

    const width = doc.internal.pageSize.getWidth();
    doc.setFont("times", "normal");
    doc.setFontSize(15);
    doc.text("Laporan Item Terlaris", width / 2, 110, { align: "center" });
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

    doc.autoTable({
      columns: [
        { header: "No", dataKey: "No" },
        { header: "Id Item", dataKey: "id_item" },
        { header: "Nama Item", dataKey: "nama_item" },
        { header: "Satuan", dataKey: "nama_satuan" },
        { header: "Jenis", dataKey: "nama_jenis" },
        { header: "Jumlah Terjual", dataKey: "jumlah_terjual" },
      ],
      startY: 150,
      body: hasil,
      columnStyles: {
        No: { halign: "center", valign: "middle" },
        id_item: { halign: "center", valign: "middle" },
        nama_item: { halign: "center", valign: "middle" },
        nama_satuan: { halign: "center", valign: "middle" },
        nama_jenis: { halign: "center", valign: "middle" },
        jumlah_terjual: { halign: "center", valign: "middle" },
      },
      headStyles: { halign: "center", valign: "middle" },
    });
    doc.output("dataurlnewwindow", { filename: "Laporan Item Terlaris" });
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
    router.push(hrefDepan + "?" + hrefBelakang.toString());
  };

  try {
    semuaData = hasil.map((x, index) => {
      return (
        <tr key={x.id_item}>
          <td className="is-vcentered">{x.No}</td>
          <td className="is-vcentered">{x.id_item}</td>
          <td className="is-vcentered">{x.nama_item}</td>
          <td className="is-vcentered">{x.nama_satuan}</td>
          <td className="is-vcentered">{x.nama_jenis}</td>
          <td className="is-vcentered">{x.jumlah_terjual}</td>
        </tr>
      );
    });
  } catch (e) {
    semuaData = (
      <tr>
        <td colSpan="6" className="is-vcentered">
          <div className="field">{hasil}</div>
          <Button type="primary" onClick={() => router.reload()}>
            Muat Ulang
          </Button>
        </td>
      </tr>
    );
  }

  return (
    <>
      <Head>
        <title>Laporan Item Terlaris</title>
      </Head>
      <h1 className="title">Laporan Item Terlaris</h1>

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
            headerTambahan={[]}
            disabled={disabledDownload}
            fileName="Laporan Item Terlaris"
            excelData={hasil}
            title={
              Array.isArray(filterTanggal)
                ? `Laporan Item Terlaris Periode ${filterTanggal[0].format(
                    "DD-MM-YYYY"
                  )} sampai ${filterTanggal[1].format("DD-MM-YYYY")}`
                : "Laporan Item Terlaris Keseluruhan"
            }
          />
        </Space>
        {hasil.length !== 0 ? (
          <div className="table-container">
            <table className="table has-text-centered is-fullwidth">
              <thead>
                <tr>
                  <th className="has-text-centered is-vcentered">No</th>
                  <th className="has-text-centered is-vcentered">Id Item</th>
                  <th className="has-text-centered is-vcentered">Nama Item</th>
                  <th className="has-text-centered is-vcentered">Jenis</th>
                  <th className="has-text-centered is-vcentered">Satuan</th>
                  <th className="has-text-centered is-vcentered">
                    Jumlah Terjual
                  </th>
                </tr>
              </thead>
              <tbody>{semuaData}</tbody>
            </table>
          </div>
        ) : (
          <Empty />
        )}
      </Space>
    </>
  );
}

export async function getServerSideProps(context) {
  let query =
    "SELECT item.id_item,item.nama as nama_item,satuan.nama as nama_satuan,jenis.nama as nama_jenis,sum(detail_transaksi_penjualan.jumlah) as jumlah_terjual " +
    "from detail_transaksi_penjualan inner join item on item.id_item = detail_transaksi_penjualan.id_item inner join satuan on satuan.id_satuan=item.id_satuan " +
    "inner join jenis on jenis.id_jenis=item.id_jenis_item " +
    "inner join transaksi_penjualan on transaksi_penjualan.no_transaksi=detail_transaksi_penjualan.no_transaksi ";
  const values = [];
  const { Awal, Akhir } = context.query;

  if (Awal !== undefined && Akhir !== undefined) {
    query += " where time_stamp between ? and ? ";
    values.push(Awal + " 00:00:00");
    values.push(Akhir + " 23:59:59");
  }

  query +=
    "group by detail_transaksi_penjualan.id_item " +
    "order by jumlah_terjual desc LIMIT 5";

  try {
    const getData = await handlerQuery({ query, values });
    const hasil = JSON.parse(JSON.stringify(getData));
    for (let i = 0; i < hasil.length; i++) {
      hasil[i] = { No: i + 1, ...hasil[i] };
    }
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

LaporanItemTerlaris.getLayout = function getLayout(page) {
  return (
    <LayoutPercobaan clicked="/Laporan/LaporanItemTerlaris" sub="Laporan">
      {page}
    </LayoutPercobaan>
  );
};
