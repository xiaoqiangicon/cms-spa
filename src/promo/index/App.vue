<template>
  <div class="container">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="转单系统" name="transfer">
        <Transfer />
      </el-tab-pane>
      <el-tab-pane label="推广佛事" name="buddhist">
        <Buddhist />
      </el-tab-pane>
      <el-tab-pane label="转单未处理" name="transfer-not-dispose">
        <TransferNotDispose />
      </el-tab-pane>
      <el-tab-pane v-if="0" label="分享福币" name="fu">
        <Fu />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Transfer from './transfer/Index';
import Buddhist from './buddhist/Index';
import TransferNotDispose from './transferNotDispose/Index';
import Fu from './fu/Index';

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
    Transfer,
    Buddhist,
    Fu,
    TransferNotDispose,
  },
  data() {
    return {
      activeName: 'transfer',
    };
  },
  computed: {
    ...computedProps,
  },
  mounted() {
    /* 此处存在特殊逻辑 */
    // 转单/未转单页面 隶属于佛事管理列表的某个子项 本应该独立出去单独作为一个页面 但是却偶合在一起了
    // 市场部想在 佛事列表页面 点击转单列表时 新开页面
    // 因此点击时会带两个参数 重新打开 此页面
    // 以下做针对处理
    // 由于是单页面 此页面在进入时必带参数 默认为 :activeName :buddhistId

    if (this.$route.path === '/promo/index/transfer-list') {
      const transferListStr = window.localStorage.getItem(
        'promo/index:transferList'
      );

      const transferList = JSON.parse(decodeURIComponent(transferListStr));
      this.transferActiveName = 'tableNotTransfer';
      this.transferBuddhistId = transferList.buddhistId;
      this.transferBuddhistName = transferList.buddhistName;
      this.transferSubList = transferList.subList;
    }
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
</style>
