<template>
  <el-dialog
    :visible="detailVisible"
    title="订单详情"
    :before-close="clickCancel"
    width="600px"
  >
    <div class="row">订单类型：{{ detailItem.fromTypeText }}</div>
    <div class="row">订单ID：{{ detailItem.orderNo }}</div>
    <div class="row">外部订单号：{{ detailItem.wxTransactionId }}</div>
    <div class="row">寺院：{{ detailItem.templeName }}</div>
    <hr />
    <div class="row">名称：{{ detailItem.title }}</div>
    <div v-if="detailItem.selectItemName" class="row">
      选择项：{{ detailItem.selectItemName }}
    </div>
    <div v-if="detailItem.count" class="row">数量：{{ detailItem.count }}</div>
    <div v-if="detailItem.prayType" class="row">
      供奉类型：{{ detailItem.prayType }}
    </div>
    <div v-if="detailItem.placeSequence" class="row">
      位置编号：{{ detailItem.placeSequence }}
    </div>
    <div class="row">支付金额：{{ detailItem.amount }}</div>
    <div class="row">下单时间：{{ detailItem.time }}</div>
    <div class="row">支付流水号：{{ detailItem.flowNo }}</div>
    <div class="row">联系人：{{ detailItem.contactName }}</div>
    <div class="row">联系电话：{{ detailItem.contactPhone }}</div>
  </el-dialog>
</template>

<script>
const computedProps = {};

['detailVisible', 'detailItem'].forEach(name => {
  computedProps[name] = {
    get() {
      return this.$store.state.orderRefund[name];
    },
    set(value) {
      this.$store.state.orderRefund[name] = value;
    },
  };
});

export default {
  name: 'Detail',
  computed: {
    ...computedProps,
  },
  methods: {
    clickCancel() {
      this.$store.state.orderRefund.detailVisible = !1;
    },
  },
};
</script>

<style lang="less" scoped>
.row {
  font-size: 16px;
  margin-top: 10px;
}
</style>
