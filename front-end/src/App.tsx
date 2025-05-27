import React from "react";
import { createGlobalStyle } from "styled-components";
import Navbar from "./components/Navbar";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    background: #fff;
    min-height: 100vh;
  }
`;

const TempContent = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 2rem;
  padding-top: 60px; /* Space for navbar */
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <TempContent>Welcome to Xhibit.ai</TempContent>
    </>
  );
};

export default App;
