<template>
  <el-dialog
    title="订单确认"
    :visible.sync="sVisible"
    width="500"
    :before-close="
      () => {
        sVisible = false;
      }
    "
  >
    <div class="table">
      <div class="row head">
        <div>用户ID</div>
        <div>昵称</div>
        <div>值</div>
      </div>
      <div class="row total">
        <div>合计</div>
        <div>用户数：{{ list.length }}</div>
        <div>{{ selected.length }}</div>
      </div>
      <div v-for="item in list" :key="item.id" class="row">
        <div>{{ item.id }}</div>
        <div>{{ item.nickname }}</div>
        <div>{{ item.length }}</div>
      </div>
    </div>
    <div class="foot">
      <el-button size="small" type="primary" @click="save">
        确定生成
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import seeFetch from 'see-fetch';
import './fetch';
import { Notification } from 'element-ui';

export default {
  props: {
    visible: Boolean,
    selected: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      sVisible: this.visible,
    };
  },
  computed: {
    list() {
      const res = {};
      this.selected.forEach(item => {
        if (res[item.id]) {
          res[item.id].length += 1;
        } else {
          res[item.id] = {
            id: item.id,
            nickname: item.nickname,
            length: 1,
          };
        }
      });
      return Object.values(res);
    },
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
      seeFetch('promo/ci/order/update', {}).then(res => {
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
          message: '订单生成成功',
        });
        this.$emit('updateVisible', !1);
        this.$emit('success');
      });
    },
  },
};
</script>

<style lang="less" scoped>
.row {
  display: flex;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-bottom: none;
  &.total {
    background: #ecf8ff;
  }
  &:last-child {
    border-bottom: 1px solid #ddd;
  }
  div {
    text-align: center;
    flex: 1;
  }
}
.foot {
  margin-top: 20px;
  text-align: center;
}
</style>
