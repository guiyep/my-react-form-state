# Modules

Each module can be used independently from each other.

## Core

This module includes everything needed for setting up the library. Including validating, registering, initializing.

#### Includes

- `import yup from 'my-react-form-state/yup'` <a href="/#/core/validators/README#yup">Check yup.formSchema(schema)</a>
- `import { registerForm } from 'my-react-form-state/core'` This is internal unless you are defining a global form schema. <a href="/#/core/global/README.md">Check global form Schema</a>

## Redux

This module includes all the Operations/Selectors/Actions/Reducers for the library.

#### Includes

- `import { initializeReducer } from 'my-react-form-state/redux';` This is for initializing the library reducer if you are using with redux. <a href="/#/redux/get-started/README#my-form-library-redux-configuration">Check redux configuration</a>
- `import { operations, selectors, reducer } from 'my-react-form-state/redux'`
- <a href="/#/redux/operations/README#operations">Check redux operations</a>
- <a href="/#/redux/selectors/README#selectors">Check state selectors</a>

## React

This module includes the react hook. When using this hook you are not using the Redux implementation of the library but just local state.
<a href="/#/react/hook/README#react-hooks">Check react hook</a>

#### Includes

- `import { useMyFormState } from 'my-react-form-state/react'`

## React-Redux

This module includes the react-redux hook. When using this hook you are binding this library to the redux state.
<a href="/#/react-redux/hook/README#react-redux-hooks">Check react redux hook</a>

#### Includes

- `import { useMyFormState } from 'my-react-form-state/react-redux'`
