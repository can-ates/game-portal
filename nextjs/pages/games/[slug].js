import React, { useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Link from '../../src/Link';
import Slider from 'react-slick';
import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

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
import { FaPlay } from 'react-icons/fa';
import { TiWorld } from 'react-icons/ti';
import { FaReddit } from 'react-icons/fa';
import { AiFillMediumCircle } from 'react-icons/ai';

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
    padding: '7em 10em',
  },
  about: {
    marginLeft: '1em',
    color: theme.palette.green.light,
  },
  icon: {
    marginLeft: '1em',
    fontSize: '1.3rem',
    '&:hover': {
      cursor: 'pointer',
      color: 'white',
    },
    verticalAlign: 'middle',
    display: 'inline',
  },
  content: {
    display: '-webkit-box',
    '-webkit-line-clamp': '4',
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tags: {
    backgroundColor: 'rgba(119, 146, 118, 0.3)',
    opacity: '0.7',
    marginRight: '1em',
    display: 'inline-block',
  },
  videoWrapper: {
    position: 'relative',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      cursor: 'pointer',
    },
    borderRadius: '20px',
    transition: 'all 0.3s cubic-bezier(0.230, 1.000, 0.320, 1.000)',

    '&:hover': {
      transform: 'scale(1.05)',
      cursor: 'pointer',
    },
    width: '100%',
  },
  gameImage: {
    padding: '0.5em 1em',
    borderRadius: '20px',
    transition: 'all 0.3s cubic-bezier(0.230, 1.000, 0.320, 1.000)',

    '&:hover': {
      transform: 'scale(1.1)',
      cursor: 'pointer',
    },
    height: '13em',
  },
  playButton: {
    position: 'absolute',
    bottom: '2%',
    right: '2%',
    fontSize: '3em',
    opacity: '0.7',
    backgroundColor: theme.palette.green.light,
    borderRadius: '50%',
    padding: '0.2em',
  },
  cardImage: {
    objectFit: 'cover',
    width: '100%',
    height: '20em',
    borderRadius: '10px',
  },
  urls: {
    display: 'inline-block',
    marginRight: '1em',
  },
}));

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        transform: 'translateX(-10px) scale(2.5)',
        zIndex: '10',
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        transform: 'translateX(15px) scale(2.5)',
        zIndex: '10',
      }}
      onClick={onClick}
    />
  );
}

