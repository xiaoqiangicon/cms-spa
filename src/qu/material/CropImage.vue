<template>
  <el-dialog
    :visible="cropImageVisible"
    title="裁剪图片"
    :before-close="clickCancel"
    width="800px"
  >
    <div class="content">
      <vueCropper
        ref="cropper"
        :img="cropImageUrl"
        outputType="png"
        :autoCrop="!0"
        :centerBox="!0"
        :outputSize="0.8"
      ></vueCropper>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="clickCancel">
        取 消
      </el-button>
      <el-button v-loading="loading" type="primary" @click="clickOk">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Notification } from 'element-ui';
import { VueCropper } from 'vue-cropper';

const computedProps = {};

['cropImageVisible', 'cropImageUrl', 'imageCropped', 'cropImageResult'].forEach(
  name => {
    computedProps[name] = {
      get() {
        return this.$store.state.quMaterial[name];
      },
      set(value) {
        this.$store.state.quMaterial[name] = value;
      },
    };
  }
);

export default {
  name: 'CropImage',
  components: { VueCropper },
  computed: {
    ...computedProps,
  },
  data() {
    return {
      loading: !1,
    };
  },
  watch: {
    cropImageVisible(value) {
      if (value) {
        // 可能还没渲染出来，需要延迟执行
        setTimeout(() => {
          this.$refs.cropper.startCrop();
        }, 300);
      }
    },
  },
  methods: {
    clickCancel() {
      this.$store.state.quMaterial.cropImageVisible = !1;
    },
    clickOk() {
      if (this.loading) return;

      this.loading = !0;

      this.$refs.cropper.getCropData(data => {
        window
          .fetch(window.uploadBase64Url, {
            method: 'post',
            body: JSON.stringify({ img: data }),
          })
          .then(res => res.json())
          .then(res => {
            this.loading = !1;
            this.$store.state.quMaterial.cropImageVisible = !1;
            this.$store.state.quMaterial.cropImageResult = window.uploadBase64Handle(
              res
            );
            this.$store.state.quMaterial.imageCropped += 1;
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  height: 500px;
}
</style>
