import ParamValidator from '@mfs-lib/param-validator';
import { findErrorsFromException } from '../shared';

/**
 * Creates a SYNC Yup schema validator to be used inside the `my-react-form-state` library.
 *
 * @kind function
 * @param {object} schema - a YUP schema
 * @return {function} - function to be use inside operations for validating the schema against the form state
 * @throws if schema is falsy and not a YUP schema.
 *
 * @example
 *
 * formValidator(schema);
 */
export const formValidator = (schema) => {
  ParamValidator.isObject(schema, 'schema');

  return (formData) => {
    try {
      schema.validateSync(formData, { abortEarly: false });
    } catch (ex) {
      // it is invalid
      if (ex.name === 'ValidationError') {
        return findErrorsFromException(ex);
      }
      throw new Error(ex);
    }
    // it is valid
    return undefined;
  };
};

export default formValidator;
