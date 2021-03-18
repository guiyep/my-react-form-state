import { useCallback } from 'react';

/**
 * React hook that will wrap the submit callback into a my react from state function callback.
 *
 * @kind React Hook
 * @return {Array.[function]} callback to be passed to your form. Will execute your function with the data return from the form when submit happens.
 *
 * @example
 *
 * import { useOnSubmitCallback } from 'my-react-form-state/react'
 * import yup from 'my-react-form-state/yup'
 *
 * function (onSubmit) {
 *  const [formState, formOperations] = useMyFormState({
 *     initialState: { ...props },
 *     formSchema: yup.formSchema(schema),
 *   });
 *
 *  const  { updateField, updateForm, resetForm } = formOperations;
 *
 *  const [onSubmitHandler] = useOnSubmitCallback(onSubmit, formOperations);
 *
 *  return <MyForm onSubmit={onSubmitHandler} ... />
 * }
 *
 */

export const useOnSubmitCallback = (onSubmitCallback, [{ submitForm } = {}]) => {
  const onSubmitHandler = useCallback(async () => {
    const result = await submitForm();
    onSubmitCallback(result);
  });

  return [onSubmitHandler];
};
