import { addProps } from './data';

const addState = {};

addProps.forEach(({ name, default: defaultValue }) => {
  addState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

export default {
  namespaced: true,
  state: {
    add: addState,
  },
};
