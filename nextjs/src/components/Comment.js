import React, {useEffect} from 'react';
import {instance} from '../utils/axios'

import dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';


import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '50%',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '1em 2em',
    },
    marginBottom: '2em'
  },
  card: {
    borderRadius: '5px',
    backgroundColor: 'rgba(18,18,18, 0.15)',
    padding: '1em',
    color: theme.palette.green.light,

    '-webkit-box-shadow': '0px 0px 16px -3px rgba(0,0,0,0.75)',
    '-moz-box-shadow': '0px 0px 16px -3px rgba(0,0,0,0.75)',
    boxShadow: '0px 0px 16px -3px rgba(0,0,0,0.75)',
  },
  card__title: {
      display: 'flex',
      justifyContent: 'space-between',
      color: 'white'
  },
  card__body: {
      color: 'white',
      fontWeight: '400'
  }
}));

const Comment = ({ handle, image, createdAt, body, title }) => {
  const classes = useStyles();
  const theme = useTheme();

  

  return (
    <React.Fragment>
      <section className={classes.wrapper}>
        <Card className={classes.card}>
          <CardHeader
            disableTypography
            avatar={<Avatar src={image} />}
            title={
            <div
                className={classes.card__title}
              >
                <Typography variant='body2' >{title}</Typography>
                <Typography>{dayjs(new Date(createdAt).toDateString()).fromNow()}</Typography>
              </div>
            }
            subheader={<Typography
                    variant='caption'
                >{handle}</Typography>}
          />
          <CardContent>
            <Typography
               className={classes.card__body}
            >
                {body}
            </Typography>
          </CardContent>
        </Card>
      </section>
    </React.Fragment>
  );
};

export default Comment;
