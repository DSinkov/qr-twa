import React from 'react';
import { renderWrapped } from 'testUtils';
import LinkPreview from './LinkPreview';
import { screen } from '@testing-library/react';

test('renders LinkPreview', () => {
  renderWrapped(<LinkPreview data={null} />);
});

test('renders LinkPreview for images', () => {
  const data = {
    mediaType: 'image',
    url: 'https://some.site/image/url.png',
    contentType: undefined,
    favicons: [],
  };

  renderWrapped(<LinkPreview data={data} />);

  const image = screen.getByRole('link').children[0];

  expect(image.getAttribute('src')).toBe(data.url);
});

test('renders LinkPreview for audio', () => {
  const data = {
    mediaType: 'audio',
    url: 'https://some.site/audio/url.mp3',
    contentType: 'audio/mpeg',
    favicons: [],
  };
  renderWrapped(<LinkPreview data={data} />);

  const audio = screen.getByTestId('audio player');
  expect(audio.children[0]?.getAttribute('src')).toBe(data.url);
});

test('renders LinkPreview for video', () => {
  const data = {
    mediaType: 'video',
    url: 'https://some.site/video/url.mp4',
    contentType: 'video/mp4',
    favicons: [],
  };

  renderWrapped(<LinkPreview data={data} />);

  const audio = screen.getByTestId('video player');
  expect(audio.children[0]?.getAttribute('src')).toBe(data.url);
});

test('renders LinkPreview for sites', () => {
  const data = {
    mediaType: 'any',
    url: 'https://some.site',
    contentType: undefined,
    favicons: ['https://some.site/favicon.ico'],
    title: 'site title',
    description: 'site description',
  };
  renderWrapped(<LinkPreview data={data} />);

  const link = screen.getByRole('link');
  const title = screen.getByText(data.title);
  const description = screen.getByText(data.description);

  expect(link.getAttribute('href')).toBe(data.url);
  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});
