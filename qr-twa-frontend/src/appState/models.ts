import React from 'react';
import { Date } from '../constants/models';

export type AppAction = { type: 'SET_LAST_SCAN_RESULT'; payload: ScanResult } | { type: 'RESET_SCAN_RESULT' };

export type AppDispatch = (action: AppAction) => void;

export interface ScanResult {
  value: string;
  date: Date;
}

export interface AppState {
  lastScanResult: ScanResult | null;
}
export type AppProviderProps = { children: React.ReactNode; initialState?: AppState };
