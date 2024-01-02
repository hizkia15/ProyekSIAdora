import Head from "next/head";
import handlerQuery from "../../../../lib/db";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { Button, DatePicker, Empty, Modal } from "antd";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import "dayjs/locale/id";
import { Pagination, readableDate } from "../../../../components/AllComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faCalendar,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { NumericFormat } from "react-number-format";
import LayoutPercobaan from "../../../../components/LayoutPercobaan";
import { useLoading } from "../../../../components/DataProvider";

export default function TransaksiStokOpname({ hasil, jumlah, user }) {
  let semuaData;
  const { setLoading } = useLoading();
  const router = useRouter();

  const [filterSearch, setFilterSearch] = useState(
    router.query.Search !== undefined ? router.query.Search : ""
  );

  const [filterTanggal, setFilterTanggal] = useState(
    router.query.Awal !== undefined && router.query.Akhir !== undefined
      ? [dayjs(router.query.Awal), dayjs(router.query.Akhir)]
      : null
  );

  const dropdown = {
    User: router.query.User !== undefined ? router.query.User : "",
  };

  let tunggulSelesaiMengetik;
  let waktuTunggu = 1000;
  const changeSearch = (e) => {
    setFilterSearch(e.target.value);
  };

  const onKeyUp = () => {
    clearTimeout(tunggulSelesaiMengetik);
    tunggulSelesaiMengetik = setTimeout(selesaiTunggu, waktuTunggu);
  };

  const onKeyDown = () => {
    clearTimeout(tunggulSelesaiMengetik);
  };

  const selesaiTunggu = () => {
    const bagi = router.asPath.split("?");
    const hrefDepan = bagi[0];
    const hrefBelakang = new URLSearchParams(bagi[1]);

    if (filterSearch !== "") {
      hrefBelakang.set("Search", filterSearch);
    } else {
      hrefBelakang.delete("Search");
    }

    hrefBelakang.set("p", 1);
    router.push(hrefDepan + "?" + hrefBelakang.toString());
  };

  const onChangeDate = (date, dateString) => {
    setFilterTanggal(date);
    const bagi = router.asPath.split("?");
    const hrefDepan = bagi[0];
    const hrefBelakang = new URLSearchParams(bagi[1]);
    if (Array.isArray(date)) {
      const tanggalOutput1 = dayjs(date[0]).format("YYYY-MM-DD");
      const tanggalOutput2 = dayjs(date[1]).format("YYYY-MM-DD");
      hrefBelakang.set("Awal", tanggalOutput1);
      hrefBelakang.set("Akhir", tanggalOutput2);
    } else {
      hrefBelakang.delete("Awal");
      hrefBelakang.delete("Akhir");
    }
    hrefBelakang.set("p", 1);
    router.push(hrefDepan + "?" + hrefBelakang);
  };

  const onChangeUser = (e) => {
    const bagi = router.asPath.split("?");
    const hrefDepan = bagi[0];
    const hrefBelakang = new URLSearchParams(bagi[1]);
    if (e.target.value !== "") {
      hrefBelakang.set("User", e.target.value);
    } else {
      hrefBelakang.delete("User");
    }
    hrefBelakang.set("p", 1);
    router.push(hrefDepan + "?" + hrefBelakang);
  };

  const [open, setOpen] = useState(false);
  const [isiModal, setIsiModal] = useState("");
  const onClickDetail = async (no_opname) => {
    setLoading(true);
    try {
      const res = await axios.get("/api/GetDetailOpname?opname=" + no_opname);
      setIsiModal(res.data);
    } catch (e) {
      setIsiModal(e.response.data);
    }
    setLoading(false);
    setOpen(true);
  };

  const changeToHTML = (masukan) => {
    if (typeof masukan === "string") {
      return (
        <tr>
          <td colSpan="6" className="is-vcentered">
            {masukan}
          </td>
        </tr>
      );
    } else {
      const semua = masukan.map((x, index) => {
        return (
          <tr key={x.no_detail_opname}>
            <td className="is-vcentered">{index + 1}</td>
            <td className="is-vcentered">{x.nama}</td>
            <td className="is-vcentered">{x.stok_sistem}</td>
            <td className="is-vcentered">{x.stok_fisik}</td>
            <td className="is-vcentered">{x.namaSatuan}</td>
            <td className="is-vcentered">{x.selisih}</td>
          </tr>
        );
      });
      return semua;
    }
  };

  let index = (parseInt(router.query.p) - 1) * 10;
  try {
    semuaData = hasil.map((x) => {
      index = index + 1;
      return (
        <tr key={x.no_opname}>
          <td className="is-vcentered">{index}</td>
          <td className="is-vcentered">{x.no_opname}</td>
          <td className="is-vcentered">{readableDate(x.time_stamp)}</td>
          <td className="is-vcentered">{x.username}</td>
          <td className="is-vcentered">
            <button
              className="button is-success"
              onClick={() => onClickDetail(x.no_opname)}
            >
              Detail
            </button>
          </td>
        </tr>
      );
    });
  } catch (e) {
    semuaData = (
      <tr>
        <td colSpan="5" className="is-vcentered">
          <div className="field">{hasil}</div>
          <Button type="primary" onClick={() => router.reload()}>
            Muat Ulang
          </Button>
        </td>
      </tr>
    );
  }

  const userDipilih = user.filter(
    (el) => parseInt(el.idUser) === parseInt(router.query.User)
  )[0];

  const tanggalDipilih =
    filterTanggal !== null
      ? `${dayjs(filterTanggal[0]).format("DD-MM-YYYY")} sampai ${dayjs(
          filterTanggal[1]
        ).format("DD-MM-YYYY")}`
      : "";

  const clearUser = () => {
    const bagi = router.asPath.split("?");
    const hrefDepan = bagi[0];
    const hrefBelakang = new URLSearchParams(bagi[1]);
    hrefBelakang.delete("User");
    hrefBelakang.set("p", 1);
    router.push(hrefDepan + "?" + hrefBelakang.toString());
  };

  const clearSearch = () => {
    setFilterSearch("");
    const bagi = router.asPath.split("?");
    const hrefDepan = bagi[0];
    const hrefBelakang = new URLSearchParams(bagi[1]);
    hrefBelakang.delete("Search");
    hrefBelakang.set("p", 1);
    router.push(hrefDepan + "?" + hrefBelakang.toString());
  };

  const clearTanggal = () => {
    setFilterTanggal(null);
    const bagi = router.asPath.split("?");
    const hrefDepan = bagi[0];
    const hrefBelakang = new URLSearchParams(bagi[1]);
    hrefBelakang.delete("Awal");
    hrefBelakang.delete("Akhir");
    hrefBelakang.set("p", 1);
    router.push(hrefDepan + "?" + hrefBelakang.toString());
  };

  const clearAll = () => {
    setFilterSearch("");
    setFilterTanggal(null);
    const bagi = router.asPath.split("?");
    const hrefDepan = bagi[0];
    const hrefBelakang = new URLSearchParams(bagi[1]);
    hrefBelakang.delete("Search");
    hrefBelakang.delete("Awal");
    hrefBelakang.delete("Akhir");
    hrefBelakang.delete("User");
    hrefBelakang.delete("Order");
    hrefBelakang.set("p", 1);
    router.push(hrefDepan + "?" + hrefBelakang.toString());
  };

  const onChangeOrderDesc = () => {
    const bagi = router.asPath.split("?");
    const hrefDepan = bagi[0];
    const hrefBelakang = new URLSearchParams(bagi[1]);
    hrefBelakang.set("Order", "ASC");
    hrefBelakang.set("p", 1);
    router.push(hrefDepan + "?" + hrefBelakang.toString());
  };
  const onChangeOrderAsc = () => {
    const bagi = router.asPath.split("?");
    const hrefDepan = bagi[0];
    const hrefBelakang = new URLSearchParams(bagi[1]);
    hrefBelakang.delete("Order");
    hrefBelakang.set("p", 1);
    router.push(hrefDepan + "?" + hrefBelakang.toString());
  };

  const clearOrder = () => {
    const bagi = router.asPath.split("?");
    const hrefDepan = bagi[0];
    const hrefBelakang = new URLSearchParams(bagi[1]);
    hrefBelakang.delete("Order");
    hrefBelakang.set("p", 1);
    router.push(hrefDepan + "?" + hrefBelakang.toString());
  };

  return (
    <>
      <Head>
        <title>Rekap Transaksi Stok Opname</title>
      </Head>
      <h1 className="title">Rekap Transaksi Stok Opname</h1>
      <div className="field is-grouped">
        <div className="field control has-icons-left">
          <label className="label">TTK</label>

          <div className="select">
            <select onChange={onChangeUser} value={dropdown.User}>
              {user.map((el) => {
                return (
                  <option key={el.idUser} value={el.idUser}>
                    {el.username}
                  </option>
                );
              })}
            </select>
            <span className="icon is-left">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
        </div>
        <div className="field control">
          <label className="label">Tanggal</label>
          <RangePicker
            onChange={onChangeDate}
            size="large"
            format="DD-MM-YYYY"
            value={filterTanggal}
          />
        </div>
        <div className="field">
          <label className="label">Urutan Tanggal</label>
          {router.query.Order !== undefined ? (
            <button className="button" onClick={onChangeOrderAsc}>
              <FontAwesomeIcon
                icon={faCalendar}
                style={{ marginRight: "5px" }}
              />
              Lama
              <FontAwesomeIcon
                icon={faAnglesRight}
                style={{ marginLeft: "5px", marginRight: "5px" }}
              />
              Baru
            </button>
          ) : (
            <button className="button" onClick={onChangeOrderDesc}>
              <FontAwesomeIcon
                icon={faCalendar}
                style={{ marginRight: "5px" }}
              />
              Baru
              <FontAwesomeIcon
                icon={faAnglesRight}
                style={{ marginLeft: "5px", marginRight: "5px" }}
              />
              Lama
            </button>
          )}
        </div>
      </div>

      <div className="field">
        <label className="label">Pencarian dengan No Opname</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="text"
            value={filterSearch}
            onChange={changeSearch}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            maxLength="100"
            required
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
      </div>

      <h1 className="title is-6">
        <NumericFormat
          thousandSeparator="."
          decimalSeparator=","
          displayType="text"
          value={jumlah[0].jumlah}
          suffix=" hasil ditemukan"
        />
      </h1>

      <div className="field is-grouped is-grouped-multiline">
        {router.query.Search !== undefined && (
          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-medium is-success">
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ marginRight: "5px" }}
                />
                {`"${router.query.Search}"`}
              </span>
              <button
                className="button tag is-medium is-delete"
                onClick={() => clearSearch()}
              />
            </div>
          </div>
        )}
        {router.query.User !== undefined && (
          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-medium is-primary">
                <FontAwesomeIcon icon={faUser} style={{ marginRight: "5px" }} />
                {userDipilih.username}
              </span>
              <button
                className="button tag is-medium is-delete"
                onClick={() => clearUser()}
              />
            </div>
          </div>
        )}
        {router.query.Awal !== undefined &&
          router.query.Akhir !== undefined && (
            <div className="control">
              <div className="tags has-addons">
                <span className="tag is-medium is-link">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    style={{ marginRight: "5px" }}
                  />
                  {tanggalDipilih}
                </span>
                <button
                  className="button tag is-medium is-delete"
                  onClick={() => clearTanggal()}
                />
              </div>
            </div>
          )}
        {router.query.Order !== undefined && (
          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-medium is-danger">
                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{ marginRight: "5px" }}
                />
                Lama
                <FontAwesomeIcon
                  icon={faAnglesRight}
                  style={{ marginLeft: "5px", marginRight: "5px" }}
                />
                Baru
              </span>
              <button
                className="button tag is-medium is-delete"
                onClick={() => clearOrder()}
              />
            </div>
          </div>
        )}
        {(router.query.Search !== undefined ||
          router.query.User !== undefined ||
          (router.query.Awal !== undefined &&
            router.query.Akhir !== undefined) ||
          router.query.Order !== undefined) && (
          <div className="control">
            <div className="tags has-addons">
              <button
                className="button tag is-medium is-rounded is-info is-outlined"
                style={{ fontWeight: "bold" }}
                onClick={() => clearAll()}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {hasil.length !== 0 ? (
        <div className="table-container">
          <table className="table has-text-centered is-fullwidth">
            <thead>
              <tr>
                <th className="has-text-centered is-vcentered">No</th>
                <th className="has-text-centered is-vcentered">No Opname</th>
                <th className="has-text-centered is-vcentered">Tanggal</th>
                <th className="has-text-centered is-vcentered">TTK</th>
                <th className="has-text-centered is-vcentered">Detail</th>
              </tr>
            </thead>
            <tbody>{semuaData}</tbody>
          </table>
        </div>
      ) : (
        <Empty />
      )}

      <Pagination
        href={router.asPath}
        currentPage={router.query.p}
        jumlah={jumlah[0].jumlah}
      />

      <FloatButton
        shape="circle"
        type="primary"
        style={{ right: 24, width: "50px", height: "50px" }}
        icon={<PlusOutlined />}
        tooltip="Tambah Transaksi Stok Opname"
        onClick={() => router.push("/Transaksi/TransaksiStokOpname/Tambah?p=1")}
      />
      <Modal
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        centered={true}
        width="50vw"
        title="Detail Transaksi Stok Opname"
      >
        <div className="table-container">
          <table className="table has-text-centered" align="center">
            <thead>
              <tr>
                <th className="has-text-centered is-vcentered">No</th>
                <th className="has-text-centered is-vcentered">Nama Item</th>
                <th className="has-text-centered is-vcentered">Stok Sistem</th>
                <th className="has-text-centered is-vcentered">Stok Fisik</th>
                <th className="has-text-centered is-vcentered">Satuan</th>
                <th className="has-text-centered is-vcentered">Selisih</th>
              </tr>
            </thead>
            <tbody>{changeToHTML(isiModal)}</tbody>
          </table>
        </div>
      </Modal>
    </>
  );
}

