import { createTheme } from '@mui/material/styles'

const defaultTheme = createTheme({
  // TODO:テーマ設定を行います
  palette: {
    primary: {
      dark: '#68a3aa',
      main: '#95E9F3',
      light: '#aaedf5',
      contrastText: '#000',
    },
    secondary: {
      dark: '#af95af',
      main: '#FBD5FB',
      light: '#fbddfb',
      contrastText: '#000',
    },
  },
})

export default defaultTheme
