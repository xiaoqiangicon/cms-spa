import { addProps, rateListProps } from './data';

const addMutations = {};

addProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  addMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state.add[name] = payload;
  };
});

const addState = {};

addProps.forEach(({ name, default: defaultValue }) => {
  addState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

const rateListMutations = {};

rateListProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  rateListMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state.rateList[name] = payload;
  };
});

const rateListState = {};

rateListProps.forEach(({ name, default: defaultValue }) => {
  rateListState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

export default {
  namespaced: true,
  state: {
    add: addState,
    showAddBill: !1,
    showBillList: !1,
  },
  mutations: {
    ...addMutations,
  },
  modules: {
    rateList: {
      namespaced: true,
      state: rateListState,
      mutations: rateListMutations,
    },
  },
};
