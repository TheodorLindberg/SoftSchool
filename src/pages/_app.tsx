import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "theme/theme";
import { Provider as ReduxProvider } from "react-redux";
import store from "store";

import Head from "next/head";

import CssBaseline from "@material-ui/core/CssBaseline";

function MyApp({ Component, pageProps }: any) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ReduxProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
