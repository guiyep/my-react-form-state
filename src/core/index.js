import * as operationsRedux from '@mfs-redux/forms/operations';
import * as selectorsRedux from '@mfs-redux/forms/selectors';
import { uuid } from '@mfs-lib/uuid';
import { flatten, unflatten } from '@mfs-lib/flat';
import { getFlatMap } from '@mfs-lib/json-schema-parser';
import ParamValidator from '@mfs-lib/param-validator';
import {
  addFormToRegistry,
  removeFormFromRegistry,
  getFormFromRegistry as getFormFromInternalRegistry,
} from '@mfs-registry';

const DEFAULTS_VALUES = {
  string: '',
  number: 0,
  boolean: false,
  date: null,
  array: [],
  object: [],
};

const scopeOperationToForm = (moduleMap, originalArgs) => {
  return Object.keys(moduleMap).reduce((acc, name) => {
    acc[name] = (args = {}) => {
      return moduleMap[name]({ ...originalArgs, ...args });
    };
    return acc;
  }, {});
};

const scopeSelectorToForm = (moduleMap, originalArgs) => {
  return Object.keys(moduleMap).reduce((acc, name) => {
    acc[name] = (state) => {
      return moduleMap[name](state, { ...originalArgs });
    };
    return acc;
  }, {});
};

const buildInitialState = (initialState, fieldsDefinition) => {
  if (!fieldsDefinition) {
    return {
      ...initialState,
    };
  }

  const initialDefaultsValues = Object.entries(fieldsDefinition).reduce((acc, [prop, value]) => {
    acc[prop] = DEFAULTS_VALUES[value] === undefined ? null : DEFAULTS_VALUES[value];
    return acc;
  }, {});

  return unflatten({
    ...initialDefaultsValues,
    ...flatten(initialState, fieldsDefinition),
  });
};

/**
 * @typedef {object} MyForm.
 * @property {{ resetForm: function, validateForm: function, updateForm: function, submitForm: function, updateField: function }} operations - form operations to be dispatched.
 * @property {{ getForm: function }} selectors - form selectors.
 * @property {string} formId - unique form indicator.
 */

/**
 * Remove a registered form from the `my-react-form-state` registry.
 *
 * @kind function
 * @param {*} arguments - arguments as object.
 * @param {string} [arguments.formId] - the unique form id indicator.
 * @return undefined
 * @throws if formId is falsy
 *
 * @example
 *
 * unregisterForm({
 *    formId,
 *});
 */

const unregisterForm = ({ formId }) => {
  ParamValidator.isString(formId, 'formId');
  removeFormFromRegistry(formId);
};

/**
 * Register a form in the `my-react-form-state` registry and expose all the functionality available for being used in redux.
 * This is used for reusing the selectors and operations for a particular form in any place of an app. Once is not used remember to
 * remove the reference with `unregisterForm`.
 *
 *
 * @kind function
 * @param {*} arguments - arguments as object.
 * @param {String} [arguments.formId] - the unique form id indicator, will generate a unique id if not.
 * @param {Function} [arguments.formValidator] - the form validator function.
 * @param {Function} [arguments.formSchema] - the form schema function.
 * @param {Object} [arguments.initialState] - the initial state you want to use.
 * @return {MyForm} - available functionality for the form {@link MyForm}
 *
 * @throws initialState and formSchema cannot be empty at the same time.
 *
 * @example
 *
 *const { formId, operations, selectors, unregister } = registerForm({
 *    initialState: {},
 *    formSchema: formSchema(schema),
 *});
 */

export const registerForm = (
  { formId = uuid(), formValidator, formSchema, initialState = {} } = { formId: uuid(), initialState: {} },
) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.notRequired.isObject(initialState, 'initialState');
  ParamValidator.notRequired.isFunction(formValidator, 'formValidator');
  ParamValidator.notRequired.isFunction(formSchema, 'formSchema');

  if (!initialState && !formSchema) {
    throw Error('initialState and formSchema cannot be empty at the same time.');
  }

  const formSchemaResolved =
    typeof formSchema === 'function'
      ? formSchema()
      : {
          jsonSchema: formSchema,
        };

  if (formSchemaResolved.jsonSchema) {
    formSchemaResolved.fieldsDefinition = getFlatMap({ jsonSchema: formSchemaResolved.jsonSchema });
  }

  if (formValidator) {
    formSchemaResolved.formValidator = formValidator;
  }

  const initialConstructedState = Object.freeze(buildInitialState(initialState, formSchemaResolved.fieldsDefinition));

  addFormToRegistry(formId, {
    ...formSchemaResolved,
    initialState: initialConstructedState,
    initialFields: unflatten(
      Object.entries(flatten(initialConstructedState)).reduce((acc, [key, val]) => {
        acc[key] = {
          value: val,
        };
        return acc;
      }, {}),
    ),
  });

  return {
    operations: scopeOperationToForm(operationsRedux, { formId }),
    selectors: scopeSelectorToForm(selectorsRedux, { formId }),
    formId,
    initialFormState: initialConstructedState,
    unregister: () => unregisterForm({ formId }),
  };
};

/**
 * Get an already registered form from the `my-react-form-state` registry.
 *
 * @kind function
 * @param {*} arguments - arguments as object.
 * @param {string} [arguments.formId] - the unique form id.
 * @return {MyForm} - available functionality for the form {@link MyForm}
 * @throws if formId is falsy.
 * @throws if form was not found.
 *
 * @example
 *
 * unregisterForm({
 *    formId,
 *});
 */

export const getFormFromRegistry = ({ formId }) => {
  ParamValidator.isString(formId, 'formId');

  const form = getFormFromInternalRegistry(formId);
  if (!form) {
    throw new Error(`the formId ${formId} is not valid and doesn't exists`);
  }
};

export const yup = {
  formSchema: () => {
    throw Error(
      `yup module has moved to 'my-react-form-state/yup please import it as : (import yup from 'my-react-form-state/yup')`,
    );
  },
};

export default registerForm;
