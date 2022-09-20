<template>
  <div class="container">
    <el-card>
      <el-button type="primary" class="add" @click="add">新建</el-button>
      <el-table v-loading="loading" :data="list">
        <el-table-column
          width="100px"
          prop="id"
          label="佛事ID"
          :align="'center'"
        />
        <el-table-column prop="showTime" label="日期" :align="'center'" />
        <el-table-column
          prop="extraCoin"
          label="获得福币数"
          :align="'center'"
        />
        <el-table-column prop="picUrl" label="图片地址" :align="'center'" />
        <el-table-column label="图片" :align="'center'">
          <template slot-scope="scope">
            <img class="pic" :src="scope.row.picUrl" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="分享标题" :align="'center'" />
        <el-table-column prop="content" label="分享内容" :align="'center'" />
        <el-table-column label="操作" :align="'center'">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        :current-page="pageNumber"
        background
        layout="prev, pager, next"
        style="margin-top: 40px"
        :page-size="pageSize"
        @current-change="pageChange"
      />
    </el-card>
    <el-dialog :visible.sync="editVisible" :title="isNew ? '添加' : '编辑'">
      <div class="input-block">
        <span>发布日期</span>
        <el-date-picker
          v-model="form.showTime"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          size="small"
        />
      </div>
      <div class="input-block">
        <span>分享标题</span>
        <el-input v-model="form.title" class="input-txt" type="text"></el-input>
      </div>
      <div class="input-block">
        <span>分享内容</span>
        <el-input
          v-model="form.content"
          class="input-txt"
          type="text"
        ></el-input>
      </div>
      <div class="input-block">
        <span>额外获得福币数</span>
        <el-input
          type="number"
          v-model="form.extraCoin"
          class="input-txt"
        ></el-input>
      </div>
      <div class="input-block">
        <span>主图片</span>
        <Upload :multiple="!1" :images="form.picUrl" />
      </div>
      <div class="save-block">
        <el-button type="primary" class="save" @click="save" v-loading="saving">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch';
import Upload from '../../com/upload/Upload';

export default {
  name: 'App',
  data() {
    return {
      loading: !0,
      total: 0,
      pageNumber: 1,
      pageSize: 20,
      list: [],
      isNew: true,
      editVisible: false,
      form: {
        id: '',
        content: '',
        extraCoin: '',
        picUrl: [],
        showTime: '',
        title: '',
      },
      saving: false,
    };
  },
  components: {
    Upload,
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = !0;
      seeFetch('bookmark/index/list', {
        pageNumber: this.pageNumber - 1,
        pageSize: 20,
      }).then(res => {
        this.loading = !1;

        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.total = res.total;
        this.list = res.data;
      });
    },
    add() {
      this.editVisible = true;
      this.isNew = true;
      this.form = {
        id: '',
        content: '',
        extraCoin: '',
        picUrl: [],
        showTime: '',
        title: '',
      };
    },
    edit(row) {
      this.editVisible = true;
      this.isNew = false;
      this.form = { ...row };
      this.form.picUrl = this.form.picUrl ? [this.form.picUrl] : [];
    },
    del(row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          seeFetch('bookmark/index/del', {
            signId: row.id,
          }).then(res => {
            if (!res.success) return;

            this.fetchList();
          });
        })
        .catch(() => {});
    },
    save() {
      if (this.saving) return;
      let { content, extraCoin, picUrl, showTime, title, id } = this.form;
      if (!content || !picUrl.length || !title) {
        Notification({
          title: '提示',
          message: `请填写必要信息`,
        });
        return;
      }
      let url = id ? 'bookmark/index/update' : 'bookmark/index/add';
      this.saving = true;
      seeFetch(url, {
        signId: id ? id : '',
        content,
        extraCoin,
        picUrl: picUrl[0],
        showTime: showTime,
        title,
      }).then(res => {
        if (res.success) {
          Notification({
            title: '提示',
            message: `保存成功`,
          });
        }
        this.saving = false;
        this.editVisible = false;
        this.fetchList();
      });
    },
    pageChange(page) {
      this.pageNumber = page;
      this.fetchList();
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
.add {
  float: right;
  margin-bottom: 20px;
}
.pic {
  max-width: 100%;
  max-height: 100%;
}

.input-block {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  span {
    display: inline-block;
    min-width: 100px;
    flex-shrink: 0;
    margin-right: 20px;
  }
}

.save {
  display: block;
  margin: 0 auto;
}
</style>
