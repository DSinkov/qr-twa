import { AppAction, AppState } from './models';
import produce, { current } from 'immer';

export const appReducer = produce((state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    default:
      //@ts-ignore
      throw new Error(`Unhandled action type: ${action.type}`);
  }
  //@ts-ignore
  process.env.NODE_ENV === 'development' && console.log(action.type, action.payload, current(state));

  return state;
});
