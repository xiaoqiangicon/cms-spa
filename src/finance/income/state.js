import {
  shiJingAddProps,
  gongFengAddProps,
  foShiAddProps,
  shiJingRecordsProps,
  gongFengRecordsProps,
  foShiRecordsProps,
} from './data';

const shiJingAddMutations = {};
const gongFengAddMutations = {};
const foShiAddMutations = {};

shiJingAddProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  shiJingAddMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

gongFengAddProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  gongFengAddMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

foShiAddProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  foShiAddMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

const shiJingRecordsMutations = {};
const gongFengRecordsMutations = {};
const foShiRecordsMutations = {};

shiJingRecordsProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  shiJingRecordsMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

gongFengRecordsProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  gongFengRecordsMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

foShiRecordsProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  foShiRecordsMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

const shiJingAddState = {};
const gongFengAddState = {};
const foShiAddState = {};

shiJingAddProps.forEach(({ name, default: defaultValue }) => {
  shiJingAddState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

gongFengAddProps.forEach(({ name, default: defaultValue }) => {
  gongFengAddState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

foShiAddProps.forEach(({ name, default: defaultValue }) => {
  foShiAddState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

const shiJingRecordsState = {};
const gongFengRecordsState = {};
const foShiRecordsState = {};

shiJingRecordsProps.forEach(({ name, default: defaultValue }) => {
  shiJingRecordsState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

gongFengRecordsProps.forEach(({ name, default: defaultValue }) => {
  gongFengRecordsState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

foShiRecordsProps.forEach(({ name, default: defaultValue }) => {
  foShiRecordsState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

export default {
  namespaced: true,
  modules: {
    shiJingAdd: {
      namespaced: true,
      state: shiJingAddState,
      mutations: shiJingAddMutations,
    },
    gongFengAdd: {
      namespaced: true,
      state: gongFengAddState,
      mutations: gongFengAddMutations,
    },
    foShiAdd: {
      namespaced: true,
      state: foShiAddState,
      mutations: foShiAddMutations,
    },
    shiJingRecords: {
      namespaced: true,
      state: shiJingRecordsState,
      mutations: shiJingRecordsMutations,
    },
    gongFengRecords: {
      namespaced: true,
      state: gongFengRecordsState,
      mutations: gongFengRecordsMutations,
    },
    foShiRecords: {
      namespaced: true,
      state: foShiRecordsState,
      mutations: foShiRecordsMutations,
    },
  },
};
