import React from 'react';
import App from './App';
import { renderWrapped } from './testUtils';

test('renders App', () => {
  renderWrapped(<App />);
});
