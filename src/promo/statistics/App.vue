<template>
  <div class="container">
    <el-card>
      <div class="tabs">转单寺院</div>
      <div class="filter">寺院名
        <el-select
          v-model="templeId"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          filterable
          @change="getList"
        >
          <el-option :value="0" label="全部"/>
          <el-option v-for="item in templeList" :key="item.id" :value="item.id" :label="item.name"/>
        </el-select>
      </div>
      <div class="table">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="id" label="ID" width="100" :align="'center'"/>
          <el-table-column prop="name" label="寺院名称"/>
          <el-table-column prop="transferOrderNum" label="已转单数" :align="'center'"/>
          <el-table-column prop="transferOrderPrice" label="转单金额（元）" :align="'center'"/>
          <el-table-column prop="transferOrderGain" label="盈收金额（元）" :align="'center'"/>
          <el-table-column label="操作" width="100" :align="'center'">
            <template slot-scope="scope">
              <div>
                <el-button type="text" size="small" @click="handleClickRemind(scope.row)">转单通知</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: right; margin-top: 20px;"
          layout="total, prev, pager, next, sizes, jumper"
          :page-size="pagination.pageSize"
          :current-page="pagination.page"
          :total="pagination.total"
          @size-change="onSizeChange"
          @current-change="onCurrentChange"
        />
      </div>
    </el-card>
    <DialogRemind :templeId="curTempleId" :visible="dialogRemindVisible" @updateVisible="updateDialogRemindVisible" />
  </div>
</template>

<script>
import './fetch/index';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import DialogRemind from './DialogRemind';

export default {
  name: 'App',
  components: {
    DialogRemind,
   },
  data() {
    return {
      sumData: {},
      templeList: [],
      tableData: [],

      templeId: '',
      curTempleId: '',

      pagination: {
        page: 1,
        total: 0,
        pageSize: 20,
      },

      dialogRemindVisible: !1,
    };
  },
  created() {
    this.getTempleList();
    this.getList();
  },
  methods: {
    getTempleList() {
      seeFetch('promo/statistics/getTempleList', {}).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
        }

        this.templeList = res.data;
      });
    },
    getList() {
      const { templeId } = this;
      const { page, pageSize } = this.pagination;
      seeFetch('promo/statistics/getList', {
        page,
        pageSize,
        templeId,
      }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
        }

        this.pagination.total = res.total;
        this.tableData = res.data;
      });
    },
    updateDialogRemindVisible(visible) {
      this.dialogRemindVisible = visible;
    },
    handleClickRemind(rowData) {
      const {id} = rowData;
      this.curTempleId = id;
      this.dialogRemindVisible = !0;
    },
    onSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.pagination.page = 1;
      this.getList();
    },
    onCurrentChange(page) {
      this.pagination.page = page;
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
.tabs {
  font-size: 20px;
  font-weight: bold;
}
.filter {
  margin-top: 30px;
}
.table {
  margin-top: 30px;
}
</style>
