<template>
  <el-dialog
    :visible="visible"
    title="推广佛事比例记录"
    :before-close="clickCancel"
    width="40%"
  >
    <div class="content">
      <el-table :data="list" style="width: 100%">
        <el-table-column label="服务费比例">
          <template slot-scope="item">
            {{ item.row.rate }}%
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="时间" />
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import { rateListProps } from './data';

const computedProps = {};

rateListProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.financeTaking.rateList[name];
      },
      set(value) {
        const key = `financeTaking/rateList/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.financeTaking.rateList[name];
    };
  }
});
export default {
  name: 'RateList',
  computed: {
    ...computedProps,
  },
  methods: {
    clickCancel() {
      this.$store.state.financeTaking.rateList.visible = !1;
    },
  },
};
</script>

<style scoped>
.content {
  padding: 0 20px;
}
</style>
