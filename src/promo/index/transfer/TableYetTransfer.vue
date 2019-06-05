<template>
  <div>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column
        prop="buddhistName"
        label="佛事名称"
        show-overflow-tooltip
      />
      <el-table-column
        label="状态"
        show-overflow-tooltip
        :align="'center'"
      >
        <template slot-scope="scope">
          {{ scope.row.isAuto ? '自动' : '手动' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="buyNum"
        label="数量"
        :align="'center'"
      />
      <el-table-column
        prop="price"
        label="支付金额（元）"
        :align="'center'"
      />
      <el-table-column
        label="所属寺院"
        show-overflow-tooltip
        :align="'center'"
      >
        <template slot-scope="scope">
          <div
            v-for="item in scope.row.orderList"
            :key="item.addTime"
          >
            {{ item.templeName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="支付时间"
        show-overflow-tooltip
        :align="'center'"
      >
        <template slot-scope="scope">
          <div
            v-for="item in scope.row.orderList"
            :key="item.addTime"
          >
            {{ item.addTime }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="转单金额（元）"
        :align="'center'"
      >
        <template slot-scope="scope">
          <div
            v-for="item in scope.row.orderList"
            :key="item.addTime"
          >
            {{ item.transferPrice }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="详情"
        width="100"
        :align="'center'"
      >
        <template slot-scope="scope">
          <div
            v-for="(item, index) in scope.row.orderList"
            :key="item.addTime"
          >
            <el-button
              type="text"
              size="small"
              @click="handleClickDetail(scope.row, item, index)"
            >
              详情
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
        :align="'center'"
      >
        <template slot-scope="scope">
          <div>
            <span
              v-if="
                !!scope.row.isAuto ||
                  (!scope.row.isAuto && !!scope.row.orderList[0].isFinish)
              "
              class="disabled"
              @click="handleClickRetract(scope.row)"
            >撤回</span>
            <el-button
              v-else
              type="text"
              size="small"
              @click="handleClickRetract(scope.row)"
            >
              撤回
            </el-button>
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
    <DialogDetail
      :visible="dialogDetailVisible"
      @updateVisible="updateDialogDetailVisible"
    />
    <DialogRetract
      :visible="dialogCancelVisible"
      @submit="refresh"
      @updateVisible="updateDialogCancelVisible"
    />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import DialogDetail from './DialogDetail';
import DialogRetract from './DialogRetract';

import { addProps } from '../data';

const computedProps = {};
addProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.promoIndex.add[name];
      },
      set(value) {
        const key = `promoIndex/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    /* eslint-disable */
    computedProps[name] = function() {
      return this.$store.state.promoIndex.add[name];
    };
  }
});

export default {
  name: 'TableYetTransfer',
  components: {
    DialogDetail,
    DialogRetract,
  },
  data() {
    return {
      loading: !0,

      dialogDetailVisible: !1,
      dialogCancelVisible: !1,

      tableData: [],

      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },

      multipleSelection: [],
    };
  },
  computed: {
    ...computedProps,
  },
  created() {
    // this.requestList();
  },
  methods: {
    requestList() {
      this.loading = !0;

      const {
        transferBuddhistId: buddhistId,
        transferTel: tel,
        transferSubId: subId,
      } = this;
      const { page, pageSize } = this.pagination;

      seeFetch('promo/index/transfer/getTransferOrderList', {
        buddhistId,
        subId,
        tel,
        page,
        pageSize,
        type: 2,
      }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }
        this.tableData = res.data;
        this.pagination.total = res.total;
        this.loading = !1;
      });
    },
    refresh() {
      this.pagination.page = 1;
      this.requestList();
    },
    handleSelectionChange() {},
    handleClickRetract(rowData) {
      const { id, isAuto, buddhistName, subName } = rowData;
      const { templeName } = rowData.orderList[0];
      const { isFinish } = rowData.orderList[0];

      // 自动处理订单 已处理订单 不可撤回
      if (isAuto) {
        Notification({
          type: 'warning',
          title: '提示',
          message: `自动处理订单不可撤回`,
        });
        return;
      }

      if (isFinish) {
        Notification({
          type: 'warning',
          title: '订单已经处理，不可撤回',
          message: `如需撤回请联系寺院，并将此订单设为未处理后再操作`,
        });
        return;
      }

      this.transferOrderDetail = { id, buddhistName, subName, templeName };
      this.dialogCancelVisible = !0;
    },
    handleClickDetail(rowData, itemData, itemIndex) {
      const {
        isAuto,
        buddhistName,
        subName,
        buyNum,
        price,
        orderId,
        orderNum,
        wxId,
      } = rowData;
      const { feedBackImg, transferPrice, addTime } = itemData;
      const detail = {
        buddhistName,
        subName,
        buyNum,
        price,
        transferPrice,
        addTime,
        orderId,
        orderNum,
        wxId,
        feedBackImg: feedBackImg ? feedBackImg.split(',') : [],
        /* eslint-disable */
        ps: isAuto
          ? itemData.ps
          : rowData.ps[itemIndex]
          ? rowData.ps[itemIndex].ps
          : [],
      };

      this.transferOrderDetail = detail;
      this.dialogDetailVisible = !0;
    },
    onSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.pagination.page = 1;
      this.requestList();
    },
    onCurrentChange(page) {
      this.pagination.page = page;
      this.requestList();
    },
    updateDialogDetailVisible(val) {
      this.dialogDetailVisible = val;
    },
    updateDialogCancelVisible(val) {
      this.dialogCancelVisible = val;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
.disabled {
  font-size: 12px;
  color: #ccc;
  cursor: pointer;
}
</style>
