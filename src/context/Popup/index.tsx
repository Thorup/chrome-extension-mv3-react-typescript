import React from 'react';
import { createRoot } from 'react-dom/client';

import Popup from './Popup';
import GlobalStyle from './styled.index';

const container = document.getElementById('app-container');

const root = createRoot(container!);

root.render(
  <>
    <GlobalStyle />
    <Popup />
  </>,
);

if (module.hot) {
  module.hot.accept();
}
