<template>
  <div class="contain">
    <el-card>
      <div class="filter">
        <div>
          <el-button
            :class="{ 'filter-active': type === 0 }"
            @click="changeType(0)"
            >未审核</el-button
          >
          <el-button
            :class="{ 'filter-active': type === 1 }"
            @click="changeType(1)"
            >已审核通过</el-button
          >
          <el-button
            :class="{ 'filter-active': type === 2 }"
            @click="changeType(2)"
            >已审核未通过</el-button
          >
        </div>
        <el-select v-model="templeId" filterable @change="filterTemple">
          <el-option label="全部" :value="0"></el-option>
          <el-option
            :value="item.id"
            v-for="item in templeList"
            :label="item.temple_name"
            :key="item.id"
          ></el-option>
        </el-select>
      </div>

      <el-table v-loading="loading" :data="list">
        <el-table-column
          min-width="60px"
          prop="id"
          label="Id"
          :align="'center'"
        />
        <el-table-column
          min-width="60px"
          prop="templeName"
          label="申请寺院"
          :align="'center'"
        />
        <el-table-column
          min-width="60px"
          prop="addTime"
          label="申请时间"
          :align="'center'"
        />
        <el-table-column
          min-width="60px"
          prop="typeText"
          label="类型"
          :align="'center'"
        />
        <el-table-column
          min-width="60px"
          prop="statusText"
          label="状态"
          :align="'center'"
        />
        <el-table-column label="操作" width="60px">
          <template slot-scope="scope">
            <span class="detail" @click="showDetail(scope.row)">查看</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        :current-page="page"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        style="margin-top: 40px"
        @current-change="pageChange"
      />
    </el-card>
    <el-dialog title="认证审核详情" :visible.sync="detailDialog">
      <p>{{ detail.templeName }}</p>
      <p><span>审核类型：</span>{{ detail.typeText }}</p>
      <p><span>银行开户名称：</span>{{ detail.bankCardUserName }}</p>
      <p><span>银行卡号：</span>{{ detail.bankCardNumber }}</p>
      <p><span>银行名称：</span>{{ detail.bankName }}</p>
      <p><span>支行名称：</span>{{ detail.bankBranchName }}</p>
      <p><span>开户许可证照片：</span></p>
      <img class="bank-img" :src="detail.certificatePicUrl" alt="" />
      <div class="btn-box">
        <el-button type="primary" @click="verify">设为已审核</el-button>
        <el-button @click="reject">审核不通过</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';
import { Notification, Prompt } from 'element-ui';

export default {
  data() {
    return {
      loading: !1,
      total: 0,
      pageSize: 20,
      templeId: 0,
      type: 0, // 0 未审核  1 已审核通过  2 已审核未通过
      page: 0,
      currentPage: 0,
      list: [],
      templeList: [],
      detailDialog: !1,
      detail: {},
    };
  },
  created() {
    this.getList();
    this.getTemple();
  },
  methods: {
    getList() {
      let { currentPage, pageSize, templeId, type } = this;
      this.loading = !0;
      seeFetch('/temple/financeVerify/getList', {
        pageNumber: currentPage,
        pageSize,
        templeId,
        type,
      }).then(res => {
        if (res.success) {
          this.list = res.data;
          if (currentPage === 0) this.total = pageSize * res.pageSum;
        }
        this.loading = !1;
      });
    },
    getTemple() {
      seeFetch('/temple/financeVerify/getTempleList', {}).then(res => {
        console.log(res);
        if (res.errorCode === 0) {
          this.templeList = res.data;
        }
      });
    },
    changeType(type) {
      this.templeId = 0;
      this.currentPage = 0;
      this.type = type;
      this.getList();
    },
    filterTemple() {
      this.currentPage = 0;
      this.getList();
    },
    showDetail(row) {
      this.detailDialog = !0;
      this.detail = row;
    },
    verify() {
      let { id } = this.detail;
      seeFetch('/temple/financeVerify/verify', {
        templeBankId: id,
        examineMessage: '',
        type: 1,
      }).then(res => {
        if (res.success) {
          this.detailDialog = !1;
          Notification({
            title: '提示',
            type: 'success',
            message: `更改成功`,
          });
          this.getList();
        } else {
          Notification({
            title: '提示',
            type: 'error',
            message: `更改失败`,
          });
        }
      });
    },
    reject() {
      this.$prompt('请输入审核不通过原因，以便让寺院知悉原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if (!value) {
          alert('请输入审核不通过原因');
          return;
        }
        let { id } = this.detail;
        seeFetch('/temple/financeVerify/verify', {
          templeBankId: id,
          examineMessage: value,
          type: 2,
        }).then(res => {
          if (res.success) {
            this.detailDialog = !1;
            Notification({
              title: '提示',
              type: 'success',
              message: `更改成功`,
            });
            this.getList();
          } else {
            Notification({
              title: '提示',
              type: 'error',
              message: `更改失败`,
            });
          }
        });
      });
      return;
    },
    pageChange(page) {
      this.page = page;
      this.currentPage = this.page - 1;
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
.filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.contain {
  padding: 20px;
}
.filter {
  margin-bottom: 20px;
}
.filter-active {
  color: #fff;
  background-color: #409eff;
  border: 1px solid #409eff;
}
.detail {
  color: #409eff;
  cursor: pointer;
}
.bank-img {
  max-width: 320px;
}
.btn-box {
  display: flex;
  justify-content: center;
  margin-top: 26px;
}
</style>
