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
      <el-table v-loading="tableLoading" :data="adminList" style="width: 100%">
        <el-table-column prop="account" label="登录账号" min-width="160" />

        <el-table-column label="访问寺院名称" min-width="230">
          <template slot-scope="scope">
            <el-select
              v-model="adminList[scope.$index].templeId"
              v-loading="!allTempleList.length"
              filterable
              placeholder="请选择或搜索寺院名称"
            >
              <el-option
                v-for="item in getTempleInfo(scope.row.temples)"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" @click="updateAdmin(scope.row)">
              保存
            </el-button>
            <el-button
              v-if="scope.row.temples.indexOf('-1') === -1"
              type="primary"
              @click="showAdminManage(scope.row, scope.$index)"
            >
              管理
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="管理" :visible.sync="dialogManageVisible">
      <el-form ref="form" label-width="80px">
        <el-form-item label="登录账号">
          {{ dialogAdmin.account || '' }}
        </el-form-item>
        <el-form-item label="允许访问">
          {{ dialogAdminVModel.length }}
        </el-form-item>
        <el-select
          v-model="dialogAdminVModel"
          v-loading="!allTempleList.length"
          filterable
          multiple
          collapse-tags
          style="margin-left: 10px; width: 80%;"
          placeholder="请选择或搜索寺院名称"
        >
          <el-option
            v-for="item in allTempleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :disabled="dialogAdmin.templeId == item.id ? true : false"
          />
        </el-select>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateAdminTempleBind">
          保存
        </el-button>
      </div>
    </el-dialog>
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
      tableLoading: true,
      dialogManageVisible: false,
      adminList: [],
      allTempleList: [],
      dialogAdmin: {},
      dialogAdminIndex: '',
      dialogAdminVModel: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      const that = this;
      that.tableLoading = true;
      // 获取超级管理员及访问寺院信息
      seeFetch('temple/super/getAdmin', {}).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }
        if (res.data.adminList && res.data.adminList.length) {
          const aList = res.data.adminList;
          const temples = res.data.templeList || [];
          aList.forEach((item, index) => {
            aList[index].templeId = String(aList[index].templeId);
            if (typeof temples[item.account] !== 'undefined') {
              aList[index].temples = String(temples[item.account]).split(',');
            } else {
              aList[index].temples = [];
            }
          });
          that.adminList = aList;
        }
        that.tableLoading = false;
      });
      // 获取寺院列表
      seeFetch('temple/super/templeList', { isTest: 1, verify: -1 }).then(
        listRes => {
          if (!listRes.success) {
            Notification({
              title: '提示',
              message: listRes.message,
            });
            return;
          }
          /* eslint no-param-reassign: "error" */
          this.allTempleList = listRes.data.map(item => {
            item.id = String(item.id);
            item.name = `${item.id} - ${item.name}`;
            return item;
          });
        }
      );
    },
    // 根据id返回对应寺院信息
    getTempleInfo(ids) {
      if (ids && ids.length && this.allTempleList.length) {
        if (ids.indexOf('-1') !== -1) {
          return [...this.allTempleList];
        }
        return this.allTempleList.filter(item => ids.includes(`${item.id}`));
      }
      return [];
    },
    // 更新用户绑定的寺院ID
    updateAdmin(adminItem) {
      const { account, templeId } = adminItem;
      seeFetch('temple/super/updateAdmin', { account, templeId }).then(res => {
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
    // 显示管理对话框 设置当前用户数据
    showAdminManage(item, index) {
      this.dialogAdmin = item;
      this.dialogAdminVModel = [...item.temples];
      this.dialogAdminIndex = index;
      this.dialogManageVisible = true;
    },
    // 更新绑定可选的寺院
    updateAdminTempleBind() {
      const that = this;
      seeFetch('temple/super/updateAdminTempleBind', {
        account: that.dialogAdmin.account,
        bindTempleIds: that.dialogAdminVModel.join(','),
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }
        that.adminList[that.dialogAdminIndex].temples = [
          ...that.dialogAdminVModel,
        ];
        that.dialogManageVisible = false;
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
