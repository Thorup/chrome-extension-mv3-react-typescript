import React from 'react';
import { render } from 'react-dom';

import Newtab from './Newtab';
import GlobalStyle from './styled.index';

render(
  <>
    <GlobalStyle />
    <Newtab />
  </>,
  window.document.querySelector('#app-container'),
);

if (module.hot) {
  const status: string = module.hot.status();

  console.log('newtab _> status: ', status);

  module.hot.accept((error) => {
    console.warn('newtab _> error: ', error);
    console.warn('newtab _> error.cause: ', error.cause);
  });
}
