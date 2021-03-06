import React from 'react';
import { renderWrapped } from 'testUtils';
import ParsedContent from './ParsedContent';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';

test('renders ParsedContent', () => {
  renderWrapped(<ParsedContent rawValue={''} />);
});

test('renders ParsedContent as plain text', () => {
  renderWrapped(<ParsedContent rawValue={'plain text'} />);

  const links = screen.queryAllByRole('link');
  expect(links.length).toBe(0);
});

test('renders ParsedContent as email', () => {
  renderWrapped(<ParsedContent rawValue={'email@yopmail.com'} />);

  const email = screen.getByRole('link');
  expect(email.getAttribute('href')).toBe('mailto:email@yopmail.com');
  expect(email.textContent).toBe('email@yopmail.com');
});

test('renders ParsedContent with preview', async () => {
  renderWrapped(<ParsedContent rawValue={'https://surge.sh'} />);
  const spinner = await screen.findByTestId('spinner');
  expect(spinner).toBeInTheDocument();

  const img = await screen.findByTestId('image-preview');
  expect(img).toBeInTheDocument();
  expect(spinner).not.toBeInTheDocument();
});

test('renders ParsedContent as link', async () => {
  renderWrapped(<ParsedContent rawValue={'https://surge.sh'} />);

  const link = screen.getByRole('link');
  const spinner = await screen.findByTestId('spinner');

  expect(link.getAttribute('href')).toBe('https://surge.sh');
  expect(link.textContent).toBe('https://surge.sh');

  await waitForElementToBeRemoved(spinner);
});
