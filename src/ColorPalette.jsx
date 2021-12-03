import ClipboardJS from 'clipboard';
import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components';

const Copied = styled.div`
  margin: 70px auto 0;
  min-width: 360px;
  width: 50%;
  max-width: 600px;
  background: #121212;
  color: #fff;
  padding: 10px; 
  border-radius: 30px;
  text-align: center;
  display: ${props => props.visible ? "block" : "none"};
`

const Heading = styled.h2`
  margin-top: 50px;
  text-align: center;
  font-size: 2rem;
`
const Palette = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`
const EachColor = styled.div`
  width: 180px;
  height: 250px;
  padding: 20px;
  background: #fff;
  box-sizing: border-box;
`

const PaintColor = styled.span`
  display: block;
  width: 100%;
  height: calc(100% - 40px);
  background: ${props => props.color};
`

const ColorCode = styled.span`
  display: block;
  margin-top: 20px;
  text-align: center;
`

const ButtonStyle = styled.button`
  display: block;  
  margin: 50px auto 0;
  width: 300px;
  height: 50px;
  background: #7E6CCA;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
`

const ColorPalette = ({colors, getColors}) => {
  const [visible, setVisible] = useState(false);

  const getHexCode = useCallback((color) => {
    const hex = color
      .map(dec => ('00' + String(dec.toString(16))).slice(-2))
      .join('');
    return `#${hex}`;
  }, [])

  const copyCode = useCallback((e) => {
    const clipboard = new ClipboardJS('.btn', {
      text: () => {
        if(e.target.classList.contains("btn")) {
          return e.target.lastElementChild.innerText;
        } else if(e.target.tagName === "DIV" || e.target.tagName === "SPAN") {
          return e.target.parentElement.innerText;
        } else {
          return
        }
      }
    });
    clipboard.on('success', e => {
      const copied = document.querySelector('.copied');
      setVisible(true);
      copied.style.height = '30px';
      copied.style.lineHeight = '30px';
      copied.textContent = `Color ${e.text} copied to your clipboard`;
      clipboard.destroy();
    })
  }, [])

  const loadColors = () => {
    return colors.map((color, i) => 
      <EachColor className="btn" key={i} onClick={copyCode}>
        <PaintColor color={getHexCode(color)} />
        <ColorCode>{getHexCode(color)}</ColorCode>
      </EachColor>)
  }

  return (
    <>
      <Copied className="copied" visible={visible} />
      <Heading>Color palette generator</Heading>
      <Palette className="colorPalette">
        { loadColors() }
      </Palette>
      <ButtonStyle onClick={getColors}>Generate palette</ButtonStyle>
    </>
  );
};

export default memo(ColorPalette);