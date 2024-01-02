import Head from "next/head";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>SI Adora</title>
      </Head>
      <section className="hero is-success is-fullheight has-background">
        <img
          alt="foto lokasi apotek adora"
          className="hero-background is-transparent"
          src="/image/bg.jpg"
        />
        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="title">Sistem Informasi</p>
            <p className="subtitle">Apotek Adora</p>
            <button className="button" onClick={() => signIn()}>
              Masuk
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
