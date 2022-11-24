import React, { ReactElement } from 'react';
import logo from '@assets/images/logo.svg';
import * as S from './styled.Panel';

interface Props {}

const Panel: React.FC<Props> = (): ReactElement<any, any> | null => {
  chrome.devtools.panels.create(
    'Chrome Extension MV3 with React, TypeScript & Webpack',
    '@assets/images/icon-34.png',
    './panel.html',
    () => {},
  );

  return (
    <S.App>
      <S.AppHeader>
        <S.AppLogo src={logo} alt="logo" />
        <p>
          Edit <code>src/context/Panel/Panel.tsx</code> and save to reload.
        </p>
        <S.AppLink
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </S.AppLink>
      </S.AppHeader>
    </S.App>
  );
};

export default Panel;
