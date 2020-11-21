import React from 'react';
import MainMenu from './features/menu/Menu';
import TimbreSwitcher from './features/timbre/timbreSwitcher';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MainMenu />
        <TimbreSwitcher />
      </header>
    </div>
  );
}

export default App;
