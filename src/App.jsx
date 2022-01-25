import React, { useCallback, useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import ColorPalette from "./ColorPalette";
import Explain from "./Explain";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #cdcdcd;
  }
`;

const App = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    getColors();
    window.addEventListener("keypress", (e) => {
      if (e.code === "Space") {
        getColors();
      } else {
        return;
      }
    });
    return;
  }, []);

  const getColors = useCallback(() => {
    fetch("https://cors-everywhere.herokuapp.com/http://colormind.io/api/", {
      method: "POST",
      body: JSON.stringify({ model: "default" }),
    })
      .then((res) => res.json())
      .then((data) => {
        const palette = data.result;
        setColors([...palette]);
      });
  }, []);

  return (
    <>
      <GlobalStyle />
      <ColorPalette colors={colors} getColors={getColors} />
      <Explain colors={colors} />
    </>
  );
};

export default App;
