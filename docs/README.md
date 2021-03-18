## The Library

> This is a React form state management library that works with React/Redux/React-Native.

[![NPM](https://img.shields.io/npm/v/my-react-form-state.svg)](https://www.npmjs.com/package/my-react-form-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is a React form state management library that works with React/Redux/React-Native.

Form libraries are complex, they don't make a separation between state and UI. You always end up building custom components on top of the library components that at the same time are on top of the HTML elements!!!. This makes it complex, hard to maintain and hard to change. Too many abstractions :(

This library was built for the sole purpose of unifying and simplifying the way we manage the state with React and/or Redux.

If you use Redux or just React or React Native, this library is for you! Yes, it is not a typo. You can use this library with one or the other, or both! It doesn't matter since it is implemented with DUCKS under the hood.

It provides a simple hook API that you can initialize in a container component and pass down the form-state to your form.

## Note

The library is fully tested using Jest and fully documented using JsDoc.

## Getting Started

```bash
npm install --save my-react-form-state
```

### Peer Dependencies

They depend on how you want to use the library:

#### Just React:

```bash
{
    "react",
    "react-dom",
}
```

#### With React-Redux

```bash
{
    "react",
    "react-dom",
    "redux",
    "react-redux",
}
```

## Example with React-Redux

The library will initialize a `my-react-form-state` entry in your redux state where all the forms data will live. You can check the state at any given time using the redux tools. Any change in the redux state form will trigger an update in the `useMyFormState` hook.

Check <a href="/#/redux/get-started/README?id=my-form-library-redux-configuration">Getting Started Redux</a> for the Redux configuration

```js
import React from 'react';
import { useMyFormState } from 'my-react-form-state/react-redux';
import yup from 'my-react-form-state/yup';
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

  const onEmptyHandler = () => resetForm({ initialState: {} );

  const onSubmitHandler = async () => {
    const result = await submitForm();
    onSubmit(result);
  };

  return (
    <Form
      formState={formState}
      onFieldChange={onFieldChangeHandler}
      onSubmit={onSubmitHandler}
      onClear={onEmptyHandler}
      onReset={resetForm}
    />
  );
};

export default MyForm;
```

[![Edit my-react-form-state](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/clever-browser-l6tvx)

## Example with only react

The library will keep the state internal to your component. No extra configuration needed.

```js
import React from 'react';
import yup from 'my-react-form-state/yup';
import * as YUP from 'yup';
import { useMyFormState } from 'my-react-form-state/react'; <-- THIS IS THE ONLY DIFFERENCE ;) -->
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

  const onEmptyHandler = () => resetForm({ initialState: {} });

  const onSubmitHandler = async () => {
    const result = await submitForm();
    onSubmit(result);
  };

  return (
    <Form
      formState={formState}
      onFieldChange={onFieldChangeHandler}
      onSubmit={onSubmitHandler}
      onClear={onEmptyHandler}
      onReset={resetForm}
    />
  );
};

export default MyForm;
```

[![Edit my-react-form-state](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/dark-bash-6l0hy)

## Example with only React-Native, it only changes the UI implementation :)

```js
import React from 'react';
import yup from 'my-react-form-state/yup';
import * as YUP from 'yup';
import { useMyFormState } from 'my-react-form-state/react'; <-- THIS IS THE ONLY DIFFERENCE ;) -->
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

  const onEmptyHandler = () => resetForm({ initialState: {} });

  const onSubmitHandler = async () => {
    const result = await submitForm();
    onSubmit(result);
  };

  return (
    <Form
      formState={formState}
      onFieldChange={onFieldChangeHandler}
      onSubmit={onSubmitHandler}
      onClear={onEmptyHandler}
      onReset={resetForm}
    />
  );
};

export default MyForm;
```

[![Edit my-react-form-state](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-native-xbsyz)

## Using React Context/Provider

You can also define a context for a collection of forms that are going to work together isolating them from the rest of the app.

```js
import React from 'react';
import { MyFormStateProvider } from 'my-react-form-state/react';

const initialStateBasic = { name: 'test 1', familyName: 'test 2', alias: 'test 2', favoriteColor: 'test 4' };
const initialStateBasic2 = { name: 'test 2', familyName: 'test 66', alias: 'test 88', favoriteColor: 'test 99' };

return (
  <MyFormStateProvider name="ContextForm1AndForm2">
    <Form onSubmit={onSubmit} initialState={initialStateBasic} /> // form 1
    <Form onSubmit={onSubmit} initialState={initialStateBasic2} /> // form 2
  </MyFormStateProvider>
  <MyFormStateProvider name="ContextForm3AndForm4">
    <Form onSubmit={onSubmit} initialState={{}} /> // form 3
    <Form onSubmit={onSubmit} initialState={{}} /> // form 4
  </MyFormStateProvider>
);
```

Now form 1 and 2 will live together in the same context (now you can share data between them) and 3 and 4 that will also live together in the same context.

Note: if you have [React Context google plugin](https://chrome.google.com/webstore/detail/react-context-devtool/oddhnidmicpefilikhgeagedibnefkcf?hl=en) installed now you will be able to see the sate in your chrome tool. This only apply to development mode.

## Form UI Component Example

I used material-ui just as an example.

```js
import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Form = ({
  formState: {
    fields: { name, familyName },
    isSubmittable,
    isSubmitted,
    isInitialized,
  },
  onFieldChange,
  onClear,
  onSubmit,
  onReset,
}) => {
  const onFieldChangeHandler = useCallback((e) => onFieldChange(e.target.id, e.target.value), [onFieldChange]);

  return (
    <form noValidate autoComplete="off">
      <div>
        <TextField
          error={name.showError}
          required
          id="name"
          label="Name"
          value={name.value}
          margin="normal"
          onChange={onFieldChangeHandler}
          disabled={isSubmitted}
        />
        <TextField
          error={familyName.showError}
          required
          id="familyName"
          label="Family Name"
          value={familyName.value}
          margin="normal"
          onChange={onFieldChangeHandler}
          disabled={isSubmitted}
        />
      </div>
      <div>
        <Button disabled={!isSubmittable || isSubmitted} onClick={onSubmit}>
          Submit
        </Button>
        <Button disabled={!isInitialized} onClick={onClear}>
          Reset To Empty
        </Button>
        <Button disabled={!isInitialized} onClick={onReset}>
          Reset to default
        </Button>
      </div>
    </form>
  );
};

export default Form;
```
###### Above example With React

[![Edit my-react-form-state](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/dark-bash-6l0hy)

###### Above example With React-Native

[![Edit my-react-form-state](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-native-xbsyz)
