import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '../../src/Link';

import LazyLoad from 'react-lazyload';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { FaLinux } from 'react-icons/fa';
import { FaPlaystation } from 'react-icons/fa';
import { FaWindows } from 'react-icons/fa';
import { FaXbox } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineDoubleRight } from 'react-icons/ai';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    height: '100%',
  },
  card: {
    backgroundColor: '#121212',
    position: 'relative',
    height: '25em',
    width: '100%',

    transition: 'transform 0.3s cubic-bezier(0.230, 1.000, 0.320, 1.000)',
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        position: 'absolute',
        transform: 'scale(1.15)',
        height: '33em',
        zIndex: '100',
        backgroundColor: 'rgba(18,18,18, 0.8)',
      },
    },
    borderRadius: '10px',
  },
  card__image: {
    transition: 'all 0.9s ease-in-out',
    maxWidth: '100%',
    maxHeight: '100%',
    minHeight: '25em',
    objectFit: 'cover',
  },
  card__imageDetail: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    opacity: '0.8',
    backgroundColor: theme.palette.secondary.main,
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
  },
  card__playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    fontSize: '5em',
    transform: 'translate(-50%, -50%)',
    opacity: '0.7',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    padding: '0.2em',
  },
  card__video: {
    height: '20em',
    width: '100%',
    objectFit: 'fill',
    zIndex: '12',
  },

  card__videoDetail: {
    position: 'absolute',
    left: '0px',
    bottom: '0px',
    zIndex: '1000',
    backgroundColor: 'rgba(18,18,18, 0.8)',
    width: '100%',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
  },
  card__fullButton: {
    position: 'absolute',
    right: '-5%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5em',
    marginRight: '0.5em',
    top: '0',
    color: theme.palette.green.light,
    backgroundColor: 'rgba(18,18,18, 0.2)',
  },
  card__playIcon: {
    marginRight: '1em',
  },

  card__icon: {
    color: theme.palette.green.light,
    marginRight: '0.5em',
    fontSize: '1.2em',
  },

  card__details: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.3em 0',
  },
  card__similarButton: {
    backgroundColor: theme.palette.green.light,
    padding: '0.3em',
    marginTop: '1em',
  },

  card__gameName: {
    color: theme.palette.green.light,
    display: 'block',
    fontSize: '1.2rem',
    '&:hover': {
      color: 'white',
      transform: 'scale(1.01)',
    },
  },
}));

const GameCard = ({ info }) => {
  const [showVideo, setShowVideo] = useState(false);

  const classes = useStyles();

  const renderIcons = useCallback(
    () =>
      info.parent_platforms.map(platform => {
        switch (platform.platform.name) {
          case 'PlayStation':
            return (
              <FaPlaystation key='PlayStation' className={classes.card__icon} />
            );
          case 'Xbox':
            return <FaXbox key='Xbox' className={classes.card__icon} />;
          case 'PC':
            return <FaWindows key='PC' className={classes.card__icon} />;
          case 'Apple Macintosh':
            return (
              <FaApple key='Apple Macintosh' className={classes.card__icon} />
            );
          case 'Linux':
            return <FaLinux key='Linux' className={classes.card__icon} />;
        }
      }),
    [info.parent_platforms]
  );

  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        <Card
          className={classes.card}
          elevation={0}
          onMouseLeave={() => setShowVideo(false)}
        >
          {showVideo && info.clip ? (
            <LazyLoad height='100%' unmountIfInvisible={true}>
              <CardMedia
                muted={true}
                autoPlay={true}
                loop={true}
                elevation={0}
                component='video'
                className={classes.card__video}
                src={info.clip.clips['640']}
              />

              <Button
                size='large'
                variant='outlined'
                className={classes.card__fullButton}
                href={`https://www.youtube.com/watch?v=${info.clip.video}`}
                target='__blank'
              >
                <FaPlay className={classes.card__playIcon} fontSize='0.6rem' />
                <Typography variant='overline'>Full Video</Typography>
              </Button>
            </LazyLoad>
          ) : (
            <LazyLoad height='100%' offset={500} unmountIfInvisible={true}>
              <img
                src={info.background_image}
                className={classes.card__image}
                onMouseOver={() => setShowVideo(true)}
              />

              {info.clip && <FaPlay className={classes.card__playButton} />}

              {showVideo ? null : (
                <CardContent className={classes.card__imageDetail}>
                  {renderIcons()}
                  <Typography variant='h6'>{info.name}</Typography>
                </CardContent>
              )}
            </LazyLoad>
          )}
          {showVideo && (
            <CardContent className={classes.card__videoDetail}>
              {renderIcons()}
              <Typography
                className={classes.card__gameName}
                component={Link}
                href={`/games/${[info.slug]}`}
                variant='subtitle1'
                noWrap
              >
                {info.name}
              </Typography>
              <Divider />
              <div className={classes.card__details}>
                <Typography variant='caption'>Release date: </Typography>
                <Typography variant='subtitle1'>{info.released}</Typography>
              </div>
              <Divider />
              <div className={classes.card__details}>
                <Typography variant='caption'>Genres: </Typography>
                <div>
                  {info.genres.map(genre => (
                    <Typography
                      display='inline'
                      key={genre.name}
                      variant='overline'
                    >
                      {' '}
                      {genre.name}
                    </Typography>
                  ))}
                </div>
              </div>
              <Divider />

              <Button
                size='small'
                fullWidth
                endIcon={<AiOutlineDoubleRight />}
                variant='outlined'
                className={classes.card__similarButton}
                component={Link}
                as={`/discovery/similar-to-${info.slug}`}
                href={`/discovery/${[info.id]}`}
              >
                Show more like this
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </React.Fragment>
  );
};

export default GameCard;
