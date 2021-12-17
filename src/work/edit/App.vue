<template>
  <div class="container">
    <el-card>
      <div class="input-name">
        <p class="title">项目名称</p>
        <el-input v-model="name" :disabled="inputDisabled"></el-input>
      </div>
      <div class="target-money">
        <p class="title">项目目标(元)</p>
        <el-input
          v-model="money"
          :disabled="inputDisabled"
          type="number"
        ></el-input>
      </div>
      <div class="manager-name">
        <p class="title">项目负责人</p>
        <el-select
          v-model="managerId"
          size="small"
          placeholder="请选择项目负责人"
          filterable
          :disabled="inputDisabled"
        >
          <el-option
            v-for="item in managerList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <p class="tips">设置成功后不可修改，请使用项目列表转交功能</p>
      </div>
      <div class="">
        <div class="detail-header">
          <p>项目设置</p>
          <el-button @click="add" type="primary" v-if="!isEnd"
            >新增子项目</el-button
          >
        </div>
        <el-table
          v-loading="loading"
          highlight-current-row
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="项目ID" prop="contentId" :align="'center'" />
          <el-table-column label="子项目名称" prop="name" :align="'center'" />
          <el-table-column label="状态" prop="payMoney" :align="'center'">
            <template slot-scope="scope">
              <div
                :class="{
                  'blue-icon': !scope.row.isEnd,
                  'orange-icon': scope.row.isEnd,
                }"
              >
                {{ scope.row.isEnd ? scope.row.endTime : '进行中' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="添加时间" prop="addTime" :align="'center'" />
          <el-table-column label="操作" prop="payMoney" :align="'center'">
            <template slot-scope="scope">
              <div>
                <span
                  class="edit"
                  @click="deliver(scope.row)"
                  v-if="inputDisabled"
                  >转交到</span
                >
                <span class="edit del" @click="del(scope.row)">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          class="create"
          type="primary"
          @click="create"
          v-if="!inputDisabled"
          v-loading="saveLoading"
          >保存</el-button
        >
      </div>
    </el-card>
    <el-dialog title="删除" :visible.sync="delDialogVisible" width="30%">
      <p class="del-tips">
        你确定删除 <span class="buddhist-name">{{ delBuddhistName }}</span> 吗？
      </p>
      <p>
        注意：若需要将子项目转交和归类到其他的父项目中，请使用转交功能；不能删除后重新加到别的项目中。若出现添加错误等情况，超级管理员可使用删除功能。
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delConfirm">确认删除</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增子项目" :visible.sync="addDialogVisible" width="40%">
      <div>
        <el-input
          v-model="searchCommodity"
          style="width: 80%;"
          type="number"
          @mousewheel.native.prevent
          placeholder="请输入子项目id查找选择"
        ></el-input>
        <el-button style="width: 15%;" @click="addCommodity">查找</el-button>
      </div>
      <div class="commodity-list">
        <el-tag
          closable
          v-for="(item, key) in contents"
          :key="item.id"
          @close="delCommodity(key)"
          style="margin: 10px 10px 0 0"
          >{{ item.label }}</el-tag
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addConfirm">确认添加</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="转交至父项目"
      :visible.sync="deliverDialogVisible"
      width="40%"
    >
      <p class="warn-tips orange-icon">
        提示：使用转交功能，请谨慎操作且需超级管理员同意。
      </p>
      <el-select
        v-model="pid"
        v-loading="!projectList.length"
        filterable
        placeholder="请填写关键词和ID搜索"
        style="width: 70%;"
      >
        <el-option
          v-for="item in projectList"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deliverConfirm">确认转交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import { urlParams } from '../../../../pro-com/src/utils';

export default {
  data() {
    return {
      money: '',
      name: '',
      managerId: '',
      id: 0,
      loading: !0,
      list: [], // 子项目list
      managerList: [], // 管理员list
      buddhistList: [], // 可以添加的子项目list
      projectList: [], // 父项目list
      delDialogVisible: !1,
      addDialogVisible: !1,
      deliverDialogVisible: !1,
      delBuddhistName: '', // 删除子项目的佛事名
      contentId: 0, // 删除和转交子项目的id
      contents: [], // 选择新增的子项目
      pid: '', // 转交的项目id
      saveLoading: !1,
      searchCommodity: '', // 搜索子项目id
      commodityList: [], // 选中的
    };
  },
  created() {
    this.id = parseInt(this.$route.params.id, 10);
    // this.getNameList();
    this.getManagerList();
    if (this.id) {
      this.getDetail();
    } else {
      this.loading = !1;
    }
    console.log(this.id);
  },
  computed: {
    // 编辑时不可修改
    inputDisabled() {
      return this.id > 0 ? true : false;
    },
    // 父项目结束时不展示一些操作
    isEnd() {
      let isEnd = parseInt(this.$route.query.isEnd, 10);

      return isEnd;
    },
  },
  methods: {
    getDetail() {
      seeFetch('work/edit/detail', { pid: this.id }).then(res => {
        if (res.success) {
          this.list = res.data.contentList;
          this.managerId = res.data.managerId;
          this.money = res.data.targetMoney;
          this.name = res.data.name;
          this.loading = !1;
        } else {
          Notification({
            title: '提示',
            message: res.msg,
          });
        }
      });
    },
    getManagerList() {
      seeFetch('work/edit/manager', {}).then(res => {
        if (res.success) {
          this.managerList = res.data;
        }
      });
    },
    getProjectList() {
      seeFetch('work/edit/getList', { type: 0 }).then(res => {
        if (res.success) {
          this.projectList = res.data;
        } else {
          Notification({
            title: '提示',
            message: res.msg,
          });
        }
      });
    },
    getNameList() {
      seeFetch('work/edit/nameList', {}).then(res => {
        if (res.success) {
          this.buddhistList = res.data;
        } else {
          Notification({
            title: '提示',
            message: res.msg,
          });
        }
      });
    },
    addCommodity() {
      let { searchCommodity } = this;
      if (!searchCommodity) return;

      seeFetch('work/edit/getCommodity', { commodityId: searchCommodity }).then(
        res => {
          this.searchCommodity = '';
          if (res.success) {
            this.contents.push(res.data);
          } else {
            Notification({
              title: '提示',
              message: res.msg,
            });
          }
        }
      );
    },
    delCommodity(key) {
      this.contents.splice(key, 1);
    },
    deliver(row) {
      this.deliverDialogVisible = !0;
      this.contentId = row.id;
      this.getProjectList();
    },
    deliverConfirm() {
      seeFetch('work/edit/editContent', {
        op: 2,
        pid: this.id,
        id: this.contentId,
        deliverPid: this.pid,
      }).then(res => {
        if (res.success) {
          this.loading = !0;
          this.getDetail();
          this.deliverDialogVisible = !1;
          Notification({
            title: '提示',
            message: '转交成功',
          });
        } else {
          Notification({
            title: '提示',
            message: res.msg,
          });
        }
      });
    },
    del(row) {
      this.delDialogVisible = !0;
      this.contentId = row.id;
      this.delBuddhistName = row.name;
    },
    delConfirm() {
      if (!this.id) {
        this.delDialogVisible = !1;
        let delListKey = 0;
        this.list.forEach((item, key) => {
          if (item.id === this.contentId) {
            delListKey = key;
          }
        });
        this.list.splice(delListKey, 1);
        let delSelectKey = 0;
        this.contents.forEach((item, key) => {
          if (item.id === this.contentId) {
            delSelectKey = key;
          }
        });
        this.contents.splice(delSelectKey, 1); // 把选择中的也删除
        this.$forceUpdate();
        return; // 新建时不用请求
      }
      seeFetch('work/edit/editContent', {
        op: 3,
        pid: this.id,
        id: this.contentId,
      }).then(res => {
        if (res.success) {
          this.loading = !0;
          this.getDetail();
          this.delDialogVisible = !1;
          Notification({
            title: '提示',
            message: '删除成功',
          });
        } else {
          Notification({
            title: '提示',
            message: res.msg,
          });
        }
      });
    },
    add() {
      this.addDialogVisible = !0;
      // this.getNameList();  太卡了，直接放在create里面请求
    },
    addConfirm() {
      if (!this.contents.length) {
        Notification({
          title: '提示',
          message: '请至少添加一个子项目',
        });
        return;
      }
      if (!this.id) {
        this.list = [...this.list, ...this.contents]; // 新建时须把刚加的显示出来
        this.addDialogVisible = !1;
        this.$forceUpdate();
        return; // 新建时不用请求
      }

      let contentId = [];
      this.contents.forEach(item => {
        contentId.push(item.id);
      });
      seeFetch('work/edit/editContent', {
        op: 1,
        pid: this.id,
        contentId: contentId.join(','),
      }).then(res => {
        if (res.success) {
          this.loading = !0;
          this.getDetail();
          this.addDialogVisible = !1;
          Notification({
            title: '提示',
            message: '添加成功',
          });
        } else {
          Notification({
            title: '提示',
            message: res.msg,
          });
        }
      });
    },
    create() {
      if (this.saveLoading) return;
      if (!this.money || !this.managerId || !this.contents.length) {
        Notification({
          title: '提示',
          message: '请填写必要信息',
        });
        return;
      }
      let contentId = [];
      let This = this;
      this.contents.forEach(item => {
        contentId.push(item.id);
      });

      this.saveLoading = !0;
      seeFetch('work/edit/create', {
        name: this.name,
        targetMoney: parseInt(this.money, 10),
        managerId: this.managerId,
        contentIds: contentId.join(','),
      }).then(res => {
        if (res.success) {
        } else {
          Notification({
            title: '提示',
            message: res.msg,
          });
        }
        this.$router.replace('/work/manage');
        this.saveLoading = !1;
      });
    },
  },
};
</script>

<style>
.el-input--small .el-input__inner {
  height: 36px !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  -o-appearance: none !important;
  -ms-appearance: none !important;
  appearance: none !important;
  margin: 0;
}
input[type='number'] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  -o-appearance: textfield;
  -ms-appearance: textfield;
  appearance: textfield;
}
</style>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.title {
  font-size: 16px;
  margin-bottom: 5px;
}
.tips {
  margin-top: 5px;
  color: #999;
}
.input-name {
  width: 60%;
}
.target-money {
  width: 215px;
}
.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
}
.blue-icon {
  width: 65px;
  height: 22px;
  color: #3399ff;
  border: 1px solid #3399ff;
  background-color: #e3eeff;
  font-size: 12px;
  border-radius: 11px;
  text-align: center;
  line-height: 22px;
  margin: 0 auto;
}
.orange-icon {
  display: inline-block;
  padding: 0 8px;
  height: 22px;
  color: #ff9933;
  border: 1px solid #ff9933;
  background-color: #fff4e9;
  font-size: 12px;
  border-radius: 11px;
  text-align: center;
  line-height: 22px;
  margin: 0 auto;
}
.create {
  display: block;
  margin: 30px auto 0;
}
.edit {
  cursor: pointer;
  color: #3399ff;
}
.del {
  color: #ff9933;
}
.warn-tips {
  margin-bottom: 20px;
}
.del-tips {
  color: #77c9ff;
}
.buddhist-name {
  color: #3399ff;
}
</style>
