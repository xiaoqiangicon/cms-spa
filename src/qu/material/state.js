import { addProps } from './data';

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

export default {
  namespaced: true,
  state: {
    add: addState,
    action: '',
    actionVisible: !1,
    actionSelected: 1,
    imagesToSelect: [],
    selectImageVisible: !1,
    selectImageResult: [],
    imagesSelected: 1,
    uploadImageVisible: !1,
    uploadImageResult: [],
    imagesUploaded: 1,
    detailVisible: !1,
    detailJsonContent: {},
    cropImageVisible: !1,
    cropImageUrl: '',
    cropImageResult: '',
    imageCropped: 1,
    videosToSelect: [],
    selectVideoVisible: !1,
    selectVideoResult: '',
    videoSelected: 1,
  },
  mutations: {
    ...addMutations,
  },
};
