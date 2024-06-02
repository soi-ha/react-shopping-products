import { createGlobalStyle } from "styled-components";
import "./reset.css";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  #root {
    width: 429px;
    height: 100%;
    margin: 0 auto;
    box-shadow: rgba(17, 12, 46, 0.05) 0px 48px 100px 0px;
  }
`;

export default GlobalStyle;
