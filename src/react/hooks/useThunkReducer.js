import { useCallback, useRef, useState } from 'react';
import { useMyReactFormContext } from '../context/useMyReactFormContext';

/**
 * @function Thunk
 * @param {Dispatch} dispatch
 * @param {Function} getState
 * @returns {void|*}
 */

/**
 * @function Dispatch
 * @param {Object|Thunk} action
 * @returns {void|*}
 */

/**
 * Augments React's useReducer() hook so that the action
 * dispatcher supports thunks.
 *
 * @param {Function} reducer
 * @param {*} initialState
 * @returns {[*, Dispatch]}
 */
export function useThunkReducer(reducer, { initialState, useContext }) {
  // the context will be initialized already if used
  const [contextState, setContextState] = useMyReactFormContext();
  const [internalState, setInternalState] = useState(initialState);

  // we will read the context and if there is none present we will use internal state.
  const hookState = useContext && contextState ? contextState : internalState;
  const setHookState = useContext && contextState ? setContextState : setInternalState;

  // State management.
  const state = useRef(hookState);
  const getState = useCallback(() => state.current, [state]);
  const setState = useCallback(
    (newState) => {
      state.current = newState;
      setHookState(newState);
    },
    [state, setHookState],
  );

  // Reducer.
  const reduce = useCallback(
    (action) => {
      return reducer(getState(), action);
    },
    [reducer, getState],
  );

  // Augmented dispatcher.
  const dispatch = useCallback(
    (action) => {
      return typeof action === 'function' ? action(dispatch, getState) : setState(reduce(action));
    },
    [getState, setState, reduce],
  );

  return [hookState, dispatch];
}
