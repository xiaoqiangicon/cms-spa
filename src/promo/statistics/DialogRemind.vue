<template>
  <el-dialog
    title="订单提醒"
    :visible.sync="sVisible"
    :before-close="
      () => {
        sVisible = false;
      }
    "
  >
    <div class="mg-b-20">
      添加需要订单提醒的微信号
    </div>
    <!-- <div class="cell" v-for="item in managerList" :key="item.id">
      <div class="avatar"></div>
      <div class="nickname">{{item.nickname}}</div>
    </div>-->
    <el-checkbox-group v-model="userId">
      <div v-for="manager in managerList" :key="manager.id" class="cell">
        <el-checkbox :label="manager.id">
          <div class="avatar">
            <img :src="manager.avatar" alt="" />
          </div>
          <div class="nickname">
            {{ manager.nickname }}
          </div>
        </el-checkbox>
      </div>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

export default {
  name: 'DialogRemind',
  props: ['visible', 'templeId'],
  data() {
    return {
      sVisible: this.visible,

      managerList: [],
      userId: [],
    };
  },
  watch: {
    sVisible(val) {
      this.$emit('updateVisible', val);

      if (val) {
        this.init();
      }
    },
    visible(val) {
      this.sVisible = val;
    },
  },
  methods: {
    init() {
      this.managerList = [];
      this.userId = [];
      this.getManagerList();
    },
    getManagerList() {
      const { templeId } = this;
      seeFetch('promo/statistics/getManageList', { templeId }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.managerList = res.data;

        const userId = [];
        res.data.forEach(({ id, isManager }) => {
          if (isManager) {
            userId.push(id);
          }
        });
        this.userId = userId;
      });
    },
    submit() {
      const { templeId, userId } = this;

      seeFetch('promo/statistics/updateManagerList', { templeId, userId }).then(
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
            type: 'success',
            title: '提示',
            message: '保存成功',
          });

          this.$emit('updateVisible', !1);
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.cell {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 10px;
}
.avatar {
  display: inline-block;
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.nickname {
  display: inline-block;
  margin-left: 10px;
}
</style>
