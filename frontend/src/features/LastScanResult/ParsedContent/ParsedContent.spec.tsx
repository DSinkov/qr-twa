import React from 'react';
import { renderWrapped } from 'testUtils';
import ParsedContent from './ParsedContent';

test('renders ParsedContent', () => {
  renderWrapped(<ParsedContent rawValue={''} />);
});
