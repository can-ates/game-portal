import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector, useDispatch } from 'react-redux';

import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import Snackbar from '@material-ui/core/Snackbar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MuiAlert from '@material-ui/lab/Alert';

import { logoutUser, uploadImage } from '../../../actions/userActions';

import Link from '../../../src/Link';
import { MenuList } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    margin: '0 0.5em 0 0.1em',
    backgroundColor: theme.palette.green.light,
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
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
    top: 70,
    right: 0,
    left: '-6em',
    zIndex: 1,
    width: '15em',
    borderRadius: '10px',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.green.light,
    '&::before' :{
      content: "''",
      position: 'absolute',
      top : '-2px',
      left: '50%',
      height: '20px',
      width: '20px',
      transform: 'rotate(45deg)',
      zIndex: '35000',
      backgroundColor: theme.palette.green.light
    }
  },
  detail: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  user__editButton: {
    borderColor: '#2d3142',
    color: '#2d3142',
  },
  snackbar: {
    marginTop: '100px',
  },
  popper:{
    zIndex: '10',
    marginTop : '1em',
    position: 'relative',
    '&::before' :{
      content: "''",
      position: 'absolute',
      top : '-2px',
      left: '40%',
      height: '20px',
      width: '20px',
      transform: 'rotate(45deg)',
      zIndex: '35000',
      backgroundColor: theme.palette.green.light
    }
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function Header() {
  const CancelToken = axios.CancelToken;
  let cancel;

  const theme = useTheme();
  const classes = useStyles();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const error = useSelector(state => state.user.errors);

  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [popper, setPopper] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);

  const anchorRef = React.useRef(null);

  const handlePopperToggle = () => {
    setPopper(prevOpen => !prevOpen);
  };

  const handlePopperClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setPopper(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setPopper(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const renderMenu = (
    <Popper
      className={classes.popper}
      open={popper}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom',
          }}
        >
          <Paper style={{ backgroundColor: theme.palette.green.light }}>
            <ClickAwayListener onClickAway={handlePopperClose}>
              <MenuList
                autoFocusItem={popper}
                id='menu-list-grow'
                onKeyDown={handleListKeyDown}
              >
                <MenuItem
                  component={Link}
                  href='/signin'
                  onClick={handlePopperClose}
                >
                  {' '}
                  Sign{' '}
                  <span
                    style={{
                      color: theme.palette.green.dark,
                      marginLeft: '5px',
                    }}
                  >
                    {' '}
                    In
                  </span>{' '}
                </MenuItem>
                <MenuItem
                  onClick={handlePopperClose}
                  component={Link}
                  href='/signup'
                >
                  {' '}
                  Sign{' '}
                  <span
                    style={{
                      color: theme.palette.green.dark,
                      marginLeft: '5px',
                    }}
                  >
                    {' '}
                    Up
                  </span>
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
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
  const handleImage = e => {
    const image = e.target.files[0];
    const formData = new FormData();

    formData.append('image', image, image.name);
    dispatch(uploadImage(formData));

    if (error) {
      setAlert(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  return (
    <div className={classes.grow}>
      {/* MUI ALERT */}
      <Snackbar
        className={classes.snackbar}
        open={alert}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity='error'>
          {error}
        </Alert>
      </Snackbar>
      <AppBar
        style={{ padding: '1em 0' }}
        position='static'
        color='transparent'
        elevation={0}
      >
        <Toolbar disableGutters>
          <Button variant='text' disableRipple component={Link} href='/'>
            <Typography className={classes.title} variant='h5'>
            {matchesXS ? 'G' : 'Game'}
            </Typography>
            <Typography
              className={classes.title}
              style={{
                color: theme.palette.green.light,
                marginLeft: matchesXS ? '0':'0.2em',
              }}
              variant='h5'
              
            >
            {matchesXS ? 'P' : 'Portal'}
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
          {matchesXS && <IconButton
            edge='start'
            className={classes.menuButton}
            aria-label='open drawer'
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup='true'
            onClick={handlePopperToggle}
          >
            <MenuIcon />
          </IconButton>}
          
          <div className={classes.grow} />
          <div className={classes.sign}>
            <div className={classes.sign}>
              {!matchesXS && user.authenticated ? (
                <React.Fragment>
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <div className={classes.root}>
                      <Button
                        disableRipple
                        size='large'
                        variant='text'
                        onClick={handleClick}
                      >
                        <Avatar src={user.imageUrl} />
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
                          <div style={{ marginTop: '1em', textAlign: 'end' }}>
                            <input
                              accept='image/*'
                              id='outlined-button-file'
                              type='file'
                              onChange={handleImage}
                              style={{ display: 'none' }}
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
                !matchesXS && (
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
                )
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

export default React.memo(Header);
