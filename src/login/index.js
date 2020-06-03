import 'normalize.css/normalize.css';
import '@senntyou/shortcut.css';
import 'colors.css/css/colors.css';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import { Form, FormItem, Button, Input } from 'element-ui';

import '../index.less'; // global css
import '../sys/styles/index.scss'; // global css
import i18n from '../sys/lang'; // Internationalization

import App from './App';

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Input);

Vue.config.productionTip = false;

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  i18n,
  render: h => h(App),
});
