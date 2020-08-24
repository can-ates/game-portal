import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSWRInfinite } from 'swr';
import axios from 'axios';
import dynamic from 'next/dynamic';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  
}));

const SortBar = (props) => {
  const [genres, setGenres] = useState([]);
  const classes = useStyles();
  const theme = useTheme()

  useEffect(() => {
    axios
      .get('https://api.rawg.io/api/genres', {
        headers: { 'User-Agent': 'game-portal' },
      })
      .then(res => setGenres(res.data.results));
  }, []);

  const handleSort = (e) => {
    props.handleSorting(e.target.value)
  }

  return (
    <div>
    <FormControl  className={classes.formControl}>
    <InputLabel htmlFor="grouped-native-select">Sort By</InputLabel>
    <Select onChange={handleSort}  native defaultValue="" id="grouped-native-select">
    <option aria-label="None" value="" style={{backgroundColor: theme.palette.green.light}} />
      <optgroup  label="Genres" style={{backgroundColor: theme.palette.green.light}}>
      {genres.map(genre => {
        return (
          <option style={{backgroundColor: theme.palette.green.light}} key={genre.id} value={genre.slug}>
            {genre.name}
          </option>
        );
      })}
      </optgroup>
      <optgroup label="Category 2">
        <option value={3}>Option 3</option>
        <option value={4}>Option 4</option>
      </optgroup>
    </Select>
    </FormControl>
    </div>
  );
};

export default SortBar;
