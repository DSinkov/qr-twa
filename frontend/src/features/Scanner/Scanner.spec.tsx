import React from 'react';
import { renderWrapped } from 'testUtils';
import Scanner from './Scanner';
import { screen } from '@testing-library/react';
import * as useQRScanner from './useQRScanner';

test('renders Scanner', () => {
  renderWrapped(<Scanner />);
});

test('render Scanner request message', () => {
  const { t } = renderWrapped(<Scanner />);
  const requestMessage = screen.getByText(t('scanner.cameraRequest'));
  expect(requestMessage).toBeInTheDocument();
});

test('render Scanner error message', () => {
  jest.spyOn(useQRScanner, 'useQRScanner').mockImplementation(() => ({
    error: 'mocked error',
    track: null as any,
    canvasElRef: null as any,
  }));

  const { t } = renderWrapped(<Scanner />);
  const errorEl = screen.getByText(t('mocked error'));
  expect(errorEl).toBeInTheDocument();
});
