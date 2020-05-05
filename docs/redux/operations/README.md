# Operations

<dl>
<dt><a>updateField(arguments)</a> ⇒ <code><a>Thunk</a></code></dt>
<dd><p>Dispatchable operation that updates one field value inside the <code>my-react-form-state</code> redux state. Will update any form/field property
that is being affected by this field. (ex: isSubmittable, isValid, isInvalid, etc).
The <code>formId</code> is not required when used using <code>registerForm</code> from <code>my-react-form-state/core</code> or <code>useMyFormState</code> from <code>my-react-form-state/react</code> or <code>my-react-form-state/react-redux</code>.</p>
</dd>
<dt><a>updateForm(arguments)</a> ⇒ <code><a>Thunk</a></code></dt>
<dd><p>Dispatchable operation that updates one/more field/s value/s inside the <code>my-react-form-state</code> redux state. Will update any form/field property
that is being affected by this field. (ex: isSubmittable, isValid, isInvalid, etc).
The <code>formId</code> is not required when used using <code>registerForm</code> from <code>my-react-form-state/core</code> or <code>useMyFormState</code> from <code>my-react-form-state/react</code> or <code>my-react-form-state/react-redux</code>.</p>
</dd>
<dt><a>submitForm(arguments)</a> ⇒ <code><a">Thunk</a></code></dt>
<dd><p>Dispatchable operation that will submit and lock the form state. Will set the isSubmitted form property to true.
You can await for this operation and will resolve the promise once the validation is completed after the form is submitted.
The <code>formId</code> is not required when used using <code>registerForm</code> from <code>my-react-form-state/core</code> or <code>useMyFormState</code> from <code>my-react-form-state/react</code> or <code>my-react-form-state/react-redux</code>.</p>
</dd>
<dt><a>initializeForm(arguments)</a> ⇒ <code><a>Thunk</a></code></dt>
<dd><p>Dispatchable operation that will initialize the form state. Normally use it after the component that uses this operation is mounted.
You can await for this operation and will resolve the promise once the form is initialized.
The <code>formId</code> is not required when used using <code>registerForm</code> from <code>my-react-form-state/core</code> or <code>useMyFormState</code> from <code>my-react-form-state/react</code> or <code>my-react-form-state/react-redux</code>.</p>
</dd>
<dt><a>removeForm(arguments)</a> ⇒ <code><a>Thunk</a></code></dt>
<dd><p>Dispatchable operation that will clear the form state from the store. Normally use it after the component that uses this operation is unmounted.
The <code>formId</code> is not required when used using <code>registerForm</code> from <code>my-react-form-state/core</code> or <code>useMyFormState</code> from <code>my-react-form-state/react</code> or <code>my-react-form-state/react-redux</code>.</p>
</dd>
<dt><a>resetForm(arguments)</a> ⇒ <code><a>Thunk</a></code></dt>
<dd><p>Dispatchable operation that will reset the form state to the initial state. You can also change the initialState using the operation.
The <code>formId</code> is not required when used using <code>registerForm</code> from <code>my-react-form-state/core</code> or <code>useMyFormState</code> from <code>my-react-form-state/react</code> or <code>my-react-form-state/react-redux</code>.</p>
</dd>
</dl>

<a name="updateField"></a>

## updateField

Dispatchable operation that updates one field value inside the `my-react-form-state` redux state. Will update any form/field property
that is being affected by this field (<a href="/#/state/README#form-state">See the form state</a>).
The `formId` is not required when used using `registerForm` from `my-react-form-state/core` or `useMyFormState` from `my-react-form-state/react` or `my-react-form-state/react-redux`.

**Kind**: Thunk.
**Returns**: Nothing.
**Throws**:

- arguments.formId is falsy
- arguments.field is falsy

**Params**

| Param            | Type                | Description                     |
| ---------------- | ------------------- | ------------------------------- |
| arguments        | <code>Object</code> | arguments as object.            |
| arguments.formId | <code>string</code> | the unique form id indicator.   |
| arguments.field  | <code>string</code> | the field name inside the form. |
| arguments.value  | <code>any</code>    | any value.                      |

**Example**

```js
import { updateField } from 'my-react-form-state/redux/operations';

dispatch(
  updateField({
    field: 'color',
    value: 'red',
    formId: 'unique-form-id',
  }),
);
```

<a name="updateForm"></a>

## updateForm

Dispatchable operation that updates one/more field/s value/s inside the `my-react-form-state` redux state. Will update any form/field property
that is being affected by this field (<a href="/#/state/README#form-state">See the form state</a>).
The `formId` is not required when used using `registerForm` from `my-react-form-state/core` or `useMyFormState` from `my-react-form-state/react` or `my-react-form-state/react-redux`.

