import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff'
    },
    white: {
      light: '#F4F5F5',
      mid: '#DCE3E1',
      dark: '#B6C0C2'
    },
    black: {
      main: '#3F3B3B',
    },
    green: {
      light: '#4AD87F',
      dark: '#779276'
    },
    rusty: {
      main: '#D78D67',
    },
    text : {
      primary: '#fff'
    }  
  },
  
});

export default theme;
