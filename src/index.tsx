import './index.css';
import ReactDOM from 'react-dom';
import React from 'react';

import App from './main';
import store from './store';

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App store={store} />, container);

(async () => {
  await store.init();
  store.ready = true;
})();
