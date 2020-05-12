# React-Redux Hooks

We provide an unified API to use this library, and this API is using <a href="https://react-redux.js.org/next/api/hooks">HOOKS</a>. The hooks state will be updated with any form change and the underlying operations can be used at any given time.

## Typedefs

<dl>
<dt><a href="#formState">formState</a> : <code>object</code></dt>
<dd></dd>
</dl>

<dl>
<dt><a>MyFormStateHook</a> : <code>{[formState, { resetForm: function, updateForm: function, submitForm:function, updateField: function }]}</code></dt>
<dd></dd>
</dl>

## useMyFormState ⇒ <code>MyFormStateHook</code>

React-redux hook that will execute an update each time the redux form state changes. you will be able to
perform any of the next actions:

- <a href="/#/redux/operations/README#resetform">resetForm</a>
- <a href="/#/redux/operations/README#updateform">updateForm</a>
- <a href="/#/redux/operations/README#submitform">submitForm</a>
- <a href="/#/redux/operations/README#updatefield">updateField</a>
- <a href="/#/redux/operations/README#removeForm">removeForm</a>

**Kind**: React-Redux Hook.  
**Returns**: <code>MyFormStateHook</code> - hook to be use in a react component.
**Throws**: initialState and formSchema cannot be empty at the same time.

**Params**

| Param                     | Req | Type                  | Default                                                | Description                                                                                               |
| ------------------------- | --- | --------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| [arguments]               |     | <code>Object</code>   |                                                        | arguments as object.                                                                                      |
| [arguments.formId]        | N   | <code>string</code>   |                                                        | The unique form id indicator, will generate a unique id if not.                                           |
| [arguments.formSchema]    | N   | <code>function</code> |                                                        | The form schema. This can be YUP/JOI/JSON-SCHEMA <a href="/#/core/validators/README#yup">Check Schema</a> |
| [arguments.formValidator] | N   | <code>function</code> |                                                        | The form validator.<a href="/#/core/validators/README#custom">Check Validators</a>                        |
| [arguments.initialState]  | N   | <code>Object</code>   |                                                        | The initial state you want to use.                                                                        |
| [arguments.onFormChange]  | N   | <code>function</code>   | Callback that is executed when the from state changes. |

**Example**

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

const [formState, { updateField, updateForm, submitForm, resetForm }] = useMyFormState({
  initialState: { alias: 'guiyep' },
  formSchema: yup.formSchema(YUPSchema),
});
```

**Note**

It is RECOMMENDED but not required to always use a formSchema for building forms. The form will be more consistent.
