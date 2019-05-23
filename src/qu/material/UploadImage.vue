<template>
  <el-dialog
    :visible="uploadImageVisible"
    title="上传图片"
    :before-close="clickCancel"
    width="40%"
  >
    <div class="content">
      <Upload :images="uploadImageResult" :multiple="!0" />
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
import Upload from '../../com/upload/Upload';

const computedProps = {};

['uploadImageVisible', 'uploadImageResult', 'imagesUploaded'].forEach(name => {
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
  name: 'UploadImage',
  components: { Upload },
  computed: {
    ...computedProps,
  },
  methods: {
    clickCancel() {
      this.$store.state.quMaterial.uploadImageVisible = !1;
    },
    clickOk() {
      if (!this.uploadImageResult.length) {
        Notification({
          title: '提示',
          message: '请至少上传一张图片',
        });
        return;
      }

      this.$store.state.quMaterial.uploadImageVisible = !1;
      this.$store.state.quMaterial.imagesUploaded += 1;
    },
  },
};
</script>
