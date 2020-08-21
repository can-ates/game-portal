import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles} from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import { FaLinux } from 'react-icons/fa';
import { FaPlaystation } from 'react-icons/fa';
import { FaWindows } from 'react-icons/fa';
import { FaXbox } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';

const useStyles = makeStyles(theme => ({
  card: {
    position:'relative',
    height: 'auto',
    width: 'auto',
    maxHeight: '50em',
    transition: 'all 0.3s cubic-bezier(0.230, 1.000, 0.320, 1.000)',
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        position: 'absolute',
        transform: 'scale(1.2)',
        cursor: 'pointer'
      },
    },
    borderRadius: '10px',
  },
  cardImage: {
    height: 'auto',
    width: '100%',
    minHeight: '30em',
    objectFit: 'cover',
  },

  cardVideo: {
    height: 'auto',
    minHeight: '30em',
    width: '100%',
    objectFit: 'fill',
  },
  videoDetail: {
    position: 'absolute',
    transform: 'scale(1.2)',
    bottom: '-100px',
    left: '0',
    zIndex: '100',
    width: '100%',
    opacity: '0.5',
    backgroundColor: theme.palette.secondary.main,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  imageDetail: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    
    zIndex: '10',
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
    transform:'translate(-50%, -50%)',
    opacity: '0.7',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    padding: '0.2em'
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

  const handleVideo = useCallback(
    e => {
      setTimeout(() => {
        setShowVideo(e);
      }, 200);
    },
    [showVideo]
  );

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <Card
        className={classes.card}
        elevation={0}


        onMouseOver={() => handleVideo(true)}
        onMouseLeave={() => handleVideo(false)}
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

            
          </div>
        ) : (
          <div > 
            <CardMedia
              elevation={0}
              component='img'
              className={classes.cardImage}
              image={info.background_image}
            />
            {info.clip && <FaPlay className={classes.playButton} />}
            
            <CardContent className={classes.imageDetail}>
            {renderIcons()}
              <Typography variant='h6'>{info.name}</Typography>
            </CardContent>
          </div>
        )}

        
      </Card>
     
      {showVideo && 
        <CardContent className={classes.videoDetail}>
  {renderIcons()}
  <Typography variant='subtitle1'>{info.name}</Typography>
  <Typography variant='subtitle1'>{info.name}</Typography>
  <Typography variant='subtitle1'>{info.name}</Typography>
  <Typography variant='subtitle1'>{info.name}</Typography>
  <Typography variant='subtitle1'>{info.name}</Typography>
  </CardContent>}
    </div>
  );
};

export default React.memo(GameCard);
