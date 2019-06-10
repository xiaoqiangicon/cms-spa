<template>
  <el-dialog
    title="添加选择项"
    :visible.sync="sVisible"
    width="30%"
    :before-close="
      () => {
        sVisible = false;
      }
    "
  >
    <span class="mg-r-10">请选择</span>
    <el-select
      v-model="subId"
      placeholder="请选择"
      size="small"
      style="width: 250px;"
      filterable
    >
      <el-option
        v-for="item in subList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        :disabled="
          !!item.isConversion ||
            !!item.conversionSubdivide ||
            (!!item.isZizaijiaCommodity && !!item.isOrder)
        "
      >
        <span class="fl-left">{{ item.name }}</span>
        <span
          class="fl-right"
          style="color:#8492a6;font-size:13px;"
        >
          {{
            item.isConversion
              ? '已组合'
              : item.conversionSubdivide
                ? ''
                : item.isZizaijiaCommodity && item.isOrder
                  ? ''
                  : ''
          }}
        </span>
      </el-option>
    </el-select>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="sVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="save"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import './fetch/index';
import { Notification } from 'element-ui';

export default {
  name: 'Add',
  props: {
    visible: Boolean,
    subList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      sVisible: this.visible,
      subId: '',
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
  created() {},
  methods: {
    save() {
      const { subId } = this;
      if (!subId) {
        Notification({
          type: 'error',
          title: '提示',
          message: '请选择选择项',
        });
        return;
      }

      this.$emit('save', subId);
      this.$emit('updateVisible', false);
    },
  },
};
</script>

<style lang="less" scoped></style>
