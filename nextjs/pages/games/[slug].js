import React, { useRef, useCallback, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from '../../src/Link';
import Head from 'next/head';
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

import CommentForm from '../../src/components/CommentForm';
import Comment from '../../src/components/Comment';
import { instance } from '../../src/utils/axios';

const Skeleton = dynamic(() => import('@material-ui/lab/Skeleton'));

const useStyles = makeStyles(theme => ({
  background: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    minHeight: '60%',
    zIndex: '-5',
    minWidth: '100%',
    backgroundPosition: 'center top',
    backgroundSize: 'cover',

    opacity: '0.3',
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
    backgroundImage: 'linear-gradient(180deg, transparent, #71b280);',
  },
  wrapper: {
    padding: '8em 10em 2em 10em',
    [theme.breakpoints.down('sm')]: {
      padding: '1em 2em',
    },
  },
  leftColumn__cardImage: {
    objectFit: 'cover',
    width: '100%',
    height: '20em',
    borderRadius: '10px',
  },
  leftColumn__links: {
    marginTop: '1rem',
  },
  leftColumn__urls: {
    display: 'inline-block',
    marginRight: '1em',
  },
  centerColumn__date: {
    margin: '1.3em 0 1em 0',
  },
  centerColumn__about: {
    marginTop: '5em',
  },
  centerColumn__genreTitle: {
    marginTop: '1em',
  
  },
  centerColumn__about: {
    marginLeft: '1em',
    color: theme.palette.green.light,
    wordBreak: 'break-word'
  },
  centerColumn__icon: {
    marginLeft: '1em',
    fontSize: '1.3rem',
    '&:hover': {
      cursor: 'pointer',
      color: 'white',
    },
    verticalAlign: 'middle',
    display: 'inline',
  },
  centerColumn__description: {
    display: '-webkit-box',
    '-webkit-line-clamp': '4',
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  centerColumn__moreButton: {
    color: theme.palette.green.light,
  },
  rightColumn: {
    padding: '1em 1em 0 1em',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
  rightColumn__title: {
    marginBottom: '4em',
  },
  rightColumn__metascore: {
    maxWidth: '10em',
    [theme.breakpoints.down('sm')]: {
      width: '13em',
    },
    width: 'auto',
    margin: '0 auto',
  },

  rightColumn__tags: {
    backgroundColor: 'rgba(119, 146, 118, 0.3)',
    opacity: '0.7',
    marginRight: '1em',
    display: 'inline-block',
    color: 'white'
  },
  slider: {
    padding: '1em',
  },
  slider__videoWrapper: {
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
      cursor: 'pointer',
    },
    height: 'auto',
    width: 'auto',
  },
  slider__gameImage: {
    padding: '0.5em 1em',
    borderRadius: '20px',
    objectFit: 'fill',
    transition: 'all 0.3s cubic-bezier(0.230, 1.000, 0.320, 1.000)',

    '&:hover': {
      transform: 'scale(1.1)',
      cursor: 'pointer',
    },
    height: '14em',
    width: '100%',
  },
  slider__playButton: {
    position: 'absolute',
    bottom: '2%',
    right: '2%',
    fontSize: '3em',
    opacity: '0.7',
    backgroundColor: theme.palette.green.light,
    borderRadius: '50%',
    padding: '0.2em',
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
  const observer = useRef();
  const description = useRef();
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const [comments, setComments] = useState([]);
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const settings = {
    infinite: true,
    speed: 300,
    lazyLoad: true,
    slidesToShow: 4,
    swipeToSlide: true,
    slidesToScroll: 4,
    cssEase: 'linear',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1144,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
            className={classes.centerColumn__icon}
          />
        );
      case 'Xbox':
      case 'Xbox Store':
      case 'Xbox One':
      case 'Xbox Series X':
      case 'Xbox 360':
        return (
          <FaXbox
            style={{ color: '#107C10' }}
            className={classes.centerColumn__icon}
          />
        );
      case 'Epic Games':
        return <SiEpicgames className={classes.centerColumn__icon} />;
      case 'PC':
        return (
          <FaWindows
            style={{ color: '#00adef' }}
            className={classes.centerColumn__icon}
          />
        );
      case 'Steam':
        return (
          <FaSteam
            style={{ color: '#171a21' }}
            className={classes.centerColumn__icon}
          />
        );
      case 'GOG':
        return <SiGroupon className={classes.centerColumn__icon} />;
      case 'Nintendo Switch':
      case 'Nintendo Store':
        return <SiNintendoswitch className={classes.centerColumn__icon} />;
      case 'Nintendo DS':
      case 'Nintendo 3DS':
      case 'Nintendo DSi':
        return <SiNintendo3Ds className={classes.centerColumn__icon} />;
      case 'Apple Macintosh':
      case 'iOS':
      case 'macOS':
      case 'App Store':
        return (
          <FaApple
            style={{ color: '#555555' }}
            className={classes.centerColumn__icon}
          />
        );
      case 'Android':
      case 'Google Play':
        return (
          <SiAndroid
            style={{ color: '#78C257' }}
            className={classes.centerColumn__icon}
          />
        );
      case 'Linux':
        return (
          <FaLinux
            style={{ color: '#333333' }}
            className={classes.centerColumn__icon}
          />
        );
      case 'itch.io':
        return (
          <SiItchDotIo
            style={{ color: '#fa5c5c' }}
            className={classes.centerColumn__icon}
          />
        );
      default:
        return;
    }
  };

  const handleComment = values => {
    instance.post(`/games/${game.slug}`, {
      title: values.title,
      body: values.body,
    });
  };

  if (router.isFallback) {
    return (
      <div className={classes.wrapper}>
        <Grid container direction='column'>
          <Grid item container direction='row' spacing={4}>
            {/* LEFT COLUMN */}
            <Grid item sm={3} xs={12} className={classes.leftColumn}>
              <Grid container direction='column'>
                <Grid item>
                  <Skeleton
                    animation='pulse'
                    variant='rect'
                    height='20em'
                   
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* CENTER COLUMN */}
            <Grid item sm={6} xs={12} className={classes.centerColumn}>
              <Grid container direction='column'>
                {/* TITLE */}
                <Grid item>
                  <Skeleton
                    animation='pulse'
                    variant='rect'
                    width='100%'
                    height='3rem'
                  />
                </Grid>
                {/* DATE */}
                <Grid item className={classes.centerColumn__date}>
                  <Skeleton
                    animation='pulse'
                    variant='rect'
                    width='100%'
                    height='1.5rem'
                  />
                </Grid>
                {/* PUBLISHERS */}
                <Grid item>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      animation='pulse'
                      variant='rect'
                      width='100%'
                      height='1rem'
                    />
                  ))}
                </Grid>
                <Grid item className={classes.centerColumn__aboutTitle}>
                  <Skeleton
                    animation='pulse'
                    variant='rect'
                    width='100%'
                    height='1rem'
                  />
                </Grid>
                {/* GENRE */}
                <Grid item className={classes.centerColumn__genreTitle}>
                  <Skeleton
                    animation='pulse'
                    variant='rect'
                    width='100%'
                    height='1rem'
                  />
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      animation='pulse'
                      variant='rect'
                      width='100%'
                      height='0.9rem'
                    />
                  ))}
                </Grid>
                {/* PLATFORMS */}
                <Grid item>
                  <Skeleton
                    animation='pulse'
                    variant='rect'
                    width='100%'
                    height='1rem'
                  />
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      animation='pulse'
                      variant='rect'
                      width='100%'
                      height='0.9rem'
                    />
                  ))}
                </Grid>
                {/* STORES */}
                <Grid item>
                  <Skeleton
                    animation='pulse'
                    variant='rect'
                    width='100%'
                    height='1rem'
                  />
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      animation='pulse'
                      variant='rect'
                      width='100%'
                      height='0.9rem'
                    />
                  ))}
                </Grid>
                {/* DESCRIPTION*/}
                <Grid item className={classes.centerColumn__description}>
                  <Skeleton
                    animation='pulse'
                    variant='rect'
                    width='100%'
                    height='1rem'
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* RIGHT COLUMN */}
            <Grid item sm={3} xs={12} className={classes.rightColumn}>
              <Grid container direction='column'>
                {/* METASCORE */}
                <Grid item className={classes.rightColumn__title}>
                  <Skeleton
                    animation='pulse'
                    variant='rect'
                    width='100%'
                    height='1rem'
                  />
                  <div className={classes.rightColumn__metascore}>
                    <Skeleton
                      animation='pulse'
                      variant='rect'
                      width='100%'
                      height='10em'
                      style={{marginTop: '1em'}}
                    />
                  </div>
                </Grid>
                {/* TAGS */}
                <Grid item align='center'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    animation='pulse'
                    variant='rect'
                    width='100%'
                    height='3em'
                  />
                ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  const fetchComments = node => {
    observer.current = new IntersectionObserver(entries => {
      console.log('3');
      if (entries[0].isIntersecting) {
        console.log('4');
        instance.get(`/games/${game.slug}`).then(res => {
          if (!res.data.general) setComments(res.data);
          observer.current.disconnect();
        });
      }
    });
    if (node) observer.current.observe(node);
  };

  return (
    <React.Fragment>
      <Head>
        <title key='title'>
          {game.name} - description, videos, screenshots | Game Portal
        </title>
        <meta
          name='description'
          key='description'
          content={`Game Portal | Description, videos, screenshots, release date, ${
            game.website && 'website'
          }, ${game.reddit_url && 'reddit'}, ${
            game.metacritic_url && 'metacritic'
          } of ${game.name}`}
        />
        <meta
          key='og:title'
          property='og:title'
          content={`Game Portal | Description, videos, screenshots, release date, ${
            game.website && 'website'
          }, ${game.reddit_url && 'reddit'}, ${
            game.metacritic_url && 'metacritic'
          } of ${game.name}`}
        />
      </Head>
      <div
        style={{ backgroundImage: `url(${game.background_image})` }}
        className={classes.background}
      >
        <div className={classes.imageShadow} />
      </div>
      <div className={classes.wrapper}>
        <Grid container direction='column'>
          <Grid item container direction='row' spacing={4}>
            {/* LEFT COLUMN */}
            <Grid item md={3} className={classes.leftColumn}>
              <Grid container direction='column'>
                <Grid item>
                  <LazyLoadImage
                    src={game.background_image}
                    effect='blur'
                    className={classes.leftColumn__cardImage}
                  />
                </Grid>
                {/* WEBSITE-REDDIT-METACRITIC */}

                <Grid
                  align={matchesSM ? 'center' : null}
                  item
                  className={classes.leftColumn__links}
                >
                  {game.website && (
                    <Typography
                      component={Link}
                      href={game.website}
                      target='__blank'
                      className={classes.leftColumn__urls}
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
                      className={classes.leftColumn__urls}
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
            <Grid item md={6} className={classes.centerColumn}>
              <Grid container direction='column'>
                {/* TITLE */}
                <Grid item>
                  <Typography variant='h1'>{game.name}</Typography>
                </Grid>
                {/* DATE */}
                <Grid item className={classes.centerColumn__date}>
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
                <Grid item className={classes.centerColumn__aboutTitle}>
                  <Typography>About</Typography>
                </Grid>
                {/* GENRE */}
                <Grid item className={classes.centerColumn__genreTitle}>
                  <Typography variant='body2' display='inline' gutterBottom>
                    Genre:
                  </Typography>
                  {game.genres.map(genre => (
                    <Typography
                      variant='subtitle1'
                      className={classes.centerColumn__about}
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
                      className={classes.centerColumn__about}
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
                <Grid
                  item
                  ref={description}
                  className={classes.centerColumn__description}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: game.description }}
                  ></div>
                </Grid>
                <Button
                  className={classes.centerColumn__moreButton}
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
            <Grid item md={3} className={classes.rightColumn}>
              <Grid container direction='column'>
                {/* METASCORE */}
                <Grid item className={classes.rightColumn__title}>
                  <Typography gutterBottom align='center'>
                    Metascore
                  </Typography>
                  <div className={classes.rightColumn__metascore}>
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
                      key={tag.id}
                      gutterBottom
                      className={classes.rightColumn__tags}
                      variant='subtitle2'
                    >
                      {tag.name}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Grid item container direction='row' className={classes.slider}>
        <Grid item xs={12}>
          <Slider {...settings}>
            {game.clip && (
              <div className={classes.slider__videoWrapper}>
                <video
                  src={game.clip.clips.full}
                  poster={game.clip.preview}
                  className={classes.slider__gameImage}
                  onClick={e =>
                    e.target.paused ? e.target.play() : e.target.pause()
                  }
                />
                <FaPlay className={classes.slider__playButton} />
              </div>
            )}

            {videos.map((video, i) => (
              <div key={i} className={classes.slider__videoWrapper}>
                <video
                  src={video.data['480']}
                  poster={video.preview}
                  className={classes.slider__gameImage}
                  onClick={e =>
                    e.target.paused ? e.target.play() : e.target.pause()
                  }
                />
                <FaPlay className={classes.slider__playButton} />
              </div>
            ))}

            {images.map(image => (
              <LazyLoadImage
                effect='blur'
                scrollPosition={scrollPosition}
                key={image.id}
                className={classes.slider__gameImage}
                src={image.image}
                alt={`image of ${game.name}`}
              />
            ))}
          </Slider>
        </Grid>
      </Grid>
      <Grid item container direction='column' style={{marginBottom: '2em'}}>
        <Grid item ref={fetchComments}>
          <CommentForm handleComment={handleComment} />
        </Grid>
        <Grid item>
          {comments.length > 0 ? (
            comments.map(comment => (
              <Comment
                key={comment.createdAt}
                body={comment.body}
                handle={comment.handle}
                title={comment.title}
                image={comment.image}
                createdAt={comment.createdAt}
              />
            ))
          ) : (
            <Typography variant='h3' align='center'>
              Nobody commented yet
            </Typography>
          )}
        </Grid>
      </Grid>
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
