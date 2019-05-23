<template>
  <el-dialog
    :visible="selectImageVisible"
    title="选择图片"
    :before-close="clickCancel"
    width="40%"
  >
    <div class="content">
      <div
        v-for="(item, index) in imagesToSelect"
        :key="index"
        class="image"
        :class="item.selected ? 'active' : ''"
        @click="toggle(item)"
      >
        <img :src="item.url" class="image-img" />
        <button class="clean image-mask">
          √
        </button>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="clickCancel">
        取 消
      </el-button>
      <el-button type="primary" @click="clickOk">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Notification } from 'element-ui';

const computedProps = {};

[
  'imagesToSelect',
  'selectImageVisible',
  'selectImageResult',
  'imagesSelected',
].forEach(name => {
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
  name: 'SelectImage',
  computed: {
    ...computedProps,
  },
  methods: {
    clickCancel() {
      this.$store.state.quMaterial.selectImageVisible = !1;
    },
    clickOk() {
      const selectedItems = this.imagesToSelect.filter(i => i.selected);

      if (!selectedItems.length) {
        Notification({
          title: '提示',
          message: '请至少选一张图片',
        });
        return;
      }

      this.$store.state.quMaterial.selectImageResult = selectedItems.map(
        i => i.url
      );
      this.$store.state.quMaterial.selectImageVisible = !1;
      this.$store.state.quMaterial.imagesSelected += 1;
    },
    toggle(item) {
      /* eslint-disable no-param-reassign */
      item.selected = !item.selected;
    },
  },
};
</script>

<style lang="less" scoped>
.image {
  position: relative;
  display: inline-block;
  height: 100px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.image-img {
  height: 100%;
}

.image-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 18px;
  display: none;
}

.image.active .image-mask {
  display: block;
}
</style>
