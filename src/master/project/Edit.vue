<template>
  <!-- <div class="edit-content">
      <el-card>
        <div slot="header" class="container-title">
          <div>
            <span>加持项目</span>
            <span class="arrow">></span>
            <span>{{ name ? '编辑项目' : '新建项目' }}</span>
          </div>
          <div class="close" @click="close">
            ×
          </div>
        </div>
        <div class="el-card-body">
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
            <div id="detail-editor" />
          </div>
          <div class="">
            <p class="title">
              参与列表
            </p>
            <p>
              若当前项目有用户下单则会展示参与者列表，可控制参与者列表是否显示
            </p>
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
        </div>
      </el-card>
    </div> -->
  <el-dialog
    :title="name ? '编辑项目' : '新建项目'"
    :visible.sync="editVisible"
    @click="close"
  >
    <div class="el-card-body">
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
        <div id="detail-editor" />
      </div>
      <div class="">
        <p class="title">
          参与列表
        </p>
        <p>
          若当前项目有用户下单则会展示参与者列表，可控制参与者列表是否显示
        </p>
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
    </div>
  </el-dialog>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';

import { makeUploadImageOptions } from '../../configs/upload';
import { makeOptions as makeStoreImageOptions } from '../../configs/store-image';
import '../../configs/ueditor';
import '../../../pro-com/src/ueditor/ueditor.config';
import '../../../pro-com/src/ueditor/ueditor.all';

import upload from '../../../pro-com/src/upload';
import StoreImage from '../../../pro-com/src/store-image';

import '../../com/ueditor-plugins/xiu-mi';
import '../../com/ueditor-plugins/insert-images';

let detailEditor;

export default {
  props: {
    id: { default: 0 },
    name: { default: '' },
    pic: { default: '' },
    payBtn: { default: '' },
    isShowJoinList: { default: 1 },
    detail: { default: '' },
  },
  data() {
    return {
      submitId: 0, // 项目id
      title: '', // 项目名称
      covers: [], // 上传的图片链接
      type: '0', // 选择是否有参与列表
      text: '', // 支付提示
      content: '', // ueditor内容
    };
  },
  computed: {
    editVisible: {
      get() {
        return this.$store.state.masterProject.editVisible;
      },
      set(newVal) {
        this.$store.state.masterProject.editVisible = newVal;
      },
    },
  },
  watch: {
    editVisible() {
      if (this.editVisible) {
        // 绑定编辑器元素
        this.$nextTick(() => {
          detailEditor = window.UE.getEditor('detail-editor');

          detailEditor.ready(() => {
            if (this.detail) {
              detailEditor.setContent(this.detail);
            }
          });

          // 绑定上传图片元素
          const { uploadCover: uploadCoverRef } = this.$refs;
          upload(
            makeUploadImageOptions({
              el: uploadCoverRef,
              done: url => {
                this.covers.push(url);
              },
            })
          );
        });
      } else {
        UE.delEditor('detail-editor');
        detailEditor = null;
      }
    },
    id() {
      this.submitId = this.id;
    },
    name() {
      this.title = this.name;
      this.isNew = !1;
    },
    payBtn() {
      this.text = this.payBtn;
    },
    isShowJoinList() {
      this.type = `${this.isShowJoinList}`;
    },
    pic() {
      this.covers = this.pic.split(',');
    },
    detail() {
      const content = this.detail;
    },
  },
  beforeUpdate() {
    if (!this.name) this.isNew = !0;
  },
  beforeDestroy() {
    if (detailEditor) {
      UE.delEditor('detail-editor');
      detailEditor = null;
    }
  },
  methods: {
    delCover(index) {
      this.covers.splice(index, 1);
    },
    save() {
      const detail = detailEditor.getContent();
      console.log(this.name);
      if (!this.name) this.submitId = 0;

      seeFetch('master/edit/save', {
        id: this.submitId,
        name: this.title,
        pic: this.covers.join(','),
        detail,
        isShowJoinList: this.type,
        payBtn: this.text,
      }).then(res => {
        if (res.success) {
          window.location.reload();
        }
      });
    },
    close(e) {
      if (e.target == e.currentTarget)
        this.$store.state.masterProject.editVisible = !1;
    },
  },
};
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.edit-container {
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.edit-content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
}
.container-title {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
}
.close {
  cursor: pointer;
}
.arrow {
  margin: 0 6px;
}
.btn-box {
  display: flex;
  justify-content: flex-end;
  padding-right: 60px;
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
  width: 90%;
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