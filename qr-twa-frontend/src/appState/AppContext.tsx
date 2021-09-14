import React from 'react';
import { appReducer } from './appReducer';
import { AppAction, AppDispatch, AppProviderProps, AppState } from './models';

const AppStateContext = React.createContext<AppState | undefined>(undefined);
const AppDispatchContext = React.createContext<AppDispatch | undefined>(undefined);

const DEFAULT_INITIAL_STATE: AppState = {
  lastScanResult: null,
};

function AppProvider({ children, initialState }: AppProviderProps) {
  const [state, dispatch] = React.useReducer<(state: AppState, action: AppAction) => AppState>(
    appReducer,
    initialState || DEFAULT_INITIAL_STATE,
  );
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
function useAppState() {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider');
  }
  return context;
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider');
  }
  return context;
}

function useApp(): [AppState, AppDispatch] {
  return [useAppState(), useAppDispatch()];
}

export { AppProvider, useAppState, useAppDispatch, useApp };
