import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #f9fafb;
    color: #1f2937;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;
