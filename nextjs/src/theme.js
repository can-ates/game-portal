import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff'
    },
    secondary: {
      main: '#121212'
    },
    white: {
      light: '#F4F5F5',
      mid: '#DCE3E1',
      dark: '#B6C0C2'
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
  typography :{
    h6 : {
      fontWeight: '800',
      color: '#4AD87F',
      fontSize: "1.1rem"
    },
    subtitle1 :{
      fontWeight: '800',
      color: '#4AD87F',
      
    }
  }
});

export default theme;
