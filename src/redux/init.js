import ParamValidator from '@mfs-lib/param-validator';
import forms from './forms/reducer';

let reducerProp;

/**
 * DON'T USE - INTERNAL
 */
export const getDefaultReducerProp = () => {
  return 'my-react-form-state';
};

/**
 * Initialize the `my-react-form-state` reducer into redux. All the forms created will be under the provided name. Uses the `my-react-form-state` property
 * as default name if name is not provided.
 *
 * @kind function
 * @param {*} arguments - arguments as object.
 * @param {string} arguments.name='my-react-form-state' - The redux state property from which all the forms will be stored. Defaults to `my-react-form-state`.
 * @return {object} - the reducer object to combine with the all of your reducers
 * @throws if you already initialized the library reducer. This can only be run once!
 *
 * @example
 * import { combineReducers, createStore } from 'redux';
 *
 * const formsReducer = initializeReducer();
 * const reducer = combineReducers({ ..yourAppReducer, ...formsReducer })
 *
 * const store = createStore(reducer, initialState)
 *
 * @example
 * import { combineReducers, createStore } from 'redux';
 *
 * const formsReducer = initializeReducer({ name: 'custom-path'});
 * const reducer = combineReducers({ ..yourAppReducer, ...formsReducer })
 *
 * const store = createStore(reducer, initialState)
 */

export const initializeReducer = ({ name = getDefaultReducerProp() } = {}) => {
  ParamValidator.isString(name, 'name');

  if (reducerProp) {
    throw new Error('you cannot initialize my-react-form-state library more than once.');
  }

  reducerProp = name;

  return { [name]: forms };
};

/**
 * Get the property name which you use for the redux reducer. All the forms will be under this state property.
 *
 * @kind function
 * @return {string|undefined} - The property you initialized the reducer. (my-react-form-state is the default value)
 *
 * @example
 *
 * const name = gerReducerProp();
 */

export const gerReducerProp = () => {
  return reducerProp;
};
