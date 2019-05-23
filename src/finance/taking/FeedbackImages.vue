<template>
  <el-dialog
    :visible="visible"
    :title="dialogTitle"
    :before-close="clickCancel"
    width="40%"
  >
    <div class="content">
      <Upload :images="handleImages" :multiple="!0" />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="clickCancel">
        取 消
      </el-button>
      <el-button v-loading="saving" type="primary" @click="clickOk">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Notification } from 'element-ui';
import Upload from '../../com/upload/Upload';
import { addProps } from './data';

const computedProps = {};

addProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.financeTaking.add[name];
      },
      set(value) {
        const key = `financeTaking/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.financeTaking.add[name];
    };
  }
});
export default {
  name: 'FeedbackImages',
  components: { Upload },
  props: {
    ok: {
      type: Function,
      required: !0,
      default: undefined,
    },
  },
  data() {
    return {
      saving: !1,
      handleImages: [],
    };
  },
  computed: {
    ...computedProps,
  },
  watch: {
    editFeedbackImages() {
      this.handleImages.splice(0, this.handleImages.length);
      this.handleImages.push(...this.editFeedbackImages);
    },
  },
  methods: {
    clickCancel() {
      this.$store.commit(`financeTaking/updateVisible`, !1);
    },
    clickOk() {
      if (!this.handleImages.length) {
        Notification({
          title: '提示',
          message: '请至少上传一张图片',
        });
        return;
      }

      this.ok([...this.handleImages]);
      this.$store.commit(`financeTaking/updateVisible`, !1);
    },
  },
};
</script>

<style scoped>
.content {
  padding: 0 20px;
}

.content >>> .image {
  margin-bottom: 10px;
}
</style>
