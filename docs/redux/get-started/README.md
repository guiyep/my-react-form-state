# my-form-library Redux configuration

## Functions

<dl>
<dt><a href="#initializeReducer">initializeReducer(arguments)</a> ⇒ <code>object</code></dt>
<dd><p>Initialize the <code>my-react-form-state</code> reducer into the redux store. All the forms created will be under the provided name. Uses the <code>my-react-form-state</code> entry
as default name if name is not provided when initializing the reducer.</p>
</dd>
</dl>

<a name="initializeReducer"></a>

## initializeReducer(arguments) ⇒ <code>object</code>

Initialize the `my-react-form-state` reducer into the redux store. All the forms created will be under the provided name. Uses the `my-react-form-state` property
as default name if name is not provided.

**Kind**: function  
**Returns**: <code>object</code> - the reducer object to combine with all of your reducers.  
**Throws**:

- If you already initialized the library reducer. This can only be run once!

**Params**

| Param          | Type                | Default                                | Description                                                                                    |
| -------------- | ------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| arguments      | <code>Object</code> |                                        | arguments as object.                                                                           |
| arguments.name | <code>string</code> | <code>&quot;my-react-form-state&quot;</code> | The redux state property from which all the forms will be stored. Defaults to `my-react-form-state`. |

**Example**

```js
import { combineReducers, createStore } from 'redux';
import { initializeReducer } from 'my-react-form-state/redux';

const formsReducer = initializeReducer();
const reducer = combineReducers({ ..yourAppReducer, ...formsReducer })

const store = createStore(reducer, initialState)

```

**Example 2**

```js
import { combineReducers, createStore } from 'redux';
import { initializeReducer } from 'my-react-form-state/redux';

const formsReducer = initializeReducer({ name: 'custom-path' });
const reducer = combineReducers({ ..yourAppReducer, ...formsReducer })

const store = createStore(reducer, initialState)

```

# Note - IMPORTANT

When using this library without the library hooks, you need to have the <a href="https://github.com/reduxjs/redux-thunk">Thunk Middleware</a> applied into your redux store.
