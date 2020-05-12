# Validators

Validators provide the ability to validate the form state within redux/react. This is what the library uses to determine if a change in the form fields need to be marked as with an error or not.

There are 3 different ways you can create one of these:

- [x] Using the pre-defined function for YUP Schema.
- [x] Using pre-defined function for JOI Schema.
- [x] Using Custom validators.

## IMPORTANT:

The validator will validate only what is defined in the schema and the library will create only the fields that are coming from there.

# YUP

<a name="formSchema"></a>

## formSchema(schema, [options]) ⇒ <code>function</code>

Builds a function that `my-form-library` will use to validate the YUP schema.

**Kind**: function  
**Returns**: <code>function</code> - a function that will be used for validating the form.  
**Throws**:

- schema is falsy

**Params**

| Param           | Type                 | Default            | Description                                     |
| --------------- | -------------------- | ------------------ | ----------------------------------------------- |
| schema          | <code>Object</code>  |                    | A YUP schema object.                            |
| [options]       | <code>Object</code>  |                    | Options as object.                              |
| [options.async] | <code>boolean</code> | <code>false</code> | If the validation need to happen sync or async. |

**Example 1**

```js
import yup from 'my-react-form-state/yup';
import { useMyFormState } from 'my-react-form-state/react-redux';
import * as YUP from 'yup';

const YUPSchema = YUP.object().shape({
  name: YUP.string().required(),
  familyName: YUP.string().required(),
  favoriteColor: YUP.string().required(),
  alias: YUP.string().required(),
});

const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
  initialState,
  formSchema: yup.formSchema(YUPSchema, { async: true }),
});
```

**Example 2**

```js
import yup from 'my-react-form-state/yup';
import { useMyFormState } from 'my-react-form-state/react';
import * as YUP from 'yup';

const YUPSchema = YUP.object().shape({
  name: YUP.string().required(),
  familyName: YUP.string().required(),
  favoriteColor: YUP.string().required(),
  alias: YUP.string().required(),
});

const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
  initialState: { alias: 'guiyep' },
  formSchema: yup.formSchema(YUPSchema),
});
```

**Example 3**

```js
import React from 'react';
import yup from 'my-react-form-state/yup';
import { useMyFormState } from 'my-react-form-state/react';
import * as YUP from 'yup';
import Form from '@YourFormComponent';

const YUPSchema = YUP.object().shape({
  alias: YUP.string().required(),
});

const MyForm = ({ onSubmit }) => {
  const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
    initialState: { alias: 'guiyep' },
    formSchema: yup.formSchema(YUPSchema),
  });

  const onFieldChangeHandler = (field, value) => updateField({ field, value });

  const onSubmitHandler = async () => {
    const result = await submitForm();
    onSubmit(result);
  };

  return (
    <Form formState={formState} onFieldChange={onFieldChangeHandler} onSubmit={onSubmitHandler} onReset={resetForm} />
  );
};

export default MyForm;
```

###### Above example With React

[![Edit my-react-form-state](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/dark-bash-6l0hy)

###### Above example With React-Redux

[![Edit my-react-form-state](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/clever-browser-l6tvx)

## JOI

Waiting to JOI implement the describe functionality for the web version of the refactored JOI library.

## Json Schema

The Json schema form validator work with the <a href="https://www.npmjs.com/package/ajv">AJV</a> library by default. You need to install the AJV package as a dependency in your project.

There will be other json schema validators to use in the near future. As for now only AJV.

```
npm install ajv
```

<a name="formSchema"></a>

## formSchema(schema, [options]) ⇒ <code>function</code>

Builds a function that `my-form-library` will use to validate the a JSON schema.

**Kind**: function  
**Returns**: <code>function</code> - a function that will be used for validating the form.  
**Throws**:

- schema is falsy

**Params**

| Param  | Type                | Default | Description           |
| ------ | ------------------- | ------- | --------------------- |
| schema | <code>Object</code> |         | A JSON schema object. |

**Example 1**

```js
import jsonSchema from 'my-react-form-state/json-schema';
import { useMyFormState } from 'my-react-form-state/react-redux';

const JSONSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    familyName: {
      type: 'string',
    },
  },
  required: ['name', 'familyName'],
};

const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
  initialState,
  formSchema: jsonSchema.formSchema(JSONSchema),
});
```

**Example 2**

```js
import React from 'react';
import jsonSchema from 'my-react-form-state/json-schema';
import { useMyFormState } from 'my-react-form-state/react';
import Form from '@YourFormComponent';

const JSONSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    familyName: {
      type: 'string',
    },
  },
  required: ['name', 'familyName'],
};

const MyForm = ({ onSubmit }) => {
  const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
    initialState: { name: 'guiyep' },
    formSchema: jsonSchema.formSchema(JSONSchema),
  });

  const onFieldChangeHandler = (field, value) => updateField({ field, value });

  const onSubmitHandler = async () => {
    const result = await submitForm();
    onSubmit(result);
  };

  return (
    <Form formState={formState} onFieldChange={onFieldChangeHandler} onSubmit={onSubmitHandler} onReset={resetForm} />
  );
};

export default MyForm;
```

###### Above example With React

[![Edit my-react-form-state](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/strange-northcutt-55xpi)

###### Above example With React-Redux

[![Edit my-react-form-state](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/stupefied-albattani-hofp9)

### Extending AJV configuration

```js
import { ajv } from 'my-react-form-state/json-schema';

// this will be the ajv singleton, you can pass down any prop to the main configuration.
```

## Custom

You can build your own validators using your framework of choice.
You need to create a function that can be async or not, that will return `undefined` when is valid, or a flat object with the errors when it is not.

More precise the newFormState is the `state.data` field from the form state. <a href="/#/state/README#form-state">Check the form state</a>

```js
import { useMyFormState } from 'my-react-form-state/react';

const yourCustomFormValidator = (newFormState) => {
  // is valid
  if (yourCustomValidation(newFormState)) {
    return undefined;
  }
  // is invalid
  return {
    yourField1: 'has an error',
    yourField2: 'has an error',
    'yourField3.anotherField': 'has an error',
    'yourField4.anotherField.another': 'has an error',
  };
};

const [formState, { updateField, updateForm, submitForm, resetForm }] = useMyFormState({
  initialState: { varA: 123 },
  formValidator: yourCustomFormValidator,
});
```

or

```js
import { useMyFormState } from 'my-react-form-state/react';

const yourCustomFormValidator = async (newFormState) => {
  try {
    // is valid
    if (await yourCustomValidation(newFormState)) {
      return undefined;
    }
  } catch (ex) {
    // is invalid
    return {
      yourField1: 'has an error',
      yourField2: 'has an error',
      'yourField3.anotherField': 'has an error',
      'yourField4.anotherField.another': 'has an error',
    };
  }
};

const [formState, { updateField, updateForm, submitForm, resetForm }] = useMyFormState({
  initialState: { varA: 123 },
  formValidator: yourCustomFormValidator,
});
```
