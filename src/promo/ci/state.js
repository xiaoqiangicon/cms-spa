import { addProps } from './data';

const addState = {};
const addMutations = {};

addProps.forEach(({ name, default: defaultValue }) => {
  // state
  addState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;

  // mutation
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  addMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state.add[name] = payload;
  };
});

export default {
  namespaced: true,
  state: {
    add: addState,
  },
  mutations: {
    ...addMutations,
  },
};
