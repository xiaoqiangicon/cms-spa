import { setProps } from './data';

const setState = {};

setProps.forEach(({ name, default: defaultValue }) => {
  setState[name] =
    typeof defaultValue === 'function' ? defaultValue() : defaultValue;
});

export default {
  namespaced: true,
  state: {
    set: setState,
  },
};