export async function getServerSideProps(context) {
  let query =
    "select no_opname,time_stamp,user.username " +
    "from transaksi_stok_opname inner join user on transaksi_stok_opname.idUser=user.idUser ";

  let queryJumlah =
    "select count(no_opname) as jumlah " +
    "from transaksi_stok_opname inner join user on transaksi_stok_opname.idUser=user.idUser ";

  const { p, User, Search, Awal, Akhir, Order } = context.query;

  if (
    Search !== undefined ||
    User !== undefined ||
    (Awal !== undefined && Akhir !== undefined)
  ) {
    query = query + "where ";
    queryJumlah = queryJumlah + "where ";
    if (Search !== undefined) {
      query = query + " no_opname like ?";
      queryJumlah = queryJumlah + " no_opname like ?";
    }
    if (User !== undefined) {
      if (Search === undefined) {
        query = query + " user.idUser=?";
        queryJumlah = queryJumlah + " user.idUser=?";
      } else {
        query = query + " and user.idUser=?";
        queryJumlah = queryJumlah + " and user.idUser=?";
      }
    }
    if (Awal !== undefined && Akhir !== undefined) {
      if (Search !== undefined || User !== undefined) {
        query = query + " and time_stamp between ? and ?";
        queryJumlah = queryJumlah + " and time_stamp between ? and ?";
      } else {
        query = query + " time_stamp between ? and ?";
        queryJumlah = queryJumlah + " time_stamp between ? and ?";
      }
    }
  }

  if (Order !== undefined) {
    query = query + " order by time_stamp  LIMIT ?,10";
  } else {
    query = query + " order by time_stamp desc LIMIT ?,10";
  }

  const values = [];

  if (Search !== undefined) {
    values.push("%" + Search + "%");
  }
  if (User !== undefined) {
    values.push(User);
  }
  if (Awal !== undefined && Akhir !== undefined) {
    values.push(Awal + " 00:00:00");
    values.push(Akhir + " 23:59:59");
  }
  values.push((parseInt(p) - 1) * 10);

  const queryUser = "select idUser,username from user order by idUser";

  try {
    const getData = await handlerQuery({ query, values });
    const hasil = JSON.parse(JSON.stringify(getData));
    const getJumlah = await handlerQuery({ query: queryJumlah, values });
    const jumlah = JSON.parse(JSON.stringify(getJumlah));
    const getUser = await handlerQuery({ query: queryUser, values: [] });
    const user = JSON.parse(JSON.stringify(getUser));
    user.unshift({ idUser: "", username: "SEMUA" });
    return {
      props: {
        hasil,
        jumlah,
        user,
      },
    };
  } catch (e) {
    return {
      props: {
        hasil: e.message,
        jumlah: [{ jumlah: 0 }],
        user: [{ idUser: "", username: "" }],
      },
    };
  }
}

TransaksiStokOpname.getLayout = function getLayout(page) {
  return (
    <LayoutPercobaan
      clicked="/Transaksi/TransaksiStokOpname?p=1"
      sub="Rekap Transaksi"
    >
      {page}
    </LayoutPercobaan>
  );
};
