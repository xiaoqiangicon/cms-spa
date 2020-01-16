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
        output-type="png"
        :auto-crop="!0"
        :center-box="!0"
        :output-size="0.8"
      />
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
import { VueCropper } from 'vue-cropper';
import { base64Url, base64Handle } from '../../configs/upload-extra';

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
  data() {
    return {
      loading: !1,
    };
  },
  computed: {
    ...computedProps,
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
          .fetch(base64Url, {
            method: 'post',
            body: JSON.stringify({ img: data }),
          })
          .then(res => res.json())
          .then(res => {
            this.loading = !1;
            this.$store.state.quMaterial.cropImageVisible = !1;
            this.$store.state.quMaterial.cropImageResult = base64Handle(res);
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
