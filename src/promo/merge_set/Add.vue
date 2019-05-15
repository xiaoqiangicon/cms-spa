<template>
  <div class="mask" @click="handleClickMask">

  </div>
</template>

<script>
export default {
  name: 'Add',
  props: ['visible'],
  data() {
    return {
    }
  },
  methods: {
    handleClickMask() {
      // const {visible} = this;
      // this.$emit('updateVisible', !visible);
      this.visible.push(1);
    }
  }
}
</script>

<style lang="less" scoped>
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
  }
</style>


