<template>
  <div class="container">
    <el-card>
      <div>
        <span class="l-hg-32"> 搜索 </span>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-input
          v-model="search"
          placeholder="搜索标题或公众号"
          size="small"
          style="width: 250px"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="doSearch"
          /> </el-input
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <el-select
          v-model="type"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          @change="doSearch"
        >
          <el-option :value="0" label="全部" />
          <el-option :value="1" label="文章" />
          <el-option :value="2" label="视频" /> </el-select
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="l-hg-32"> 分组 </span>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-select
          v-model="filterGroup"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          @change="doSearch"
        >
          <el-option :value="0" label="全部" />
          <el-option
            v-for="group in groupList"
            :key="group.id"
            :value="group.id"
            :label="group.name"
          />
        </el-select>
      </div>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="id" label="id" />
          <el-table-column prop="title" label="标题" />
          <el-table-column label="封面">
            <template slot-scope="item">
              <img :src="item.row.cover" class="wd-100" />
            </template>
          </el-table-column>
          <el-table-column prop="wxAccount" label="微信公众号" />
          <el-table-column prop="shortContentText" label="内容摘要" />
          <el-table-column label="是否已添加到素材库">
            <template slot-scope="item">
              {{ item.row.addedToLibrary ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column prop="pullTime" label="拉取时间" />
          <el-table-column label="操作">
            <template slot-scope="item">
              <el-button
                v-if="!item.row.addedToLibrary"
                type="text"
                size="small"
                @click="addToLibrary(item)"
              >
                添加到素材库
              </el-button>
              <el-button type="text" size="small" @click="toDetail(item)">
                详情
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
    <Add />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import Add from './Add';
import { addProps } from './data';
import './fetch';

export default {
  name: 'App',
  components: {
    Add,
  },
  data() {
    return {
      search: '',
      type: 0,
      filterGroup: 0,
      loading: !0,
      currentPage: 1,
      totalCount: 0,
      list: [],
      groupList: [],
    };
  },
  created() {
    this.fetchList();
    this.fetchGroupList();
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('qu/article/list', {
        search: this.search,
        type: this.type,
        groupId: this.filterGroup,
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
    fetchGroupList() {
      seeFetch('qu/article/groupList').then(res => {
        if (!res.success) return;

        if (res.data && res.data.length) this.groupList = res.data;
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
    addToLibrary({ row: item }) {
      seeFetch('qu/article/add', {
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
          message: '添加成功',
        });

        this.fetchList();
      });
    },
    toDetail({ row: item }) {
      addProps.forEach(({ name }) => {
        this.$store.state.quArticle.add[name] = item[name];
      });

      this.$store.state.quArticle.add.dialogTitle = '详情';
      this.$store.state.quArticle.add.visible = !0;
      this.$store.state.quArticle.add.isUpdate = !0;
      this.$store.state.quArticle.add.updateId = item.id;
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
