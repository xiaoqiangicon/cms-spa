import 'normalize.css/normalize.css';
import '@senntyou/shortcut.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.less';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import Cookies from 'js-cookie';
import Element from 'element-ui';

import './sys/styles/index.scss'; // global css

import App from './App';
import router from './router';
import store from './store';

import i18n from './sys/lang'; // Internationalization
import './sys/errorLog'; // error log
import './sys/permission'; // permission control

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value),
});

Vue.config.productionTip = false;

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
});
