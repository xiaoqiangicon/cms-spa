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
          许愿标题：
        </div>
        <el-input v-model="title" size="small" style="width: 200px;" />
      </div>
      <div class="row pd-t-5">
        <div class="row-name">
          绑定守护者：
        </div>
        <el-radio v-model="hasGuard" :label="1" disabled>
          有
        </el-radio>
        <el-radio v-model="hasGuard" :label="0" disabled>
          无
        </el-radio>
      </div>
      <div v-if="hasGuard" class="row">
        <div class="row-name">
          守护者名称：
        </div>
        <el-input v-model="guardName" size="small" style="width: 200px;" />
      </div>
      <div v-if="hasGuard" class="row">
        <div class="row-name">
          守护者标签：
        </div>
        <el-input v-model="guardTags" size="small" style="width: 200px;" />
      </div>
      <div v-if="hasGuard" class="row">
        <div class="row-name">
          守护者形象：
        </div>
        <Upload :images="guardAvatars" :multiple="false" />
      </div>
      <div v-if="hasGuard" class="row">
        <div class="row-name">
          守护者简介：
        </div>
        <el-input v-model="guardIntro" type="textarea" size="small" />
      </div>
      <div v-if="hasGuard" class="row">
        <div class="row-name">
          书签图片：
        </div>
        <Upload :images="bookmarkImages" :multiple="false" />
      </div>
      <div v-if="hasGuard" class="row">
        <div class="row-name">
          入口按钮：
        </div>
        <el-input v-model="guardBtn" size="small" style="width: 200px;" />
      </div>
      <div v-if="!hasGuard" class="row">
        <div class="row-name">
          内页图片：
        </div>
        <Upload :images="attachCovers" :multiple="false" />
      </div>
      <div v-if="!hasGuard" class="row">
        <div class="row-name">
          分享图片：
        </div>
        <Upload :images="shareImages" :multiple="false" />
      </div>
      <div class="row">
        <div class="row-name">
          发布时间：
        </div>
        <el-date-picker
          v-model="publishDate"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          size="small"
          style="width: 200px;"
        />
      </div>
      <div class="row">
        <div class="row-name">
          结束时间：
        </div>
        <el-date-picker
          v-model="endDate"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          size="small"
          style="width: 200px;"
        />
      </div>
      <div class="row">
        <div class="row-name">
          愿望数加成：
        </div>
        <el-input v-model="wishCount" size="small" style="width: 200px;" />
      </div>
      <div class="row">
        <div class="row-name">
          排序权重：
        </div>
        <el-input v-model="priority" size="small" style="width: 200px;" />
      </div>
      <div class="row pd-t-5">
        <div class="row-name">
          隐藏：
        </div>
        <el-radio v-model="hide" :label="1">
          隐藏
        </el-radio>
        <el-radio v-model="hide" :label="0">
          不隐藏
        </el-radio>
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
import seeFetch from 'see-fetch';
import Upload from '../../com/upload/Upload';
import { numOfDate } from '../../util';
import { addProps } from './data';

const computedProps = {};

addProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.lingEntry.add[name];
      },
      set(value) {
        const key = `lingEntry/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.lingEntry.add[name];
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
    };
  },
  computed: {
    ...computedProps,
  },
  methods: {
    clickCancel() {
      this.$store.commit(`lingEntry/updateVisible`, !1);
    },
    clickOk() {
      if (this.saving) return;

      let error;

      const {
        title,
        hasGuard,
        guardName,
        guardTags,
        guardIntro,
        guardBtn,
        publishDate,
        endDate,
        hide,
      } = this;
      const wishCount = parseInt(this.wishCount, 10);
      const priority = parseInt(this.priority, 10);
      const [guardAvatar] = this.guardAvatars;
      const [attachCover] = this.attachCovers;
      const [shareImage] = this.shareImages;
      const [bookmarkImage] = this.bookmarkImages;

      if (!title) error = '许愿标题不能为空';
      else if (hasGuard && !guardName) error = '守护者名称不能为空';
      else if (hasGuard && !guardTags) error = '守护者标签不能为空';
      else if (hasGuard && !guardAvatar) error = '守护者形象不能为空';
      else if (hasGuard && !guardIntro) error = '守护者简介不能为空';
      else if (hasGuard && !bookmarkImage) error = '书签图片不能为空';
      else if (hasGuard && !guardBtn) error = '入口按钮不能为空';
      else if (!hasGuard && !attachCover) error = '内页图片不能为空';
      else if (!hasGuard && !shareImage) error = '分享图片不能为空';
      else if (!publishDate) error = '发布时间不能为空';
      else if (!endDate) error = '结束时间不能为空';
      else if (numOfDate(endDate) < numOfDate(publishDate))
        error = '结束时间不能大于发布时间';
      else if (!this.wishCount) error = '愿望数加成不能为空';
      else if (`${this.wishCount}`.length !== `${wishCount}`.length)
        error = '愿望数加成输入不合法';
      else if (wishCount <= 0) error = '愿望数加成必须是大于 0 的数字';
      else if (!this.priority) error = '排序权重不能为空';
      else if (`${this.priority}`.length !== `${priority}`.length)
        error = '排序权重输入不合法';
      else if (priority <= 0) error = '排序权重必须是大于 0 的数字';

      if (error) {
        Notification({
          title: '提示',
          message: error,
        });
        return;
      }

      this.saving = !0;

      const params = {
        title,
        hasGuard,
        guardName: hasGuard ? guardName : '',
        guardAvatar: hasGuard ? guardAvatar : '',
        guardTags: hasGuard ? guardTags : '',
        guardIntro: hasGuard ? guardIntro : '',
        bookmarkImage: hasGuard ? bookmarkImage : '',
        guardBtn: hasGuard ? guardBtn : '',
        attachCover: !hasGuard ? attachCover : '',
        shareImage: !hasGuard ? shareImage : '',
        publishDate,
        endDate,
        wishCount,
        priority,
        hide,
      };

      if (this.isUpdate) {
        params.id = this.updateId;
        seeFetch('ling/entry/update', params).then(res => {
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

          this.$store.commit(`lingEntry/updateVisible`, !1);
          this.ok();
        });
      } else {
        seeFetch('ling/entry/add', params).then(res => {
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

          this.$store.commit(`lingEntry/updateVisible`, !1);
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
