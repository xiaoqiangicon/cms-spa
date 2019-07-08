<template>
  <div class="container">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="生成订单" name="order" />
      <el-tab-pane label="订单列表" name="list" />
      <el-tab-pane label="进展动态" name="dynamic" />
      <keep-alive>
        <component :is="curTabCom" />
      </keep-alive>
    </el-tabs>
  </div>
</template>

<script>
import Order from './order/Index';
import List from './list/Index';
import Dynamic from './dynamic/Index';

import { addProps } from './data';

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
  name: 'App',
  components: {
    Order,
    List,
    Dynamic,
  },
  data() {
    return {
      activeName: 'order',
    };
  },
  computed: {
    ...computedProps,
    curTabCom() {
      return `${this.activeName[0].toUpperCase()}${this.activeName.substr(1)}`;
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
