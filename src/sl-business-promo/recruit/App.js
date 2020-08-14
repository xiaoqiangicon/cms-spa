import seeFetch from 'see-fetch';
import { Message, Notification, MessageBox } from 'element-ui';

import StoreImage from '../../../../pro-com/src/store-image';
import { makeOptions as makeStoreImageOptions } from '../../configs/store-image';
import '../../configs/ueditor';
import '../../../../pro-com/src/ueditor/ueditor.config';
import '../../../../pro-com/src/ueditor/ueditor.all';

import '../../com/ueditor-plugins/xiu-mi';
import '../../com/ueditor-plugins/insert-images';
import './fetch';

let editor;

export default {
  name: 'App',
  data() {
    return {
      // 是否招募
      recruit: 1,
      // 是否审核
      verify: 1,
      // 标题
      title: '',
      // 加载中
      loading: true,
      loadingText: '',
    };
  },
  mounted() {
    editor = window.UE.getEditor('editor');
    editor.ready(() => {
      this.init();
    });
  },
  beforeDestroy() {
    editor.destroy();
    editor = null;
  },
  methods: {
    init() {
      seeFetch('sl-business-promo/recruit/info').then(res => {
        this.loading = false;
        if (res.data) {
          this.recruit = res.data.recruit;
          this.verify = res.data.verify;
          this.title = res.data.title;
          editor.setContent(res.data.intro);
        }
      });
    },
    promo() {
      MessageBox.alert('/', '招募链接');
    },
    save() {
      const title = this.title.trim();
      const intro = editor.getContent();

      let error;
      if (!title) error = '页面标题不能为空';
      else if (!intro) error = '详情描述不能为空';

      if (error) {
        Message.error(error);
        return;
      }

      this.loading = true;
      this.loadingText = '';
      // eslint-disable-next-line no-new
      new StoreImage(
        makeStoreImageOptions({
          content: intro,
          done: newIntro => {
            this.loadingText = '正在保存数据';

            seeFetch('sl-business-promo/recruit/save', {
              recruit: this.recruit,
              verify: this.verify,
              title,
              intro: newIntro,
            }).then(res => {
              if (!res.success) {
                Notification.error({
                  title: '提示',
                  message: res.message,
                });
                return;
              }

              Notification.success({
                title: '提示',
                message: '保存成功',
              });

              this.loading = false;
            });
          },
          progress: (uploaded, total) => {
            this.loadingText = `正在转存图片 ${Math.floor(
              (uploaded * 100) / total
            )}%`;
          },
        })
      );
    },
  },
};
