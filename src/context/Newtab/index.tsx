import React from 'react';
import { createRoot } from 'react-dom/client';

import Newtab from './Newtab';
import GlobalStyle from './styled.index';

const container = document.getElementById('app-container');

const root = createRoot(container!);

root.render(
  <>
    <GlobalStyle />
    <Newtab />
  </>,
);

if (module.hot) {
  module.hot.accept();
}
