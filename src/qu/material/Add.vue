<template>
  <el-dialog
    :visible="visible"
    :title="dialogTitle"
    :before-close="clickCancel"
    width="500px"
  >
    <div class="content">
      <el-alert
        title="提示：点击文字或图片进行操作"
        type="success"
        effect="dark"
      />
      <div class="preview mg-t-20">
        <draggable v-model="jsonContent.content">
          <transition-group>
            <p
              v-for="(item, index) in jsonContent.content"
              :key="index"
              class="item"
              @click="showActions(index)"
            >
              <span v-if="item.type === 1">{{ item.content }}</span>
              <img v-if="item.type === 2" :src="item.content" />
            </p>
          </transition-group>
        </draggable>
      </div>
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
import Draggable from 'vuedraggable';
import seeFetch from 'see-fetch';
import { addProps } from './data';
import { makeJsonItem, PARSE_TYPE_TEXT, PARSE_TYPE_IMAGE } from './parse';

const computedProps = {};

addProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.quMaterial.add[name];
      },
      set(value) {
        const key = `quMaterial/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.quMaterial.add[name];
    };
  }
});

['action', 'selectAction'].forEach(name => {
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
  name: 'Add',
  components: {
    Draggable,
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
      handleIndex: -1,
    };
  },
  computed: {
    ...computedProps,
  },
  watch: {
    selectAction() {
      if (this.action === 'edit') {
        const item = this.jsonContent.content[this.handleIndex];

        this.$prompt('请输入内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: item.content,
        }).then(({ value }) => {
          if (!value) return;

          item.content = value;
        });

        return;
      }

      if (this.action === 'delete') {
        this.jsonContent.content.splice(this.handleIndex, 1);
        return;
      }

      // insertTextBefore, insertTextAfter, insertImageBefore, insertImageAfter
      this.$prompt('请输入内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if (!value) return;

        const index =
          this.action === 'insertTextBefore' ||
          this.action === 'insertImageBefore'
            ? this.handleIndex
            : this.handleIndex + 1;
        const type =
          this.action === 'insertTextBefore' ||
          this.action === 'insertTextAfter'
            ? PARSE_TYPE_TEXT
            : PARSE_TYPE_IMAGE;
        this.jsonContent.content.splice(index, 0, makeJsonItem(type, value));
      });
    },
  },
  methods: {
    showActions(index) {
      this.handleIndex = index;
      this.$store.state.quMaterial.actionVisible = !0;
    },
    clickCancel() {
      this.$store.commit(`quMaterial/updateVisible`, !1);
    },
    clickOk() {
      if (this.saving) return;

      let error;

      // eslint-disable-next-line prefer-destructuring
      this.cover = this.covers[0];
      const {
        cover,
        text,
        startDate,
        endDate,
        startHour,
        endHour,
        link,
      } = this;
      const frequency = parseInt(this.frequency, 10);
      const redirect = parseInt(this.redirect, 10);
      const shareImageType = parseInt(this.shareImageType, 10);
      const entryId = parseInt(this.entryId, 10) || 0;

      if (!cover) error = '气泡图片不能为空';
      else if (!text) error = '气泡文字不能为空';
      else if (!startDate) error = '生效日期 - 开始日期不能为空';
      else if (!endDate) error = '生效日期 - 结束日期不能为空';
      else if (startHour >= endHour)
        error = '生效时间 - 结束时间需大于开始时间';
      else if (redirect === 3 && !link) error = 'H5链接不能为空';
      else if (redirect === 5 && !entryId) error = '许愿入口不能为空';

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
        text,
        frequency,
        startDate,
        endDate,
        startHour,
        endHour,
        redirect,
        link: redirect === 3 ? link : '',
        shareImageType: redirect === 1 ? shareImageType : 1,
        entryId: redirect === 5 ? entryId : 0,
      };

      if (this.isUpdate) {
        params.id = this.updateId;
        seeFetch('qu/material/update', params).then(res => {
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

          this.$store.commit(`quMaterial/updateVisible`, !1);
          this.ok();
        });
      } else {
        seeFetch('qu/material/add', params).then(res => {
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

          this.$store.commit(`quMaterial/updateVisible`, !1);
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

.preview {
  width: 375px;
  border-radius: 5px;
  border: 1px solid #eee;
  padding: 20px;

  img {
    width: 100%;
  }

  p {
    margin-bottom: 10px;
    cursor: pointer;
  }

  .item:hover {
    border-radius: 5px;
    background-color: #eee;
  }
}
</style>
