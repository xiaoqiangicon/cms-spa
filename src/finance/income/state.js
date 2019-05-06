import {
  shiJingAddProps,
  shiJingRecordsProps,
  gongFengAddProps,
  gongFengRecordsProps,
  foShiAddProps,
  foShiRecordsProps,
  ziYingAddProps,
  ziYingRecordsProps,
} from './data';

const shiJingAddMutations = {};
const shiJingRecordsMutations = {};
const shiJingAddState = {};
const shiJingRecordsState = {};

shiJingAddProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  shiJingAddMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

shiJingRecordsProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  shiJingRecordsMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

shiJingAddProps.forEach(({ name, default: defaultValue }) => {
  shiJingAddState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

shiJingRecordsProps.forEach(({ name, default: defaultValue }) => {
  shiJingRecordsState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

const gongFengAddMutations = {};
const gongFengRecordsMutations = {};
const gongFengAddState = {};
const gongFengRecordsState = {};

gongFengAddProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  gongFengAddMutations[key] = (state, payload) => {
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

gongFengAddProps.forEach(({ name, default: defaultValue }) => {
  gongFengAddState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

gongFengRecordsProps.forEach(({ name, default: defaultValue }) => {
  gongFengRecordsState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

const foShiAddMutations = {};
const foShiRecordsMutations = {};
const foShiAddState = {};
const foShiRecordsState = {};

foShiAddProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  foShiAddMutations[key] = (state, payload) => {
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

foShiAddProps.forEach(({ name, default: defaultValue }) => {
  foShiAddState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

foShiRecordsProps.forEach(({ name, default: defaultValue }) => {
  foShiRecordsState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

const ziYingAddMutations = {};
const ziYingRecordsMutations = {};
const ziYingAddState = {};
const ziYingRecordsState = {};

ziYingAddProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  ziYingAddMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

ziYingRecordsProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  ziYingRecordsMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

ziYingAddProps.forEach(({ name, default: defaultValue }) => {
  ziYingAddState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

ziYingRecordsProps.forEach(({ name, default: defaultValue }) => {
  ziYingRecordsState[name] =
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
    shiJingRecords: {
      namespaced: true,
      state: shiJingRecordsState,
      mutations: shiJingRecordsMutations,
    },
    gongFengAdd: {
      namespaced: true,
      state: gongFengAddState,
      mutations: gongFengAddMutations,
    },
    gongFengRecords: {
      namespaced: true,
      state: gongFengRecordsState,
      mutations: gongFengRecordsMutations,
    },
    foShiAdd: {
      namespaced: true,
      state: foShiAddState,
      mutations: foShiAddMutations,
    },
    foShiRecords: {
      namespaced: true,
      state: foShiRecordsState,
      mutations: foShiRecordsMutations,
    },
    ziYingAdd: {
      namespaced: true,
      state: ziYingAddState,
      mutations: ziYingAddMutations,
    },
    ziYingRecords: {
      namespaced: true,
      state: ziYingRecordsState,
      mutations: ziYingRecordsMutations,
    },
  },
};
