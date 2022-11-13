import React, { ReactElement } from 'react';
import './Options.css';
import logo from '@assets/images/logo.svg';

interface Props {}

const Options: React.FC<Props> = (): ReactElement<any, any> | null => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/context/Options/Options.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
      </header>
    </div>
  );
};

export default Options;
