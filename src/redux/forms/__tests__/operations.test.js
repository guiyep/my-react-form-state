import { addFormToRegistry, removeFormFromRegistry } from '@mfs-registry';
import { updateField, updateForm, submitForm, initializeForm, removeForm, resetForm } from '../operations';
import { initializeReducer } from '../../init';
import 'babel-polyfill';

const formId = 'unique-form-id';
initializeReducer({ name: 'my-react-form-state' });

describe('updateField, normal flow', () => {
  const mockDispatch = jest.fn();

  it('updateField to not throw', () => {
    expect(() => updateField({ formId, field: 'test' })(mockDispatch)).not.toThrow();
    expect(mockDispatch.mock.calls).toHaveLength(1);
    expect(typeof mockDispatch.mock.calls[0][0]).toEqual('function');
  });
});

describe('updateForm', () => {
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

  it('updateForm', () => {
    expect(() => updateForm()).toThrow();
  });

  it('updateField to not throw', () => {
    const mockDispatch = jest.fn();
    const data = { field: 'test' };
    expect(() => updateForm({ formId, data })(mockDispatch)).not.toThrow();
    expect(mockDispatch.mock.calls).toHaveLength(1);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: 'MY-FORM-STATE/UPDATE_FORM',
      payload: data,
      options: {
        formId,
      },
    });
  });

  it('timeout validation', async () => {
    const mockDispatch = jest.fn();
    const data = { field: 'test' };
    expect(() => updateForm({ formId, data })(mockDispatch)).not.toThrow();
    await new Promise((resolve) => {
      setTimeout(() => {
        expect(mockDispatch.mock.calls).toHaveLength(2);
        expect(mockDispatch.mock.calls[0][0]).toEqual({
          type: 'MY-FORM-STATE/UPDATE_FORM',
          payload: data,
          options: {
            formId,
          },
        });
        const validationFunction = mockDispatch.mock.calls[1][0];

        expect(() => validationFunction(mockDispatch, () => {})).not.toThrow();

        expect(mockDispatch.mock.calls[2][0]).toEqual({
          type: 'MY-FORM-STATE/VALIDATED_FORM',
          payload: {},
          options: {
            formId,
          },
        });
        resolve();
      }, 200);
    });
  }, 300);

  it('debounce validation', async () => {
    const mockDispatch = jest.fn();
    const data = { field: 'test' };
    expect(() => updateForm({ formId, data })(mockDispatch)).not.toThrow();
    expect(() => updateForm({ formId, data })(mockDispatch)).not.toThrow();
    expect(() => updateForm({ formId, data })(mockDispatch)).not.toThrow();
    await new Promise((resolve) => {
      setTimeout(() => {
        expect(mockDispatch.mock.calls).toHaveLength(4);
        expect(mockDispatch.mock.calls[0][0]).toEqual({
          type: 'MY-FORM-STATE/UPDATE_FORM',
          payload: data,
          options: {
            formId,
          },
        });
        expect(mockDispatch.mock.calls[1][0]).toEqual({
          type: 'MY-FORM-STATE/UPDATE_FORM',
          payload: data,
          options: {
            formId,
          },
        });
        expect(mockDispatch.mock.calls[2][0]).toEqual({
          type: 'MY-FORM-STATE/UPDATE_FORM',
          payload: data,
          options: {
            formId,
          },
        });

        const validationFunction = mockDispatch.mock.calls[3][0];

        expect(() => validationFunction(mockDispatch, () => {})).not.toThrow();

        expect(mockDispatch.mock.calls[4][0]).toEqual({
          type: 'MY-FORM-STATE/VALIDATED_FORM',
          payload: {},
          options: {
            formId,
          },
        });
        resolve();
      }, 700);
    });
  }, 800);
});

