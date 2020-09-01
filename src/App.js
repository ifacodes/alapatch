import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/styles' 
import Slider from  '@material-ui/core/Slider'

const useStyles = makeStyles({
  root: {
    width: 127,
  },
});

function SettingSlider() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleEvent = (event, newValue) => {
    setValue(newValue);
  }

  return(
    <div className={classes.root}>
      <Slider value={value} onChange={handleEvent}/> 
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <SettingSlider/>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
