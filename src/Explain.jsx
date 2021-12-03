import ClipboardJS from 'clipboard';
import React, { useEffect, useRef } from 'react';

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
      copied.textContent = `Color ${e.text} copied to your clipboard`;
      clipboard.destroy();
    })
  }

  return (
    <>
      <p>Or just press the "Spacebar" to generate new palettes.</p>
      <p ref={copyRef} onClick={copyPalette} className='pressC'>
        Click to copy individual color ● Press "C" to copy palette
      </p>
    </>
  );
};

export default Explain;