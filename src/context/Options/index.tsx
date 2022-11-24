import React from 'react';
import { render } from 'react-dom';

import Options from './Options';
import GlobalStyle from './styled.index';

render(
  <>
    <GlobalStyle />
    <Options />
  </>,
  window.document.querySelector('#app-container'),
);

if (module.hot) {
  module.hot.accept();
}
