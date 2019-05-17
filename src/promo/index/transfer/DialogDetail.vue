<template>
  <el-dialog title="订单详情" :visible.sync="visible" :before-close="()=>{sVisible = false}">

    <!-- 注意转单表格的混合单元格数据 -->



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
</style>


