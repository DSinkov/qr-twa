import React from 'react';
import { renderWrapped } from 'testUtils';
import LinkPreview from './LinkPreview';

test('renders LinkPreview', () => {
  renderWrapped(<LinkPreview data={null} />);
});
