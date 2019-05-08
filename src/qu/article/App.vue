<template>
  <div class="container">
    <el-card>
      <h1>寺院资讯</h1>
      <div class="f-s-18">
        各平台寺院最新资讯信息
      </div>
      <div class="clearfix mg-t-20">
        <div class="mg-r-10 fl-left">
          <el-select
            v-model="status"
            placeholder="请选择"
            size="small"
            style="width: 100px;"
            @change="refresh"
          >
            <el-option value="-1" label="全部" />
            <el-option value="0" label="未读" />
            <el-option value="1" label="已读" />
            <el-option value="2" label="视频" />
          </el-select>
        </div>
        <div class="fl-left" style="width: 250px;">
          <el-input v-model="search" placeholder="输入关键字搜索" size="small">
            <el-button slot="append" icon="el-icon-search" @click="refresh" />
          </el-input>
        </div>
        <div class="fl-right mg-l-10">
          <el-button
            class="fl-right"
            size="small"
            @click="addDialogVisible = !0"
          >
            添加订阅
          </el-button>
        </div>
      </div>
      <div class="list">
        <div
          v-for="item in list"
          :key="item.id"
          class="item"
          @click="onClickItem(item.id)"
        >
          <div class="img-container">
            <img :src="item.cover" alt="" />
          </div>
          <div class="tag-add" :class="{ active: item.isSource }" />
          <div v-show="item.isVideo" class="tag-video" />
          <div class="title" :class="{ active: !item.isRead }">
            {{ item.title }}
          </div>
          <div class="tip">
            {{ item.templeName }} / {{ item.timeStr }}
            <span v-if="item.isSource" class="special">已加入素材库</span>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
        </div>
      </div>
      <el-pagination
        style="text-align: right;"
        layout="total, prev, pager, next, sizes, jumper"
        :page-size="pagination.pageSize"
        :current-page="pagination.page"
        :total="pagination.totalCount"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
      <el-dialog
        title="添加订阅源"
        :visible.sync="addDialogVisible"
        width="30%"
        :close-on-click-modal="true"
        :close-on-press-escape="!0"
      >
        <div class="mg-b-40" style="color: #9A9A9A;">
          填入微信公众号信息，自动获取文章更新
        </div>
        <el-form
          :model="form"
          :rules="rules"
          :label-position="'left'"
          label-width="80px"
        >
          <el-form-item label="名称" prop="name">
            <el-input
              v-model="form.name"
              placeholder="公众号名称"
              style="width: 200px;"
            />
          </el-form-item>
          <el-form-item label="微信号" prop="wxNum">
            <el-input
              v-model="form.wxNum"
              placeholder="微信号"
              style="width: 200px;"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = !1">
            取 消
          </el-button>
          <el-button type="primary" @click="onClickAdd">
            创 建
          </el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch';

export default {
  name: 'App',
  data() {
    return {
      loading: !0,
      search: '',
      status: '-1',

      list: [],

      pagination: {
        page: 1,
        pageSize: 20,
        totalCount: 0,
      },

      form: {
        name: '',
        wxNum: '',
      },

      rules: {
        name: {},
        wxNum: {
          required: !0,
          trigger: 'blur',
          message: '请输入微信号',
        },
      },

      addDialogVisible: !1,
    };
  },
  created() {
    this.requestList();
  },
  methods: {
    refresh() {
      this.pagination.page = 0;
      this.requestList();
    },
    requestList() {
      const { status, search } = this;
      const { page, pageSize } = this.pagination;
      seeFetch('qu/article/list', { page, pageSize, status, search }).then(
        res => {
          if (!res.success) {
            Notification({
              title: '提示',
              message: res.message,
            });
            return;
          }
          this.loading = !1;
          this.pagination.totalCount = res.data.totalCount;
          this.list = res.data.list;
        }
      );
    },
    onSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.requestList();
    },
    onCurrentChange(page) {
      this.pagination.page = page;
      this.requestList();
    },
    onClickAdd() {
      const { name, wxNum } = this.form;

      if (!wxNum) {
        Notification({
          type: 'error',
          title: '提示',
          message: '请输入微信号',
        });
        return;
      }

      seeFetch('qu/article/add', { name, wxNum }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        Notification({
          type: 'success',
          title: '提示',
          message: '添加成功',
        });

        this.addDialogVisible = !1;

        this.refresh();
      });
    },
    onClickItem(id) {
      console.log(id);
      this.$router.push(`/qu/article_detail/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}

.list {
  margin-top: 20px;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  .item {
    flex: 0 0 22%;
    margin-right: 4%;
    margin-bottom: 20px;
    box-shadow: 2px 2px 2px #ddd;
    color: #9a9a9a;
    position: relative;
    .tag-video {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 38px;
      height: 14px;
      background: url('https://pic.zizaihome.com/96e6aebc-7160-11e9-a83a-00163e0c001e.png');
      background-size: 100% 100%;
    }
    .tag-add {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 23px;
      height: 16px;
      background: url('https://pic.zizaihome.com/9592f19c-7160-11e9-a8ad-00163e0c001e.png');
      background-size: 100% 100%;
      &.active {
        background: url('https://pic.zizaihome.com/93c017dc-7160-11e9-b20a-00163e0c001e.png');
        background-size: 100% 100%;
        filter: grayscale(100%);
      }
    }
    &:nth-child(4n) {
      margin-right: 0;
    }
    &:hover {
      cursor: pointer;
      // transform: translate(-2px, -2px);
    }
    .img-container {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 70%;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: 20px;
      font-weight: bold;
      padding: 5px 10px;
      &.active {
        color: #333;
      }
    }
    .tip {
      padding: 10px;
      .special {
        color: #67c23a;
      }
    }
    .content {
      padding: 10px;
      word-break: break-all;
    }
  }
}
</style>
