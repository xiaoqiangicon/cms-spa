<template>
  <div class="contain">
    <el-card>
      <div style="margin-bottom: 20px;">
        <div class="filter">
          <div class="filter-top">
            <div>
              <el-button
                :class="{ 'filter-active': status === 1 }"
                @click="changeStatus(1)"
                >未审核</el-button
              >
              <el-button
                :class="{ 'filter-active': status === 0 }"
                @click="changeStatus(0)"
                >已审核</el-button
              >
            </div>
          </div>
          <div class="filter-content">
            <div>
              <span style="margin-right: 10px;color: #333;">寺院</span>
              <el-select v-model="templeId" @change="changeTemple" filterable>
                <el-option label="全部" value="" />
                <el-option
                  v-for="item in templeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div style="margin: 0 20px;">
              <span style="margin-right: 10px;color: #333;">佛事</span>
              <el-select
                v-model="commodityId"
                @change="changeCommodity"
                filterable
              >
                <el-option label="全部" value="" />
                <el-option
                  v-for="item in commodityList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div>
              <el-input v-model="content" placeholder="关键词搜索"
                ><el-button slot="append" icon="el-icon-search" @click="getList"
              /></el-input>
            </div>
          </div>
        </div>
      </div>
      <el-table v-loading="loading" :data="list">
        <el-table-column width="60px" prop="id" label="ID" :align="'center'" />
        <el-table-column
          width="140px"
          prop="editTime"
          label="修改时间"
          :align="'center'"
        />
        <el-table-column label="佛事标题" :align="'center'">
          <template slot-scope="scope">
            <div class="set" @click="toWxDetail(scope.row)">
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="80px"
          prop="templeId"
          label="寺院ID"
          :align="'center'"
        />
        <el-table-column prop="templeName" label="寺院标题" :align="'center'" />
        <el-table-column label="状态" width="100px" :align="'center'">
          <template slot-scope="scope">
            <div>
              <div :class="{ 'special-text': scope.row.is_end === 1 }">
                {{ scope.row.is_end === 1 ? '已结束' : '未结束' }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="60px"
          prop="content"
          label="待审内容"
          :align="'center'"
        />
        <el-table-column
          min-width="100px"
          prop="name"
          label="审核是否通过"
          :align="'center'"
        >
          <template slot-scope="scope">
            <div>
              <el-button
                @click="changeItemStatus(scope.row, 0)"
                v-if="status === 1"
                >通过</el-button
              >
              <el-button
                type="danger"
                @click="changeItemStatus(scope.row, 1)"
                v-if="status === 1"
                >打回</el-button
              >
              <el-button
                type="danger"
                @click="changeItemStatus(scope.row, 2)"
                v-if="status === 0"
                >打回</el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="订单提醒" :align="'center'">
          <template slot-scope="scope">
            <div class="manager" @click="showManagerDialog(scope.row)">
              <span v-if="scope.row.managerNames">
                {{ scope.row.managerNames }}
              </span>
              <span v-else>
                设置
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140px" :align="'center'">
          <template slot-scope="scope">
            <div>
              <el-button class="set-btn" @click="showSet(scope.row)"
                >设置</el-button
              >
              <el-dropdown trigger="click" @command="handleSetShelves">
                <span
                  :class="[
                    'el-button',
                    scope.row.isOnlyChanzai === 1 ||
                    scope.row.isOnlyChanzai === 0
                      ? 'el-button--primary'
                      : 'el-button--danger',
                    'el-button--medium',
                    'set-btn',
                  ]"
                >
                  APP{{
                    scope.row.isOnlyChanzai === 1 ||
                    scope.row.isOnlyChanzai === 0
                      ? '上架'
                      : '屏蔽'
                  }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    :disabled="
                      scope.row.isOnlyChanzai === 2 ||
                        scope.row.isOnlyChanzai === -1
                    "
                    :command="beforeHandleCommand(scope.row, 'APP', 0)"
                    >屏蔽</el-dropdown-item
                  >
                  <el-dropdown-item
                    :disabled="
                      scope.row.isOnlyChanzai === 1 ||
                        scope.row.isOnlyChanzai === 0
                    "
                    :command="beforeHandleCommand(scope.row, 'APP', 1)"
                    >上架</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown
                trigger="click"
                @command="handleSetShelves"
                type="primary"
              >
                <span
                  :class="[
                    'el-button',
                    scope.row.isOnlyChanzai === 2 ||
                    scope.row.isOnlyChanzai === 0
                      ? 'el-button--primary'
                      : 'el-button--danger',
                    'el-button--medium',
                    'set-btn',
                  ]"
                >
                  SAAS{{
                    scope.row.isOnlyChanzai === 2 ||
                    scope.row.isOnlyChanzai === 0
                      ? '上架'
                      : '屏蔽'
                  }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    :disabled="
                      scope.row.isOnlyChanzai === 1 ||
                        scope.row.isOnlyChanzai === -1
                    "
                    :command="beforeHandleCommand(scope.row, 'SAAS', 0)"
                    >屏蔽</el-dropdown-item
                  >
                  <el-dropdown-item
                    :disabled="
                      scope.row.isOnlyChanzai === 2 ||
                        scope.row.isOnlyChanzai === 0
                    "
                    :command="beforeHandleCommand(scope.row, 'SAAS', 1)"
                    >上架</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      :total="total"
      :current-page="pageNo"
      :page-size="pageSize"
      background
      layout="prev, pager, next"
      style="margin-top: 40px"
      @current-change="pageChange"
    />
    <el-dialog title="订单提醒" :visible.sync="managerDialog">
      <div class="manager">
        <p>添加需提醒的订单号</p>
        <div class="manager-list">
          <div
            class="manager-item"
            v-for="(item, key) in managerList"
            :key="key"
          >
            <img
              class="manager-avatar"
              :class="{ 'active-avatar': item.showSub }"
              :src="item.headImg"
              alt="avatar"
              @click="showSub(item)"
            />
            <p class="manager-name">{{ item.nickName }}</p>
            <p class="manager-notify" v-if="item.isManager">已设置通知</p>
          </div>
        </div>
        <div class="subvide-list">
          <div v-for="item in managerList" :key="item.id">
            <div class="sub-list" v-if="item.showSub">
              <p class="sub-tips">设置需提醒的选择项</p>
              <el-checkbox-group
                v-model="item.subIdList"
                @change="changeSubList(item)"
              >
                <el-checkbox
                  v-for="sub in subdivideList"
                  :label="sub.id"
                  :key="sub.id"
                  >{{ sub.name }}</el-checkbox
                >
              </el-checkbox-group>
              <el-checkbox
                :indeterminate="!item.isIndeterminate"
                v-model="item.checkAll"
                @change="handleCheckAllChange(item)"
                >全选</el-checkbox
              >
            </div>
          </div>
        </div>
        <el-button class="save-btn" type="primary" @click="saveManagerSet"
          >保存</el-button
        >
      </div>
    </el-dialog>
    <SetDialog />
  </div>
</template>

<script src="./App.js"></script>

<style scoped>
>>> .el-checkbox {
  display: block;
}
>>> .el-button + .el-button {
  margin-top: 10px;
  margin-left: 0;
}

>>> .el-dropdown-menu__item {
  width: 126px;
}
</style>

<style lang="less" scoped>
.contain {
  padding: 20px;
}

.filter {
  margin-bottom: 30px;
}
.filter-active {
  color: #fff;
  background-color: #409eff;
  border: 1px solid #409eff;
}
.filter-content {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.set {
  cursor: pointer;
  color: #409eff;
}

.set-btn {
  width: 126px;
  margin-bottom: 10px;
}
.green {
  color: #409eff;
  margin-left: 10px;
}
.manager {
  cursor: pointer;
  color: #409eff;
}
.manager-list {
  display: flex;
  flex-wrap: wrap;
}
.sub-tips {
  margin-bottom: 10px;
  color: #333;
  font-size: 18px;
}
.manager-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  margin-right: 30px;
}
.manager-avatar {
  width: 100px;
  height: 100px;
}
.special-text {
  color: #f56c6c;
}

.active-avatar {
  border: 4px solid #75bc36;
}
.manager-name {
  margin: 10px 0 0 0;
  width: 100px;
  text-align: center;
  color: #333;
}
.manager-notify {
  margin: 10px 0 10px 0;
  color: red;
}
.save-btn {
  display: block;
  margin: 20px auto 0;
}
</style>
