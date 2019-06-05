<template>
  <el-dialog
    title="添加寺院"
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
      v-model="templeId"
      placeholder="请选择"
      size="small"
      style="width: 200px;"
      filterable
    >
      <el-option
        v-for="item in templeList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <span slot="footer" class="dialog-footer">
      <el-button @click="sVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">添 加</el-button>
    </span>
  </el-dialog>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch/index';

export default {
  name: 'Add',
  props: ['visible', 'templeList'],
  data() {
    return {
      sVisible: this.visible,
      templeId: '',
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
      const { templeId } = this;
      if (!templeId) {
        Notification({
          type: 'error',
          title: '提示',
          message: '请选择寺院',
        });
        return;
      }

      this.$emit('save', templeId);
      this.$emit('updateVisible', false);
    },
  },
};
</script>
