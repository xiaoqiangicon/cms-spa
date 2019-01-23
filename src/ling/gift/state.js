import { addProps } from './data';

const mutations = {};

addProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  mutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state.add[name] = payload;
  };
});

const addState = {};

addProps.forEach(({ name, default: defaultValue }) => {
  addState[name] = defaultValue;
});

export default {
  namespaced: true,
  state: {
    add: addState,
  },
  mutations,
};
