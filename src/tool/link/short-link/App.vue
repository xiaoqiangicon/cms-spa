<template>
  <div class="container">
    <el-card>
      <div class="filter">
        <div class="filter-left">
          <el-input v-model="content" placeholder="支持搜索标题和链接"
            ><el-button slot="append" icon="el-icon-search" @click="refresh"
          /></el-input>
          <el-select
            v-model="type"
            placeholder="渠道类型"
            @change="refresh"
            style="margin-left: 20px;"
          >
            <el-option label="线下活动" :value="1" />
            <el-option label="短信群发" :value="2" />
            <el-option label="专题页" :value="3" />
          </el-select>
        </div>
        <div class="filter-right">
          <el-button type="primary" @click="modify">添加</el-button>
        </div>
      </div>
      <el-table v-loading="loading" :data="list" class="table">
        <el-table-column prop="title" label="短链标题" />
        <el-table-column prop="typeText" label="渠道类型" />
        <el-table-column prop="originUrl" label="原链接" />
        <el-table-column prop="url" label="微信短链" />
        <el-table-column prop="sms_url" label="短信短链" />
        <el-table-column label="二维码" :align="'center'">
          <template slot-scope="scope">
            <span class="cur-pointer" @click="showCode(scope.row)">查看</span>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" />
        <el-table-column label="修改记录" :align="'center'">
          <template slot-scope="scope">
            <span
              v-if="scope.row.editLog && scope.row.editLog.length"
              class="cur-pointer"
              @click="clickLogHistory(scope.row)"
              >查看</span
            >
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column label="生效时间" :align="'center'">
          <template slot-scope="scope">
            <span class="cur-pointer" @click="modify(scope.row)">编辑</span>
            <span class="del" @click="delUrl(scope.row)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        :current-page="pageNo"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        style="margin-top: 40px"
        @current-change="pageChange"
      />
    </el-card>
    <el-dialog title="修改记录" :visible.sync="modifyLogVisible" width="30%">
      <el-table :data="historyLog" class="table">
        <el-table-column prop="url" label="原链接" />
        <el-table-column prop="time" label="修改时间" />
        <el-table-column prop="editor" label="修改人" />
      </el-table>
    </el-dialog>
    <el-dialog
      :title="detail.id ? '编辑短链' : '添加短链'"
      :visible.sync="modifyDialogVisible"
      width="30%"
    >
      <div class="row">
        <span class="row-left">标题：</span>
        <el-input v-model="detail.title" :disabled="detail.id"></el-input>
      </div>
      <p class="row-tips">仅用于备份和内部管理，无其他含义。</p>
      <div class="row">
        <span class="row-left">渠道类型：</span>
        <el-select
          v-model="detail.type"
          placeholder="渠道类型"
          :disabled="detail.id"
        >
          <el-option label="线下活动" :value="1" />
          <el-option label="短信群发" :value="2" />
          <el-option label="专题页" :value="3" />
        </el-select>
      </div>
      <p class="row-tips">仅用于备份和内部管理，无其他含义</p>
      <div class="row">
        <span class="row-left">原链接：</span>
        <el-input v-model="detail.originUrl"></el-input>
      </div>
      <p class="row-tips">
        1.需要统计请在渠道统计给长链接增加参数<br />2.需要OpenInstall穿透在OpenInstall后台转换长链接<br />3.请使用时注意相关渠道的规则，防止短链被使用渠道封禁。<br />4.多次修改链接，可在修改记录中查看
      </p>
      <el-button type="primary" @click="save" class="save-btn">保存</el-button>
    </el-dialog>
    <el-dialog title="微信二维码" :visible.sync="qrCodeVisible" width="30%">
      <div class="qrcode" ref="qrCodeBox"></div>
    </el-dialog>
  </div>
</template>

<script>
import './fetch/index.js';
import seeFetch from 'see-fetch';
import QRCode from '../../../../../pro-com/src/libs-es5/qrcode';
import { Notification } from 'element-ui';

export default {
  name: 'App',
  data() {
    return {
      loading: false,
      content: '',
      type: '',
      total: 0,
      pageSize: 25,
      pageNo: 1,
      list: [],
      modifyLogVisible: false, // 修改记录
      historyLog: [],
      qrCodeVisible: false,
      modifyDialogVisible: false, // 修改
      detail: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      seeFetch('getShortUrlPage', {
        title: this.content,
        type: this.type,
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      }).then(res => {
        if (res.errorCode === 0) {
          this.list = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    delUrl(row) {
      this.$confirm(`确定要删除${row.title}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('delUrl', { id: row.id }).then(res => {
          if (res.errorCode === 0) {
            Notification({
              title: '提示',
              message: '删除成功',
            });
            this.getList();
          } else {
            Notification({
              title: '提示',
              message: '删除失败',
            });
          }
        });
      });
    },
    clickLogHistory(row) {
      this.historyLog = row.editLog;
      this.modifyLogVisible = true;
    },
    showCode(row) {
      this.qrCodeVisible = true;
      this.$nextTick(() => {
        const { qrCodeBox } = this.$refs;
        qrCodeBox.innerHTML = '';
        // eslint-disable-next-line no-new
        new QRCode(qrCodeBox, {
          text: row.url,
          width: 258,
          height: 258,
        });
      });
    },
    modify(row) {
      if (row.id) this.detail = { ...row };
      else this.detail = {};
      this.modifyDialogVisible = true;
    },
    save() {
      let url = '';
      let params = {};
      if (!this.detail.title || !this.detail.type || !this.detail.originUrl) {
        Notification({
          title: '提示',
          message: '请填写所有信息',
        });
        return;
      }
      if (this.detail.id) {
        url = 'editUrl';
        params.id = this.detail.id;
        params.url = this.detail.originUrl;
      } else {
        url = 'addUrl';
        params.title = this.detail.title;
        params.url = this.detail.originUrl;
        params.type = this.detail.type;
      }
      seeFetch(url, params).then(res => {
        if (res.errorCode === 0) {
          Notification({
            title: '提示',
            message: '保存成功',
          });
          this.getList();
          this.modifyDialogVisible = false;
        } else {
          Notification({
            title: '提示',
            message: '保存失败',
          });
        }
      });
    },
    refresh() {
      this.pageNo = 1;
      this.getList();
    },
    pageChange(page) {
      this.pageNo = page;
      this.getList();
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}

.filter {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.filter-left {
  display: flex;
}
.cur-pointer {
  color: #409eff;
  cursor: pointer;
}
.del {
  margin-left: 6px;
  color: #f60;
  cursor: pointer;
}

.qrcode img {
  margin: 0 auto;
}

.row {
  display: flex;
  align-items: center;
}
.row-left {
  flex-shrink: 0;
  margin-right: 5px;
  color: #333;
}
.row-tips {
  margin: 5px 0 20px 0;
  color: #999;
}

.save-btn {
  display: block;
  margin: 0 auto;
}
</style>
