import React from 'react';
import { render } from 'react-dom';

import Panel from './Panel';
import GlobalStyle from './styled.index';

render(
  <>
    <GlobalStyle />
    <Panel />
  </>,
  window.document.querySelector('#app-container'),
);

if (module.hot) {
  module.hot.accept();
}
