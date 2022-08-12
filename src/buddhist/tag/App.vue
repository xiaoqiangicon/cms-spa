<template>
  <div class="container">
    <el-card>
      <div class="filter">
        <div class="filter-header">
          <span>佛事分类</span>
          <el-select v-model="commodityType" @change="fetchList">
            <el-option :value="0" label="全部"></el-option>
            <el-option :value="1" label="祈福牌位"></el-option>
            <el-option :value="2" label="往生牌位"></el-option>
            <el-option :value="3" label="供佛佛像"></el-option>
            <el-option :value="4" label="供光明灯"></el-option>
            <el-option :value="5" label="预约开光"></el-option>
          </el-select>
          <span>编辑</span>
        </div>
        <div class="filter-content">
          <span>寺院名或寺院ID</span>
          <el-select v-model="templeId" filterable @change="changeTemple">
            <el-option :value="0">全部</el-option>
            <el-option
              v-for="item in templeList"
              :value="item.id"
              :key="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
          <span style="margin-left: 20px;">佛事名或佛事ID</span>
          <el-select v-model="commodityId" filterable @change="fetchList">
            <el-option :value="0">全部</el-option>
            <el-option
              v-for="item in commodityList"
              :value="item.id"
              :key="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </div>
      </div>
      <el-table v-loading="loading" :data="list">
        <el-table-column
          width="100px"
          prop="id"
          label="佛事ID"
          :align="'center'"
        />
        <el-table-column prop="name" label="佛事名称" :align="'center'" />
        <el-table-column prop="templeName" label="寺院名称" :align="'center'" />
        <el-table-column prop="id" label="分类" :align="'center'">
          <template slot-scope="scope">
            <div class="valid-time">
              <el-select
                v-model="scope.row.tagList"
                @change="changeRowType(scope.row)"
              >
                <el-option
                  v-for="item in tagList"
                  :value="item.id"
                  :key="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </div>
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
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch';
import './index.less';

export default {
  name: 'App',
  data() {
    return {
      loading: !0,
      commodityType: '',
      total: 0,
      pageNumber: 1,
      pageSize: 20,
      templeId: '',
      commodityId: '',
      templeList: [],
      commodityList: [],
      list: [],
      tagList: [],
    };
  },
  created() {
    this.getTagList();
    this.getTempleList();
    this.getCommodityList();
    this.fetchList();
  },
  methods: {
    getTagList() {
      seeFetch('buddhist/tag/getTagList', {}).then(res => {
        if (res.success) {
          this.tagList = res.data;
        }
      });
    },
    getTempleList() {
      seeFetch('buddhist/classify/getTempleList', {
        isTest: 0,
        tagId: 0,
        verify: -1,
      }).then(res => {
        if (res.success) {
          this.templeList = res.data;
        }
      });
    },
    getCommodityList() {
      seeFetch('buddhist/classify/getCommodityList', {
        templeId: this.templeId,
      }).then(res => {
        if (res.success) {
          this.commodityList = res.data.list;
        }
      });
    },
    fetchList() {
      this.loading = !0;
      seeFetch('buddhist/classify/list', {
        pageNumber: this.pageNumber - 1,
        pageSize: 20,
        commodityId: this.commodityId,
        commodityType: this.commodityType,
        isFinish: -1,
        isTest: 1,
        status: 0,
        templeId: this.templeId,
      }).then(res => {
        this.loading = !1;

        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.total = res.data.count;
        this.list = res.data.list;
      });
    },
    changeTemple() {
      this.commodityId = '';
      this.fetchList();
    },
    changeRowType(row) {
      seeFetch('buddhist/classify/update', {
        commodityType: scope.row.commodityType,
        id: row.id,
      }).then(res => {
        if (res.success) {
          Notification({
            title: '提示',
            message: '更新成功',
          });
        } else {
          Notification({
            title: '提示',
            message: res.msg,
          });
        }
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
.filter {
  margin-bottom: 20px;
  margin-left: 20px;
  span {
    margin-right: 10px;
  }
}
.filter-header {
  margin-bottom: 20px;
}
</style>
