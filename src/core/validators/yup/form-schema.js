import ParamValidator from '@mfs-lib/param-validator';
import { formValidator as formValidatorSync } from './form-validator/sync';
import { formValidator as formValidatorAsync } from './form-validator/async';
import { jsonSchema } from './json-schema';

/**
 * Builds a function that `my-form-library` will use to validate the YUP schema.
 *
 * @kind function
 * @name formSchema
 * @param {Object} schema - a YUP schema object.
 * @param {Object} [options] - options as object.
 * @param {boolean} [options.async=false] - if the validation need to happen sync or async.
 * @returns {Function} a function that will be used inside for validating the form.
 * @throws schema is falsy
 *
 * @example 1
 *  import yup from 'my-react-form-state/yup'
 *
 *  const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
 *    initialState,
 *    formSchema: yup.formSchema(schema, { async: true }),
 *  });
 *
 * @example 2
 *  import yup from 'my-react-form-state/yup'
 *
 *  const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
 *    initialState,
 *    formSchema: formSchema(schema),
 *  });
 */
export const formSchema = (schema, { async = false } = {}) => {
  ParamValidator.isObject(schema, 'schema');
  ParamValidator.notRequired.isBoolean(async, 'async');

  return () => ({
    formValidator: (!async && formValidatorSync(schema)) || formValidatorAsync(schema),
    jsonSchema: jsonSchema(schema),
  });
};
