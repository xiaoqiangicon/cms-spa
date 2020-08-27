import seeFetch from 'see-fetch';
import { Message, Notification, MessageBox } from 'element-ui';

import StoreImage from '../../../../pro-com/src/store-image';
import QRCode from '../../../../pro-com/src/libs-es5/qrcode';
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
      id: 0,
      // 是否招募
      recruit: 1,
      // 是否审核
      verify: 1,
      // 标题
      title: '',
      // 加载中
      loading: true,
      loadingText: '',
      // 分享链接
      shareDialogVisible: false,
      shareLink: '',
      // 用户名字
      username: '',
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
          this.id = res.data.id;
          this.recruit = res.data.recruit;
          this.verify = res.data.verify;
          this.title = res.data.title;
          this.username = res.data.username;
          editor.setContent(res.data.intro);
          this.shareLink = `https://slxs.zizaihome.cn/cooperation/index?businessUserId=${this.id}`;
        }
      });
    },
    promo() {
      this.shareDialogVisible = true;

      setTimeout(() => {
        const { qrCodeBox } = this.$refs;
        qrCodeBox.innerHTML = '';
        // eslint-disable-next-line no-new
        new QRCode(qrCodeBox, {
          text: this.shareLink,
          width: 258,
          height: 258,
        });
      }, 300);
    },
    copy() {
      const { copyContainer } = this.$refs;
      const selection = window.getSelection();

      if (selection.rangeCount > 0) {
        selection.removeAllRanges();
      }

      const range = window.document.createRange();
      range.selectNode(copyContainer.$el.querySelector('input'));
      selection.addRange(range);

      window.document.execCommand('copy');

      Message.success('复制成功');
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
