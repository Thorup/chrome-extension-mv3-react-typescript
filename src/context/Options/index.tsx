import React from 'react';
import { createRoot } from 'react-dom/client';

import Options from './Options';
import GlobalStyle from './styled.index';

const container = document.getElementById('app-container');

const root = createRoot(container!);

root.render(
  <>
    <GlobalStyle />
    <Options />
  </>,
);

if (module.hot) {
  module.hot.accept();
}
