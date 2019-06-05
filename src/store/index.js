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
import lingFace from '../ling/face/state';

// 善款中心
import financePending from '../finance/pending/state';
import financeTaking from '../finance/taking/state';
import financeIncome from '../finance/income/state';
import financeRecord from '../finance/record/state';
import financeRemark from '../finance/remark/state';

// 趣头条
import quArticle from '../qu/article/state';
import quMaterial from '../qu/material/state';
import quSource from '../qu/source/state';

// 事件管理
import promoIndex from '../promo/index/state';

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
    lingFace,

    // 善款中心
    financePending,
    financeTaking,
    financeIncome,
    financeRecord,
    financeRemark,

    // 趣头条
    quArticle,
    quMaterial,
    quSource,

    // 事件管理
    promoIndex,
  },
  getters,
});

export default store;
