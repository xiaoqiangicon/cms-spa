import {
  ziYingAddProps,
  ziYingModifyRecordsProps,
  ziYingUseProps,
  ziYingUseRecordsProps,
} from './data';

const ziYingAddMutations = {};
const ziYingAddState = {};
const ziYingModifyRecordsMutations = {};
const ziYingModifyRecordsState = {};
const ziYingUseMutations = {};
const ziYingUseState = {};
const ziYingUseRecordsMutations = {};
const ziYingUseRecordsState = {};

ziYingAddProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  ziYingAddMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

ziYingAddProps.forEach(({ name, default: defaultValue }) => {
  ziYingAddState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

ziYingModifyRecordsProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  ziYingModifyRecordsMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

ziYingModifyRecordsProps.forEach(({ name, default: defaultValue }) => {
  ziYingModifyRecordsState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

ziYingUseProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  ziYingUseMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

ziYingUseProps.forEach(({ name, default: defaultValue }) => {
  ziYingUseState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

ziYingUseRecordsProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  ziYingUseRecordsMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

ziYingUseRecordsProps.forEach(({ name, default: defaultValue }) => {
  ziYingUseRecordsState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

export default {
  namespaced: true,
  modules: {
    ziYingAdd: {
      namespaced: true,
      state: ziYingAddState,
      mutations: ziYingAddMutations,
    },
    ziYingModifyRecords: {
      namespaced: true,
      state: ziYingModifyRecordsState,
      mutations: ziYingModifyRecordsMutations,
    },
    ziYingUse: {
      namespaced: true,
      state: ziYingUseState,
      mutations: ziYingUseMutations,
    },
    ziYingUseRecords: {
      namespaced: true,
      state: ziYingUseRecordsState,
      mutations: ziYingUseRecordsMutations,
    },
  },
};
