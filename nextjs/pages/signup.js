import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from '../src/Link';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { signUpUser } from '../actions/userActions';

const useStyles = makeStyles(theme => ({
  background: {
    background: 'url(Rainbow-Vortex.svg) no-repeat center center fixed',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundSize: 'cover',
    zIndex: '-5',
    minHeight: '100%',
    minWidth: '100%',

    opacity: '0.4',
  },
  signup_wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '25px',
    height: '100%',
  },
  snackbar: {
    marginTop: '100px',
  },
  signup: {
    backgroundColor: 'transparent',
    border: `1px solid white`,
    width: 'auto',
    maxWidth: '25em',
    minWidth: '15em',
    borderRadius: '10px',
  },
  signup__title: {
    marginTop: '2em',
  },
  signup__form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2em 4em',
  },
  signup__formField: {
    marginBottom: '2em',
    position: 'relative',
  },
  signup__error: {
    position: 'absolute',
    bottom: '-1.5em',
    color: '#F44330',
  },
  signup__adornment: {
    zIndex: '150',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  signup__submit: {
    '&:not([disabled])': {
      backgroundColor: theme.palette.green.dark,
      color: 'white',
    },
  },
  signup__signinButton: {
    marginLeft: '0.3em',
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: '1em',
    borderBottom: '2px solid white',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Signup = props => {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const router = useRouter();
  const error = useSelector(state => state.user.errors);
  const dispatch = useDispatch();

  const CustomInputComponent = props => (
    <TextField
      helperText={
        <ErrorMessage
          className={classes.signup__error}
          name={props.name}
          component='span'
        />
      }
      className={classes.signup__formField}
      {...props}
    />
  );

  const toggleVisibility = useCallback(() => {
    setVisibility(pr => !pr);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <Head>
        <title key='title'>
          The Largest Video Game Discovery Service | Game Portal
        </title>
        <meta
          name='description'
          key='description'
          content='Game Portal | Discover new video games and see what other people talk about them. Join Game Portal Now!'
        />
        <meta
          key='og:title'
          property='og:title'
          content='Game Portal | Discover new video games and see what other people talk about them. Join Game Portal Now!'
        />
      </Head>
      <div className={classes.background} />
      <Snackbar
        className={classes.snackbar}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity='error'>
          {error}
        </Alert>
      </Snackbar>
      <div className={classes.signup_wrapper}>
        <div className={classes.signup}>
          <Grid container direction='column' align='center'>
            <Grid item>
              {' '}
              <Typography variant='h4' className={classes.signup__title}>
                Create an account
              </Typography>{' '}
            </Grid>
            <Grid item>
              <Formik
                initialValues={{
                  handle: '',
                  email: '',
                  password: '',
                  passwordConfirmation: '',
                }}
                validationSchema={Yup.object({
                  handle: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                  email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                  password: Yup.string()
                    .min(7, 'Must be 7 characters or more')
                    .required('Required'),
                  passwordConfirmation: Yup.string()
                    .oneOf(
                      [Yup.ref('password'), null],
                      'Passwords do not match'
                    )
                    .required('Password confirm is required'),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  dispatch(signUpUser(values, router));
                  if (error) {
                    resetForm({ values: '' });
                    setOpen(true);
                  }
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting, isValid, dirty }) => (
                  <Form className={classes.signup__form}>
                    <Field
                      type='text'
                      name='handle'
                      label='Handle'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                      as={CustomInputComponent}
                    />

                    <Field
                      label='Email'
                      type='email'
                      name='email'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                      as={CustomInputComponent}
                    />

                    <Field
                      label='Password'
                      type={visibility ? 'text' : 'password'}
                      name='password'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            {visibility ? (
                              <VisibilityOffIcon
                                className={classes.signup__adornment}
                                onClick={toggleVisibility}
                              />
                            ) : (
                              <VisibilityIcon
                                className={classes.signup__adornment}
                                onClick={toggleVisibility}
                              />
                            )}
                            <VpnKeyIcon style={{ marginLeft: '0.2em' }} />
                          </InputAdornment>
                        ),
                      }}
                      as={CustomInputComponent}
                    />

                    <Field
                      label='Confirm Password'
                      type='password'
                      name='passwordConfirmation'
                      as={CustomInputComponent}
                    />

                    <Button
                      type='submit'
                      className={classes.signup__submit}
                      variant='contained'
                      disabled={!isValid || isSubmitting || !dirty}
                    >
                      Create Account
                    </Button>
                  </Form>
                )}
              </Formik>
            </Grid>
            <Grid item style={{ marginBottom: '1em' }}>
              <Typography variant='body2' display='inline'>
                Already have account ?
              </Typography>
              <Button
                className={classes.signup__signinButton}
                size='small'
                variant='text'
                component={Link}
                href='/signin'
              >
                Sign in here
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(Signup);
