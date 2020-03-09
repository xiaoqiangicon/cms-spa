<template>
  <div class="container">
    <el-card v-loading="loading">
      <div class="body">
        <div class="row">
          <div class="row-name">
            礼品名称：
          </div>
          <el-input v-model="name" size="small" />
        </div>
        <div class="row">
          <div class="row-name">
            礼品图片：
          </div>
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
          <div ref="uploadCover" class="cover cs-pointer">
            <img
              class="cover-image"
              src="https://pic.zizaihome.com/0f919be8-308e-11e8-b78b-00163e0c001e.png"
            />
          </div>
          <p class="mg-t-20">
            标准尺寸：750X582
          </p>
        </div>
        <div class="row">
          <div class="row-name">
            礼品详情：
          </div>
          <div id="ling-edit-detail-editor" />
        </div>
        <div class="row">
          <div class="row-name">
            兑换说明：
          </div>
          <div id="ling-edit-desc-editor" />
        </div>
        <div class="row">
          <div class="row-name">
            礼品类型：
          </div>
          <div class="pd-t-5">
            <el-radio v-model="type" label="0">
              无限制
            </el-radio>
            <el-radio v-model="type" label="1">
              邀请专享
            </el-radio>
            <el-radio v-model="type" label="2">
              签到专享
            </el-radio>
            <el-radio v-model="type" label="3">
              新人专享
            </el-radio>
          </div>
        </div>
        <div class="row">
          <div class="row-name">
            礼品类型：
          </div>
          <div class="pd-t-5">
            <el-radio v-model="expressType" label="1">
              快递类
            </el-radio>
            <el-radio v-model="expressType" label="0">
              非快递类
            </el-radio>
            <el-radio v-model="expressType" label="2">
              话费类
            </el-radio>
          </div>
        </div>
        <div v-show="expressType === '2'" class="row">
          <div class="row-name">
            话费金额：
          </div>
          <el-select
            v-model="phoneAmount"
            placeholder="请选择"
            size="small"
            style="width: 200px;"
          >
            <el-option
              v-for="phoneItem in phoneAmounts"
              :key="phoneItem"
              :label="phoneItem"
              :value="phoneItem"
            />
          </el-select>
          &nbsp;&nbsp;
          <span class="l-hg-32">
            元
          </span>
        </div>
        <div class="row">
          <div class="row-name">
            兑换价格：
          </div>
          <el-input
            v-model="exchangePrice"
            size="small"
            style="width: 200px;"
          />
          &nbsp;&nbsp;
          <span class="l-hg-32">
            好运气
          </span>
        </div>
        <div class="row">
          <div class="row-name">
            库存：
          </div>
          <el-input v-model="remainCount" size="small" style="width: 200px;" />
          &nbsp;&nbsp;
          <span class="l-hg-32">
            （ -1 为无限库存）
          </span>
        </div>
        <div class="row">
          <div class="row-name">
            优先级：
          </div>
          <el-input v-model="priority" size="small" style="width: 200px;" />
          &nbsp;&nbsp;
          <span class="l-hg-32">
            （越大排序越前）
          </span>
        </div>
        <div class="row">
          <div class="row-name">
            兑奖时提示：
          </div>
          <el-input v-model="exchangeTip" type="textarea" rows="3" />
        </div>
        <div class="mg-t-30 t-a-center">
          <el-button type="primary" @click="save">
            保存
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification, Message } from 'element-ui';
import upload from '../../../pro-com/src/upload';
import StoreImage from '../../../pro-com/src/store-image';
import * as handling from '../../../pro-com/src/handling';

import { makeUploadImageOptions } from '../../configs/upload';
import { makeOptions as makeStoreImageOptions } from '../../configs/store-image';
import '../../configs/ueditor';
import '../../../pro-com/src/ueditor/ueditor.config';
import '../../../pro-com/src/ueditor/ueditor.all';

import '../../com/ueditor-plugins/xiu-mi';
import '../../com/ueditor-plugins/insert-images';
import './fetch';

let detailEditor;
let descEditor;

