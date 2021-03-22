<template>
  <div class="contain">
    <div class="header">
      <el-button class="add" type="primary" @click="editDetail({})"
        >添加设备</el-button
      >
    </div>
    <el-card>
      <el-table
        highlight-current-row
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="typeStr" label="设备类型" :align="'center'" />
        <el-table-column prop="templeName" label="寺院名称" :align="'center'" />
        <el-table-column
          prop="deviceSerial"
          label="设备信息编号"
          :align="'center'"
        />
        <el-table-column prop="name" label="所在位置" :align="'center'" />
        <el-table-column prop="statusStr" label="设备状态" :align="'center'" />
        <el-table-column prop="addTime" label="添加时间" :align="'center'" />
        <el-table-column label="操作" :align="'center'">
          <template slot-scope="scope">
            <div class="detail" @click="editDetail(scope.row)">编辑</div>
            <div class="detail" @click="del(scope.row)">删除</div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Detail
      :detail="detail"
      :showDetail="showDetail"
      @hideDetail="hideDetail"
    />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification, MessageBox } from 'element-ui';
import './fetch';
import './index.less';
import Detail from './Detail.vue';

export default {
  name: 'APP',
  data() {
    return {
      list: [], // 把返回的列表进行组装分类
      detail: {}, // 详情数据

      showDetail: !1,
      currentPage: 1,
      pageSize: 25,
      total: 0,
    };
  },
  components: {
    Detail,
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      seeFetch('hardware/hardwareManage/getList', {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      }).then(res => {
        if (res.errorCode === 0) {
          this.list = res.data.deviceList;
        }
      });
    },
    editDetail(row) {
      this.detail = row;
      this.showDetail = !0;
    },
    del(row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('hardware/hardwareManage/del', { id: row.id }).then(res => {
          if (res.errorCode === 0) {
            window.location.reload();
          }
        });
      });
    },
    hideDetail(data) {
      this.showDetail = data;
    },
  },
};
</script>

<style lang="less" scoped>
.contain {
  padding: 20px;
}
.header {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: #fff;
}
.detail {
  cursor: pointer;
  color: #409eff;
}
</style>
