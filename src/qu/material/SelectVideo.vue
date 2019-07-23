<template>
  <el-dialog
    :visible="selectVideoVisible"
    title="选择视频"
    :before-close="clickCancel"
    width="40%"
  >
    <div class="content">
      <div
        v-for="(item, index) in videosToSelect"
        :key="index"
        class="video"
        :class="item.selected ? 'active' : ''"
        @click="select(item)"
      >
        <iframe
          frameborder="0"
          allowfullscreen=""
          :src="item.url"
          style="width: 100%; height: 100%"
        />
        <div class="video-overlay" />
        <button class="clean video-mask">
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
  'videosToSelect',
  'selectVideoVisible',
  'selectVideoResult',
  'videoSelected',
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
  name: 'SelectVideo',
  computed: {
    ...computedProps,
  },
  methods: {
    clickCancel() {
      this.$store.state.quMaterial.selectVideoVisible = !1;
    },
    clickOk() {
      const selectedItems = this.videosToSelect.filter(i => i.selected);

      if (!selectedItems.length) {
        Notification({
          title: '提示',
          message: '请至少选一个视频',
        });
        return;
      }

      this.$store.state.quMaterial.selectVideoResult = selectedItems[0].url;
      this.$store.state.quMaterial.selectVideoVisible = !1;
      this.$store.state.quMaterial.videoSelected += 1;
    },
    select(item) {
      /* eslint-disable no-param-reassign */
      this.videosToSelect.forEach(i => {
        i.selected = !1;
      });
      item.selected = !0;
    },
  },
};
</script>

<style lang="less" scoped>
.video {
  position: relative;
  display: inline-block;
  height: 100px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.video-img {
  height: 100%;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-mask {
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

.video.active .video-mask {
  display: block;
}
</style>
