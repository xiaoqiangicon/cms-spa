<template>
  <el-dialog
    :visible="visible"
    :title="dialogTitle"
    :before-close="clickCancel"
    width="400px"
  >
    <div class="f-s-18">
      {{ title }}
    </div>
    <div class="mg-t-20">{{ wxAccount }} / {{ publishTime }}</div>
    <div class="content" v-html="content" />
  </el-dialog>
</template>

<script>
import { addProps } from './data';

const computedProps = {};

addProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.quArticle.add[name];
      },
      set(value) {
        const key = `quArticle/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.quArticle.add[name];
    };
  }
});

export default {
  name: 'Add',
  data() {
    return {};
  },
  computed: {
    ...computedProps,
  },
  methods: {
    clickCancel() {
      this.$store.commit(`quArticle/updateVisible`, !1);
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;

  img {
    max-width: 100% !important;
  }
}
</style>
