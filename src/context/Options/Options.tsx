import React, { ReactElement } from 'react';
import logo from '@assets/images/logo.svg';
import * as S from './styled.Options';

interface Props {}

const Options: React.FC<Props> = (): ReactElement<any, any> | null => {
  return (
    <S.App>
      <S.AppHeader>
        <S.AppLogo src={logo} alt="logo" />
        <p>
          Edit <code>src/context/Options/Options.tsx</code> and save to reload.
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

export default Options;
