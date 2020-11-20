import React from 'react';
import { Timbre } from './features/timbre/Timbre';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Timbre id="timbre1" />
                {/*<Timbre id="timbre2" />*/}
            </header>
        </div>
    );
}

export default App;
