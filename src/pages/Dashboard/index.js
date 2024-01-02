import Head from "next/head";
import moment from "moment";
import React, { useState, useEffect } from "react";
import axios from "axios";
import handlerQuery from "../../../lib/db";
import { rupiah } from "../../../components/AllComponent";
import LayoutPercobaan from "../../../components/LayoutPercobaan";
import { NumericFormat } from "react-number-format";

export default function Dashboard({ hasil }) {
  const todayDate = moment().format("D MMMM YYYY");

  const [totalUmum, setTotalUmum] = useState(0);
  const [totalKeras, setTotalKeras] = useState(0);
  const [totalOmsetUmum, setTotalOmsetUmum] = useState(0);
  const [totalOmsetKeras, setTotalOmsetKeras] = useState(0);

  useEffect(() => {
    const fetchTotalTransactions = async () => {
      try {
        const response = await axios.get("/api/TotalTransaksiHariIni"); // Replace with your actual API endpoint
        const { totalUmum, totalKeras, totalOmsetUmum, totalOmsetKeras } =
          response.data;
        setTotalUmum(totalUmum);
        setTotalKeras(totalKeras);
        setTotalOmsetUmum(totalOmsetUmum);
        setTotalOmsetKeras(totalOmsetKeras);
      } catch (error) {
        console.error("Failed to fetch total transactions:", error);
      }
    };

    fetchTotalTransactions();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1 className="title">Dashboard</h1>

      <div className="columns">
        <div className="column is-full is-flex is-flex-direction-column is-justify-content-center">
          <div className="is-flex is-justify-content-space-between">
            <p className="title is-5 mr-1">Total Transaksi Hari ini</p>
            <p>{todayDate}</p>
          </div>
          <div className="columns is-flex">
            <div className="column is-half">
              <div className="box" style={{ backgroundColor: "#609966" }}>
                <p className="title is-5 has-text-white has-text-centered">
                  Umum
                </p>
                <p className="has-text-white has-text-centered title is-5">
                  <NumericFormat
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                    value={totalUmum}
                  />
                </p>
              </div>
            </div>
            <div className="column is-half">
              <div className="box" style={{ backgroundColor: "#609966" }}>
                <p className="title is-5 has-text-white has-text-centered">
                  Resep
                </p>
                <p className="has-text-white has-text-centered title is-5">
                  <NumericFormat
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                    value={totalKeras}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="is-flex is-justify-content-space-between">
            <p className="title is-5 mr-1">Total Omset Hari ini</p>
            <p>{todayDate}</p>
          </div>
          <div className="columns is-flex">
            <div className="column is-half">
              <div className="box" style={{ backgroundColor: "#9DC08B" }}>
                <p className="title is-5 has-text-white has-text-centered">
                  Umum
                </p>
                <p className="has-text-white has-text-centered title is-5">
                  {rupiah.format(totalOmsetUmum)}
                </p>
              </div>
            </div>
            <div className="column is-half">
              <div className="box" style={{ backgroundColor: "#9DC08B" }}>
                <p className="title is-5 has-text-white has-text-centered">
                  Resep
                </p>
                <p className="has-text-white has-text-centered title is-5">
                  {rupiah.format(totalOmsetKeras)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column is-full">
          <table className="table has-text-centered is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th colSpan="4" className="subtitle is-5">
                  10 Item Terlaris pada Bulan ini
                </th>
              </tr>
              <tr>
                <th className="has-text-centered is-vcentered">No</th>
                <th className="has-text-centered is-vcentered">Nama</th>
                <th className="has-text-centered is-vcentered">
                  Jumlah Item Terjual
                </th>
                <th className="has-text-centered is-vcentered">Satuan</th>
              </tr>
            </thead>
            <tbody>
              {hasil.map((item, index) => (
                <tr key={index}>
                  <td className="is-vcentered">{index + 1}</td>
                  <td className="is-vcentered">{item.Nama_Item}</td>
                  <td className="is-vcentered">{item.Jumlah_Item_Terjual}</td>
                  <td className="is-vcentered">{item.Satuan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    let query = `
      SELECT i.nama AS Nama_Item, SUM(dt.jumlah) AS Jumlah_Item_Terjual, s.nama AS Satuan
      FROM transaksi_penjualan tp
      JOIN detail_transaksi_penjualan dt ON tp.no_transaksi = dt.no_transaksi
      JOIN item i ON dt.id_item = i.id_item
      JOIN satuan s ON i.id_satuan = s.id_satuan
      WHERE MONTH(tp.time_stamp) = MONTH(CURRENT_DATE()) AND YEAR(tp.time_stamp) = YEAR(CURRENT_DATE())
      GROUP BY i.nama, s.nama
      ORDER BY Jumlah_Item_Terjual DESC
      LIMIT 10;
    `;

    const getData = await handlerQuery({ query });
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

Dashboard.getLayout = function getLayout(page) {
  return <LayoutPercobaan clicked="/Dashboard">{page}</LayoutPercobaan>;
};
