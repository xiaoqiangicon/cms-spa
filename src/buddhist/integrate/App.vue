<template>
  <div class="container">
    <el-card>
      <div class="header">
        <p class="tips">
          用来手动增加寺院的积分，因涉及到积分与兑换，确保增加时数据准确。
        </p>
        <div class="header-block">
          <div class="search-box">
            <span>选择寺院：</span>
            <el-select
              v-model.number="templeId"
              size="small"
              placeholder="请选择寺院"
              filterable
              @change="refresh"
            >
              <el-option :key="0" label="全部" :value="0" />
              <el-option
                v-for="item in templeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
            <span style="margin: 0 10px 0 20px;">积分类型：</span>
            <el-select
              v-model="integrateType"
              width="300"
              placeholder="请选择积分类型"
              filterable
              @change="onChangeType"
            >
              <el-option
                v-for="item in integrateList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
          <button class="add-integrate" @click="add">
            添加任务积分
          </button>
        </div>
      </div>
      <div class="content">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="mission" label="任务名称" />
          <el-table-column prop="templeName" label="寺院名称" />
          <el-table-column label="积分">
            <template slot-scope="scope">
              <div>
                {{ scope.row.coin }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="addTime" label="添加时间" />
          <el-table-column label="编辑用户" prop="userName" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div>
                <button class="btn" @click="edit(scope.row)">
                  编辑
                </button>
                <button class="btn del" @click="del(scope.row)">
                  删除
                </button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="total"
          :current-page="page"
          background
          layout="prev, pager, next"
          style="margin-top: 40px"
          :page-size="pageSize"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <Edit :is-new="isNew" :temple-list="templeList" :item="item" />
  </div>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';
import Edit from './Edit.vue';

export default {
  components: {
    Edit,
  },
  data() {
    return {
      loading: !1,
      list: [],
      integrateType: -1,
      integrateList: [
        {
          id: -1,
          name: '全部',
        },
        {
          id: 0,
          name: '积分任务',
        },
        {
          id: 1,
          name: '积分兑换',
        },
      ],
      templeList: [],

      isNew: 1, // 添加or修改
      item: {}, // 传递给子组件的数据

      total: 10,
      page: 0,
      currentPage: 0,

      pageSize: 25,
      templeId: 0,
    };
  },
  created() {
    this.fetchList();
    this.getTempleList();
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('buddhist/integrate/list', {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        templeId: this.templeId,
        type: this.integrateType,
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.loading = !1;

        this.total = res.data.total;

        this.list = res.data.list;

        window.scrollTo(0, 0);
      });
    },
    getTempleList() {
      seeFetch('buddhist/integrate/getTempleList', {
        isTest: -1,
        tagId: 0,
        verify: -1,
        all: 1,
      }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.templeList = res.data;
      });
    },
    onChangeType() {
      this.currentPage = 0;
      this.fetchList();
    },
    refresh() {
      this.fetchList();
    },
    add() {
      this.isNew = !0;
      this.$store.state.buddhistIntegrate.editVisible = !0;
    },
    edit(value) {
      this.isNew = !1;
      this.item = value;
      this.$store.state.buddhistIntegrate.editVisible = !0;
    },
    del(row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          seeFetch('buddhist/integrate/delMission', {
            id: row.id,
          }).then(res => {
            if (!res.success) return;

            window.location.reload();
          });
        })
        .catch(() => {});
    },
    pageChange(page) {
      this.page = page;
      this.currentPage = this.page - 1;
      this.fetchList();
    },
  },
};
</script>

<style scoped lang="less">
.tips {
  margin-top: 0;
  font-size: 16px;
  font-weight: bold;
}
.header-block {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-right: 100px;
}
.add-integrate {
  width: 100px;
  height: 36px;
  border: none;
  border-radius: 6px;
  background-color: #2db7f5;
  color: white;
  outline: none;
  cursor: pointer;
}
.btn {
  width: 50px;
  margin-right: 8px;
  color: white;
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: #2db7f5;
  cursor: pointer;
}
</style>
