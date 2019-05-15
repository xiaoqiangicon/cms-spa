<template>
  <div>
    <Add :visible="visible" @updateVisible="updateVisible"/>
  </div>
</template>

<script>
import Add from './Add';

export default {
  name: 'App',
  components: {
    Add,
  },
  data() {
    return {
      visible: [],
    };
  },
  methods: {
    updateVisible(val) {
      this.visible = val;
    },
  },
};
</script>

<style lang="less" scoped>
</style>


