<template>
  <div>
    <div class="operation mg-b-10">
      <span class="mg-l-20 mg-r-10">若批量转单给寺院请筛选佛事和选择项</span>
      <el-button
        type="primary"
        size="mini"
        :disabled="multipleSelection.length <= 0"
        @click="handleClickGroupTransfer"
      >
        转单
      </el-button>
    </div>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        :selectable="tableRowSelectable"
        type="selection"
        width="55"
        align=" left"
      />
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
          {{
            scope.row.isAuto ? '自动' : '手动'
          }}
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
        align="right"
      >
        <template slot-scope="scope">
          <div>
            <el-button
              type="text"
              size="small"
              @click="handleClickSingleTransfer(scope.row)"
            >
              转单
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
    <DialogTransfer
      :visible="dialogTransferVisible"
      @submit="refresh"
      @updateVisible="updateDialogTransferVisible"
    />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import DialogDetail from './DialogDetail';
import DialogTransfer from './DialogTransfer';

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
    computedProps[name] = function() {
      return this.$store.state.promoIndex.add[name];
    };
  }
});

export default {
  name: 'TableNotTransfer',
  components: {
    DialogDetail,
    DialogTransfer,
  },
  data() {
    return {
      loading: !0,

      dialogDetailVisible: !1,
      dialogTransferVisible: !1,

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
        type: 1,
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
        this.pagination.total = res.count;
        this.loading = !1;
      });
    },
    refresh() {
      this.pagination.page = 1;
      this.requestList();
    },
    tableRowSelectable(row) {
      return this.transferSubId !== 0;
    },
    handleSelectionChange(selectedItem) {
      this.multipleSelection = selectedItem;
    },
    handleClickGroupTransfer() {
      if (this.multipleSelection.length <= 0) {
        Notification({
          type: 'warning',
          title: '提示',
          message: '请选择订单',
        });
        return;
      }

      this.transferOrderIds = this.multipleSelection.map(item => item.id);
      this.dialogTransferVisible = !0;
    },
    handleClickSingleTransfer(rowData) {
      this.transferOrderDetail = rowData;
      this.transferOrderIds = [rowData.id];

      // 兼容错误数据 旧的随喜未转单数据
      const subId = this.transferSubId
        ? this.transferSubId
        : this.transferOrderDetail.subId;

      // 获取转单选择项的原价
      const { price: originPrice } = this.transferSubList.find(
        item => item.id === subId
      );

      if (originPrice <= 0) {
        Notification({
          type: 'warning',
          title: '提示',
          message: '当前未转单项属于无需支付或随喜，禁止转单',
        });
        return;
      }

      this.dialogTransferVisible = !0;
    },
    handleClickDetail(rowData, itemData, itemIndex) {
      const {
        isAuto,
        buddhistName,
        subId,
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
        orderId,
        orderNum,
        transferPrice,
        addTime,
        wxId,
        feedBackImg: feedBackImg ? feedBackImg.split(',') : [],
        ps: isAuto ? itemData.ps : rowData.ps[itemIndex].ps,
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
    updateDialogTransferVisible(val) {
      this.dialogTransferVisible = val;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
</style>
