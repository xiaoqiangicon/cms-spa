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
  kindUseRecordsProps,
  kindUseProps,
  kindAddProps,
  kindModifyRecordsProps,
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

const kindUseMutations = {};
const kindUseState = {};
const kindUseRecordsMutations = {};
const kindUseRecordsState = {};
const kindAddMutations = {};
const kindAddState = {};
const kindModifyRecordsMutations = {};
const kindModifyRecordsState = {};

kindUseProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  kindUseMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

kindUseProps.forEach(({ name, default: defaultValue }) => {
  kindUseState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

kindUseRecordsProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  kindUseRecordsMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

kindUseRecordsProps.forEach(({ name, default: defaultValue }) => {
  kindUseRecordsState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

kindAddProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  kindAddMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

kindAddProps.forEach(({ name, default: defaultValue }) => {
  kindAddState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

kindModifyRecordsProps.forEach(({ name }) => {
  const key = `update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  kindModifyRecordsMutations[key] = (state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state[name] = payload;
  };
});

kindModifyRecordsProps.forEach(({ name, default: defaultValue }) => {
  kindModifyRecordsState[name] =
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
    kindUse: {
      namespaced: true,
      state: kindUseState,
      mutations: kindUseMutations,
    },
    kindUseRecords: {
      namespaced: true,
      state: kindUseRecordsState,
      mutations: kindUseRecordsMutations,
    },
    kindAdd: {
      namespaced: true,
      state: kindAddState,
      mutations: kindAddMutations,
    },
    kindModifyRecords: {
      namespaced: true,
      state: kindModifyRecordsState,
      mutations: kindModifyRecordsMutations,
    },
  },
};