describe('updateForm - with validation function', () => {
  beforeAll(() => {
    addFormToRegistry(formId, {
      initialState: { someData: 3 },
      formValidator: (data) =>
        data && data.pass
          ? undefined
          : {
              someData: 'has-an-error',
            },
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

  it('updateForm', () => {
    expect(() => updateForm()).toThrow();
  });

  it('updateField to not throw', () => {
    const mockDispatch = jest.fn();
    const data = { field: 'test' };
    expect(() => updateForm({ formId, data })(mockDispatch)).not.toThrow();
    expect(mockDispatch.mock.calls).toHaveLength(1);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: 'MY-FORM-STATE/UPDATE_FORM',
      payload: data,
      options: {
        formId,
      },
    });
  });

  it('with errors after validating', async () => {
    const mockDispatch = jest.fn();
    const data = { field: 'test' };
    expect(() => updateForm({ formId, data })(mockDispatch)).not.toThrow();
    await new Promise((resolve) => {
      setTimeout(() => {
        expect(mockDispatch.mock.calls).toHaveLength(2);
        expect(mockDispatch.mock.calls[0][0]).toEqual({
          type: 'MY-FORM-STATE/UPDATE_FORM',
          payload: data,
          options: {
            formId,
          },
        });

        const validationFunction = mockDispatch.mock.calls[1][0];
        expect(() =>
          validationFunction(mockDispatch, () => ({ 'my-react-form-state': { [formId]: {} } })),
        ).not.toThrow();

        setTimeout(() => {
          expect(mockDispatch.mock.calls[2][0]).toEqual({
            type: 'MY-FORM-STATE/VALIDATED_FORM',
            payload: {
              someData: 'has-an-error',
            },
            options: {
              formId,
            },
          });
          resolve();
        }, 100);
      }, 200);
    });
  }, 350);

  it('no errors after validating', async () => {
    const mockDispatch = jest.fn();
    const data = { field: 'test' };
    expect(() => updateForm({ formId, data })(mockDispatch)).not.toThrow();
    await new Promise((resolve) => {
      setTimeout(() => {
        expect(mockDispatch.mock.calls).toHaveLength(2);
        expect(mockDispatch.mock.calls[0][0]).toEqual({
          type: 'MY-FORM-STATE/UPDATE_FORM',
          payload: data,
          options: {
            formId,
          },
        });

        const validationFunction = mockDispatch.mock.calls[1][0];
        expect(() =>
          validationFunction(mockDispatch, () => ({ 'my-react-form-state': { [formId]: { pass: true } } })),
        ).not.toThrow();

        setTimeout(() => {
          expect(mockDispatch.mock.calls[2][0]).toEqual({
            type: 'MY-FORM-STATE/VALIDATED_FORM',
            payload: {
              someData: 'has-an-error',
            },
            options: {
              formId,
            },
          });
          resolve();
        }, 100);
      }, 200);
    });
  }, 350);
});

describe('submitForm', () => {
  const mockDispatch = jest.fn();

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

  it('submitForm to throw with wrong params', () => {
    expect(() => submitForm()).toThrow();
  });

  it('submitForm to not throw', () => {
    const state = {
      'my-react-form-state': {
        [formId]: {},
      },
    };
    expect(() => submitForm({ formId })(mockDispatch, () => state)).not.toThrow();
    expect(mockDispatch.mock.calls).toHaveLength(2);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: 'MY-FORM-STATE/SUBMIT_FORM',
      options: {
        formId,
      },
    });

    const validationFunction = mockDispatch.mock.calls[1][0];
    expect(() => validationFunction(mockDispatch, () => {})).not.toThrow();
    expect(mockDispatch.mock.calls[2][0]).toEqual({
      type: 'MY-FORM-STATE/VALIDATED_FORM',
      payload: {},
      options: {
        formId,
      },
    });
  });
});

describe('initializeForm', () => {
  const mockDispatch = jest.fn();

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

  it('initializeForm to throw with wrong params', () => {
    expect(() => initializeForm()).toThrow();
  });

  it('initializeForm to not throw', () => {
    const initialState = {};
    expect(() => initializeForm({ formId, initialState })(mockDispatch)).not.toThrow();
    expect(mockDispatch.mock.calls).toHaveLength(2);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: 'MY-FORM-STATE/INITIALIZE_FORM',
      payload: initialState,
      options: {
        formId,
      },
    });

    const validationFunction = mockDispatch.mock.calls[1][0];
    expect(() => validationFunction(mockDispatch, () => {})).not.toThrow();
    expect(mockDispatch.mock.calls[2][0]).toEqual({
      type: 'MY-FORM-STATE/VALIDATED_FORM',
      payload: {},
      options: {
        formId,
      },
    });
  });
});

describe('removeForm', () => {
  const mockDispatch = jest.fn();

  it('removeForm to throw with wrong params', () => {
    expect(() => removeForm()).toThrow();
  });

  it('removeForm to not throw', () => {
    expect(() => removeForm({ formId })(mockDispatch)).not.toThrow();
    expect(mockDispatch.mock.calls).toHaveLength(1);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: 'MY-FORM-STATE/CLEAR_FORM',
      options: {
        formId,
      },
    });
  });
});

describe('resetForm', () => {
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

  it('resetForm to throw with wrong params', () => {
    expect(() => resetForm()).toThrow();
  });

  it('resetForm to not throw without initial state', () => {
    const mockDispatch = jest.fn();
    expect(() => resetForm({ formId })(mockDispatch)).not.toThrow();
    expect(mockDispatch.mock.calls).toHaveLength(2);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: 'MY-FORM-STATE/CLEAR_FORM',
      options: {
        formId,
      },
    });
    expect(mockDispatch.mock.calls[1][0]).toEqual({
      type: 'MY-FORM-STATE/RESET_FORM',
      payload: {
        someData: 3,
      },
      options: {
        formId,
      },
    });
  });

  it('resetForm to not throw, with initial state', () => {
    const mockDispatch = jest.fn();
    expect(() => resetForm({ formId, initialState: { var: 3 } })(mockDispatch)).not.toThrow();
    expect(mockDispatch.mock.calls).toHaveLength(2);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: 'MY-FORM-STATE/CLEAR_FORM',
      options: {
        formId,
      },
    });
    expect(mockDispatch.mock.calls[1][0]).toEqual({
      type: 'MY-FORM-STATE/RESET_FORM',
      payload: {
        var: 3,
      },
      options: {
        formId,
      },
    });
  });
});
