/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getDefaultReducerProp } from '../../redux/init';
import { Context } from './Context';

const Provider = ({ children, name }) => {
  const [myReactFormState, setMyReactFormState] = useState({ [getDefaultReducerProp()]: {} });
  const [formState, setFormState] = useState({});

  if (window._REACT_CONTEXT_DEVTOOL && process && process.env && process.env.NODE_ENV !== 'production') {
    window._REACT_CONTEXT_DEVTOOL({
      id: `MyReactFormState-${name}`,
      displayName: `My React Form State: ${name}`,
      values: myReactFormState,
    });
  }

  const reducerProp = getDefaultReducerProp();

  useEffect(() => {
    const comingState = {
      [reducerProp]: {
        ...myReactFormState[reducerProp],
        ...formState,
      },
    };
    setMyReactFormState(comingState);
  }, [formState]);

  const setState = (nextState) => {
    setFormState(nextState[reducerProp]);
  };

  return <Context.Provider value={{ state: myReactFormState, setState }}>{children}</Context.Provider>;
};

Provider.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Provider;
