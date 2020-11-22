import React, { useState } from 'react';
import logo from '../../1f3b9.svg';
import './Menu.css';

export default function MainMenu(props) {
  const [open, setOpen] = useState(true);

  const HandleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className={open ? 'menu menu-true' : 'menu menu-false scale-out-tl'}>
        <img src={logo} className="menu-logo" alt="logo" />
        <header className="menu-title">Alapatch</header>
        <div className="menu-button-container">
          <button className="menu-button" onClick={HandleClick}>
            New Patch
          </button>
          <button className="menu-button">Load Patch</button>
        </div>
      </div>
      {!open && (
        <button
          className="menu-open-button"
          onClick={HandleClick}
          onAnimationEnd={() => setOpen(!open)}
        />
      )}
    </div>
  );
}
