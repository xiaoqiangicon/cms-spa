<template>
  <div>
    <div class="filter clearfix">
      <div
        class="tip fl-right"
      >分享激励：可为指定佛事设置一定分成比例或功德金额，用户将佛事分享出去后，若有人通过分享链接产生支付订单则这个用户会获得相应的功德金。功德金可用来兑换实物道具或可直接抵用佛事的支付金额等。</div>
      <div class="mg-t-30">
        <span>类型：</span>
        <el-select v-model="type" placeholder="请选择" @change="handleChangeType">
          <el-option label="全部" :value="0"></el-option>
          <el-option label="转单佛事" :value="1"></el-option>
          <el-option label="推广佛事" :value="2"></el-option>
        </el-select>
      </div>
    </div>
    <div class="tabs mg-t-20">
      <el-tabs v-model="curTab" @tab-click="handleClickTabs">
        <el-tab-pane label="进行中" name="ing"></el-tab-pane>
        <el-tab-pane label="已结束" name="end"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column v-if="!isEnd" label="排序" width="100" align="center">
          <template slot="header" slot-scope="scope">排序
            <el-tooltip class="item" effect="dark" content="排序影响“分享列表”的顺序" placement="top-start">
              <i class="el-icon-info" style="color: #409EFF;"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <div style="cursor:pointer;" @click="handleClickRowSort(scope.row)">
              {{scope.row.sort}}
              <i style="color: #409EFF;" class="el-icon-edit"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="buddhistId" label="ID" width="100" align="center"></el-table-column>
        <el-table-column prop="buddhistName" label="佛事名称"></el-table-column>
        <el-table-column prop="templeName" label="寺院名称"></el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">{{scope.row.type === 1 ? '转单佛事' : '推广佛事'}}</template>
        </el-table-column>
        <el-table-column prop="orderNum" label="订单数量" :align="'center'"></el-table-column>
        <el-table-column prop="sharePay" label="分享支付（元）" :align="'center'"></el-table-column>
        <el-table-column prop="fuBiMoney" label="产生福币（元）" :align="'center'"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span v-if="!isEnd">
              <el-button type="text" size="small" @click="handleClickManage(scope.row)">管理</el-button>-
            </span>
            <el-button type="text" size="small" @click="handleClickRecord(scope.row)">记录</el-button>
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
  </div>
</template>

<script>
import './fetch/index';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

export default {
  name: 'Fu',
  data() {
    return {
      type: 0,
      curTab: 'ing',
      tableData: [], // sort buddhistId buddhistName templeName orderNum sharePay fuBiMoney
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
      },
    };
  },
  computed: {
    isEnd() {
      return this.curTab === 'end';
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getList();
    },
    refresh() {
      this.pagination.page = 1;
      this.getList();
    },
    getList() {
      const { type, isEnd } = this;
      const { page, pageSize } = this.pagination;

      seeFetch('promo/index/fu/get_list', {
        type,
        isEnd,
        page,
        pageSize,
      }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.pagination.total = res.data.total;
        this.tableData = res.data.list;
      });
    },
    handleChangeType() {
      this.refresh();
    },
    handleClickTabs() {
      this.refresh();
    },
    handleClickRowSort(rowData) {
      this.$prompt('请填写新的序号', '修改序号', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d+$/,
        inputErrorMessage: '请输入数字',
      })
        .then(({ value: sort }) => {
          seeFetch('promo/index/fu/update_sort', { sort }).then(res => {
            if (!res.success) {
              Notification({
                type: 'error',
                title: '提示',
                message: res.message,
              });
              return;
            }

            Notification({
              type: 'success',
              title: '提示',
              message: '修改成功',
            });

            rowData.sort = sort;
          });
        })
        .catch(() => {
          console.log('出错');
        });
    },
    handleClickManage(rowData) {
      // 根据类型跳转推广佛事设置 或转单设置
      const { type } = rowData;
      if (type === 1) {
        // 转单设置
        window.sessionStorage['promo/index/transfer/item'] = JSON.stringify(
          rowData
        );
        this.$router.push(`/promo/transferSet/${rowData.buddhistId}`);
      } else {
        // 推广佛事设置
        window.sessionStorage['promo/index/buddhist/item'] = JSON.stringify(
          rowData
        );
        this.$router.push(`/promo/buddhistEdit/${rowData.templeId}`);
      }
    },
    handleClickRecord(rowData) {
      const { buddhistId } = rowData;
      window.sessionStorage.setItem('promo/index/fu/item', JSON.stringify(rowData));
      this.$router.push(`/promo/fubiRecord/${buddhistId}`);
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
.filter {
  .tip {
    width: 400px;
    padding: 15px;
    border: 1px solid #b7eb8f;
    border-radius: 4px;
    background-color: #f6ffed;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
