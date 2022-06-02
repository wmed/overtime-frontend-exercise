import { render } from '@testing-library/react';
import OvertimeBookshelfApp from './App';

/**
 * I wanted to get a bit more into tests. I really like using MSW to handle mocking
 * API calls so we don't have to go with mocking fetch in tests and making our code
 * behave differently in a test environment. But with the two hour time limit I did
 * ultimately leave tests out.
 */
test('renders', () => {
  expect(render(<OvertimeBookshelfApp />)).not.toThrow();
});
