import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import GlobalStyle from './styled.index';

render(
  <>
    <GlobalStyle />
    <Popup />
  </>,
  window.document.querySelector('#app-container'),
);

if (module.hot) {
  module.hot.accept();
}
