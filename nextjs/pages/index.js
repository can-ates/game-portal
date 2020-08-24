import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSWRInfinite } from 'swr';
import axios from 'axios';
import dynamic from 'next/dynamic';

import { useTheme } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const GameCard = dynamic(() => import('../src/components/GameCard'));
const SortBar = dynamic(() => import('../src/components/SortBar'))

const fetcher = url =>
  axios
    .get(url, {
      headers: { 'User-Agent': 'game-portal' },
    })
    .then(res => res.data.results);

function Index(props) {
  const observer = useRef();
  const [genre, setGenre] = useState(undefined)

  const theme = useTheme();
  const { data, error, size, setSize, mutate } = useSWRInfinite(
    size => `https://api.rawg.io/api/games?page_size=40&page=${size + 1}&genres=${genre}`,
    fetcher,
    { initialData: props.games, initialSize: 1, revalidateOnMount: true }
  );

  if (error) return <p>Error occured</p>;
  if (!data) return <p>Loading</p>;

  let games = [];

  for (let i = 0; i < data.length; i++) {
    games = games.concat(data[i]);
  }

  const lastGameCardRef = useCallback(
    node => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            setSize(size + 1);
            observer.current.disconnect();
          }
        },
      );
      if (node) observer.current.observe(node);
    },
    [size]
  );

  const handleSorting = useCallback((e) => {
    console.log(e)
    
    setSize(0)
    setGenre(e)
  }, [])

  return (
    <div style={{ margin: '2em 0', padding: 20 }}>
      <Grid container direction='column'>
        <Grid item container direction='row' justify='space-between'>
          <Grid item>
            <Typography
              align='left'
              style={{ marginBottom: '1.250em' }}
              variant='h1'
            >
              All Games
            </Typography>
          </Grid>
          <Grid item>
            <SortBar
              handleSorting={handleSorting}
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          spacing={10}
          direction='row'
          justify='space-between'
        >
          {games.map((game, i) => {
            if (games.length === i + 1) {
              return (
                <React.Fragment key={game.id}>
                  <Grid
                    item
                    md={3}
                    sm={6}
                    style={{ padding: '2em' }}
                    ref={lastGameCardRef}
                  >
                    <GameCard info={game} key={i} />
                  </Grid>

                  <Button
                    style={{
                      backgroundColor: theme.palette.green.dark,
                      margin: '15em auto 5em auto',
                    }}
                  >
                    Load More
                  </Button>
                </React.Fragment>
              );
            } else {
              return (
                <Grid
                  item
                  md={3}
                  sm={6}
                  key={game.id}
                  style={{ padding: '2em' }}
                >
                  <GameCard info={game} key={i} />
                </Grid>
              );
            }
          })}
        </Grid>
      </Grid>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get('https://api.rawg.io/api/games?page_size=40', {
    headers: { 'User-Agent': 'game-portal' },
  });

  return {
    props: { games: res.data.results },
  };
}

export default React.memo(Index);
