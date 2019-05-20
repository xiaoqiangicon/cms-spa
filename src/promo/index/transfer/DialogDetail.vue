<template>
  <el-dialog title="订单详情" :visible.sync="visible" :before-close="()=>{sVisible = false}">
    <div class="row">
      <div class="title">佛事名称</div>
      ：{{detail.buddhistName}}
    </div>
    <div class="row">
      <div class="title">规格</div>
      ：{{detail.subName}}
    </div>
    <div class="row">
      <div class="title">数量</div>
      ：{{detail.buyNum}}
    </div>
    <div class="row">
      <div class="title">支付</div>
      ：{{detail.price}}
    </div>
    <div class="row">
      <div class="title">转单价格</div>
      ：{{detail.transferPrice}}
    </div>
    <div class="row">
      <div class="title">下单时间</div>
      ：{{detail.addTime}}
    </div>
    <div class="row">
      <div class="title">订单号</div>
      ：{{detail.orderId}}
    </div>
    <div class="row">
      <div class="title">外部订单号</div>
      ：{{detail.orderNum}}
    </div>
    <div class="row">
      <div class="title">支付流水号</div>
      ：{{detail.wxId}}
    </div>
    <div class="bar"></div>
    <div class="row">
      <div class="title">反馈图</div>
      <div class="content">：
        <div v-for="item in detail.feedBackImg" :key="item" class="img-container">
          <img :src="item">
        </div>
      </div>
    </div>
    <div class="bar"></div>
    <div v-for="item in detail.ps" :key="item.inputId" class="row">
      <template v-if="item.type === 14 && item.value">
        <div v-for="img in item.value.spilt(',')" :key="img" class="img-container">
          <img :src="img">
        </div>
      </template>
      <template v-else-if="item.type === 13"></template>
      <template v-else>
        <div class="title">{{item.name}}</div>：
        <div class="content">{{item.value}}</div>
      </template>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'dialogDetail',
  props: ['detail', 'visible'],
  data() {
    return {
      sVisible: this.visible,
    };
  },
  watch: {
    visible(val) {
      this.sVisible = val;
    },
    sVisible(val) {
      this.$emit('updateVisible', val);
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.bar {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
}
.row {
  display: flex;
  margin-bottom: 10px;
  .title {
    flex-basis: 100px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
  }
  .img-container {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>


