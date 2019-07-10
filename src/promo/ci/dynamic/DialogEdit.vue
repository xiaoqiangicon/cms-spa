<template>
  <el-dialog
    v-loading="loading"
    :close-on-click-modal="false"
    :title="detail.id ? '编辑' : '发布'"
    :visible.sync="sVisible"
    width="600"
    :before-close="
      () => {
        sVisible = false;
      }
    "
  >
    <div class="content">
      <el-form ref="form" :model="detail" label-width="80px">
        <el-form-item label="内容">
          <el-input
            v-model="detail.content"
            type="textarea"
            placeholder="请填写进展动态的内容"
            maxlength="300"
            rows="5"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="图片">
          <Upload :images="detail.images" :multiple="true" />
        </el-form-item>
        <el-form-item v-show="detail.id === 0" label="推送">
          <el-switch v-model="detail.ifPush" />
          <div>报名当前计划的用户都会推送。推送环境：App Push</div>
        </el-form-item>
      </el-form>
    </div>
    <div class="foot">
      <el-button size="small" type="primary" @click="save">
        保存并发布
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import seeFetch from 'see-fetch';
import './fetch';
import { Notification } from 'element-ui';
import Upload from 'com/upload/Upload'; // eslint-disable-line import/no-unresolved

export default {
  components: {
    Upload,
  },
  props: {
    visible: Boolean,
    detail: {
      type: Object,
      default: () => ({
        id: 0,
        content: '',
        images: [],
        ifPush: !1,
      }),
    },
  },
  data() {
    return {
      loading: !1,
      sVisible: this.visible,
    };
  },
  watch: {
    visible(val) {
      this.sVisible = val;
    },
    sVisible(val) {
      this.$emit('updateVisible', val);
    },
  },
  methods: {
    save() {
      const { id, content, images, ifPush } = this.detail;
      // 数据验证
      const verifyMsg = [];

      if (!content) verifyMsg.push('请填写内容');

      if (!images.length) verifyMsg.push('请上传图片');

      if (verifyMsg.length) {
        Notification({
          type: 'error',
          title: '提示',
          message: verifyMsg[0],
        });
        return;
      }

      this.loading = !0;
      seeFetch('promo/ci/dynamic/update', { id, content, images, ifPush }).then(
        res => {
          if (!res.success) {
            Notification({
              type: 'error',
              title: '提示',
              message: res.message,
            });
            return;
          }

          Notification({
            title: '提示',
            type: 'success',
            message: '保存成功',
          });
          this.$emit('updateVisible', !1);
          this.loading = !1;
          this.$emit('success');
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.foot {
  margin-top: 20px;
  text-align: center;
}
</style>
