import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Header from '../src/components/ui/Header';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useStore, initializeStore } from '../store';
import { instance } from '../src/utils/axios';
import { logoutUser, getAuthenticatedUser } from '../actions/userActions';
import * as types from '../actions/types';
import 'react-circular-progressbar/dist/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

if (typeof window !== 'undefined') {
  const token = localStorage.idToken;
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      initializeStore().dispatch(logoutUser());
      // window.location.href = '/login';
    } else {
      initializeStore().dispatch({ type: types.SET_AUTHENTICATED });
      instance.defaults.headers.common['Authorization'] = token;
      initializeStore().dispatch(getAuthenticatedUser());
    }
  }
}

export default function MyApp(props) {
  const store = useStore(props.pageProps.initialReduxState);
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
        <title>The Largest Video Game Discovery Service | Game Portal</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Container maxWidth='xl'>
            <Header />
            <CssBaseline />
            <Component {...pageProps} />
          </Container>
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
