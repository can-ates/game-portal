import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSWRInfinite } from 'swr';
import axios from 'axios';
import dynamic from 'next/dynamic';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Skeleton = dynamic(() => import('@material-ui/lab/Skeleton'));
const GameCard = dynamic(() => import('../src/components/GameCard'));
const SortBar = dynamic(() => import('../src/components/SortBar'));

const useStyles = makeStyles(theme => ({
  navbar: {
    position: 'sticky',
    top: '0',
    overflowY: 'scroll',
    height: '100vh',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

const fetcher = url =>
  axios
    .get(url)
    .then(res => res.data.results);

function Index(props) {
  const observer = useRef();
  const classes = useStyles();
  const [title, setTitle] = useState('All Games');
  const [genre, setGenre] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [tag, setTag] = useState(null);
  const [store, setStore] = useState(null);
  const [first, setFirst] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, error, size, setSize } = useSWRInfinite(
    size =>
      `https://api.rawg.io/api/games?page_size=40&page=${
        size + 1
      }&${genre}&${platform}&${tag}&${store}`,
    fetcher,
    { initialData: props.games, initialSize: 1, revalidateOnMount: first }
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
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setSize(size + 1);
          observer.current.disconnect();
        }
      });
      if (node) observer.current.observe(node);
    },
    [size]
  );

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1300);
    }
  }, [genre, tag, platform, store]);

  const handleSorting = useCallback((e, name) => {
    setFirst(true);
    setLoading(true);
    setSize(0);

    if (e.split('=')[0] === 'tags') {
      setTag(e);
      setGenre(null);
      setPlatform(null);
      setStore(null);
    }
    if (e.split('=')[0] === 'genres') {
      setGenre(e);
      setTag(null);
      setPlatform(null);
      setStore(null);
    }
    if (e.split('=')[0] === 'platforms') {
      setPlatform(e);
      setGenre(null);
      setTag(null);
      setStore(null);
    }

    if (e.split('=')[0] === 'stores') {
      setStore(e);
      setGenre(null);
      setTag(null);
      setPlatform(null);
    }
    setTitle(name);
  }, []);

  return (
    <div style={{ margin: '2em 0', padding: '0 10 0 10' }}>
      <Grid container direction='column'>
        <Grid item container direction='row' justify='space-between'>
          <Grid item>
            <Typography
              align='left'
              style={{ marginBottom: '1.250em' }}
              variant='h1'
            >
              {title}
            </Typography>
          </Grid>
        </Grid>

        <Grid spacing={5} item container direction='row'>
          <Grid justify='flex-start' md={2} item container direction='column'>
            <div className={classes.navbar}>
              <Grid item>
                <SortBar
                  type='genres'
                  size='17'
                  handleSorting={handleSorting}
                />
              </Grid>
              <Grid item>
                <SortBar type='tags' size='20' handleSorting={handleSorting} />
              </Grid>
              <Grid item>
                <SortBar
                  type='platforms'
                  size='20'
                  handleSorting={handleSorting}
                />
              </Grid>
              <Grid item>
                <SortBar type='stores' size='11' handleSorting={handleSorting} />
              </Grid>
            </div>
          </Grid>
          <Grid
            item
            container
            md={10}
            spacing={5}
            direction='row'
            justify='space-between'
          >
            {loading
              ? Array.from({ length: 20 }).map(() => (
                  <Grid item xl={2} lg={3} md={4} sm={6}>
                    <Skeleton
                      animation='wave'
                      variant='rect'
                      width={250}
                      height={350}
                      style={{ borderRadius: '5px' }}
                    />
                  </Grid>
                ))
              : games.map((game, i) => {
                  if (games.length === i + 1) {
                    return (
                      <React.Fragment key={game.id}>
                        <Grid
                          item
                          xl={2}
                          lg={3}
                          md={4}
                          sm={6}
                          ref={lastGameCardRef}
                        >
                          <GameCard info={game} key={i} />
                        </Grid>
                      </React.Fragment>
                    );
                  } else {
                    return (
                      <Grid item xl={2} lg={3} md={4} sm={6} key={game.id}>
                        <GameCard info={game} key={i} />
                      </Grid>
                    );
                  }
                })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get('https://api.rawg.io/api/games?page_size=40', {
    headers: { 'User-Agent': 'GamePortal/0.8' },
  });

  return {
    props: { games: res.data.results },
  };
}

export default React.memo(Index);
