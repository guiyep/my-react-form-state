import ParamValidator from '@mfs-lib/param-validator';
import ajv from '../ajv-singleton';

/**
 * Creates a SYNC JSON schema validator to be used inside the `my-react-form-state` library.
 *
 * @kind function
 * @param {object} schema - a JSON schema
 * @return {function} - function to be use inside operations for validating the schema against the form state
 * @throws if schema is falsy and not a YUP schema.
 *
 * @example
 *
 * formValidator(schema);
 */
export const formValidator = (schema) => {
  ParamValidator.isObject(schema, 'schema');
  const validateSchema = ajv.compile(schema);

  return (formData) => {
    const resultValidation = validateSchema(formData);

    if (!resultValidation) {
      return (
        validateSchema.errors &&
        validateSchema.errors.reduce((acc, error) => {
          const prop = error.params.missingProperty || error.dataPath;
          acc[prop.replace('.', '')] = error.message;
          return acc;
        }, {})
      );
    }
    return undefined;
  };
};

export default formValidator;
