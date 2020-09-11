import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '50%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '1em 2em',
    },
  },
  commentButton: {
    borderRadius: '5px',
    width: '100%',
    backgroundColor: 'rgba(18,18,18, 0.15)',
    padding: '1em',
    color: theme.palette.green.light,
    fontSize: '2rem',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#FAFAFA',
      color: '#121212',
    },
    '&:active': {
      transform: 'translateY(5px)',
    },
    '-webkit-box-shadow': '0px 5px 5px 0px rgba(0,0,0,0.75)',
    '-moz-box-shadow': '0px 5px 5px 0px rgba(0,0,0,0.75)',
    boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.75)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    marginTop: '2em',
  },
  form__formField: {
    marginBottom: '1em',
    outlineWidth: 'none',
    padding: '1em',
    position: 'relative',
    borderRadius: '5px',
  },

  notchedOutline: {
    border: `1px solid black`,
  },
  focused: {
    border: `1px solid black`,
  },
  form__postButton: {
    width: '5em',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    color: 'black',
  },
  form__error: {
    position: 'absolute',
    left: '1.5em',
    bottom: '-1.5em',
    color: '#F44330',
  },
}));

const CommentForm = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.user);

  const handleComment = () => {
    user.authenticated ? setOpen(pr => !pr) : router.push('/signin');
  };

  const CustomInputComponent = props => (
    <TextField
      helperText={
        <ErrorMessage
          className={classes.form__error}
          name={props.name}
          component='span'
        />
      }
      InputProps={{
        classes: {
          focused: classes.focused,

          notchedOutline: classes.notchedOutline,
        },
      }}
      variant='outlined'
      className={classes.form__formField}
      {...props}
    />
  );

  const postComment = (values) => {
    props.handleComment(values)
  };

  return (
    <React.Fragment>
      <section className={classes.wrapper}>
        <Typography className={classes.commentButton} onClick={handleComment}>
          Write a comment
        </Typography>

        <Grid item>
          {open && (
            <Formik
              initialValues={{
                title: '',
                body: '',
              }}
              validationSchema={Yup.object({
                title: Yup.string().required('Required'),
                body: Yup.string().required('Required'),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                postComment(values);
                resetForm({ values: '' });
                setOpen(false)
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, isValid, dirty }) => (
                <Form className={classes.form}>
                  <Field
                    type='text'
                    name='title'
                    placeholder='Title'
                    as={CustomInputComponent}
                  />

                  <Field
                    type='text'
                    name='body'
                    placeholder='Write a comment'
                    as={CustomInputComponent}
                    multiline
                    rowsMax='3'
                    rows='3'
                  />

                  <Button
                    type='submit'
                    className={classes.form__postButton}
                    size='large'
                    variant='contained'
                    disabled={!isValid || isSubmitting || !dirty}
                  >
                    Post
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </Grid>
      </section>
    </React.Fragment>
  );
};

export default CommentForm;
