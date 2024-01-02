import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReducer, useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import { jsPDF } from "jspdf";
import dayjs from "dayjs";
import XLSX from "sheetjs-style";

import * as FileSaver from "file-saver";

import {
  faCheck,
  faCircleExclamation,
  faCircleUser,
  faEye,
  faEyeSlash,
  faIdBadge,
  faKey,
  faLock,
  faSpinner,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, Button, Card, Divider, List, Popover, Space } from "antd";
import { FileExcelOutlined, KeyOutlined } from "@ant-design/icons";
import axios from "axios";

export function Field({
  nama,
  value,
  onChange,
  IconLeft,
  type,
  placeholder,
  field,
  maxLength,
  fungsiCheck,
  min,
  disabled,
}) {
  const initialState = {
    warnaTextbox: "input",
    hasil: undefined,
    icon: undefined,
  };
  function reducer(state, action) {
    if (action.type === "LOADING") {
      return {
        hasil: (
          <p className="help is-info" style={{ fontSize: "15px" }}>
            loading
          </p>
        ),
        warnaTextbox: "input is-info",
        icon: <FontAwesomeIcon icon={faSpinner} spin color="blue" />,
      };
    } else if (action.type === "BISA") {
      return {
        hasil: (
          <p className="help is-success" style={{ fontSize: "15px" }}>
            {nama + " tersedia"}
          </p>
        ),
        warnaTextbox: "input is-success",
        icon: <FontAwesomeIcon icon={faCheck} color="green" />,
      };
    } else if (action.type === "TIDAK BISA") {
      return {
        hasil: (
          <p className="help is-danger" style={{ fontSize: "15px" }}>
            {nama + " tidak tersedia"}
          </p>
        ),
        warnaTextbox: "input is-danger",
        icon: <FontAwesomeIcon icon={faTimes} color="red" />,
      };
    } else if (action.type === "TIDAK BOLEH") {
      return {
        hasil: (
          <p className="help is-danger" style={{ fontSize: "15px" }}>
            {nama + " tidak memenuhi ketentuan"}
          </p>
        ),
        warnaTextbox: "input is-danger",
        icon: <FontAwesomeIcon icon={faTimes} color="red" />,
      };
    } else if (action.type === "error") {
      return {
        hasil: (
          <p className="help is-danger" style={{ fontSize: "15px" }}>
            Terjadi masalah saat mengakses database
          </p>
        ),
        warnaTextbox: "input is-danger",
        icon: <FontAwesomeIcon icon={faCircleExclamation} color="red" />,
      };
    } else if (action.type === "default") {
      return initialState;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const onChangeValueWithFunc = async (e) => {
    onChange({ ...field, [nama]: e.target.value });
    dispatch({ type: "LOADING" });

    try {
      const hasil = await fungsiCheck(e.target.value);
      if (hasil === "BISA") {
        dispatch({ type: "BISA" });
        onChange({
          ...field,
          [nama]: e.target.value,
          [nama + " Checked"]: true,
        });
      } else if (hasil === "TIDAK BISA") {
        dispatch({ type: "TIDAK BISA" });
        onChange({
          ...field,
          [nama]: e.target.value,
          [nama + " Checked"]: false,
        });
      } else if (hasil === "TIDAK BOLEH") {
        dispatch({ type: "TIDAK BOLEH" });
        onChange({
          ...field,
          [nama]: e.target.value,
          [nama + " Checked"]: false,
        });
      } else if (hasil === "default") {
        dispatch({ type: "default" });
        onChange({
          ...field,
          [nama]: e.target.value,
          [nama + " Checked"]: false,
        });
      }
    } catch (er) {
      dispatch({ type: "error" });
      onChange({
        ...field,
        [nama]: e.target.value,
        [nama + " Checked"]: false,
      });
    }
  };

  const onChangeValue = (e) => {
    onChange({ ...field, [nama]: e.target.value });
  };
  return (
    <div className="field">
      <label className="label">{nama}</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className={state.warnaTextbox}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={
            fungsiCheck !== undefined ? onChangeValueWithFunc : onChangeValue
          }
          maxLength={maxLength}
          min={min}
          disabled={disabled}
          required
        />
        <span className="icon is-small is-left">
          {IconLeft !== undefined && <FontAwesomeIcon icon={IconLeft} />}
        </span>
        <span className="icon is-small is-right">{state.icon}</span>
      </div>
      {state.hasil}
    </div>
  );
}

export function Dropdown({
  nama,
  value,
  onChange,
  arr,
  field,
  mappingElement,
  placeholder,
  icon,
}) {
  const onChangeValue = (e) => {
    onChange({ ...field, [nama]: e.target.value });
  };
  const isiOption = arr.map((element) => {
    if (mappingElement === undefined) {
      return (
        <option key={element} value={element}>
          {element}
        </option>
      );
    } else {
      return (
        <option
          key={element[mappingElement[0]]}
          value={element[mappingElement[0]]}
        >
          {element[mappingElement[1]]}
        </option>
      );
    }
  });

  return (
    <div className="field control has-icons-left">
      <label className="label">{nama}</label>

      <div className="select">
        <select onChange={onChangeValue} value={value}>
          {placeholder !== undefined && (
            <option key="placeholder" value="" disabled>
              {placeholder}
            </option>
          )}
          {isiOption}
        </select>
        <span className="icon is-left">
          <FontAwesomeIcon icon={icon} />
        </span>
      </div>
    </div>
  );
}

export function Modal({ children, show }) {
  return (
    <div className={`modal ${show !== undefined && show}`}>
      <div className="modal-background" />
      <div className="modal-content">{children}</div>
    </div>
  );
}

export function IsiModalSuccess({ pesan, children }) {
  return (
    <article className="message">
      <div
        className="message-body"
        style={{ fontSize: "25px", textAlign: "center", color: "green" }}
      >
        {pesan}
      </div>
      <div style={{ textAlign: "center", padding: "10px" }}>{children}</div>
    </article>
  );
}

export function IsiModalFailed({ pesan, children }) {
  return (
    <article className="message">
      <div
        className="message-body"
        style={{ fontSize: "25px", textAlign: "center", color: "red" }}
      >
        {pesan}
      </div>
      <div style={{ textAlign: "center", padding: "10px" }}>{children}</div>
    </article>
  );
}

export function Pagination({ href, currentPage, jumlah }) {
  if (jumlah === 0) {
    return;
  }
  const bagiDua = href.split("?");
  const hrefDepan = bagiDua[0];
  const hrefBelakang = new URLSearchParams(bagiDua[1]);

  const currPage = parseInt(currentPage);
  const last = Math.ceil(parseInt(jumlah) / 10);
  const prev = currPage - 1;
  const next = currPage + 1;
  let arr = [];
  function Add(number) {
    if (number >= 1 && number <= last) {
      arr.push(number);
    }
  }

  Add(1);
  Add(prev - 1);
  Add(prev);
  Add(currPage);
  Add(next);
  Add(next + 1);
  Add(last);

  const uniq = [...new Set(arr)];
  const Router = useRouter();
  const elipsisKiri = !(uniq.includes(2) || last === 1);
  const elipsisKanan = !(uniq.includes(last - 1) || last === 1);

  return (
    <nav
      className="pagination is-centered is-rounded"
      role="navigation"
      aria-label="pagination"
    >
      {last !== 1 && (
        <button
          className="button pagination-previous"
          disabled={prev === 0 && true}
          onClick={() => {
            hrefBelakang.set("p", prev);
            Router.push(hrefDepan + "?" + hrefBelakang.toString());
          }}
          style={{ fontWeight: "bold" }}
        >
          Sebelumnya
        </button>
      )}
      {last !== 1 && (
        <button
          className="button pagination-next"
          onClick={() => {
            hrefBelakang.set("p", next);
            Router.push(hrefDepan + "?" + hrefBelakang.toString());
          }}
          disabled={next > last && true}
          style={{ fontWeight: "bold" }}
        >
          Selanjutnya
        </button>
      )}
      {last !== 1 && (
        <ul className="pagination-list">
          {uniq.map((el, index) => {
            return (
              <React.Fragment key={index}>
                {index === 1 && elipsisKiri === true ? (
                  <li>
                    <span
                      className="pagination-ellipsis"
                      style={{ fontWeight: "bold" }}
                    >
                      …
                    </span>
                  </li>
                ) : undefined}
                {index === uniq.length - 1 && elipsisKanan === true ? (
                  <li>
                    <span
                      className="pagination-ellipsis"
                      style={{ fontWeight: "bold" }}
                    >
                      …
                    </span>
                  </li>
                ) : undefined}

                <li>
                  <button
                    className={`button pagination-link ${
                      el === currPage && "is-current"
                    }`}
                    aria-label={`Goto page ${el}`}
                    onClick={() => {
                      hrefBelakang.set("p", el);
                      Router.push(hrefDepan + "?" + hrefBelakang.toString());
                    }}
                    style={{ fontWeight: "bold" }}
                  >
                    {el}
                  </button>
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      )}
    </nav>
  );
}

export function FieldKhusus({
  nama,
  value,
  onChange,
  IconLeft,
  type,
  placeholder,
  field,
  maxLength,
  fungsiCheck,
  id,
}) {
  const initialState = {
    warnaTextbox: "input",
    hasil: undefined,
    icon: undefined,
  };
  function reducer(state, action) {
    if (action.type === "LOADING") {
      return {
        hasil: (
          <p className="help is-info" style={{ fontSize: "15px" }}>
            loading
          </p>
        ),
        warnaTextbox: "input is-info",
        icon: <FontAwesomeIcon icon={faSpinner} spin color="blue" />,
      };
    } else if (action.type === "BISA") {
      return {
        hasil: (
          <p className="help is-success" style={{ fontSize: "15px" }}>
            {nama + " tersedia"}
          </p>
        ),
        warnaTextbox: "input is-success",
        icon: <FontAwesomeIcon icon={faCheck} color="green" />,
      };
    } else if (action.type === "TIDAK BISA") {
      return {
        hasil: (
          <p className="help is-danger" style={{ fontSize: "15px" }}>
            {nama + " tidak tersedia"}
          </p>
        ),
        warnaTextbox: "input is-danger",
        icon: <FontAwesomeIcon icon={faTimes} color="red" />,
      };
    } else if (action.type === "TIDAK BOLEH") {
      return {
        hasil: (
          <p className="help is-danger" style={{ fontSize: "15px" }}>
            {nama + " tidak memenuhi ketentuan"}
          </p>
        ),
        warnaTextbox: "input is-danger",
        icon: <FontAwesomeIcon icon={faTimes} color="red" />,
      };
    } else if (action.type === "error") {
      return {
        hasil: (
          <p className="help is-danger" style={{ fontSize: "15px" }}>
            Terjadi masalah saat mengakses database
          </p>
        ),
        warnaTextbox: "input is-danger",
        icon: <FontAwesomeIcon icon={faTimes} color="red" />,
      };
    } else if (action.type === "default") {
      return initialState;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const onChangeValueWithFunc = async (e) => {
    onChange({ ...field, [nama]: e.target.value });
    dispatch({ type: "LOADING" });

    try {
      const hasil = await fungsiCheck(e.target.value);
      if (hasil === "BISA") {
        dispatch({ type: "BISA" });
        onChange({
          ...field,
          [nama]: e.target.value,
          [nama + " Checked"]: true,
        });
      } else if (hasil === "TIDAK BISA") {
        dispatch({ type: "TIDAK BISA" });
        onChange({
          ...field,
          [nama]: e.target.value,
          [nama + " Checked"]: false,
        });
      } else if (hasil === "TIDAK BOLEH") {
        dispatch({ type: "TIDAK BOLEH" });
        onChange({
          ...field,
          [nama]: e.target.value,
          [nama + " Checked"]: false,
        });
      } else if (hasil === "default") {
        dispatch({ type: "default" });
        onChange({
          ...field,
          [nama]: e.target.value,
          [nama + " Checked"]: false,
        });
      }
    } catch (er) {
      dispatch({ type: "error" });
      onChange({
        ...field,
        [nama]: e.target.value,
        [nama + " Checked"]: false,
      });
    }
  };

  const onChangeValue = (e) => {
    onChange({ ...field, [nama]: e.target.value });
  };
  return (
    <div className="field">
      <label className="label">{nama}</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className={state.warnaTextbox}
          type={type}
          placeholder={placeholder}
          value={value}
          onInput={
            fungsiCheck !== undefined ? onChangeValueWithFunc : onChangeValue
          }
          maxLength={maxLength}
          id={id}
          required
        />
        <span className="icon is-small is-left">
          {IconLeft !== undefined && <FontAwesomeIcon icon={IconLeft} />}
        </span>
        <span className="icon is-small is-right">{state.icon}</span>
      </div>
      {state.hasil}
    </div>
  );
}

export function FieldWithEye({
  nama,
  classInput,
  placeholder,
  value,
  onChange,
  field,
  maxLength,
  disabled,
}) {
  const [isPass, setIsPass] = useState(true);

  const onClick = () => {
    setIsPass(!isPass);
  };
  const Eye = ({ onClick }) => {
    return (
      <FontAwesomeIcon
        icon={faEye}
        onClick={onClick}
        pointerEvents="all"
        cursor="pointer"
      />
    );
  };
  const EyeSlash = ({ onClick }) => {
    return (
      <FontAwesomeIcon
        icon={faEyeSlash}
        onClick={onClick}
        pointerEvents="all"
        cursor="pointer"
      />
    );
  };
  const onChangeValue = (e) => {
    onChange({ ...field, [nama]: e.target.value });
  };

  return (
    <div className="field">
      <div className="control has-icons-left has-icons-right">
        <input
          className={classInput}
          type={isPass === true ? "password" : "text"}
          placeholder={placeholder}
          value={value}
          onChange={onChangeValue}
          maxLength={maxLength}
          disabled={disabled}
          required
        />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faLock} />
        </span>
        <span className="icon is-small is-right">
          {isPass === true ? (
            <EyeSlash onClick={onClick} />
          ) : (
            <Eye onClick={onClick} />
          )}
        </span>
      </div>
    </div>
  );
}

export function Username({
  nama,
  classInput,
  placeholder,
  value,
  onChange,
  field,
  maxLength,
  disabled,
}) {
  const onChangeValue = (e) => {
    onChange({ ...field, [nama]: e.target.value });
  };

  return (
    <div className="field">
      <div className="control has-icons-left has-icons-right">
        <input
          className={`input ${classInput}`}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChangeValue}
          maxLength={maxLength}
          disabled={disabled}
          required
        />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faUser} />
        </span>
      </div>
    </div>
  );
}

export function Pembungkus({ children }) {
  return (
    <section className="hero is-fullheight bgLogin">
      {/* <section className="container"> */}
      <div className="columns is-centered">
        <div className="column is-one-fifth">{children}</div>
      </div>
      {/* </section> */}
    </section>
  );
}

export function Gambar() {
  return <img src="/image/Logo_ADORA_NOBG.png" alt="Logo Apotek Adora" />;
}

export function readableDate(input) {
  const keluaran = dayjs(input).locale("id").format("LLLL");
  return keluaran;
}

export const setHeaderForLaporan = (orientation = "p") => {
  const doc = new jsPDF(orientation, "px", "a4");
  const width = doc.internal.pageSize.getWidth();
  const image = new Image();
  image.src = "/image/Logo Adora.jpg";
  let startX = 0;
  let startY = 0;
  doc.addImage(image, "JPG", (startX += 10), (startY += 10), 50, 50);

  doc.setFont("times", "bold");
  doc.setFontSize(20);
  doc.text("APOTEK ADORA", (startX += 50), (startY += 20));

  doc.setFont("times", "normal");
  doc.setFontSize(10);
  doc.text("Jalan Cigadung Selatan No. 1A, Cigadung", startX, (startY += 10));

  doc.setFont("times", "normal");
  doc.setFontSize(10);
  doc.text("ApotekAdora@gmail.com", startX, (startY += 10));

  doc.setFont("times", "normal");
  doc.setFontSize(10);
  doc.text("0813-9459-7073", startX, (startY += 10));

  doc.line(0, 70, width, 70);
  doc.setLineWidth(2);

  doc.line(0, 75, width, 75);

  doc.setFont("times", "italic");
  doc.setFontSize(10);
  const tanggal = new Date();
  const tanggalBisaDibaca = readableDate(tanggal);
  doc.text(`Tanggal Dibuat : ${tanggalBisaDibaca}`, 10, 90);
  return doc;
};
export const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export function ExportExcel({
  excelData,
  fileName,
  disabled,
  href,
  title,
  headerTambahan,
  tujuan,
}) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    let ws;
    if (excelData) {
      ws = XLSX.utils.aoa_to_sheet([[title]]);
      const tanggal = readableDate(new Date());
      XLSX.utils.sheet_add_aoa(ws, [[`Dibuat pada ${tanggal}`]], {
        origin: -1,
      });
      XLSX.utils.sheet_add_json(ws, excelData, {
        origin: 3,
      });
    } else {
      const response = await axios.get(href);
      const data = response.data;
      const { hasil } = data;

      ws = XLSX.utils.aoa_to_sheet([[title]]);

      const tanggal = readableDate(new Date());
      XLSX.utils.sheet_add_aoa(ws, [[`Dibuat pada ${tanggal}`]], {
        origin: -1,
      });
      let origin = 3;
      for (const property in data) {
        if (property === "jumlah") {
          XLSX.utils.sheet_add_aoa(ws, [[property, data[property][0].jumlah]], {
            origin,
          });
          origin += 1;
        } else if (property === "total") {
          XLSX.utils.sheet_add_aoa(ws, [[property, data[property][0].total]], {
            origin,
          });
          origin += 1;
        } else {
          XLSX.utils.sheet_add_json(ws, data[property], { origin });
          origin += data[property].length + 2;
        }
      }
      const merge = [];
      if (tujuan !== "penjualan") {
        let rowSpanTanggal = 0;

        let i = 0;
        while (i < hasil.length - 1) {
          rowSpanTanggal = 0;
          for (let j = i + 1; j < hasil.length; j++) {
            if (hasil[i].time_stamp === hasil[j].time_stamp) {
              rowSpanTanggal = rowSpanTanggal + 1;
            } else {
              break;
            }
          }
          if (rowSpanTanggal !== 0) {
            merge.push({
              s: { r: i + 4, c: 0 },
              e: { r: i + 4 + rowSpanTanggal, c: 0 },
            });
          }
          i = i + rowSpanTanggal + 1;
        }

        let rowSpanNoFaktur = 0;
        i = 0;

        while (i < hasil.length - 1) {
          rowSpanNoFaktur = 0;
          for (let j = i + 1; j < hasil.length; j++) {
            if (hasil[i].no_faktur === hasil[j].no_faktur) {
              rowSpanNoFaktur = rowSpanNoFaktur + 1;
            } else {
              break;
            }
          }
          if (rowSpanNoFaktur !== 0) {
            merge.push({
              s: { r: i + 4, c: 1 },
              e: { r: i + 4 + rowSpanNoFaktur, c: 1 },
            });
            merge.push({
              s: { r: i + 4, c: 2 },
              e: { r: i + 4 + rowSpanNoFaktur, c: 2 },
            });
            merge.push({
              s: { r: i + 4, c: 7 },
              e: { r: i + 4 + rowSpanNoFaktur, c: 7 },
            });
          }
          i = i + rowSpanNoFaktur + 1;
        }
      } else {
        console.log(hasil);
        let rowSpanTanggal = 0;

        let i = 0;
        while (i < hasil.length - 1) {
          rowSpanTanggal = 0;
          for (let j = i + 1; j < hasil.length; j++) {
            if (hasil[i].time_stamp === hasil[j].time_stamp) {
              rowSpanTanggal = rowSpanTanggal + 1;
            } else {
              break;
            }
          }
          if (rowSpanTanggal !== 0) {
            merge.push({
              s: { r: i + 4, c: 0 },
              e: { r: i + 4 + rowSpanTanggal, c: 0 },
            });
          }
          i = i + rowSpanTanggal + 1;
        }

        let rowSpanNoTransaksi = 0;
        i = 0;

        while (i < hasil.length - 1) {
          rowSpanNoTransaksi = 0;
          for (let j = i + 1; j < hasil.length; j++) {
            if (hasil[i].no_transaksi === hasil[j].no_transaksi) {
              rowSpanNoTransaksi = rowSpanNoTransaksi + 1;
            } else {
              break;
            }
          }
          if (rowSpanNoTransaksi !== 0) {
            merge.push({
              s: { r: i + 4, c: 1 },
              e: { r: i + 4 + rowSpanNoTransaksi, c: 1 },
            });
            merge.push({
              s: { r: i + 4, c: 2 },
              e: { r: i + 4 + rowSpanNoTransaksi, c: 2 },
            });
            merge.push({
              s: { r: i + 4, c: 3 },
              e: { r: i + 4 + rowSpanNoTransaksi, c: 3 },
            });
            merge.push({
              s: { r: i + 4, c: 8 },
              e: { r: i + 4 + rowSpanNoTransaksi, c: 8 },
            });
            merge.push({
              s: { r: i + 4, c: 9 },
              e: { r: i + 4 + rowSpanNoTransaksi, c: 9 },
            });
            merge.push({
              s: { r: i + 4, c: 10 },
              e: { r: i + 4 + rowSpanNoTransaksi, c: 10 },
            });
          }
          i = i + rowSpanNoTransaksi + 1;
        }
      }

      ws["!merges"] = merge;
    }
    for (const property in ws) {
      if (property !== "!ref") {
        if (
          (property.endsWith("4") && property.length === 2) ||
          (property.startsWith("A") && headerTambahan.includes(ws[property].v))
        ) {
          ws[property].s = {
            alignment: {
              vertical: "center",
              horizontal: "center",
            },
            font: {
              bold: true,
            },
          };
          ws[property].v = ws[property].v.toUpperCase().replaceAll("_", " ");
        } else {
          ws[property].s = {
            alignment: {
              vertical: "center",
              horizontal: "center",
            },
          };
        }
        if (property !== "A1" && property !== "A2") {
          ws[property].s = {
            ...ws[property].s,
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
          };
        }
      }
    }
    const wscols = [
      { wch: 50 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
    ];
    ws["!cols"] = wscols;

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <Button
      type="primary"
      disabled={disabled}
      onClick={(e) => exportToExcel()}
      icon={<FileExcelOutlined />}
    >
      Download Excel
    </Button>
  );
}
