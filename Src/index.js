import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import { createStore } from "redux"
import { Provider } from "react-redux"
import Store from './ducks/store'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18/i18';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={Store}>
      <App />
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
);

reportWebVitals();
