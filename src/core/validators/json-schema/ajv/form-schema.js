import ParamValidator from '@mfs-lib/param-validator';
import { formValidator as formValidatorSync } from './form-validator/sync';

/**
 * Builds a function that `my-form-library` will use to validate the YUP schema.
 *
 * @kind function
 * @name formSchema
 * @param {Object} schema - JSON schema object.
 * @param {Object} [options] - options as object.
 * @param {boolean} [options.async=false] - if the validation need to happen sync or async.
 * @returns {Function} a function that will be used inside for validating the form.
 * @throws schema is falsy
 *
 *
 * @example 1
 *  import jsonSchema from 'my-react-form-state/json-schema'
 *
 *  const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
 *    initialState,
 *    formSchema: jsonSchema.formSchema(schema),
 *  });
 */
export const formSchema = (schema, { async = false } = {}) => {
  ParamValidator.isObject(schema, 'schema');
  ParamValidator.notRequired.isBoolean(async, 'async');

  if (async === true) {
    throw new Error('json schema do not have async validation using the ajv library.');
  }

  return () => ({
    formValidator: formValidatorSync(schema),
    jsonSchema: schema,
  });
};
