import { appReducer } from './appReducer';

describe('Global App State', () => {
  it('throw error for unknown action types', () => {
    try {
      //@ts-ignore
      appReducer({}, { type: 'unknown event type' });
    } catch (e) {
      expect(e.message).toBe('Unhandled action type: unknown event type');
    }
  });
});
