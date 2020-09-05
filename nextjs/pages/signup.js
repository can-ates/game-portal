import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { instance } from '../src/utils/axios';

const useStyles = makeStyles(theme => ({
  background: {
    background: 'url(signup.png) no-repeat center center fixed',
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
}));

const signup = () => {
  const theme = useTheme();
  const classes = useStyles();
  const ex = useSelector(state => state.count);

  return (
    <React.Fragment>
      <div className={classes.background}></div>
      <div>sdfsdf</div>
    </React.Fragment>
  );
};

export default signup;
