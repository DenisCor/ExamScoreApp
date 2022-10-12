import {createTheme} from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#337acc',
      light:'#a9c7e9',
      dark:'#2a64a7',
    },
    secondary: {
      main: '#c6395a',
      light:'',
      dark:'',
    }
  },
  shape:{
  borderRadius:0,
  }
});


export default theme;