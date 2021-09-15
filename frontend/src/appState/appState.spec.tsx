import { appReducer } from './appReducer';

describe('Global App State', () => {
  test('throw error for unknown action types', () => {
    let message;
    try {
      //@ts-ignore
      appReducer({}, { type: 'unknown event type' });
    } catch (e: any) {
      message = e.message;
    }
    expect(message).toBe('Unhandled action type: unknown event type');
  });
});
