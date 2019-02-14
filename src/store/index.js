import Vue from 'vue';
import Vuex from 'vuex';

// 系统保留
import app from './modules/app';
import errorLog from './modules/errorLog';
import permission from './modules/permission';
import tagsView from './modules/tagsView';
import user from './modules/user';
import getters from './getters';

// 要灵灵
import lingGift from '../ling/gift/state';
import lingBubble from '../ling/bubble/state';
import lingEntry from '../ling/entry/state';
import lingFate from '../ling/fate/state';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    // 系统保留
    app,
    errorLog,
    permission,
    tagsView,
    user,

    // 要灵灵
    lingGift,
    lingBubble,
    lingEntry,
    lingFate,
  },
  getters,
});

export default store;
