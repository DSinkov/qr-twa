import React from 'react';
import { renderWrapped } from 'testUtils';
import Page from './Page';

test('renders Page', () => {
  const { container } = renderWrapped(<Page />);
  expect(container.children[0].classList).toContain('page');
});

test('Page has top level heading', () => {
  const { container } = renderWrapped(<Page />);
  expect(container.querySelectorAll('h1').length).toBe(1);
});
