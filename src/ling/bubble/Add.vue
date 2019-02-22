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
          气泡图片：
        </div>
        <Upload :images="covers" :multiple="false" />
      </div>
      <div class="row">
        <div class="row-name">
          气泡文字：
        </div>
        <el-input
          v-model="text"
          :maxlength="6"
          size="small"
          style="width: 200px;"
        />
      </div>
      <div class="row">
        <div class="row-name">
          重复频率：
        </div>
        <el-select
          v-model="frequency"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
        >
          <el-option value="1" label="只出现1次" />
          <el-option value="2" label="每天出现1次" />
        </el-select>
      </div>
      <div class="row">
        <div class="row-name">
          生效日期：
        </div>
        <el-date-picker
          v-model="date"
          align="right"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        />
      </div>
      <div class="row">
        <div class="row-name">
          生效时间：
        </div>
        <el-select
          v-model="startHour"
          placeholder="开始时间"
          size="small"
          style="width: 100px;"
        >
          <el-option
            v-for="n in 25"
            :key="n - 1"
            :value="n - 1"
            :label="n - 1 + ' 点'"
          />
        </el-select>
        <span class="mg-l-10 mg-r-10">
          至
        </span>
        <el-select
          v-model="endHour"
          placeholder="结束时间"
          size="small"
          style="width: 100px;"
        >
          <el-option
            v-for="n in 25"
            :key="n - 1"
            :value="n - 1"
            :label="n - 1 + ' 点'"
          />
        </el-select>
      </div>
      <div class="row">
        <div class="row-name">
          跳转：
        </div>
        <el-select
          v-model="redirect"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
        >
          <el-option value="1" label="朋友圈分享页" />
          <el-option value="2" label="暴富锦鲤页" />
          <el-option value="3" label="H5链接" />
          <el-option value="4" label="今日运程" />
        </el-select>
      </div>
      <div v-show="redirect === '3'" class="row">
        <div class="row-name">
          H5链接：
        </div>
        <el-input v-model="link" size="small" style="width: 200px;" />
      </div>
      <div v-show="redirect === '1'" class="row">
        <div class="row-name">
          分享图片：
        </div>
        <el-select
          v-model="shareImageType"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
        >
          <el-option value="1" label="默认图片" />
          <el-option value="2" label="2019元旦图片" />
          <el-option value="3" label="暴富锦鲤图片" />
          <el-option value="4" label="迎财神" />
        </el-select>
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
import { addProps } from './data';

const computedProps = {};

addProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.lingBubble.add[name];
      },
      set(value) {
        const key = `lingBubble/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.lingBubble.add[name];
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
    date: {
      get() {
        return this.startDate && this.endDate
          ? [this.startDate, this.endDate]
          : '';
      },
      set(value) {
        const [startDate, endDate] = value;

        this.startDate = startDate;
        this.endDate = endDate;
      },
    },
  },
  methods: {
    clickCancel() {
      this.$store.commit(`lingBubble/updateVisible`, !1);
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

      if (!cover) error = '气泡图片不能为空';
      else if (!text) error = '气泡文字不能为空';
      else if (!startDate) error = '生效日期 - 开始日期不能为空';
      else if (!endDate) error = '生效日期 - 结束日期不能为空';
      else if (startHour >= endHour)
        error = '生效时间 - 结束时间需大于开始时间';
      else if (redirect === 3 && !link) error = 'H5链接不能为空';

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
      };

      if (this.isUpdate) {
        params.id = this.updateId;
        seeFetch('ling/bubble/update', params).then(res => {
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

          this.$store.commit(`lingBubble/updateVisible`, !1);
          this.ok();
        });
      } else {
        seeFetch('ling/bubble/add', params).then(res => {
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

          this.$store.commit(`lingBubble/updateVisible`, !1);
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
