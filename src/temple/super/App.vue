<template>
  <div class="container">
    <el-card>
      <div class="tip">
        超级访问功能是方便内部协助寺院管理与维护寺院的后台。
        <br />可为某个寺院设置超级账户，每次只可设置一家寺院。若切换寺院后，则该账户会失效，不可访问。
      </div>
    </el-card>
    <div class="mg-t-20" />
    <el-card style="min-height:400px;">
      <div class="mg-t-20 mg-b-40">
        <span style="display: inline-block;width:100px;" class="l-hg-32"
          >当前登录账号</span
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="small" type="primary" plain>
          miaoyanAdmin
        </el-button>
      </div>
      <div>
        <span style="display: inline-block;width:100px;" class="l-hg-32"
          >绑定的寺院名</span
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <el-select
          v-model="templeId"
          v-loading="loading"
          filterable
          placeholder="请选择"
          size="small"
          style="width: 200px;"
        >
          <el-option
            v-for="item in list"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          /> </el-select
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button
          v-loading="loading"
          size="small"
          type="primary"
          @click="updateAdmin"
        >
          保存
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch';

export default {
  name: 'App',
  data() {
    return {
      loading: !0,
      templeId: '',
      list: [],
    };
  },
  created() {
    this.requestList();
  },
  methods: {
    requestList() {
      this.loading = !0;

      seeFetch('temple/super/templeList', { isTest: 1, verify: -1 }).then(
        listRes => {
          if (!listRes.success) {
            Notification({
              title: '提示',
              message: listRes.message,
            });
            return;
          }

          this.list = listRes.data;

          seeFetch('temple/super/getAdmin', {}).then(res => {
            if (!res.success) {
              Notification({
                title: '提示',
                message: res.message,
              });
              return;
            }

            const { templeId } = res.data;
            this.templeId = res.data.templeId ? templeId : '';
            this.loading = !1;
          });
        }
      );
    },
    updateAdmin() {
      const { templeId } = this;
      seeFetch('temple/super/updateAdmin', { templeId }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        Notification({
          type: 'success',
          title: '提示',
          message: '更新成功',
        });
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}

.tip {
  width: 400px;
  padding: 15px;
  border: 1px solid #b7eb8f;
  border-radius: 4px;
  background-color: #f6ffed;
  color: rgba(0, 0, 0, 0.65);
}
</style>
