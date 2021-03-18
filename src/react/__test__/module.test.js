import { useMyFormState, MyFormStateProvider } from '../index';

it('exporting react module', () => {
  expect(useMyFormState).toBeDefined();
  expect(MyFormStateProvider).toBeDefined();
});
