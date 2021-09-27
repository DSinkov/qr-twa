/* istanbul ignore file */
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { TOptions } from 'i18next';
import { MemoryRouter as Router } from 'react-router-dom';
import { AppProvider } from './appState/AppContext';
import { AppState } from './appState/models';

const AllTheProviders: React.FC<{ initialState?: AppState; initialRoute?: string }> = ({
  children,
  initialState,
  initialRoute,
}) => {
  return (
    <Router initialEntries={initialRoute ? [initialRoute] : undefined}>
      <AppProvider initialState={initialState}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </AppProvider>
    </Router>
  );
};

type RendererWrappedOptions = Omit<RenderOptions, 'wrapper'> & { initialState?: AppState; initialRoute?: string };

const renderWrapped = (
  ui: React.ReactElement,
  { initialState, initialRoute, ...renderOptions }: RendererWrappedOptions = {},
) => {
  const Wrapper: React.FC = ({ children }) => {
    return (
      <AllTheProviders initialState={initialState} initialRoute={initialRoute}>
        {children}
      </AllTheProviders>
    );
  };
  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    t: (key: string, tOptions?: TOptions) => i18n.t(key, tOptions),
  };
};

export { renderWrapped };
