// import { Html, Head, Main, NextScript } from "next/document";
// import React from "react";
// import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
// import Document from "next/document";

// export default function MyDocument() {
//   return (
//     <Html lang="en">
//       <Head />
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }

// MyDocument.getInitialProps = async (ctx) => {
//   const cache = createCache();
//   const originalRenderPage = ctx.renderPage;
//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App) => (props) =>
//         (
//           <StyleProvider cache={cache}>
//             <App {...props} />
//           </StyleProvider>
//         ),
//     });

//   const initialProps = await Document.getInitialProps(ctx);
//   const style = extractStyle(cache, true);
//   return {
//     ...initialProps,
//     styles: (
//       <>
//         {initialProps.styles}
//         <style dangerouslySetInnerHTML={{ __html: style }} />
//       </>
//     ),
//   };
// };

import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import Documenta, { Head, Html, Main, NextScript } from "next/document";
// import type { DocumentContext } from 'next/document';

const Document = () => (
  <Html lang="en">
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

Document.getInitialProps = async (ctx) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        (
          <StyleProvider cache={cache}>
            <App {...props} />
          </StyleProvider>
        ),
    });
  const initialProps = await Documenta.default.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default Document;
