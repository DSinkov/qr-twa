import { AppAction, AppState } from './models';
import produce, { current } from 'immer';
import { devLog } from '../utils/utils';

export const appReducer = produce((state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LAST_SCAN_RESULT':
      state.lastScanResult = action.payload;
      break;
    case 'RESET_SCAN_RESULT':
      state.lastScanResult = null;
      break;
    default:
      //@ts-ignore
      throw new Error(`Unhandled action type: ${action.type}`);
  }
  //@ts-ignore
  devLog(action.type, action.payload, current(state));

  return state;
});
