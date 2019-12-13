import { addFormToRegistry } from '@mfs-registry';
import { getFormIdState, getForm } from '../selectors';

const formId = 'unique-form-id';

describe('getFormIdState', () => {
  it('getFormIdState to throw with wrong params', () => {
    expect(() => getFormIdState()).toThrow();
    expect(() => getFormIdState({ formId })()).toThrow();
    expect(() => getFormIdState({ formId })(() => {})).toThrow();
    expect(() => getFormIdState({ formId })('string')).toThrow();
  });

  it('getFormIdState to return state', () => {
    const state = { forms: { [formId]: 'some-date' } };
    expect(() => getFormIdState({ formId })({})).not.toThrow();
    expect(getFormIdState({ formId })(state)).toEqual('some-date');
    expect(getFormIdState({ formId: 'invalid' })(state)).toEqual({});
  });
});

describe('getForm', () => {
  beforeAll(() => {
    addFormToRegistry(formId, {
      initialState: { someData: 3 },
      initialFields: {
        someData: {
          value: 3,
        },
      },
    });
  });

  afterAll(() => {
    removeFormFromRegistry(formId);
  });

  it('getForm to throw with wrong params', () => {
    expect(() => getForm()).toThrow();
    expect(() => getForm({ formId })()).toThrow();
    expect(() => getForm({ formId })(() => {})).toThrow();
    expect(() => getForm({ formId })('string')).toThrow();
  });

  it('getForm to return data', () => {
    const state = {
      forms: {
        [formId]: {
          data: { someData: 1 },
          isSubmitted: false,
          isSubmittable: false,
          isTouched: false,
          isPristine: false,
          errors: {
            someData: 'and error',
          },
          isValid: false,
          isInvalid: true,
          dirtyFields: {
            someData: true,
          },
          fields: {
            someData: {
              value: 1,
            },
          },
        },
      },
    };
    const formState = getForm({ formId })(state);
    expect(formState.data).toEqual({ someData: 1 });
    expect(formState.isSubmitted).toEqual(false);
    expect(formState.isSubmittable).toEqual(false);
    expect(formState.isTouched).toEqual(false);
    expect(formState.isPristine).toEqual(false);
    expect(formState.errors).toEqual({
      someData: 'and error',
    });
    expect(formState.isValid).toEqual(false);
    expect(formState.isInvalid).toEqual(true);
    expect(formState.dirtyFields).toEqual({
      someData: true,
    });
    expect(formState.fields).toEqual({
      someData: {
        value: 1,
      },
    });
  });

  it('getForm to return initial state', () => {
    const state = {
      forms: {
        [formId]: {
          data: undefined,
          isSubmitted: false,
          isSubmittable: false,
          isTouched: false,
          isPristine: false,
          errors: undefined,
          isValid: false,
          isInvalid: true,
          dirtyFields: undefined,
          fields: undefined,
        },
      },
    };
    const formState = getForm({ formId })(state);
    expect(formState.data).toEqual({ someData: 3 });
    expect(formState.isSubmitted).toEqual(false);
    expect(formState.isSubmittable).toEqual(false);
    expect(formState.isTouched).toEqual(false);
    expect(formState.isPristine).toEqual(false);
    expect(formState.errors).toEqual({});
    expect(formState.isValid).toEqual(false);
    expect(formState.isInvalid).toEqual(true);
    expect(formState.dirtyFields).toEqual({});
    expect(formState.fields).toEqual({
      someData: {
        value: 3,
      },
    });
  });
});