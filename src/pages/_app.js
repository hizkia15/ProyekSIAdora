import "../styles/a.scss";
import { SessionProvider } from "next-auth/react";
import idID from "antd/locale/id_ID";
import { ConfigProvider } from "antd";
import { config } from "@fortawesome/fontawesome-svg-core";
import "../../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import Head from "next/head";

import { DataProvider } from "../../components/DataProvider";
config.autoAddCss = false;
dayjs.extend(localizedFormat);
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/ADORA.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <ConfigProvider
          locale={idID.default}
          theme={{
            token: {
              colorPrimary: "#00b96b",
            },
            components: {
              Menu: {
                itemSelectedColor: "#00b96b",
                fontSize: 15,
              },
              Layout: {
                fontSize: 15,
              },
              Modal: {
                fontSize: 17,
              },
            },
          }}
        >
          <DataProvider>{getLayout(<Component {...pageProps} />)}</DataProvider>
        </ConfigProvider>
      </SessionProvider>
    </>
  );
}