**Kind**: Thunk.
**Returns**: Nothing.
**Throws**:

- arguments.formId is falsy
- arguments.data is falsy

**Params**

| Param            | Type                | Description                                                           |
| ---------------- | ------------------- | --------------------------------------------------------------------- |
| arguments        | <code>Object</code> | arguments as object.                                                  |
| arguments.data   | <code>Object</code> | a key value pair with the form data. { [key] : value, [key] : value } |
| arguments.formId | <code>string</code> | the unique form id indicator.                                         |

**Example**

```js
import { updateForm } from 'my-react-form-state/redux/operations';

dispatch(
  updateForm({
    data: {
      color: 'red',
    },
    formId: 'unique-form-id',
  }),
);
```

<a name="submitForm"></a>

## submitForm

Dispatchable operation that will submit and lock the form state. Will set the isSubmitted form property to true (<a href="/#/state/README#form-state">See the form state</a>).
You can await for this operation and will resolve the promise once the validation is completed after the form is submitted.
The `formId` is not required when used using `registerForm` from `my-react-form-state/core` or `useMyFormState` from `my-react-form-state/react` or `my-react-form-state/react-redux`.

**Kind**: Thunk.
**Returns**: When dispatched returns a <code>Promise</code>.
**Throws**: arguments.formId is falsy.

**Params**

| Param            | Type                | Description                   |
| ---------------- | ------------------- | ----------------------------- |
| arguments        | <code>Object</code> | arguments as object.          |
| arguments.formId | <code>string</code> | the unique form id indicator. |

**Example**

```js
import { submitForm } from 'my-react-form-state/redux/operations';

const submit = async () => {
  try {
    const formValues = await dispatch(
      submitForm({
        formId: 'unique-form-id',
      }),
    );
    // valid state
    return formValues;
  }
  catch(ex) {
    // not valid state
  }
}
```

<a name="initializeForm"></a>

## initializeForm

Dispatchable operation that will initialize the form state. Normally use it after the component that uses this operation is mounted.
You can await for this operation and will resolve the promise once the form is initialized.
The `formId` is not required when used using `registerForm` from `my-react-form-state/core` or `useMyFormState` from `my-react-form-state/react` or `my-react-form-state/react-redux`.

**Kind**: Thunk.
**Returns**: When dispatched returns a <code>Promise</code>.
**Throws**: arguments.formId is falsy.

**Params**

| Param                    | Type                | Description                   |
| ------------------------ | ------------------- | ----------------------------- |
| arguments                | <code>Object</code> | arguments as object.          |
| arguments.formId         | <code>string</code> | the unique form id indicator. |
| [arguments.initialState] | <code>Object</code> | the form initial state        |

**Example**

```js
import { initializeForm } from 'my-react-form-state/redux/operations';

dispatch(
  initializeForm({
    formId: 'unique-form-id',
  }),
);
```

<a name="removeForm"></a>

## removeForm

Dispatchable operation that will clear the form state from the store. Normally use it after the component that uses this operation is unmounted.
The `formId` is not required when used using `registerForm` from `my-react-form-state/core` or `useMyFormState` from `my-react-form-state/react` or `my-react-form-state/react-redux`.

**Kind**: Thunk.
**Returns**: Nothing.
**Throws**: arguments.formId is falsy.

**Params**

| Param            | Type                | Description                   |
| ---------------- | ------------------- | ----------------------------- |
| arguments        | <code>Object</code> | arguments as object.          |
| arguments.formId | <code>string</code> | the unique form id indicator. |

**Example**

```js
import { removeForm } from 'my-react-form-state/redux/operations';

dispatch(
  removeForm({
    formId: 'unique-form-id',
  }),
);
```

<a name="resetForm"></a>

## resetForm

Dispatchable operation that will reset the form state to the initial state. You can also change the initialState using the operation.
The `formId` is not required when used using `registerForm` from `my-react-form-state/core` or `useMyFormState` from `my-react-form-state/react` or `my-react-form-state/react-redux`.

**Kind**: Thunk.
**Returns**: Nothing.
**Throws**: arguments.formId is falsy.

**Params**

| Param                    | Type                | Description                   |
| ------------------------ | ------------------- | ----------------------------- |
| arguments                | <code>Object</code> | arguments as object.          |
| arguments.formId         | <code>string</code> | the unique form id indicator. |
| [arguments.initialState] | <code>Object</code> | the form initial state        |

**Example**

```js
import { resetForm } from 'my-react-form-state/redux/operations';

dispatch(
  resetForm({
    formId: 'unique-form-id',
  }),
);
```

# Note - IMPORTANT

When using the operation outside this library hooks, you need to have the <a href="https://github.com/reduxjs/redux-thunk">Thunk Middleware</a> applied into your redux store.
