import React, { useState } from 'react';

function BackgroundEditor() {
  const [color1, setColor1] = useState('#d33366');
  const [color2, setColor2] = useState('#e73c7e');
  const [color3, setColor3] = useState('#bc1b6e');
  const [color4, setColor4] = useState('#961743');
  const [direction, setDirection] = useState('-45deg');

  const applyGradient = () => {
    const gradient = `linear-gradient(${direction}, ${color1}, ${color2}, ${color3}, ${color4})`;
    document.body.style.background = gradient;
  };

  return (
    <div className='background-editor'>
      <div>
        <label htmlFor="color1">Color 1:</label>
        <input type="color" id="color1" value={color1} onChange={(e) => setColor1(e.target.value)} />
      </div>
      <div>
        <label htmlFor="color2">Color 2:</label>
        <input type="color" id="color2" value={color2} onChange={(e) => setColor2(e.target.value)} />
      </div>
      <div>
        <label htmlFor="color3">Color 3:</label>
        <input type="color" id="color3" value={color3} onChange={(e) => setColor3(e.target.value)} />
      </div>
      <div>
        <label htmlFor="color4">Color 4:</label>
        <input type="color" id="color4" value={color4} onChange={(e) => setColor4(e.target.value)} />
      </div>
      <div>
        <label htmlFor="direction">Direction:</label>
        <select id="direction" value={direction} onChange={(e) => setDirection(e.target.value)}>
          <option value="-45deg">-45°</option>
          <option value="45deg">45°</option>
          <option value="90deg">90°</option>
          <option value="135deg">135°</option>
        </select>
      </div>
      <button onClick={applyGradient}>Apply Gradient</button>
    </div>
  );
}

export default BackgroundEditor;
