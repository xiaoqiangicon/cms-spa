<template>
  <div class="container">
    <el-card>
      <el-form
        ref="messageForm"
        :model="messageForm"
        :rules="messageRules"
        label-width="100px"
        class="message-form"
      >
        <el-form-item label="通知寺院" prop="templeIds">
          <el-select
            v-model="messageForm.templeIds"
            v-loading="allTempleLoading"
            multiple
            filterable
            collapse-tags
            style="width: 50%;"
            placeholder="请选择"
          >
            <el-option
              v-for="item in allTempleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="messageForm.title" type="input" />
        </el-form-item>
        <el-form-item label="通知内容" prop="content">
          <el-input
            v-model="messageForm.content"
            type="textarea"
            :autosize="{ minRows: 6 }"
          />
        </el-form-item>
        <el-form-item label="链接" prop="url">
          <el-input v-model="messageForm.url" type="input" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitMessage">
            推送通知
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 20px;">
      <h2>通知历史</h2>
      <el-table
        v-loading="historyLoading"
        :data="historyList"
        style="width: 100%"
      >
        <el-table-column prop="templeName" label="寺院" min-width="100" />
        <el-table-column prop="title" label="标题" min-width="120" />
        <el-table-column prop="content" label="通知内容" min-width="200" />
        <el-table-column label="链接" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.url || '无链接' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="时间" min-width="90" />
      </el-table>
      <el-pagination
        v-show="historyListTotal > 0"
        :total="historyListTotal"
        :current-page="listParams.pageNumber"
        :page-size="listParams.pageSize"
        background
        layout="prev, pager, next"
        style="margin-top: 30px; text-align: center;"
        @current-change="getHistoryList"
      />
    </el-card>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification, Message } from 'element-ui';
import './fetch';

export default {
  name: 'App',
  data() {
    return {
      historyLoading: true,
      historyList: [],
      historyListTotal: 0,
      listParams: {
        pageNumber: 1,
        pageSize: 20,
      },
      allTempleLoading: true,
      allTempleList: [],
      messageForm: {
        templeIds: [],
        title: '',
        content: '',
        url: '',
      },
      messageRules: {
        templeIds: [
          {
            type: 'array',
            required: true,
            message: '请选择通知的寺院',
            trigger: 'change',
          },
        ],
        title: [{ required: true, message: '请输入通知标题', trigger: 'blur' }],
        content: [
          { required: true, message: '请输入通知内容', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.getTempleList();
    this.getHistoryList();
  },
  methods: {
    // 获取寺院推送信息列表
    getHistoryList(page) {
      const that = this;
      that.historyLoading = true;
      if (page) that.listParams.pageNumber = page;
      seeFetch('getTempleMessage', that.listParams).then(res => {
        that.historyLoading = false;
        if (res.errorCode === 0 && res.data && res.data.data) {
          that.historyList = res.data.data;
          that.historyListTotal = res.data.total;
        } else {
          Notification({
            title: '提示',
            message: res.message,
          });
        }
      });
    },
    // 获取寺院列表
    getTempleList() {
      this.allTempleLoading = true;
      seeFetch('getTempleList', { isTest: 1, verify: -1 }).then(res => {
        this.allTempleLoading = false;
        if (res.errorCode !== 0) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }
        /* eslint no-param-reassign: "error" */
        this.allTempleList = res.data.map(item => {
          item.name = `${item.id} - ${item.name}`;
          return item;
        });
        this.allTempleList.unshift({
          id: 0,
          name: '全部',
        });
      });
    },
    // 推送寺院消息
    submitMessage() {
      const that = this;
      that.$refs.messageForm.validate(valid => {
        if (!valid) {
          Message({
            type: 'warning',
            message: '请填写推送通知相关信息',
          });
        } else {
          let templeIds = '';
          if (that.messageForm.templeIds.indexOf(0) !== -1) {
            templeIds = '[0]';
          } else {
            templeIds = JSON.stringify(that.messageForm.templeIds);
          }
          seeFetch('pushTempleMessage', {
            templeIds,
            title: that.messageForm.title,
            content: that.messageForm.content,
            url: that.messageForm.url,
          }).then(res => {
            if (res.errorCode === 0) {
              that.$refs.messageForm.resetFields();
              Notification({
                type: 'success',
                title: '提示',
                message: '更新成功',
              });
              setTimeout(() => {
                that.listParams.pageNumber = 1;
                that.getHistoryList();
              });
            } else {
              Notification({
                title: '提示',
                message: res.message,
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 30px 20px;
  .message-form {
    margin-top: 20px;
  }
}
</style>
