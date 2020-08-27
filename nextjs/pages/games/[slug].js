import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

import { makeStyles } from '@material-ui/core/styles';
import Link from '../../src/Link';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const Skeleton = dynamic(() => import('@material-ui/lab/Skeleton'));

import { FaLinux } from 'react-icons/fa';
import { FaXbox } from 'react-icons/fa';
import { FaPlaystation } from 'react-icons/fa';
import { FaSteam } from 'react-icons/fa/';
import { FaWindows } from 'react-icons/fa/';
import { FaApple } from 'react-icons/fa/';
import { SiNintendoswitch } from 'react-icons/si';
import { SiAndroid } from 'react-icons/si';
import { SiNintendo3Ds } from 'react-icons/si';
import { SiGroupon } from 'react-icons/si';
import { SiEpicgames } from 'react-icons/si';
import { SiItchDotIo } from 'react-icons/si';

const useStyles = makeStyles(theme => ({
  background: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    minHeight: '60%',
    zIndex: '-5',
    minWidth: '100%',
    backgroundSize: 'cover',
    opacity: '0.2',
  },
  imageShadow: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '7.4rem',
    // '&::-webkit-box-shadow': '-1px 61px 75px 28px rgba(45,49,66,1)',
    // '&::-moz-box-shadow': '-1px 61px 75px 28px rgba(45,49,66,1)',
    // boxShadow: '-1px 61px 75px 28px rgba(45,49,66,1)',
    backgroundImage: 'linear-gradient(180deg, transparent, #2D3142);',
  },
  wrapper: {
    padding: '7em 15em',
    border: '1px solid red',
  },
  about: {
    marginLeft: '1em',
  },
  icon:{
    marginLeft: '1em',
    fontSize: '1.3rem',
    color: theme.palette.green.light,
    '&:hover':{
        cursor: 'pointer',
        color: 'white'
    },
    verticalAlign: 'middle',
    display: 'inline' 
  }
}));

function Game({ game }) {
  const classes = useStyles();
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const renderIcons = info => {
    switch (info.store.name) {
      case 'PlayStation':
      case 'PlayStation Store':
      case 'PlayStation 5':
      case 'PlayStation 4':
      case 'PlayStation 3':
      case 'PlayStation 2':
      case 'PS Vita':
      case 'PSP':
        return <FaPlaystation key='PlayStation' className={classes.icon} />;
      case 'Xbox':
      case 'Xbox Store':
      case 'Xbox One':
      case 'Xbox Series X':
      case 'Xbox 360':
        return <FaXbox key={info.name} className={classes.icon} />;
      case 'Epic Games':
        return <SiEpicgames key={info.name} className={classes.icon} />;
      case 'PC':
        return <FaWindows key={info.name} className={classes.icon} />;
      case 'Steam':
        return <FaSteam key={info.name} className={classes.icon} />;
      case 'GOG':
        return <SiGroupon key={info.name} className={classes.icon} />;
      case 'Nintendo Switch':
      case 'Nintendo Store':
        return <SiNintendoswitch key={info.name} className={classes.icon} />;
      case 'Nintendo DS':
      case 'Nintendo 3DS':
      case 'Nintendo DSi':
        return <SiNintendo3Ds key={info.name} className={classes.icon} />;
      case 'Apple Macintosh':
      case 'iOS':
      case 'macOS':
      case 'App Store':
        return <FaApple key={info.name} className={classes.icon} />;
      case 'Android':
      case 'Google Play':
        return <SiAndroid key={info.name} className={classes.icon} />;
      case 'Linux':
        return <FaLinux key={info.name} className={classes.icon} />;
        case 'itch.io':
        return <SiItchDotIo key={info.name} className={classes.icon} />;
      default:
        return 
    }
  };

  return (
    <React.Fragment>
      <div
        style={{ backgroundImage: `url(${game.background_image})` }}
        className={classes.background}
      >
        <div className={classes.imageShadow} />
      </div>
      <div className={classes.wrapper}>
        <Grid container direction='column'>
          <Grid item container direction='row'>
            <Grid item md={4}></Grid>
            <Grid item md={4}>
              <Grid container direction='column'>
                <Grid item>
                  <Typography variant='h1'>{game.name}</Typography>
                </Grid>
                <Grid item style={{margin: '1.3em 0 1em 0'}}>
                  <Typography gutterBottom variant='h4' display='inline-block'>
                    {new Date(game.released)
                      .toDateString()
                      .split(' ')
                      .slice(1)
                      .join(' ')}{' '}
                    ({dayjs(new Date(game.released).toDateString()).fromNow()})
                  </Typography>
                </Grid>
                <Grid item>
                  {game.publishers.map(publisher => (
                    <Typography
                      variant='body2'
                      key={publisher.id}
                      display='inline'
                    >
                      {publisher.name}{' '}
                    </Typography>
                  ))}
                </Grid>
                <Grid item style={{ marginTop: '5em' }}>
                  <Typography>About</Typography>
                </Grid>
                <Grid item style={{ marginTop: '1em' }}>
                  <Typography variant='body2' display='inline' gutterBotom>
                    Genre:
                  </Typography>
                  {game.genres.map(genre => (
                    <Typography
                      variant='subtitle1'
                      className={classes.about}
                      display='inline'
                      key={genre.id}
                    >
                      {genre.name}
                    </Typography>
                  ))}
                </Grid>
                <Grid item>
                  <Typography variant='body2' display='inline' gutterBotom>
                    Platforms:
                  </Typography>
                  {game.platforms.map(platform => (
                    <Typography
                      variant='subtitle1'
                      className={classes.about}
                      display='inline'
                      key={platform.platform.id}
                    >
                      {platform.platform.name}
                    </Typography>
                  ))}
                </Grid>
                <Grid item>
                  <Typography variant='body2' display='inline' gutterBotom>
                    Stores:
                  </Typography>
                  {game.stores.map(store => (<Typography display='inline' size='small' component={Link} href={store.url} target='__blank' >{renderIcons(store)}</Typography> ))}
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4}></Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  const res = await axios.get('https://api.rawg.io/api/games?page_size=40', {
    headers: { 'User-Agent': 'GamePortal/0.8' },
  });
  const games = await res.data.results;

  const paths = games.map(game => ({
    params: { slug: game.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(`https://api.rawg.io/api/games/${params.slug}`, {
    headers: { 'User-Agent': 'GamePortal/0.8' },
  });
  const game = await res.data;

  return { props: { game } };
}

export default Game;
