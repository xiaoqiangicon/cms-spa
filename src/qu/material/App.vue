<template>
  <div class="container">
    <el-card>
      <div>
        <el-select
          v-model="type"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          @change="doSearch"
        >
          <el-option :value="1" label="草稿" />
          <el-option :value="2" label="已发布" />
          <el-option :value="3" label="回收站" />
          <el-option :value="0" label="全部" /> </el-select
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="l-hg-32"> 搜索 </span>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-input
          v-model="search"
          placeholder="请输入关键字搜索"
          size="small"
          style="width: 250px"
        >
          <el-button slot="append" icon="el-icon-search" @click="doSearch" />
        </el-input>
      </div>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="title" label="标题" />
          <el-table-column label="封面">
            <template slot-scope="item">
              <img :src="item.row.cover" class="wd-100" />
            </template>
          </el-table-column>
          <el-table-column prop="shortContentText" label="内容摘要" />
          <el-table-column prop="publishAccountText" label="帐号" />
          <el-table-column prop="statusText" label="状态" />
          <el-table-column prop="publishAuthor" label="发布作者" />
          <el-table-column label="是否原创">
            <template slot-scope="item">
              {{ item.row.original ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="创建时间" />
          <el-table-column label="操作">
            <template slot-scope="item">
              <el-button
                v-if="item.row.status !== 1 || item.row.canEdit"
                type="text"
                size="small"
                @click="toEdit(item)"
              >
                编辑
              </el-button>
              <el-button
                v-if="item.row.status === -1"
                type="text"
                size="small"
                @click="toRestore(item)"
              >
                恢复
              </el-button>
              <el-button type="text" size="small" @click="toDelete(item)">
                删除
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
    <Add :ok="fetchList" />
    <Action />
    <SelectImage />
    <UploadImage />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import { getDate } from '@zzh/n-util';
import { addProps } from './data';
import Add from './Add';
import Action from './Action';
import SelectImage from './SelectImage';
import UploadImage from './UploadImage';
import { getJsonContent } from './parse';
import './fetch';

export default {
  name: 'App',
  components: {
    Add,
    Action,
    SelectImage,
    UploadImage,
  },
  data() {
    return {
      search: '',
      type: 1,
      loading: !0,
      currentPage: 1,
      totalCount: 0,
      list: [],
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('qu/material/list', {
        search: this.search,
        type: this.type,
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
      this.fetchList();
    },
    doSearch() {
      this.currentPage = 1;
      this.fetchList();
    },
    toAdd() {
      addProps.forEach(({ name, default: defaultValue }) => {
        this.$store.state.quMaterial.add[name] =
          typeof defaultValue === 'function' ? defaultValue() : defaultValue;
      });

      this.$store.state.quMaterial.add.dialogTitle = '添加';
      this.$store.state.quMaterial.add.isUpdate = !1;
      this.$store.state.quMaterial.add.updateId = 0;
      this.$store.state.quMaterial.add.visible = !0;
    },
    toEdit({ row: item }) {
      addProps.forEach(({ name }) => {
        this.$store.state.quMaterial.add[name] = item[name];
      });

      this.$store.state.quMaterial.add.dialogTitle = '编辑';
      this.$store.state.quMaterial.add.visible = !0;
      this.$store.state.quMaterial.add.isUpdate = !0;
      this.$store.state.quMaterial.add.updateId = item.id;
      this.$store.state.quMaterial.add.jsonContent = getJsonContent(
        item.content,
        item.jsonContent
      );
      this.$store.state.quMaterial.add.region = item.region || '';
      this.$store.state.quMaterial.add.publishAccount =
        item.publishAccount || 1;
      this.$store.state.quMaterial.add.covers = item.covers
        ? item.covers.split(',')
        : [];
      const date = getDate(new Date(new Date().getTime() + 3 * 60 * 60 * 1000));
      this.$store.state.quMaterial.add.publishTime =
        item.publishTime || date.dateTime;
      this.$store.state.quMaterial.add.original = item.original || 0;
    },
    toDelete(item) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('qu/material/delete', {
          id: item.id,
        }).then(res => {
          if (!res.success) {
            Notification({
              title: '提示',
              message: res.message,
            });
            return;
          }

          Notification({
            title: '提示',
            message: '删除成功',
          });

          this.fetchList();
        });
      });
    },
    toRestore({ row: item }) {
      this.$confirm('确定恢复吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('qu/material/restore', {
          id: item.id,
        }).then(res => {
          if (!res.success) {
            Notification({
              title: '提示',
              message: res.message,
            });
            return;
          }

          Notification({
            title: '提示',
            message: '恢复成功',
          });

          this.fetchList();
        });
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}

.body {
  margin-top: 20px;
}
</style>
