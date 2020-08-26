import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Header from '../src/components/ui/Header';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import 'react-lazy-load-image-component/src/effects/blur.css';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  whyDidYouRender(React);
}

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Game Portal</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Container maxWidth='xl'>
          <Header />
          <CssBaseline />
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
