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
  const status: string = module.hot.status();

  console.log('options _> status: ', status);

  module.hot.accept((error) => {
    console.warn('options _> error: ', error);
    console.warn('options _> error.cause: ', error.cause);
  });
}
