import ClipboardJS from 'clipboard';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const SpacbarStyle = styled.p`
  text-align: center;
`

const PressCStyle = styled.p`
  margin: 70px auto 0;
  padding: 10px;
  background: rgba(255, 255, 255, 0.6);
  min-width: 360px;
  width: 60%;
  max-width: 600px;
  text-align: center;
  line-height: 100%;
  border-radius: 30px;
`

const Explain = ({colors}) => {
  const copyRef = useRef(null);

  useEffect(() => {
    window.addEventListener('keypress', e => {
      if(e.key === 'c') {
        copyRef.current.click();
      }
    });
    return
  }, [colors])
  
  const copyPalette = () => {
    const hex = colors.map(color => '#'+color.map(dec => ('00' + String(dec.toString(16))).slice(-2)).join(""));
    const clipboard = new ClipboardJS('.pressC', {
      text: () => hex
    });
    clipboard.on('success', e => {
      const copied = document.querySelector('.copied');
      copied.style.display = 'block';
      copied.style.height = '50px';
      copied.style.lineHeight = '25px';
      copied.innerHTML = `Color ${e.text} <br /> copied to your clipboard`;
      clipboard.destroy();
    })
  }

  return (
    <>
      <SpacbarStyle>Or just press the "Spacebar" to generate new palettes.</SpacbarStyle>
      <PressCStyle ref={copyRef} onClick={copyPalette} className='pressC'>
        Click to copy individual color ● Press "C" to copy palette
      </PressCStyle>
    </>
  );
};

export default Explain;