export default {
  name: 'App',
  data() {
    return {
      loading: !0,
      name: '',
      expressType: '1',
      type: '0',
      exchangePrice: '',
      remainCount: '',
      priority: '',
      exchangeTip: '',
      covers: [],
      phoneAmounts: [1, 2, 3, 5, 6, 10],
      phoneAmount: 1,
    };
  },
  mounted() {
    // 由于在 beforeDestroy 使用 this.$route 值会变成 ling/index，需要在这里保存一下
    this.path = this.$route.path;

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
      descEditor = window.UE.getEditor('ling-edit-desc-editor');
      descEditor.ready(() => {
        this.init();
      });
    });
  },
  beforeDestroy() {
    detailEditor.destroy();
    descEditor.destroy();

    detailEditor = null;
    descEditor = null;

    // this.$route 在这里不准确
    this.$store.commit('DEL_VISITED_VIEW', { path: this.path });
  },
  methods: {
    init() {
      const id = parseInt(this.$route.params.id, 10);

      if (!id) {
        this.loading = !1;
        return;
      }

      seeFetch('ling/edit/info', { id }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.name = res.data.name;
        this.expressType = `${res.data.expressType}`;
        this.type = `${res.data.type || 0}`;
        this.exchangePrice = res.data.exchangePrice;
        this.remainCount = res.data.remainCount;
        this.priority = res.data.priority;
        this.exchangeTip = res.data.exchangeTip;
        this.covers = res.data.covers;
        this.phoneAmount = res.data.phoneAmount;

        detailEditor.setContent(res.data.detail || '');
        descEditor.setContent(res.data.desc || '');

        this.loading = !1;
      });
    },
    delCover(index) {
      this.covers.splice(index, 1);
    },
    save() {
      const id = parseInt(this.$route.params.id, 10);

      let error;

      const detail = detailEditor.getContent();
      const desc = descEditor.getContent();
      const expressType = parseInt(this.expressType, 10);
      const type = parseInt(this.type, 10) || 0;
      const exchangePrice = parseFloat(this.exchangePrice);
      const remainCount = parseInt(this.remainCount, 10);
      const priority = parseInt(this.priority, 10) || 0;
      const phoneAmount = parseInt(this.phoneAmount, 10);

      if (!this.name) error = '礼品名称不能为空';
      else if (!this.covers.length) error = '礼品图片不能为空';
      else if (!detail) error = '礼品详情不能为空';
      else if (!desc) error = '兑换说明不能为空';
      else if (!exchangePrice) error = '兑换价格不能为空，且需是数字';
      else if (!remainCount) error = '库存不能为空，且需是数字';
      else if (!this.exchangeTip) error = '兑奖时提示不能为空';
      else if (expressType === 2 && !phoneAmount)
        error = '话费金额不能为空，且需是数字';

      if (error) {
        Notification({
          title: '提示',
          message: error,
        });
        return;
      }

      handling.show();

      // eslint-disable-next-line no-new
      new StoreImage(
        makeStoreImageOptions({
          content: detail,
          done: newDetail => {
            // eslint-disable-next-line no-new
            new StoreImage(
              makeStoreImageOptions({
                content: desc,
                done: newDesc => {
                  seeFetch('ling/edit/save', {
                    id,
                    name: this.name,
                    covers: this.covers.join(','),
                    detail: newDetail,
                    desc: newDesc,
                    expressType,
                    type,
                    exchangePrice,
                    remainCount,
                    priority,
                    exchangeTip: this.exchangeTip,
                    phoneAmount,
                  }).then(res => {
                    if (!res.success) {
                      Notification({
                        title: '提示',
                        message: res.message,
                      });
                      return;
                    }

                    Message.success({
                      message: '保存成功',
                    });

                    handling.hide();

                    this.$router.back();
                  });
                },
                progress: (uploaded, total) => {
                  handling.setText(`上传 ${uploaded}/${total}`);
                },
              })
            );
          },
          progress: (uploaded, total) => {
            handling.setText(`上传 ${uploaded}/${total}`);
          },
        })
      );
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}

.body {
  padding: 20px;
}

.row {
  position: relative;
  margin-top: 20px;
  padding-left: 100px;
  min-height: 32px;

  &:first-child {
    margin-top: 0;
  }
}

.row-name {
  position: absolute;
  top: 0;
  left: 0;
  line-height: 32px;
  font-size: 16px;
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
}
</style>
