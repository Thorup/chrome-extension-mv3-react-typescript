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
  const status: string = module.hot.status();

  console.log('panel _> status: ', status);

  module.hot.accept((error) => {
    console.warn('panel _> error: ', error);
    console.warn('panel _> error.cause: ', error.cause);
  });
}
