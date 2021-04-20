import React from 'react';
import Menu from './features/menu';
import Editor from './features/editor';

function App() {
  // DUMB THING TO STOP TEXT FROM DRAGGING GRRRR
  window.ondragstart = function () {
    return false;
  };
  return (
    <div className="bg-gray-200 grid grid-cols-6 grid-rows-1 gap-4">
      <Menu />
      <Editor />
    </div>
  );
}

export default App;
