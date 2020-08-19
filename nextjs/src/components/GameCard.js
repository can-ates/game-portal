import React from 'react';
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
  },
  cardImage: {
    height: 'auto',
    width: '100%',
    minHeight: '30em',
    transition: 'transform 0.4s ease-out',
    [theme.breakpoints.up('sm')]: {
        '&:hover': {
          position: 'absolute',
          transform: 'scale(1.2)'
        },
    },
    
  },
}));

const GameCard = ({ info }) => {
  const classes = useStyles();
  const theme = useTheme();

  

 
  return (
    <div style={{position: 'relative'}} >
      <Card className={classes.card}>
        <CardMedia
          component='img'
          className={classes.cardImage}
          image={info.background_image}
        />
      </Card>
    </div>
  );
};

export default GameCard;
