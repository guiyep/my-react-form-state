import React, { useCallback, useEffect } from 'react';
import { useMyFormState } from '../hooks/useMyFormState';
import { formSchema } from '../../core/validators/yup';
import FormNested from '../../stories/shared/FormNested';

const MyFormNestedContainer = ({ initialState, emptyState, schema, asyncValidation, onFormWasUpdated, onSubmit }) => {
  const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
    initialState,
    formSchema: schema && formSchema(schema, { async: asyncValidation }),
  });

  // this is only for testing purposes
  useEffect(() => onFormWasUpdated(formState), [formState]);

  const onFieldChangeHandler = useCallback((field, value) => updateField({ field, value }), [updateField]);

  const onEmptyHandler = useCallback(() => resetForm({ initialState: emptyState }), [emptyState, resetForm]);

  const onSubmitHandler = async () => {
    const result = await submitForm();
    onSubmit(result);
  };

  return (
    <FormNested
      formState={formState}
      onFieldChange={onFieldChangeHandler}
      onSubmit={onSubmitHandler}
      onClear={onEmptyHandler}
      onReset={resetForm}
    />
  );
};

export default MyFormNestedContainer;
