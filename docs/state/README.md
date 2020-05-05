## Form State

```js
const state = {
  // Form data stored as a key-value definition. It will include only the fields defined
  // in the schema if using `formSchema` that has changed.
  data: {
    'profileOne.name': 'Jon test',
    'profileOne.familyName': 'Doe',
    'profileOne.alias': '',
    'profileOne.favoriteColor': 'red',
  },
  // Is the initial data for your form. This will only be loaded once the form is
  // initialized and always remain the same unless you reset the form to a 
  // different state. (using the resetForm operation)
  initialData: {
    'profileOne.name': 'Jon',
    'profileOne.familyName': 'Doe',
    'profileOne.alias': '',
    'profileOne.favoriteColor': 'red',
  },
  // The form result data `state.data`. It will be populated after you submit the form and
  // `state.isSubmitted` is set to true. (using the submitForm operation)
  resultData: {
    'profileOne.name': 'Jon',
    'profileOne.familyName': 'Doe',
    'profileOne.alias': '',
    'profileOne.favoriteColor': 'red',
  },
  // Shows when the form was submitted. This happens to be true when `state.isTouched` and
  //`state.isValid` happen to be truthy after the submitForm operation was dispatched.
  isSubmitted: false,
  // Tells you if `state.isTouched` and `state.isValid` are truthy. We usually use this state
  // to enable/disable the submit button in a form.
  isSubmittable: false,
  // When any data from `state.data` was modified. This means no update dispatched
  // (using updateField or updateForm operations).
  isTouched: true,
  // When no data from `state.data` was modified. This means no update dispatched
  // (using updateField or updateForm operations).
  isPristine: false,
  // Any error appearing from validating the `state.data` again the form `schema`.
  errors: {
    'profileOne.alias': 'profileOne.alias is a required field',
  },
  // Tells if the form has been initialized.
  isInitialized: true,
  // Truthy if there is no errors in `state.errors`.
  isValid: false,
  // Truthy id there are any errors in `state.errors`.
  isInvalid: true,
  // When dispatching updateField or updateForm operations we will store any modified
  // field from the form.
  dirtyFields: {
    'profileOne.name': true,
    'profileOne.alias': true,
  },
  // A representation of each field at any given time. We use this for query the field to get
  // specific fields information. The fields definition will follow your data structure.
  fields: {
    profileOne: {
      name: {
        // The value from `state.data[field.path]`
        value: 'Jon test',
        // Truthy if the field hasn't been modified. (using updateField or updateForm
        // operations).
        isPristine: false,
        // Truthy if the field has been modified. (using updateField or updateForm
        // operations).
        isTouched: true,
        // Data coming from `state.isSubmitted`.
        isSubmitted: false,
        // Tells if the form has been initialized.
        isInitialized: true,
        // Truthy if there is any error appearing from validating the
        // `state.data[field.path]` again the `schema[field.path]`.
        isValid: true,
        // Truthy if there is no errors appearing from validating the
        //`state.data[field.path]` again the `schema[field.path]`.
        isInvalid: false,
        // Represents when a field should display an error indicator. This
        // happens when `field.isInvalid` and `field.isTouched` are truthy.
        showError: false,
        // The path from the `state.data` to get this field value.
        path: 'profileOne.name',
      },
      familyName: {
        value: 'Doe',
        isPristine: true,
        isTouched: false,
        isSubmitted: false,
        isInitialized: true,
        isValid: true,
        isInvalid: false,
        showError: false,
        path: 'profileOne.familyName',
      },
      alias: {
        value: '',
        isPristine: false,
        isTouched: true,
        isSubmitted: false,
        isInitialized: true,
        error: 'profileOne.alias is a required field',
        isValid: false,
        isInvalid: true,
        showError: true,
        path: 'profileOne.alias',
      },
      favoriteColor: {
        value: 'red',
        isPristine: true,
        isTouched: false,
        isSubmitted: false,
        isInitialized: true,
        isValid: true,
        isInvalid: false,
        showError: false,
        path: 'profileOne.favoriteColor',
      },
    },
  },
};
```

### IMPORTANT:

The fields object will be populated only with data that can be validated by the schema you are passing(if any).

Example:

If in your schema you only have:

```js
  (pseudo code)

  const yourSchema = {
    name: 'string',
    alias: 'string'
  }
```

The `state.fields` will only have those fields.

## Redux State

```js
const state = {
  ...yourState
  'my-react-form-state' : {
    'dfd766d0-27d8-4776-9d53-c8aaba435240' : {
      ..thisFormState
    },
    ...everyOtherFormState
  }
}

```

`state['my-react-form-state']` => This is the default entry name in the redux state used when initializing `my-react-form-state` library reducer.
You can check <a href="/#/redux/get-started/README#my-form-library-redux-configuration">Redux/Getting Started</a> on how to change it.

`state['my-react-form-state']['dfd766d0-27d8-4776-9d53-c8aaba435240']` => `dfd766d0-27d8-4776-9d53-c8aaba435240` It is a unique form `uuid` automatically generated when you
use the `useMyFormState` hook without passing any specific `form ID`.

- Please refer to <a href="/#/react/hook/README#react-hooks">React/HOOKS</a> for more information.
- Please refer to <a href="/#/react-redux/hook/README#react-redux-hooks">React-Redux/HOOKS</a> for more information.
