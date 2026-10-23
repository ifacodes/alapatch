import React, { useState } from 'react';
import Menu from './features/menu';
import Editor from './features/editor';
import MemoryPage from './features/memory';

export default function App() {
  const [page, setPage] = useState('editor');

  return (
    <div className="h-screen overflow-hidden bg-gray-200 grid grid-cols-6 grid-rows-1 gap-2">

      <Menu page={page} setPage={setPage} />

      <div className="col-span-5 h-full min-h-0 overflow-hidden">
        {page === 'editor' ? <Editor /> : <MemoryPage />}
      </div>

    </div>
  );
}