import React, { ReactElement } from 'react';
import './Panel.css';
import logo from '@assets/images/logo.svg';

interface Props {}

const Panel: React.FC<Props> = (): ReactElement<any, any> | null => {
  chrome.devtools.panels.create(
    'Chrome Extension MV3 with React, TypeScript & Webpack',
    '@assets/images/icon-34.png',
    './panel.html',
    () => {},
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/context/Panel/Panel.tsx</code> and save to reload.
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

export default Panel;
