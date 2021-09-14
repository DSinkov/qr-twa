import { appReducer } from './appReducer';

describe('Global App State', () => {
  test('throw error for unknown action types', () => {
    try {
      //@ts-ignore
      appReducer({}, { type: 'unknown event type' });
    } catch (e: any) {
      expect(e.message).toBe('Unhandled action type: unknown event type');
    }
  });
});
