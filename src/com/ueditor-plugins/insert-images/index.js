/* eslint-disable no-param-reassign */
import Vue from 'vue';
import './index.less';
import Upload from '../../upload/Upload';

const UploadConstructor = Vue.extend(Upload);

const tpl = `
<div class="wrap-1">
  <div class="inner-1">
    <div class="content-1"></div>
  </div>
  <div class="ok-1">确定</div>
</div>
`;

// 多选图片
window.UE.registerUI(
  'ue-insert-images',
  (editor, uiName) =>
    new window.UE.ui.Button({
      name: uiName,
      title: '添加多张图片',
      cssRules: 'background-position: -726px -77px;',
      onclick() {
        if (editor.ueInsertImages) {
          editor.ueInsertImages.style.display = 'block';
          editor.ueInsertImagesVm.images = [];
          return;
        }

        const el = document.createElement('div');
        el.classList.add('ue-insert-images');

        document.body.append(el);
        editor.ueInsertImages = el;

        el.innerHTML = tpl;

        el.addEventListener(
          'click',
          e => {
            if (e.target === e.currentTarget) el.style.display = 'none';
          },
          !1
        );

        const contentEl = el.getElementsByClassName('content-1')[0];
        const okEl = el.getElementsByClassName('ok-1')[0];

        const vm = new UploadConstructor({
          el: contentEl,
          propsData: {
            images: [],
            multiple: !0,
          },
        });

        editor.ueInsertImagesVm = vm;

        okEl.addEventListener(
          'click',
          () => {
            editor.execCommand('insertimage', vm.images.map(i => ({ src: i })));
            editor.ueInsertImages.style.display = 'none';
          },
          !1
        );
      },
    })
);
