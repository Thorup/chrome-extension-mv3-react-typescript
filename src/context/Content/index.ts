console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

if (module.hot) {
  const status: string = module.hot.status();

  console.log('content _> status: ', status);

  module.hot.accept((error) => {
    console.warn('content _> error: ', error);
    console.warn('content _> error.cause: ', error.cause);
  });
}
