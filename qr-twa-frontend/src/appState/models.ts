import React from 'react';

export type AppAction = { type: string };

export type AppDispatch = (action: AppAction) => void;

export type AppState = {};
export type AppProviderProps = { children: React.ReactNode; initialState?: AppState };
