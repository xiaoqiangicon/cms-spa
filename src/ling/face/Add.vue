<template>
  <el-dialog
    :visible="visible"
    :title="dialogTitle"
    :before-close="clickCancel"
    width="40%"
  >
    <div class="content">
      <div class="row">
        <div class="row-name">
          表情图片：
        </div>
        <Upload
          :images="covers"
          :multiple="false"
        />
      </div>
      <div class="row">
        <div class="row-name">
          发言内容：
        </div>
        <el-input
          v-model="content"
          size="small"
          style="width: 200px;"
        />
      </div>
      <div class="row">
        <div class="row-name">
          优先级：
        </div>
        <el-input
          v-model="priority"
          size="small"
          style="width: 200px;"
        />
      </div>
      <div class="row">
        <div class="row-name">
          类型：
        </div>
        <el-select
          v-model="type"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
        >
          <el-option
            v-for="type in types"
            :key="type.id"
            :value="type.id"
            :label="type.name"
          />
        </el-select>
      </div>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="clickCancel">
        取 消
      </el-button>
      <el-button
        v-loading="saving"
        type="primary"
        @click="clickOk"
      >
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Notification } from 'element-ui';
import seeFetch from 'see-fetch';
import Upload from '../../com/upload/Upload';
import { addProps, types } from './data';

const computedProps = {};

addProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.lingFace.add[name];
      },
      set(value) {
        const key = `lingFace/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.lingFace.add[name];
    };
  }
});

export default {
  name: 'Add',
  components: {
    Upload,
  },
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
      types,
    };
  },
  computed: {
    ...computedProps,
  },
  methods: {
    clickCancel() {
      this.$store.commit(`lingFace/updateVisible`, !1);
    },
    clickOk() {
      if (this.saving) return;

      let error;

      // eslint-disable-next-line prefer-destructuring
      this.cover = this.covers[0];
      const {
        cover,
        content,
        // priority,
        type,
      } = this;
      const priority = parseInt(this.priority, 10) || 0;

      if (!cover) error = '表情图片不能为空';
      else if (!content) error = '发言内容不能为空';

      if (error) {
        Notification({
          title: '提示',
          message: error,
        });
        return;
      }

      this.saving = !0;

      const params = {
        cover,
        content,
        priority,
        type,
      };

      if (this.isUpdate) {
        params.id = this.updateId;
        seeFetch('ling/face/update', params).then(res => {
          this.saving = !1;

          if (!res.success) {
            Notification({
              title: '提示',
              message: res.message,
            });
            return;
          }

          Notification({
            title: '提示',
            message: '更新成功',
          });

          this.$store.commit(`lingFace/updateVisible`, !1);
          this.ok();
        });
      } else {
        seeFetch('ling/face/add', params).then(res => {
          this.saving = !1;

          if (!res.success) {
            Notification({
              title: '提示',
              message: res.message,
            });
            return;
          }

          Notification({
            title: '提示',
            message: '添加成功',
          });

          this.$store.commit(`lingFace/updateVisible`, !1);
          this.ok();
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 0 20px;
}

.row {
  position: relative;
  margin-top: 20px;
  padding-left: 100px;
  min-height: 32px;

  &:first-child {
    margin-top: 0;
  }
}

.row-name {
  position: absolute;
  top: 0;
  left: 0;
  line-height: 32px;
  font-size: 16px;
}
</style>
