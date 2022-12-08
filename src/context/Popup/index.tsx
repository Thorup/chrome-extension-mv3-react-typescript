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
  const status: string = module.hot.status();

  console.log('popup _> status: ', status);

  module.hot.accept((error) => {
    console.warn('popup _> error: ', error);
    console.warn('popup _> error.cause: ', error.cause);
  });
}
