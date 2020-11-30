import React from 'react';
import Menu from './features/menu';
import TimbreSwitcher from './features/timbre/timbreSwitcher';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='App-spacer'>
          <Menu />
        </div>
        <TimbreSwitcher />
      </header>
    </div>
  );
}

export default App;
