import React from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
const Grid = dynamic(() => import('@material-ui/core/Grid'));
const GameCard = dynamic(() => import('../../src/components/GameCard'));

const useStyles = makeStyles(theme => ({
  body: {
    marginTop: '3em',
    padding: 20,
  },
  body__title: {
    marginBottom: '2.250em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  body__cards: {
    padding: '2em',
  },
}));

const Similar = ({ details, game }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.body}>
      <Head>
        <title key='title'>
          Visually similar games to {game} | Game Portal
        </title>
        <meta
          name='description'
          key='description'
          content={`Game Portal | You liked ${game} ?. You can continue your journey with visually similar games to ${game} `}
        />
        <meta
        key='og:title'
        property='og:title'
        content={`Game Portal | You liked ${game} ?. You can continue your journey with visually similar games to ${game} `}
        />
      </Head>

      <Grid container direction='column'>
        <Grid item>
          <Typography
            className={classes.body__title}
            align='center'
            variant='h1'
          >
            Visually similar games to {game}
          </Typography>
        </Grid>
        <Grid
          item
          container
          spacing={10}
          direction='row'
          justify='space-between'
        >
          {details.map((game, i) => {
            return (
              <Grid
                item
                md={3}
                sm={6}
                key={game.id}
                className={classes.body__cards}
              >
                <GameCard info={game} key={i} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export async function getServerSideProps(context) {
  const slug = context.query.id.split('similar-to-')[1];
  const fullName = slug.split('-').join(' ').toUpperCase();

  const res = await axios.get(
    `https://api.rawg.io/api/games/${slug}/suggested?page_size=40`,
    {
      headers: { 'User-Agent': 'Gameportal/0.8' },
    }
  );

  return {
    props: { details: res.data.results, game: fullName },
  };
}

export default Similar;
