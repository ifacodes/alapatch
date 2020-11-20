import React from 'react';
import Timbre from './features/timbre/Timbre';
import Vocoder from './features/timbre/Vocoder';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Timbre id="timbre1" />
                {/*<Timbre id="timbre2" />
                <Vocoder id="vocoder" />*/}
            </header>
        </div>
    );
}

export default App;
