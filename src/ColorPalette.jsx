import ClipboardJS from 'clipboard';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

const PaintColor = styled.span`
  display: block;
  width: 100%;
  height: 30px;
  background: ${props => props.color};
`
const Palette = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const ColorPalette = ({colors, getColors}) => {

  const getHexCode = useCallback((color) => {
    const hex = color
      .map(dec => ('00' + String(dec.toString(16))).slice(-2))
      .join('');
    return `#${hex}`;
  }, [])

  const copyCode = useCallback((e) => {
    const clipboard = new ClipboardJS('.btn', {
      text: () => {
        if(e.target.tagName === "DIV") {
          return e.target.innerText;
        } else if(e.target.tagName === "SPAN") {
          return e.target.parentElement.innerText;
        } else {
          return
        }
      }
    });
    clipboard.on('success', e => {
      const copied = document.querySelector('.copied');
      copied.textContent = `Color ${e.text} copied to your clipboard`;
      clipboard.destroy();
    })
  }, [])

  const loadColors = () => {
    return colors.map((color, i) => 
      <div className="btn" key={i} onClick={copyCode}>
        <PaintColor color={getHexCode(color)} />
        {getHexCode(color)}
      </div>)
  }

  return (
    <>
      <p className="copied"></p>
      <h2>Color palette generator</h2>
      <Palette className="colorPalette">
        { loadColors() }
      </Palette>
      <button onClick={getColors}>Generate palette</button>
    </>
  );
};

export default memo(ColorPalette);