<template>
  <el-dialog title="转单设置" :visible.sync="visible" :before-close="()=>{sVisible = false}"></el-dialog>
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


