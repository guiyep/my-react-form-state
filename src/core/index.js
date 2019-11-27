import * as operationsRedux from '@mfs-redux/forms/operations';
import * as selectorsRedux from '@mfs-redux/forms/selectors';
import { addFormToRegistry, removeFormFromRegistry } from '@mfs-registry';
import { uuid } from '@mfs-lib/uuid';
import { flatten, unflatten } from '@mfs-lib/flat';

const scopeModule = (moduleMap, originalArgs) => {
  return Object.keys(moduleMap).reduce((acc, name) => {
    acc[name] = (args = {}) => {
      const { dispatch, state, ...moreArgs } = args;
      if (!!dispatch && !!state) {
        return moduleMap[name]({ ...originalArgs, ...moreArgs })(dispatch, () => state);
      }

      return moduleMap[name]({ ...originalArgs, ...moreArgs });
    };
    return acc;
  }, {});
};

export const registerForm = ({ formId = uuid(), formValidator, initialState }) => {
  // protect the initial state
  const initial = Object.freeze({ ...initialState });

  addFormToRegistry(formId, {
    formValidator,
    initialState: initial,
    initialFields: unflatten(
      Object.entries(flatten(initial)).reduce((acc, [key, val]) => {
        acc[key] = {
          value: val,
        };
        return acc;
      }, {}),
    ),
  });

  return {
    operations: scopeModule(operationsRedux, { formId }),
    selectors: scopeModule(selectorsRedux, { formId }),
    formId,
  };
};

export const unregisterForm = ({ formId }) => {
  if (formId) {
    removeFormFromRegistry(formId);
  }
};

export * from './validators/yup';

export default registerForm;
