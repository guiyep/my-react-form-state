import { useContext } from 'react';
import { Context } from './Context';

export const useMyReactFormContext = () => {
  const context = useContext(Context);

  const { state, setState } = context;

  if (!context) {
    return [undefined, undefined];
  }

  return [state, setState];
};
