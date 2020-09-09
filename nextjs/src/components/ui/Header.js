import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector, useDispatch } from 'react-redux';

import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { logoutUser, uploadImage } from '../../../actions/userActions';

import Link from '../../../src/Link';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(5),
    backgroundColor: theme.palette.green.light,
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: 'white',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.green.light, 1),
    '&:hover': {
      backgroundColor: fade(theme.palette.green.light, 0.89),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(5),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  inputRoot: {
    color: 'white',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
    '&:focus': {
      '&::placeholder': {
        opacity: '0',
      },
    },
    '&::placeholder': {
      color: 'white',
      opacity: '0.6',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  sign: {
    display: 'flex',
  },
  searchResult: {
    position: 'absolute',
    backgroundColor: theme.palette.green.light,
    width: '100%',
    borderRadius: '5px',
    zIndex: '11',
  },
  listItem: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.green.dark,
    },
  },
  resultImage: {
    height: 30,
    width: 40,
    objectFit: 'cover',
    borderRadius: '50%',
  },
  root: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 55,
    right: 0,
    left: '-5.7em',
    zIndex: 1,
    width: '15em',
    borderRadius: '10px',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.green.light,
  },
  detail: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  user__editButton :{
    borderColor: '#2d3142',
    color: '#2d3142'
  }
}));

function Header() {
  const CancelToken = axios.CancelToken;
  let cancel;

  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    ></Menu>
  );

  //SEARCH GAME
  const handleSearch = e => {
    setSearch(e.target.value);
    setResults([]);
    cancel && cancel();

    axios
      .get(`https://api.rawg.io/api/games?search=${search}&page_size=5`, {
        cancelToken: new CancelToken(c => (cancel = c)),
      })
      .then(res => {
        console.log(res.data.results);
        setResults(res.data.results);
      })
      .catch(thrown => {
        if (axios.isCancel(thrown))
          console.log('Request canceled', thrown.message);
      });
  };

  //LOG OUT USER
  const logOut = () => {
    dispatch(logoutUser());
  };



  //CLICKAWAY LISTENER MODIFICATIONS
  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  //HANDLE IMAGE
  const handleImage = (e) => {
    const image = e.target.files[0]
    const formData = new FormData()

    formData.append('image', image, image.name)
    dispatch(uploadImage(formData))
  }

  return (
    <div className={classes.grow}>
      <AppBar
        style={{ padding: '1em 0' }}
        position='static'
        color='transparent'
        elevation={0}
      >
        <Toolbar disableGutters>
          <IconButton
            edge='start'
            className={classes.menuButton}
            aria-label='open drawer'
          >
            <MenuIcon />
          </IconButton>
          <Button variant='text' disableRipple component={Link} href='/'>
            <Typography className={classes.title} variant='h5' noWrap>
              Game
            </Typography>
            <Typography
              className={classes.title}
              style={{ color: theme.palette.green.light, marginLeft: '0.2em' }}
              variant='h5'
              noWrap
            >
              Portal
            </Typography>
          </Button>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={handleSearch}
              type='text'
              value={search}
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            {search && (
              <div className={classes.searchResult}>
                <List>
                  {results.map(result => {
                    return (
                      <ListItem
                        divider={true}
                        component={Link}
                        href={`/games/${[result.slug]}`}
                        className={classes.listItem}
                      >
                        <ListItemAvatar>
                          <LazyLoadImage
                            alt={`Avatar of ${result.name}`}
                            src={result.background_image}
                            className={classes.resultImage}
                            effect='opacity'
                            placeholderSrc={result.background_image}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          disableTypography
                          primary={
                            <Typography variant='body1'>
                              {result.name}
                            </Typography>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            )}
          </div>
          <div className={classes.grow} />
          <div className={classes.sign}>
            <div className={classes.sign}>
              {user.authenticated ? (
                <React.Fragment>
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <div className={classes.root}>
                      <Button
                        disableRipple
                        size='large'
                        variant='text'
                        onClick={handleClick}
                      >
                        <Avatar  src={user.imageUrl} />
                      </Button>
                      {open ? (
                        <div className={classes.dropdown}>
                          <div className={classes.detail}>
                            <Typography
                              variant='caption'
                              style={{ color: '#2d3142' }}
                              display='inline'
                            >
                              Handle:{' '}
                            </Typography>
                            <Typography variant='body2' display='inline'>
                              {user.handle}
                            </Typography>
                          </div>
                          <div className={classes.detail}>
                            <Typography
                              variant='caption'
                              style={{ color: '#2d3142' }}
                              display='inline'
                            >
                              Email:{' '}
                            </Typography>
                            <Typography variant='body2' display='inline'>
                              {user.email}
                            </Typography>
                          </div>
                          <div style={{marginTop: '1em', textAlign: 'end'}}>
                            <input
                              accept='image/*'
                              id='outlined-button-file'
                              type='file'
                              onChange={handleImage}
                              style={{display: 'none'}}
                            />
                            <label htmlFor='outlined-button-file'>
                              <Button
                                variant='outlined'
                                size='small'
                                className={classes.user__editButton}
                                component='span'
                              >
                                Edit Picture
                              </Button>
                            </label>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </ClickAwayListener>

                  <Button
                    disableRipple
                    size='large'
                    variant='text'
                    onClick={logOut}
                  >
                    Log{' '}
                    <span
                      style={{
                        color: theme.palette.green.light,
                        marginLeft: '5px',
                      }}
                    >
                      {' '}
                      Out
                    </span>{' '}
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button
                    disableRipple
                    size='large'
                    variant='text'
                    component={Link}
                    href='/signin'
                  >
                    Sign{' '}
                    <span
                      style={{
                        color: theme.palette.green.light,
                        marginLeft: '5px',
                      }}
                    >
                      {' '}
                      In
                    </span>{' '}
                  </Button>
                  <Button
                    disableRipple
                    size='large'
                    variant='text'
                    component={Link}
                    href='/signup'
                  >
                    Sign{' '}
                    <span
                      style={{
                        color: theme.palette.green.light,
                        marginLeft: '5px',
                      }}
                    >
                      {' '}
                      Up
                    </span>
                  </Button>
                </React.Fragment>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default React.memo(Header);
