/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './i18n';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './appState/AppContext';

ReactDOM.render(
  <Router>
    <AppProvider>
      <App />
    </AppProvider>
  </Router>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();
