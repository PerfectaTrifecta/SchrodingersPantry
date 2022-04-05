import {createGlobalStyle} from "styled-components";
import useTheme from '@mui/material/styles/useTheme';

const theme = useTheme();

const GlobalStyle = createGlobalStyle`
  body {
      margin: 0;
      padding: 0;
      background-color: ${theme.palette.primary.main};
  }
`;

export default GlobalStyle;
