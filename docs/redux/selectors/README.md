# Selectors

<dl>
<dt><a href="#getForm">getForm(arguments)</a> ⇒ <code>object</code></dt>
<dd><p>Selector that returns the current state of the form.
Passing formId is not required when used using <code>registerForm</code> from <code>my-react-form-state/core</code>.</p>
</dd>
<dt><a href="#getFormResult">getFormResult(arguments)</a> ⇒ <code>object</code></dt>
<dd><p>Gets the forms result data. This result data is the merge between the form changes and the initial state.
Passing formId is not required when used using <code>registerForm</code> from <code>my-react-form-state/core</code>.</p>
</dd>
</dl>

<a name="getForm"></a>

## getForm(arguments) ⇒ <code>object</code>

Selector that returns the current state of the form.
Passing formId is not required when used using `registerForm` from `my-react-form-state/core`.

**Kind**: global function  
**Returns**: <code>object</code> - form state.  
**Throws**:

- arguments.formId is falsy

**Params**

| Param            | Type                | Description                   |
| ---------------- | ------------------- | ----------------------------- |
| arguments        | <code>\*</code>     | arguments as object.          |
| arguments.formId | <code>string</code> | The unique form id indicator. |

**Example**

```js
import { getForm } from 'my-react-form-state/redux/selectors';

getForm(state, { formId: 'unique-form-id' });
```

<a name="getFormResult"></a>

## getFormResult(arguments) ⇒ <code>object</code>

Gets the forms result data. This result data is the merge between the form changes and the initial state.
Passing formId is not required when used using `registerForm` from `my-react-form-state/core`.

**Kind**: global function  
**Returns**: <code>object</code> - form state.  
**Throws**:

- arguments.formId is falsy

**Params**

| Param            | Type                | Description                   |
| ---------------- | ------------------- | ----------------------------- |
| arguments        | <code>\*</code>     | arguments as object.          |
| arguments.formId | <code>string</code> | The unique form id indicator. |

**Example**

```js
import { getFormResult } from 'my-react-form-state/redux/selectors';

getFormResult(state, { formId: 'unique-form-id' });
```
