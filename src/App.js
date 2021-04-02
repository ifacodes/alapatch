import React from 'react';
import Menu from './features/menu';
import TimbreSwitcher from './features/timbre/timbreSwitcher';

function App() {
  return (
    <div className='grid grid-cols-6 grid-rows-1 gap-4 h-screen'>
      <Menu className='col-span-1' />
      <TimbreSwitcher className='col-span-5' />
    </div>
  );
}

export default App;
