<template>
  <div class="container">
    <el-card>
      <div>
        <span class="l-hg-32"> 兑换条件 </span>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-select
          v-model="exchange"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          @change="refresh"
        >
          <el-option value="-1" label="全部" />
          <el-option value="0" label="无限制" />
          <el-option value="1" label="邀请专享" />
          <el-option value="2" label="签到专享" />
          <el-option value="3" label="新人专享" />
        </el-select>
        <div class="fl-right" style="width: 250px;">
          <el-input v-model="search" placeholder="请输入搜索内容" size="small">
            <el-button slot="append" icon="el-icon-search" @click="refresh" />
          </el-input>
        </div>
      </div>
      <div class="body">
        <el-tabs v-model="tab" @tab-click="refresh">
          <el-tab-pane label="未处理" name="0" />
          <el-tab-pane label="已处理" name="1" />
        </el-tabs>
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="cover" label="礼品图片">
            <template slot-scope="item">
              <img :src="item.row.cover" style="width: 100px;" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="nickname" label="兑换人" />
          <el-table-column prop="exchangeTime" label="兑换时间" />
          <el-table-column prop="name" label="联系人" />
          <el-table-column prop="phone" label="联系电话" />
          <el-table-column prop="address" label="联系地址" />
          <el-table-column prop="expressCompany" label="快递公司" />
          <el-table-column prop="expressOrder" label="快递单号" />
          <el-table-column v-if="tab === '0'" label="操作">
            <template slot-scope="item">
              <el-button
                v-show="item.row.expressType !== 2"
                type="text"
                size="small"
                @click="toHandle(item)"
              >
                处理
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="totalCount"
          :current-page="currentPage"
          background
          layout="prev, pager, next"
          style="margin-top: 40px"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <el-dialog :visible.sync="handleDialogVisible" title="处理订单" width="50%">
      <div class="row">
        <div class="row-name">
          兑换人：
        </div>
        {{ handleNickname }}
      </div>
      <div class="row">
        <div class="row-name">
          兑换礼品：
        </div>
        {{ handleGiftName }}
      </div>
      <div class="row">
        <div class="row-name">
          兑换时间：
        </div>
        {{ handleExchangeTime }}
      </div>
      <div class="row">
        <div class="row-name">
          礼品类型：
        </div>
        {{ handleGiftTypeText }}
      </div>
      <div class="row">
        <div class="row-name">
          联系人：
        </div>
        {{ handleName }}
      </div>
      <div class="row">
        <div class="row-name">
          联系电话：
        </div>
        {{ handlePhone }}
      </div>
      <div class="row">
        <div class="row-name">
          联系地址：
        </div>
        {{ handleAddress }}
      </div>
      <div v-show="handleShowExpressCompany" class="row">
        <div class="row-name">
          快递公司：
        </div>
        <el-input v-model="handleExpressCompany" size="small" />
      </div>
      <div v-show="handleShowExpressNumber" class="row">
        <div class="row-name">
          快递单号：
        </div>
        <el-input v-model="handleExpressNumber" size="small" />
      </div>
      <div class="row">
        <div class="row-name">
          礼品图片：
        </div>
        <div class="dp-inline-block">
          <div
            v-for="(image, index) in handleFeedImages"
            :key="image"
            class="cover"
            @click="delCover(index)"
          >
            <img :src="image" class="cover-image" />
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
      </div>
      <div class="row">
        <div class="row-name">
          备注信息：
        </div>
        <el-input v-model="handleMemo" type="textarea" rows="3" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="handleItem">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification, Message } from 'element-ui';

import { makeUploadImageOptions } from '../../configs/upload';

import upload from '../../../../pro-com/src/upload';

import './fetch';

let initUpload = !1;
let editItem;

export default {
  name: 'App',
  data() {
    return {
      exchange: '',
      search: '',
      tab: '0',
      loading: !0,
      currentPage: 1,
      totalCount: 0,
      list: [],
      handleDialogVisible: !1,
      handleNickname: '',
      handleGiftName: '',
      handleExchangeTime: '',
      handleGiftType: 0,
      handleGiftTypeText: '',
      handleName: '',
      handlePhone: '',
      handleAddress: '',
      handleShowExpressCompany: !0,
      handleExpressCompany: '',
      handleShowExpressNumber: !0,
      handleExpressNumber: '',
      handleFeedImages: [],
      handleMemo: '',
    };
  },
  created() {
    this.requestList();
  },
  methods: {
    requestList() {
      this.loading = !0;

      const exchange = parseInt(this.exchange, 10);

      seeFetch('ling/exchange/list', {
        exchange: Number.isNaN(exchange) ? -1 : exchange,
        search: this.search,
        handled: parseInt(this.tab, 10),
        page: this.currentPage,
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.loading = !1;
        this.totalCount = res.totalCount;
        this.list = res.data;

        window.scrollTo(0, 0);
      });
    },
    pageChange(page) {
      this.currentPage = page;
      this.requestList();
    },
    refresh() {
      this.currentPage = 1;
      this.requestList();
    },
    toHandle({ row: item }) {
      this.handleNickname = item.nickname;
      this.handleGiftName = item.title;
      this.handleExchangeTime = item.exchangeTime;
      this.handleName = item.name;
      this.handlePhone = item.phone;
      this.handleAddress = item.address;

      this.handleGiftType = item.expressType;
      if (item.expressType === 1) {
        this.handleGiftTypeText = '快递类';
        this.handleShowExpressCompany = !0;
        this.handleShowExpressNumber = !0;
      } else {
        this.handleGiftTypeText = '非快递类';
        this.handleShowExpressCompany = !1;
        this.handleShowExpressNumber = !1;
      }

      this.handleExpressCompany = '';
      this.handleExpressNumber = '';
      this.handleFeedImages = [];
      this.handleMemo = '';
      this.handleDialogVisible = !0;

      editItem = item;

      setTimeout(() => {
        if (!initUpload) {
          initUpload = !0;

          const { uploadCover: uploadCoverRef } = this.$refs;

          upload(
            makeUploadImageOptions({
              el: uploadCoverRef,
              done: url => {
                this.handleFeedImages.push(url);
              },
            })
          );
        }
      }, 0);
    },
    delCover(index) {
      this.handleFeedImages.splice(index, 1);
    },
    handleItem() {
      let error;

      if (!this.handleExpressCompany && this.handleGiftType === 1)
        error = '快递公司不能为空';
      else if (!this.handleExpressNumber && this.handleGiftType === 1)
        error = '快递单号不能为空';
      else if (!this.handleFeedImages.length) error = '上传照片不能为空';

      if (error) {
        Notification({
          title: '提示',
          message: error,
        });
        return;
      }

      seeFetch('ling/exchange/handle', {
        id: editItem.id,
        expressCompany: this.handleExpressCompany,
        expressNumber: this.handleExpressNumber,
        feedImages: this.handleFeedImages.join(','),
        memo: this.handleMemo,
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

        this.handleDialogVisible = !1;
        this.requestList();
      });
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
  margin-top: 20px;
}

.row {
  position: relative;
  margin-top: 20px;
  padding-left: 120px;
  line-height: 32px;
  font-size: 16px;
  min-height: 32px;
  padding-right: 20px;

  &:first-child {
    margin-top: 0;
  }
}

.row-name {
  position: absolute;
  top: 0;
  left: 20px;
  font-weight: bold;
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
