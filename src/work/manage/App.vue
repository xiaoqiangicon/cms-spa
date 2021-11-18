<template>
  <div class="container">
    <el-card>
      <div class="header">
        <div class="info">
          <p class="rule">
            1.当前列表项目是所有经过公司层面立项的项目才可添加；
          </p>
          <p class="rule">
            2.管理员可新增、删除项目。一个项目可包含多个佛事活动；一个项目只能包含一个负责人
          </p>
          <p class="rule">3.管理员可查看推广数据记录与管理项目构成；</p>
          <p class="rule">4.管理员可为一个项目整体设置项目的目标；</p>
          <p class="rule">
            5.涉及到修改和变更 0:00 进行处理，与此同时数据计算每天 0:00 更新。
          </p>
        </div>
        <el-button @click="edit(0)">新增项目</el-button>
      </div>
      <el-tabs v-model="activeName" @tab-click="getList">
        <el-tab-pane label="进行中" name="start"></el-tab-pane>
        <el-tab-pane label="已结束" name="end"></el-tab-pane>
      </el-tabs>
      <el-table
        v-loading="loading"
        highlight-current-row
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column label="项目名称" prop="name" :align="'center'" />
        <el-table-column label="包含子项目" :align="'center'">
          <template slot-scope="scope">
            <div
              style="display: flex;align-items: center;justify-content: center;"
            >
              <div class="blue-icon" style="margin: 0 6px 0 0;">
                {{ scope.row.contentIdNum }}个
              </div>
              <div>
                <p
                  style="margin: 0;"
                  v-for="(item, key) in scope.row.contentIdList
                    ? scope.row.contentIdList.split(';')
                    : []"
                  :key="key"
                >
                  {{ item }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="支付金额(元)"
          prop="payMoney"
          :align="'center'"
        />
        <el-table-column
          label="目标金额(元)"
          prop="targetMoney"
          :align="'center'"
        />
        <el-table-column label="项目完成度" prop="percent" :align="'center'" />
        <el-table-column
          label="结束操作人"
          prop="mobile"
          :align="'center'"
          v-if="activeName !== 'start'"
          width="130px"
        >
          <template slot-scope="scope">
            <div>
              <div class="">{{ scope.row.closer }}</div>
              <div class="orange-icon">{{ scope.row.endTime }}结束</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="项目负责人" prop="mobile" :align="'center'">
          <template slot-scope="scope">
            <div>
              <div class="">{{ scope.row.managerName }}</div>
              <div class="blue-icon" v-if="activeName === 'start'">
                {{ scope.row.changeTime }}接手
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" :align="'center'">
          <template slot-scope="scope">
            <div>
              <span class="edit" @click="edit(scope.row.id)">编辑</span>
              <span
                class="edit"
                @click="deliver(scope.row)"
                v-if="activeName === 'start'"
                >转交到</span
              >
              <span
                class="edit end"
                @click="end(scope.row.id)"
                v-if="activeName === 'start'"
                >结束</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="项目状态" :visible.sync="endDialogVisible" width="30%">
      <p>
        默认进行中；关闭后普通员工不能继续操作且无法查看。若项目结束等情况，仅超级管理员使用结束功能。
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="endConfirm">确认结束</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="转交至项目负责人"
      :visible.sync="deliverDialogVisible"
      width="40%"
    >
      <p class="warn-tips orange-icon">
        提示：使用转交功能，请谨慎操作且需超级管理员同意。
      </p>
      <el-select
        v-model="managerId"
        v-loading="!managerList.length"
        filterable
        placeholder="请填写关键词和ID搜索"
        style="width: 70%"
      >
        <el-option
          v-for="item in managerList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deliverConfirm">确认转交</el-button>
        <el-button @click="deliverDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Notification } from 'element-ui';
import seeFetch from 'see-fetch';
import './fetch';

export default {
  data() {
    return {
      activeName: 'start',
      loading: !0,
      list: [],
      endDialogVisible: !1, // 结束弹框
      deliverDialogVisible: !1, // 转交弹框
      endId: 0, // 需要结束的项目ID
      managerList: [], // 负责人list
      managerId: '', // 负责人id
      pid: '', // 项目ID
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let type = this.activeName === 'start' ? 0 : 1;

      seeFetch('work/manage/getList', { type }).then(res => {
        if (res.success) {
          this.loading = !1;
          this.list = res.data;
        }
      });
    },
    getManagerList() {
      seeFetch('work/manage/manager', {}).then(res => {
        if (res.success) {
          this.managerList = res.data;
        }
      });
    },
    edit(id) {
      let isEnd = this.activeName === 'start' ? 0 : 1;
      this.$router.push({ path: `/work/edit/${id}`, query: { isEnd: isEnd } });
    },
    end(id) {
      this.endDialogVisible = !0;
      this.endId = id;
    },
    endConfirm() {
      seeFetch('work/manage/end', { pid: this.endId }).then(res => {
        if (res.success) {
          this.loading = !0;
          this.getList();
          this.endDialogVisible = !1;
          Notification({
            title: '提示',
            message: '结束成功',
          });
        }
      });
    },
    deliver(row) {
      this.pid = row.id;
      this.deliverDialogVisible = !0;
      this.getManagerList();
    },
    deliverConfirm() {
      seeFetch('work/manage/deliver', {
        pid: this.pid,
        managerId: this.managerId,
      }).then(res => {
        if (res.success) {
          this.deliverDialogVisible = !1;
          this.loading = !0;
          this.getList();
          Notification({
            title: '提示',
            message: '转交成功',
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.info {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 10px;
  p {
    margin: 0;
  }
}
.blue-icon {
  padding: 0 2px;
  height: 22px;
  min-width: 40px;
  max-width: 110px;
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
.edit {
  cursor: pointer;
  color: #63c1ff;
}
.end {
  color: #f9bf74;
}
.warn-tips {
  margin-bottom: 20px;
}
</style>
