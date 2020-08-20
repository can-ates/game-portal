import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  card: {
    height: 'auto',
    width: 'auto',
    maxHeight: '50em',
    transition: 'transform 0.4s ease-out',
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        position: 'absolute',
        transform: 'scale(1.2)',
      },
    },
  },
  cardImage: {
    height: 'auto',
    width: '100%',
    minHeight: '30em',
    position: 'relative',
    objectFit: 'cover',
  },
  spinner: {
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
}));

const GameCard = ({ info }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {}, []);

  return (
    <div style={{ position: 'relative' }}>
      <Card
        className={classes.card}
        elevation={0}
        onMouseEnter={useCallback(() => setShowVideo(true), [showVideo])}
        onMouseLeave={useCallback(() => setShowVideo(false), [showVideo])}
      >
        {showVideo ? (
          <CardMedia
            muted={true}
            autoPlay={true}
            elevation={0}
            component='video'
            className={classes.cardImage}
            src={info.clip.clips['640']}
          />
        ) : (
          <>
            <CardMedia
              elevation={0}
              component='img'
              className={classes.cardImage}
              image={info.background_image}
            />
            {showSpinner && <CircularProgress className={classes.spinner} />}
          </>
        )}
      </Card>
    </div>
  );
};

export default GameCard;
