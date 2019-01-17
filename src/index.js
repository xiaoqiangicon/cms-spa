import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';

import Vue from 'vue';
import Element from 'element-ui';

import './styles/index.scss';

import App from './App';
import router from './router';
import store from './store';

Vue.use(Element, {size: 'medium'});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
