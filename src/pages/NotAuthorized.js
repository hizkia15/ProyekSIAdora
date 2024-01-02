import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
export default function NotAuthorized() {
  const Router = useRouter();
  const [SekarangDiMana, setSekarangDimana] = useState("");
  const { data: session, status } = useSession();
  useEffect(() => {
    setSekarangDimana(Router.asPath);
  }, []);
  const isi = SekarangDiMana.startsWith("/Dashboard")
    ? "PEMILIK"
    : SekarangDiMana.startsWith("/Laporan")
    ? "PEMILIK"
    : SekarangDiMana.startsWith("/PengaturanUser")
    ? "PEMILIK"
    : SekarangDiMana.startsWith("/Produk")
    ? "PEMILIK"
    : SekarangDiMana.startsWith("/Transaksi")
    ? "PEMILIK,TTK"
    : SekarangDiMana.startsWith("/Supplier")
    ? "PEMILIK,TTK"
    : SekarangDiMana.startsWith("/Kasir")
    ? "PEMILIK,KASIR"
    : "";
  const RoleAnda =
    status === "authenticated" && session.user.role.toUpperCase();
  return (
    <>
      <Head>
        <title>Not Authorized</title>
      </Head>
      <section className="hero is-danger is-fullheight">
        <div className="hero-body">
          <p className="title">
            Maaf Anda tidak memiliki Akses ke halaman ini
            <br />
            {`Page ini khusus untuk Role : ${isi}`}
            <br />
            {`Role Anda : ${RoleAnda}`}
          </p>
        </div>
      </section>
    </>
  );
}
