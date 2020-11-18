import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Timbre } from './features/timbre/Timbre';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Counter />
                <Timbre />
            </header>
        </div>
    );
}

export default App;
