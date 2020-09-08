import React, { useState, useCallback } from 'react';
import useSWR from 'swr';
import axios from 'axios';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import { FaLinux } from 'react-icons/fa';
import { FaXbox } from 'react-icons/fa';
import { FaPlaystation } from 'react-icons/fa';
import { FaSteam } from 'react-icons/fa/';
import { FaWindows } from 'react-icons/fa/';
import { FaApple } from 'react-icons/fa/';
import { SiNintendoswitch } from 'react-icons/si';
import { SiAndroid } from 'react-icons/si';
import { SiNintendo3Ds } from 'react-icons/si';
import { SiGroupon } from 'react-icons/si';
import { SiEpicgames } from 'react-icons/si';
import { SiItchDotIo } from 'react-icons/si';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'transparent',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  icon: {
    minWidth: 'auto',
    color: 'white',
    marginRight: '0.3em',
    fontSize: '1.0rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
      
    },
  },
  avatar: {
    height: '2em',
    width: '3em',
    borderRadius: '10px',
    marginLeft: 'auto',
    
  },
  sortName : {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.85rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.75rem'
    },
  }
}));

const fetcher = url => axios.get(url).then(res => res.data.results);

const SortBar = props => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))

  const { data, error } = useSWR(
    `https://api.rawg.io/api/${props.type}?page_size=${props.size}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const handleSort = event => {
    // props.handleSorting(e.target.value)
    // props.handleSorting(e.target.innerText.split(' ').join('-').toLowerCase())
    // props.handleSorting(`${props.type}=`+e.target.innerText.split(' ').join('-').toLowerCase());

    data.map(d => {
      if (d.name === event.target.innerText) {
        props.handleSorting(`${props.type}=` + d.id, d.name);
      }
    });
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const renderIcons = info => {
    switch (info.name) {
      case 'PlayStation':
      case 'PlayStation Store':
      case 'PlayStation 5':
      case 'PlayStation 4':
      case 'PlayStation 3':
      case 'PlayStation 2':
      case 'PS Vita':
      case 'PSP':
        return <FaPlaystation  key='PlayStation' style={{fontSize: '1.5rem'}} />;
      case 'Xbox':
      case 'Xbox Store':
      case 'Xbox 360 Store':
      case 'Xbox One':
      case 'Xbox Series X':
      case 'Xbox 360':
        return <FaXbox key={info.name} style={{fontSize: '1.5rem'}} />;
      case 'PC':
        return <FaWindows key={info.name} style={{fontSize: '1.5rem'}} />;
      case 'Steam':
        return <FaSteam key={info.name} style={{fontSize: '1.5rem'}} />;
      case 'Epic Games':
        return <SiEpicgames key={info.name} style={{fontSize: '1.5rem'}} />;
      case 'GOG':
        return <SiGroupon key={info.name} style={{fontSize: '1.5rem'}} />;
      case 'Nintendo Switch':
      case 'Nintendo Store':
        return <SiNintendoswitch key={info.name} style={{fontSize: '1.5rem'}} />;
      case 'Nintendo DS':
      case 'Nintendo 3DS':
      case 'Nintendo DSi':
        return <SiNintendo3Ds key={info.name}  style={{fontSize: '1.5rem'}}/>;
      case 'Apple Macintosh':
      case 'iOS':
      case 'macOS':
      case 'App Store':
        return <FaApple key={info.name} style={{fontSize: '1.5rem'}} />;
      case 'Android':
      case 'Google Play':
        return <SiAndroid key={info.name} />;
      case 'Linux':
        return <FaLinux key={info.name} />;
      case 'itch.io':
        return <SiItchDotIo key={info.name} />;
      default:
        return (
          <LazyLoadImage
            className={classes.avatar}
            src={info.image_background}
            effect='blur'
           
          />
        );
    }
  };

  return (
    <div>
      <List
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader
            disableGutters
            disableSticky
            style={{
              fontSize: matchesSM ? '1.0rem' : '1.5rem',
              color: theme.palette.green.light,
              fontWeight: '900',
            }}
            component='div'
            id='nested-list-subheader'
          >
            {props.type.toUpperCase()}
          </ListSubheader>
        }
        className={classes.root}
      >
        {data.slice(0, 3).map(data => {
          return (
            <ListItem
              onClick={handleSort}
              button
              key={data.id}
              data-key={data.id}
              disableGutters
              className={classes.listItem}
              
              
            >
              <ListItemIcon  className={classes.icon} >{renderIcons(data)}</ListItemIcon>
              {/* */}
              <ListItemText disableTypography  primary={<Typography className={classes.sortName}>{data.name}</Typography>} />
            </ListItem>
          );
        })}
        <Collapse in={open} timeout={1} unmountOnExit>
          <List component='div'>
            {data.slice(3, data.length).map(data => {
              return (
                <ListItem
                  disableGutters
                  button
                  data-key={data.id}
                  key={data.id}
                  onClick={handleSort}
                >
                  <ListItemIcon className={classes.icon} >{renderIcons(data)}</ListItemIcon>
                  <ListItemText disableTypography  primary={<Typography className={classes.sortName}>{data.name}</Typography>} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
        <ListItem button disableGutters onClick={handleClick}>
          <ListItemText
            style={{ color: theme.palette.green.dark }}
            primary={open ? 'Hide' : 'Show all'}
          />
        </ListItem>
      </List>
    </div>
  );
};

export default React.memo(SortBar);
