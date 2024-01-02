import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Username,
  FieldWithEye,
  Pembungkus,
  Gambar,
} from "../../components/AllComponent";
import { useSession, signIn } from "next-auth/react";
import { message } from "antd";

const Login = () => {
  const [field, setField] = useState({ Username: "", Password: "" });
  const [hasil, setHasil] = useState("");
  const [kelas, setKelas] = useState("button is-link is-fullwidth");
  const [disable, setDisabled] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const checkUsernameAndPassword = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setKelas(kelas + " is-loading");
    const res = await signIn("credentials", {
      username: field.Username,
      password: field.Password,
      redirect: false,
    });
    if (res.status === 200) {
      setDisabled(false);
      setKelas("button is-link is-fullwidth");
    } else {
      setHasil(res.error);
      setDisabled(false);
      setKelas("button is-link is-fullwidth");
    }
  };
  if (status === "authenticated") {
    if (session.user.role === "pemilik") {
      router.replace("/Dashboard");
    } else if (session.user.role === "kasir") {
      router.replace("/Kasir?p=1&Jenis=umum");
    } else if (session.user.role === "ttk") {
      router.replace("/Supplier/DataSupplier");
    }
  }

  const [messageApi, contextHolder] = message.useMessage();
  const handleChangeRoute = () => {
    messageApi.open({
      type: "loading",
      content: "loading...",
      duration: 0,
      key: "message",
    });
  };
  const handleComplete = () => {
    messageApi.destroy();
  };
  useEffect(() => {
    router.events.on("routeChangeStart", handleChangeRoute);
    router.events.on("routeChangeComplete", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleChangeRoute);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router]);

  return (
    <>
      {contextHolder}
      <Head>
        <title>Login</title>
      </Head>
      <Pembungkus>
        <Gambar />
        <form onSubmit={checkUsernameAndPassword}>
          {/* field username */}
          <Username
            nama="Username"
            classInput="is-normal is-link"
            placeholder="Username"
            value={field.Username}
            onChange={setField}
            field={field}
            maxLength="15"
            disabled={disable}
          />
          {/* password */}
          <FieldWithEye
            nama="Password"
            classInput="input is-normal is-link"
            placeholder="Password"
            value={field.Password}
            onChange={setField}
            field={field}
            maxLength="8"
            disabled={disable}
          />
          {/* field button */}
          <div className="field">
            <button type="submit" className={kelas}>
              LOGIN
            </button>
          </div>
          {/* hasil */}
          <div className="field">
            <p id="hasil" className="help is-danger">
              {hasil}
            </p>
          </div>
        </form>
      </Pembungkus>
    </>
  );
};

export default Login;