function Game({ game, images, videos, scrollPosition }) {
  const description = useRef();
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const settings = {
    infinite: true,
    speed: 300,
    lazyLoad: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    cssEase: 'linear',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

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
        return (
          <FaPlaystation
            style={{ color: '#003087' }}
            className={classes.icon}
          />
        );
      case 'Xbox':
      case 'Xbox Store':
      case 'Xbox One':
      case 'Xbox Series X':
      case 'Xbox 360':
        return <FaXbox style={{ color: '#107C10' }} className={classes.icon} />;
      case 'Epic Games':
        return <SiEpicgames className={classes.icon} />;
      case 'PC':
        return (
          <FaWindows style={{ color: '#00adef' }} className={classes.icon} />
        );
      case 'Steam':
        return (
          <FaSteam style={{ color: '#171a21' }} className={classes.icon} />
        );
      case 'GOG':
        return <SiGroupon className={classes.icon} />;
      case 'Nintendo Switch':
      case 'Nintendo Store':
        return <SiNintendoswitch className={classes.icon} />;
      case 'Nintendo DS':
      case 'Nintendo 3DS':
      case 'Nintendo DSi':
        return <SiNintendo3Ds className={classes.icon} />;
      case 'Apple Macintosh':
      case 'iOS':
      case 'macOS':
      case 'App Store':
        return (
          <FaApple style={{ color: '#555555' }} className={classes.icon} />
        );
      case 'Android':
      case 'Google Play':
        return (
          <SiAndroid style={{ color: '#78C257' }} className={classes.icon} />
        );
      case 'Linux':
        return (
          <FaLinux style={{ color: '#333333' }} className={classes.icon} />
        );
      case 'itch.io':
        return (
          <SiItchDotIo style={{ color: '#fa5c5c' }} className={classes.icon} />
        );
      default:
        return;
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
          <Grid item container direction='row' spacing={5}>
            {/* LEFT COLUMN */}
            <Grid item md={3} align='center'>
              <Grid container direction='column'>
                <Grid item>
                  <LazyLoadImage
                    src={game.background_image}
                    effect='blur'
                    className={classes.cardImage}
                  />
                </Grid>
                {/* WEBSITE-REDDIT-METACRITIC */}

                <Grid item style={{ marginTop: '1rem' }}>
                  {game.website && (
                    <Typography
                      component={Link}
                      href={game.website}
                      target='__blank'
                      className={classes.urls}
                    >
                      Website:{' '}
                      <TiWorld
                        fontSize='1.75rem'
                        style={{ verticalAlign: 'middle' }}
                      />
                    </Typography>
                  )}
                  {game.reddit_url && (
                    <Typography
                      component={Link}
                      href={game.reddit_url}
                      className={classes.urls}
                      target='__blank'
                    >
                      Reddit:{' '}
                      <FaReddit
                        style={{ color: '#ff5700', verticalAlign: 'middle' }}
                        fontSize='1.5rem'
                      />
                    </Typography>
                  )}

                  {game.metacritic_url && (
                    <Typography
                      component={Link}
                      href={game.metacritic_url}
                      target='__blank'
                    >
                      Metacritic:{' '}
                      <AiFillMediumCircle
                        fontSize='1.75rem'
                        style={{
                          verticalAlign: 'middle',
                          transform: 'rotate(-45deg)',
                          color: '#FFCC34',
                        }}
                      />
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
            {/* CENTER COLUMN */}
            <Grid item md={6}>
              <Grid container direction='column'>
                {/* TITLE */}
                <Grid item>
                  <Typography variant='h1'>{game.name}</Typography>
                </Grid>
                {/* DATE */}
                <Grid item style={{ margin: '1.3em 0 1em 0' }}>
                  <Typography gutterBottom variant='h4' display='inline'>
                    {new Date(game.released)
                      .toDateString()
                      .split(' ')
                      .slice(1)
                      .join(' ')}{' '}
                    ({dayjs(new Date(game.released).toDateString()).fromNow()})
                  </Typography>
                </Grid>
                {/* PUBLISHERS */}
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
                {/* GENRE */}
                <Grid item style={{ marginTop: '1em' }}>
                  <Typography variant='body2' display='inline' gutterBottom>
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
                {/* PLATFORMS */}
                <Grid item>
                  <Typography variant='body2' display='inline' gutterBottom>
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
                {/* STORES */}
                <Grid item>
                  <Typography variant='body2' display='inline' gutterBottom>
                    Stores:
                  </Typography>
                  {game.stores.map(store => (
                    <IconButton
                      key={store.id}
                      edge='end'
                      size='small'
                      component={Link}
                      href={store.url}
                      target='__blank'
                    >
                      {renderIcons(store)}
                    </IconButton>
                  ))}
                </Grid>
                {/* DESCRIPTION*/}
                <Grid item ref={description} className={classes.content}>
                  <div
                    dangerouslySetInnerHTML={{ __html: game.description }}
                  ></div>
                </Grid>
                <Button
                  style={{ color: theme.palette.green.light }}
                  onClick={() =>
                    description.current.style.display === 'block'
                      ? (description.current.style.display = '-webkit-box')
                      : (description.current.style.display = 'block')
                  }
                >
                  Read more
                </Button>
              </Grid>
            </Grid>
            {/* RIGHT COLUMN */}
            <Grid item md={3}>
              <Grid container direction='column'>
                {/* METASCORE */}
                <Grid item style={{ marginBottom: '4em' }}>
                  <Typography gutterBottom align='center'>
                    Metascore
                  </Typography>
                  <div style={{ width: '15em', margin: '0 auto' }}>
                    <CircularProgressbar
                      value={game.metacritic}
                      text={game.metacritic}
                      styles={buildStyles({
                        pathTransitionDuration: '1.5',
                        textColor: theme.palette.green.light,
                        pathColor: theme.palette.green.light,
                      })}
                    />
                  </div>
                </Grid>
                {/* TAGS */}
                <Grid item align='center'>
                  {game.tags.map(tag => (
                    <Typography
                      gutterBottom
                      className={classes.tags}
                      variant='subtitle2'
                    >
                      {tag.name}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container direction='row' style={{ marginTop: '2em' }}>
            <Grid item md={12}>
              <Slider {...settings}>
                {game.clip && (
                  <div className={classes.videoWrapper}>
                    <video
                      src={game.clip.clips.full}
                      poster={game.clip.preview}
                      className={classes.gameImage}
                      onClick={e =>
                        e.target.paused ? e.target.play() : e.target.pause()
                      }
                    />
                    <FaPlay className={classes.playButton} />
                  </div>
                )}

                {videos.map(video => (
                  <div className={classes.videoWrapper}>
                    <video
                      src={video.data['480']}
                      poster={video.preview}
                      className={classes.gameImage}
                      onClick={e =>
                        e.target.paused ? e.target.play() : e.target.pause()
                      }
                    />
                    <FaPlay className={classes.playButton} />
                  </div>
                ))}

                {images.map(image => (
                  <LazyLoadImage
                    effect='blur'
                    scrollPosition={scrollPosition}
                    key={image.id}
                    className={classes.gameImage}
                    src={image.image}
                    alt={`image of ${game.name}`}
                    placeholderSrc={image.image}
                  />
                ))}
              </Slider>
            </Grid>
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

  const ss = await axios.get(
    `https://api.rawg.io/api/games/${params.slug}/screenshots`,
    {
      headers: { 'User-Agent': 'GamePortal/0.8' },
    }
  );
  const images = await ss.data.results;

  const mvs = await axios.get(
    `https://api.rawg.io/api/games/${params.slug}/movies`,
    {
      headers: { 'User-Agent': 'GamePortal/0.8' },
    }
  );
  const videos = await mvs.data.results;

  return { props: { game, images, videos } };
}

export default trackWindowScroll(Game);
