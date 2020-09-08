import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from '../src/Link';
import { useRouter } from 'next/router';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { signInUser } from '../actions/userActions';

const useStyles = makeStyles(theme => ({
  background: {
    background: 'url(Sun-Tornado.svg) no-repeat center center fixed',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    backgroundSize: 'cover',
    zIndex: '-5',
    minHeight: '100%',
    minWidth: '100%',
    width: 'auto',
    height: 'auto',
    opacity: '0.4',
  },
  signUpWrapper: {
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.green.dark}`,
    width: 'auto',
    maxWidth: '25em',
    minWidth: '15em',
    borderRadius: '10px',
    height: 'auto',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2em 4em',
  },
  formField: {
    marginBottom: '2em',
    position: 'relative',
  },
  adornment: {
    zIndex: '150',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  submit: {
    '&:not([disabled])': {
      backgroundColor: theme.palette.green.dark,
      color: 'white',
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
    '&:focus': {
      '&::placeholder': {
        opacity: '0',
      },
    },
    '&::placeholder': {
      color: 'white',
      opacity: '0.6',
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Signin = props => {
  const theme = useTheme();
  const classes = useStyles();
  const [visibility, setVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const error = useSelector(state => state.user.errors);
  const dispatch = useDispatch();

  const CustomInputComponent = props => (
    <TextField
      helperText={
        <ErrorMessage
          style={{ position: 'absolute', bottom: '-1.5em', color: '#F44330' }}
          name={props.name}
          component='span'
        />
      }
      className={classes.formField}
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
      <div className={classes.background} />

      <div style={{ height: 'calc(100vh - 100px)' }}>
        <Snackbar
          style={{ marginTop: '100px' }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity='error'>
            {error}
          </Alert>
        </Snackbar>
        <div className={classes.signUpWrapper}>
          <Grid container direction='column' align='center'>
            <Grid item>
              {' '}
              <Typography variant='h4' style={{ marginTop: '2em' }}>
                Welcome back
              </Typography>{' '}
            </Grid>
            <Grid item>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                  password: Yup.string().required('Required'),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  dispatch(signInUser(values, router));
                  if (error) {
                    resetForm({ values: '' });
                    setOpen(true);
                  }
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting, isValid, dirty }) => (
                  <Form className={classes.form}>
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
                                className={classes.adornment}
                                onClick={toggleVisibility}
                              />
                            ) : (
                              <VisibilityIcon
                                className={classes.adornment}
                                onClick={toggleVisibility}
                              />
                            )}
                            <VpnKeyIcon style={{ marginLeft: '0.2em' }} />
                          </InputAdornment>
                        ),
                      }}
                      as={CustomInputComponent}
                    />

                    <Button
                      type='submit'
                      className={classes.submit}
                      variant='contained'
                      disabled={!isValid || isSubmitting || !dirty}
                    >
                      Sign in
                    </Button>
                  </Form>
                )}
              </Formik>
            </Grid>
            <Grid item style={{ marginBottom: '1em' }}>
              <Typography variant='body2' display='inline'>
                Don't have an account ?
              </Typography>
              <Button
                style={{
                  marginLeft: '0.3em',
                  textTransform: 'none',
                  textDecoration: 'none',
                  fontSize: '1em',
                  borderBottom: '2px solid white',
                }}
                size='small'
                variant='text'
                component={Link}
                href='/signup'
              >
                Sign up here
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(Signin);
