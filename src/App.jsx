import React, { useCallback, useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import ColorPalette from './ColorPalette';
import Explain from './Explain';

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
    window.addEventListener('keypress', (e) => {
      if(e.code === "Space") {
        getColors();  
      } else {
        return
      }
    });
    return
  }, []);

  const getColors = useCallback(() => {
    const url = "https://cors-everywhere.herokuapp.com/http://colormind.io/api/";  
    const http = new XMLHttpRequest();
    const data = { model : "default" };
    http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
        const palette = JSON.parse(http.responseText).result;
        setColors(prev => [...palette]);
      }
    }
    http.open("POST", url, true);
    http.send(JSON.stringify(data));  
  }, [])

  return (
    <>
      <GlobalStyle />
      <ColorPalette colors={colors} getColors={getColors}/>
      <Explain colors={colors} />
    </>
  );
};

export default App;