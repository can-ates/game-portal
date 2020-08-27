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
    h1:{
      fontWeight: '900',
      fontSize: "3rem",
    },
    h2:{
      fontWeight: '500',
      fontSize: "2.5rem"
    },
    h3:{
      fontWeight: '300',
      fontSize: "2rem"
    },
    h4:{
      fontWeight: '400',
      fontSize: "1.5rem"
    },
    h6 : {
      fontWeight: '800',
      color: '#4AD87F',
      fontSize: "1.1rem"
    },
    h5 : {
      fontWeight: '800',
      color: '#4AD87F',
      fontSize: "1.4rem"
    },
    body1 : {
      fontWeight: '800',
      fontSize: "1.1rem"
    },
    body2 : {
      fontWeight: '400',
      fontSize: "1rem"
    },
    subtitle1 :{
      fontWeight: '800',
      color: '#4AD87F',
    },
    caption :{
      fontWeight: '900',
      color: '#779276',
      fontSize: "0.8rem"
    },
    overline :{
      fontWeight: '900',
      color: '#4AD87F',
      fontSize: "0.8rem",
      lineHeight: '1'
    }
  },
  overrides : {
    MuiDivider:{
      root : {
        backgroundColor :'#779276'
      }
    },
    MuiButton: {
      root : {
        '&:hover' :{
          backgroundColor: 'none'
        }
      }
    },
    MuiInputLabel :{
      root: {
        color: 'white'
      }
    },
    MuiFormControl: {
      root : {
        borderBottom: '2px solid white',
      },
    },
    MuiSelect: {
      icon: {
        color :'white'
      }
    }
    
  } 
});

export default theme;
