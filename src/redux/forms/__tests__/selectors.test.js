import { addFormToRegistry, removeFormFromRegistry } from '@mfs-registry';
import { getFormIdState, getForm, getFormResult } from '../selectors';
import { getDefaultReducerProp, initializeReducer } from '../../init';

const formId = 'unique-form-id';

initializeReducer();
const formStateProp = getDefaultReducerProp();

describe('getFormIdState', () => {
  it('getFormIdState to throw with wrong params', () => {
    expect(() => getFormIdState()).toThrow();
    expect(() => getFormIdState({ formId })()).toThrow();
    expect(() => getFormIdState(() => {}, { formId })).toThrow();
    expect(() => getFormIdState('string', { formId })).toThrow();
  });

  it('getFormIdState to return state', () => {
    const state = { [formStateProp]: { [formId]: 'some-date' } };
    expect(() => getFormIdState({}, { formId })).toThrow();
    expect(getFormIdState(state, { formId })).toEqual('some-date');
    expect(getFormIdState(state, { formId: 'invalid' })).toEqual({});
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
    expect(() => getForm(undefined, { formId })()).toThrow();
    expect(() => getForm(() => {}, { formId })(() => {})).toThrow();
    expect(() => getForm('string', { formId })).toThrow();
  });

  it('getForm to return data', () => {
    const state = {
      [formStateProp]: {
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
    const formState = getForm(state, { formId });
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
      [formStateProp]: {
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
    const formState = getForm(state, { formId });
    expect(formState.data).toEqual({});
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

  it('getFormResult to return resultData', () => {
    const state = {
      [formStateProp]: {
        [formId]: {
          resultData: {
            a: 1,
          },
        },
      },
    };
    const formResultData = getFormResult(state, { formId });
    expect(formResultData.a).toEqual(1);
  });
});
