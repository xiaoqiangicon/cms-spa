<template>
  <el-dialog
    :visible="detailVisible"
    title="详情"
    :before-close="clickCancel"
    width="450px"
  >
    <div class="preview mg-t-20">
      <p
        v-for="(item, index) in detailJsonContent.content"
        :key="index"
        class="item"
        @click="showActions(index)"
      >
        <span v-if="item.type === 1">{{ item.content }}</span>
        <img v-if="item.type === 2" :src="item.content" />
        <iframe
          v-if="item.type === 3"
          allowfullscreen=""
          frameborder="0"
          width="500"
          height="375"
          :src="item.content"
        />
      </p>
    </div>
  </el-dialog>
</template>

<script>
const computedProps = {};

['detailVisible', 'detailJsonContent'].forEach(name => {
  computedProps[name] = {
    get() {
      return this.$store.state.quMaterial[name];
    },
    set(value) {
      this.$store.state.quMaterial[name] = value;
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
      this.$store.state.quMaterial.detailVisible = !1;
    },
  },
};
</script>

<style lang="less" scoped>
.preview {
  width: 375px;
  border-radius: 5px;
  border: 1px solid #eee;
  padding: 20px;
  margin: 0 auto;

  img {
    width: 100%;
  }

  p {
    margin-bottom: 10px;
    cursor: pointer;
  }
}
</style>
