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
  anan :{
    border: '1px solid red'
  }
  
}));

const SortBar = (props) => {
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([])
  const classes = useStyles();
  const theme = useTheme()

  useEffect(() => {
    axios
      .get('https://api.rawg.io/api/genres?page_size=40', {
        headers: { 'User-Agent': 'game-portal' },
      })
      .then(res => setGenres(res.data.results));

      axios
      .get('https://api.rawg.io/api/tags?page_size=40', {
        headers: { 'User-Agent': 'game-portal' },
      })
      .then(res => setTags(res.data.results));
  }, []);

  const handleSort = (e) => {
    props.handleSorting(e.target.value)
    
  }

  return (
    <div>
    <FormControl  className={classes.formControl}>
    <InputLabel htmlFor="grouped-native-select">Sort By</InputLabel>
    <Select onChange={handleSort}  native defaultValue="reset" id="grouped-native-select">
    <option aria-label="None" value="All Games" style={{backgroundColor: theme.palette.green.light}}>All</option>
      <optgroup  label="Genres" style={{backgroundColor: theme.palette.green.light}}>
      {genres.map(genre => {
        return (
          <option style={{backgroundColor: theme.palette.green.light}} key={genre.id} value={`genres=${genre.slug}`}>
            {genre.name}
          </option>
        );
      })}
      </optgroup>
      <optgroup  label="Tags" style={{backgroundColor: theme.palette.green.light}}>
      {tags.map(tag => {
        return (
          <option data-field='tags' className={classes.anan} style={{backgroundColor: theme.palette.green.light}} key={tag.id} value={`tags=${tag.slug}`}>
            {tag.name}
          </option>
        );
      })}
      </optgroup>
    </Select>
    </FormControl>
    </div>
  );
};

export default SortBar;
