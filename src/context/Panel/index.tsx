import React from 'react';
import { createRoot } from 'react-dom/client';

import Panel from './Panel';
import GlobalStyle from './styled.index';

const container = document.getElementById('app-container');

const root = createRoot(container!);

root.render(
  <>
    <GlobalStyle />
    <Panel />
  </>,
);

if (module.hot) {
  module.hot.accept();
}
