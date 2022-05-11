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
// 支付弹窗设置
import promoPayPop from '../promo/pay-pop/state';

// 订单退款
import orderRefund from '../order/refund/state';

// 数据统计
import statisticsChannel from '../statistics/channel/state';

// 法师模块
import masterProject from '../master/project/state';

// 佛事管理
import buddhistIntegrate from '../buddhist/integrate/state';
import buddhistVerify from '../buddhist/verify/state';

// 胜乐账户人员管理
import slPromoStaff from '../sl-promo/staff/state';
// 胜乐账户项目详情
import slPromoProjectDetail from '../sl-promo/project-detail/state';
// 胜乐业务员账户项目详情
import slBusinessPromoProjectDetail from '../sl-business-promo/project-detail/state';

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
    // 支付弹窗设置
    promoPayPop,

    // 订单退款
    orderRefund,

    // 数据统计
    statisticsChannel,

    // 法师模块
    masterProject,

    // 佛事管理
    buddhistIntegrate,
    buddhistVerify,

    // 胜乐账户人员管理
    slPromoStaff,
    // 胜乐账户项目详情
    slPromoProjectDetail,
    // 胜乐业务员账户项目详情
    slBusinessPromoProjectDetail,
  },
  getters,
});

export default store;
