<template>
  <div class="container">
    <el-card>
      <div slot="header" class="container-title">
        <span>加持项目</span>
        <span class="arrow">></span>
        <span>{{ isNew ? '新建项目' : '编辑项目' }}</span>
      </div>
      <div class="btn-box">
        <el-button type="primary" style="width: 130px;" @click="save">
          保存
        </el-button>
      </div>
      <div>
        <p class="title">
          项目标题
        </p>
        <input v-model="title" class="title-input" type="text" />
      </div>
      <div>
        <p class="title">
          封面图片
        </p>
        <p class="item-info">
          最多5张，请保持所有封面图片的宽高比例一致可效果最好。
        </p>
        <div class="dp-inline-block">
          <div
            v-for="(cover, index) in covers"
            :key="cover"
            class="cover"
            @click="delCover(index)"
          >
            <img :src="cover" class="cover-image" />
            <button class="clean cover-close">
              X
            </button>
          </div>
        </div>
        <div
          v-if="covers.length < 5"
          ref="uploadCover"
          class="cover cs-pointer"
        >
          <img
            ref="uploadCover"
            class="cover-image"
            src="https://pic.zizaihome.com/0f919be8-308e-11e8-b78b-00163e0c001e.png"
          />
        </div>
      </div>
      <div class="row">
        <p class="title">
          加持详情
        </p>
        <div id="ling-edit-detail-editor" />
      </div>
      <div class="">
        <p class="title">
          参与列表
        </p>
        <p>若当前项目有用户下单则会展示参与者列表，可控制参与者列表是否显示</p>
        <div class="pd-t-5">
          <el-radio v-model="type" label="1">
            显示
          </el-radio>
          <el-radio v-model="type" label="0">
            不显示
          </el-radio>
        </div>
      </div>
      <div class="">
        <p class="title">
          下单按钮
        </p>
        <p class="item-info">
          最多10个字，可控制项目的详情页面“下一步”按钮的文案。
        </p>
        <input v-model="text" class="title-input" type="text" />
      </div>
    </el-card>
  </div>
</template>

<script>
import './fetch';
// import seeFetch from 'see-fetch';

import { makeUploadImageOptions } from '../../configs/upload';
import '../../configs/ueditor';
import '../../../../pro-com/src/ueditor/ueditor.config';
import '../../../../pro-com/src/ueditor/ueditor.all';

import upload from '../../../../pro-com/src/upload';

import '../../com/ueditor-plugins/xiu-mi';
import '../../com/ueditor-plugins/insert-images';

let detailEditor;

export default {
  data() {
    return {
      isNew: !1,
      title: '',
      covers: [], // 上传的图片链接
      type: '0', // 选择是否有参与列表
      text: '恭请',
    };
  },
  created() {
    if (this.$route.params.name === 'undefined') this.isNew = !0;
    else this.title = this.$route.params.name;
  },
  mounted() {
    const { uploadCover: uploadCoverRef } = this.$refs;

    upload(
      makeUploadImageOptions({
        el: uploadCoverRef,
        done: url => {
          this.covers.push(url);
        },
      })
    );

    detailEditor = window.UE.getEditor('ling-edit-detail-editor');
    detailEditor.ready(() => {
      this.init();
    });
  },
  beforeDestroy() {
    detailEditor.destroy();

    detailEditor = null;
  },
  methods: {
    init() {},
    delCover(index) {
      this.covers.splice(index, 1);
    },
    save() {
      // const detail = detailEditor.getContent();
      // seeFetch('master/edit/save', {
      //   name: this.title,
      //   pic: this.covers.join(','),
      //   detail,
      //   isShowJoinList: this.type,
      //   payBtn: this.text,
      // }).then(res => {
      // });
    },
  },
};
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.container {
  width: 100%;
  padding: 40px 20px;
}
.container-title {
  font-size: 18px;
  font-weight: bold;
}
.arrow {
  margin: 0 6px;
}
.btn-box {
  display: flex;
  justify-content: flex-end;
  padding-right: 100px;
}
.title {
  margin-top: 24px;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 16px;
}
.title-input {
  width: 280px;
  height: 32px;
  padding-left: 10px;
  line-height: 32px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
}
.item-info {
  margin-bottom: 8px;
}
.row {
  width: 80%;
}
.cover {
  position: relative;
  display: inline-block;
  height: 100px;
  margin-right: 10px;
}

.cover-image {
  height: 100%;
}

.cover-close {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 18px;
  display: none;
}

.cover:hover .cover-close {
  display: block;
  cursor: pointer;
}
</style>
