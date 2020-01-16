import {
  shiJingAddProps,
  shiJingRecordsProps,
  gongFengAddProps,
  gongFengRecordsProps,
  foShiAddProps,
  foShiRecordsProps,
  ziYingAddProps,
  ziYingModifyRecordsProps,
  ziYingUseProps,
  ziYingUseRecordsProps,
} from './data';

const shiJingAddMutations = {};
const shiJingAddState = {};
const shiJingRecordsMutations = {};
const shiJingRecordsState = {};

shiJingAddProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  shiJingAddMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

shiJingAddProps.forEach(({ name, default: defaultValue }) => {
  shiJingAddState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

shiJingRecordsProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  shiJingRecordsMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

shiJingRecordsProps.forEach(({ name, default: defaultValue }) => {
  shiJingRecordsState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

const gongFengAddMutations = {};
const gongFengAddState = {};
const gongFengRecordsMutations = {};
const gongFengRecordsState = {};

gongFengAddProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  gongFengAddMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

gongFengAddProps.forEach(({ name, default: defaultValue }) => {
  gongFengAddState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

gongFengRecordsProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  gongFengRecordsMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

gongFengRecordsProps.forEach(({ name, default: defaultValue }) => {
  gongFengRecordsState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

const foShiAddMutations = {};
const foShiAddState = {};
const foShiRecordsMutations = {};
const foShiRecordsState = {};

foShiAddProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  foShiAddMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

foShiAddProps.forEach(({ name, default: defaultValue }) => {
  foShiAddState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

foShiRecordsProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  foShiRecordsMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

foShiRecordsProps.forEach(({ name, default: defaultValue }) => {
  foShiRecordsState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

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
