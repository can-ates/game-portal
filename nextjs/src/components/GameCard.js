import React, { useState, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '../../src/Link';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';


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
  card: {
    backgroundColor: '#121212',
    position: 'relative',
    height: 'auto',
    width: 'auto',
    maxWidth: '30em',
    maxHeight: '25em',
    transition: 'all 0.3s cubic-bezier(0.230, 1.000, 0.320, 1.000)',
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        position: 'absolute',
        transform: 'scale(1.15)',
        minHeight: '35em',
        zIndex: '100',
        backgroundColor: 'rgba(18,18,18, 0.8)',
      },
    },
    borderRadius: '10px',
  },
  cardImage: {
    transition: 'all 0.9s ease-in-out',
    height: 'auto',
    width: '100%',
    minHeight: '30em',
    objectFit: 'cover',
  },

  cardVideo: {
    height: '20em',
    maxHeight: '20em',
    width: '100%',
    objectFit: 'fill',
    zIndex: '12',
  },
  videoDetail: {
    position: 'absolute',
    bottom: '-10px',
    zIndex: '100',
    width: '100%',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  imageDetail: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    opacity: '0.8',
    backgroundColor: theme.palette.secondary.main,
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
  },
  icon: {
    color: theme.palette.green.light,
    marginRight: '0.5em',
    fontSize: '1.2em',
  },
  playButton: {
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
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.3em 0',
  },
  similarButton: {
    backgroundColor: theme.palette.green.light,
    padding: '0.3em',
    marginTop: '1em',
  },
  fullButton: {
    position: 'absolute',
    right: '0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5em',
    marginRight: '0.5em',
    bottom: '15em',
    color: theme.palette.green.light,
    backgroundColor: 'rgba(18,18,18, 0.4)',
  },
  gameName: {
    color: theme.palette.green.light,
    display: 'block',
    '&:hover': {
      color: 'white',
      transform: 'scale(1.01)',
    },
  },
}));

const GameCard = ({ info, scrollPosition }) => {
  const [showVideo, setShowVideo] = useState(false);
  const media = useRef();
  const classes = useStyles();

  const renderIcons = useCallback(
    () =>
      info.parent_platforms.map(platform => {
        switch (platform.platform.name) {
          case 'PlayStation':
            return <FaPlaystation key='PlayStation' className={classes.icon} />;
          case 'Xbox':
            return <FaXbox key='Xbox' className={classes.icon} />;
          case 'PC':
            return <FaWindows key='PC' className={classes.icon} />;
          case 'Apple Macintosh':
            return <FaApple key='Apple Macintosh' className={classes.icon} />;
          case 'Linux':
            return <FaLinux key='Linux' className={classes.icon} />;
        }
      }),
    [info.parent_platforms]
  );

  return (
    <React.Fragment>
      <div
        style={{ position: 'relative', height: '100%' }}
        onMouseOver={() => setShowVideo(true)}
      >
        <Card
          ref={media}
          className={classes.card}
          elevation={0}
          onMouseLeave={() => setShowVideo(false)}
        >
          {showVideo && info.clip ? (
            <div>
              <CardMedia
                muted={true}
                autoPlay={true}
                loop={true}
                poster={info.clip ? info.clip.preview : undefined}
                elevation={0}
                component='video'
                className={classes.cardVideo}
                src={info.clip.clips['640']}
              />
              <Button
                size='large'
                variant='outlined'
                className={classes.fullButton}
                href={`https://www.youtube.com/watch?v=${info.clip.video}`}
                target='__blank'
              >
                <FaPlay style={{ marginRight: '1em' }} fontSize='0.6rem' />
                <Typography variant='overline'>Full Video</Typography>
              </Button>
            </div>
          ) : (
            <div>
              <LazyLoadImage
                className={classes.cardImage}
                src={info.background_image}
                effect='blur'
                scrollPosition={scrollPosition}
              />

              {info.clip && <FaPlay className={classes.playButton} />}

              {showVideo ? null : (
                <CardContent className={classes.imageDetail}>
                  {renderIcons()}
                  <Typography variant='h6'>{info.name}</Typography>
                </CardContent>
              )}
            </div>
          )}
          {showVideo && (
            <CardContent className={classes.videoDetail}>
              {renderIcons()}
              <Typography
                className={classes.gameName}
                component={Link}
                href={`/games/${[info.slug]}`}
                variant='subtitle1'
              >
                {info.name}
              </Typography>
              <Divider />
              <div className={classes.details}>
                <Typography variant='caption'>Release date: </Typography>
                <Typography variant='subtitle1'>{info.released}</Typography>
              </div>
              <Divider />
              <div className={classes.details}>
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
                className={classes.similarButton}
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

export default React.memo(GameCard);
