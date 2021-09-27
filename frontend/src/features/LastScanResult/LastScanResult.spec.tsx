import React from 'react';
import { renderWrapped } from 'testUtils';
import LastScanResult from './LastScanResult';
import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: () => {},
  },
});

test('renders LastScanResult', () => {
  renderWrapped(<LastScanResult />);
});

test('copies LastScanResult to clipboard', async () => {
  jest.spyOn(navigator.clipboard, 'writeText');
  const { t } = renderWrapped(<LastScanResult />, {
    initialState: { lastScanResult: { value: 'scanned text', date: Date.now() } },
  });
  const btnCaption = screen.getByText(t('actions.copy'));
  fireEvent.click(btnCaption);
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('scanned text');
  await waitForElementToBeRemoved(btnCaption);
});
