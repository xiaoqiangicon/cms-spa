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
        <el-table-column label="cms账户绑定" min-width="230">
          <template slot-scope="scope">
            <el-select
              v-model="adminList[scope.$index].cmsAccount"
              v-loading="!accountList.length"
              filterable
              placeholder="请选择或搜索cms账户"
              @change="changeCms(scope.row)"
            >
              <el-option
                v-for="item in accountList"
                :key="item.account"
                :label="item.name"
                :value="item.account"
              />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="访问寺院名称" min-width="230">
          <template slot-scope="scope">
            <el-select
              v-model="adminList[scope.$index].templeId"
              v-loading="!allTempleList.length"
              filterable
              placeholder="请选择或搜索寺院名称"
              @change="bindTemple(scope.row)"
            >
              <el-option
                v-for="item in getTempleInfo(scope.row.bindTempleIds)"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.temples.indexOf('-1') === -1"
              type="primary"
              @click="showAdminManage(scope.row, scope.$index)"
            >
              大区管理
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="管理" :visible.sync="dialogManageVisible">
      <el-form ref="form" label-width="120px">
        <el-form-item label="登录账号" :align="'left'">
          {{ dialogAdmin.account || '' }}
        </el-form-item>
        <el-form-item label="可访问大区">
          {{ dialogAreaList.length }}
        </el-form-item>
        <el-select
          v-model="dialogAreaList"
          v-loading="!areaList.length"
          filterable
          multiple
          style="margin-left: 10px; width: 80%;cursor: pointer;margin-bottom: 20px;"
          placeholder="请选择或搜索大区名称"
        >
          <el-option
            v-for="item in areaList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>

        <el-form-item label="可访问ERP系统">
          {{ dialogAdminVModel.length }}
        </el-form-item>
        <el-select
          v-model="dialogAdminVModel"
          filterable
          multiple
          collapse-tags
          style="margin-left: 10px; width: 80%;"
          placeholder="请选择或搜索寺院名称"
        >
          <el-option
            v-for="item in bindTempleList"
            :key="item.templeId"
            :label="item.name"
            :value="item.templeId"
            :disabled="dialogAdmin.templeId == item.templeId ? true : false"
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
      dialogManageVisible: false, // 是否展示管理弹框
      adminList: [], // erp账号列表
      allTempleList: [], // 所有寺院列表
      dialogAdmin: {}, // 选中的erp账号信息
      dialogAdminVModel: [], // 选中的erp账号绑定寺院列表
      dialogAreaList: [], // 选中的erp账号绑定的大区列表
      accountList: [], // 可绑定的cms账号列表
      accountId: 0, // 绑定的cms账号id
      areaList: [], // 地区列表
      bindTempleList: [
        { templeId: '13', name: '自在家测试帐号' },
        { templeId: '5591', name: '自在家' },
        { templeId: '5614', name: '禅在' },
        { templeId: '5642', name: '寺院活动' },
        { templeId: '5722', name: '自在好物' },
        { templeId: '6372', name: '名山推荐' },
        { templeId: '6482', name: '活动推荐' },
        { templeId: '6483', name: '寺院推荐' },
      ], // 固定的不属于大区的寺院
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
      // 获取可绑定的cms账号
      seeFetch('temple/super/getAccountList', {}).then(res => {
        if (res.success) {
          this.accountList = res.data;
        }
      });
      // 获取大区列表
      seeFetch('temple/super/getArea', { refresh: 1 }).then(res => {
        if (res.success) {
          this.areaList = res.areaList;
        }
      });
    },
    // 根据id返回对应绑定寺院信息
    getTempleInfo(ids) {
      if (ids && ids.length && this.allTempleList.length) {
        if (ids.indexOf('-1') !== -1) {
          return [...this.allTempleList];
        }
        return this.allTempleList.filter(item => ids.includes(`${item.id}`));
      }
      return [];
    },
    // 绑定cms账号
    changeCms(row) {
      seeFetch('temple/super/updateCms', {
        account: row.account,
        cmsAccount: row.cmsAccount,
      }).then(res => {
        if (res.success) {
          Notification({
            title: '提示',
            message: '绑定cms账号成功',
          });
        } else {
          Notification({
            title: '提示',
            type: 'error',
            message: res.msg,
          });
        }
      });
    },
    // 更新用户绑定的寺院ID
    bindTemple(adminItem) {
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
      this.dialogAdminVModel = item.otherTempleIds
        ? item.otherTempleIds.split(',')
        : [];
      this.dialogAreaList = item.areas;
      this.dialogManageVisible = true;
    },
    // 更新绑定可选的寺院
    updateAdminTempleBind() {
      const that = this;
      seeFetch('temple/super/updateAdminTempleBind', {
        account: that.dialogAdmin.account,
        bindTempleIds: that.dialogAdminVModel.join(','),
        area: that.dialogAreaList.join(','),
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }
        that.dialogManageVisible = false;
        Notification({
          type: 'success',
          title: '提示',
          message: '更新成功',
        });
        window.location.reload();
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
