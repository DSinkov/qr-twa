/* istanbul ignore file */
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { TOptions } from 'i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './appState/AppContext';
import { AppState } from './appState/models';

const AllTheProviders: React.FC<{ initialState?: AppState }> = ({ children, initialState }) => {
  return (
    <Router>
      <AppProvider initialState={initialState}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </AppProvider>
    </Router>
  );
};

type RendererWrappedOptions = Omit<RenderOptions, 'wrapper'> & { initialState?: AppState };

const renderWrapped = (ui: React.ReactElement, { initialState, ...renderOptions }: RendererWrappedOptions = {}) => {
  const Wrapper: React.FC = ({ children }) => {
    return <AllTheProviders initialState={initialState}>{children}</AllTheProviders>;
  };
  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    t: (key: string, tOptions?: TOptions) => i18n.t(key, tOptions),
  };
};

export { renderWrapped };
