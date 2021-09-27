import React from 'react';
import { renderWrapped } from 'testUtils';
import Header from './Header';
import { screen } from '@testing-library/react';
import { ROUTES } from '../../../constants/routes';
import { Route } from 'react-router-dom';

test('renders Header', () => {
  renderWrapped(<Header />);
});

test('renders Header with correct title', () => {
  const { t } = renderWrapped(<Route path={ROUTES.lastScanResult} component={Header} />, {
    initialRoute: ROUTES.lastScanResult,
  });
  let title = screen.getByText(t('header.scanResultPageTitle'));
  expect(title).toBeInTheDocument();

  renderWrapped(<Route path={ROUTES.scanner} component={Header} />, {
    initialRoute: ROUTES.lastScanResult,
  });
  title = screen.getByText(t('header.scannerPageTitle'));
  expect(title).toBeInTheDocument();
});
