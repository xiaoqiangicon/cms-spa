<template>
  <div class="pd-20">
    <el-card>
      <el-alert type="success" v-if="tabName === 'verify'" :closable="false">
        <div class="f-s-14">
          用户通过您制定的招募计划成为你旗下的销售员在当前列表展示，你可以操作：<br />
          1.审核拒绝 2.审核通过 3.查看人员数据报表
        </div>
      </el-alert>
      <el-tabs v-model="tabName" class="mg-t-30">
        <el-tab-pane label="人员列表" name="passed">
          <div class="mg-t-20">
            <span class="l-hg-36">状态：</span>
            <el-select
              v-model="passed.status"
              placeholder="请选择"
              @change="passedSearch"
            >
              <el-option label="未禁用" :value="0"></el-option>
              <el-option label="已禁用" :value="2"></el-option>
            </el-select>
            <span class="l-hg-36 mg-l-20">排序：</span>
            <el-select
              v-model="passed.sort"
              placeholder="请选择"
              @change="passedSearch"
            >
              <el-option label="默认排序" :value="0"></el-option>
              <el-option label="按销售额倒序排序" :value="1"></el-option>
              <el-option label="按订单数倒序排序" :value="2"></el-option>
            </el-select>
            <el-button class="fl-right" @click="passedSearch">搜索</el-button>
            <el-input
              v-model="passed.keyword"
              placeholder="推广员昵称/手机号码"
              class="fl-right mg-r-20"
              style="width: 250px;"
              @change="passedSearch"
            ></el-input>
          </div>
          <el-table
            v-loading="passed.loading"
            :data="passed.list"
            class="wd-100-pc mg-t-20"
          >
            <el-table-column prop="id" label="Id" />
            <el-table-column prop="name" label="姓名">
              <template slot-scope="item">
                {{ item.row.name }}
                <el-button
                  type="warning"
                  size="mini"
                  plain
                  round
                  style="padding: 4px 10px;"
                  v-if="item.row.status === 2"
                  >禁止</el-button
                >
              </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号码（登录账户）" />
            <el-table-column prop="totalOrders" label="累计订单（笔）" />
            <el-table-column prop="totalAmount" label="累计销售额（元）" />
            <el-table-column prop="totalIncome" label="累计收入" />
            <el-table-column prop="createTime" label="添加时间" />
            <el-table-column label="操作">
              <template slot="header" slot-scope="item">
                {{ item.column.label }}
                <el-tooltip placement="top">
                  <div slot="content">
                    禁用：支持对销售员进行禁用。禁用后不影响之前未处理和待入账的提成金额结算，也可对其取消禁用。<br />禁用当前销售员员，已推广的链接若产生新的订单将不再对其结算提成金额。
                  </div>
                  <i class="el-icon-question question" />
                </el-tooltip>
              </template>
              <template slot-scope="item">
                <el-button
                  type="text"
                  size="small"
                  @click="detail(item)"
                  v-if="item.row.status === 0"
                >
                  详情
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="block(item)"
                  v-if="item.row.status === 0"
                >
                  禁用
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="unblock(item)"
                  v-if="item.row.status === 2"
                >
                  取消禁用
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            class="mg-t-20 t-a-center"
            layout="total, prev, pager, next, sizes, jumper"
            :total="passed.total"
            :current-page="passed.currentPage"
            :page-size="passed.pageSize"
            @size-change="passedSizeChange"
            @current-change="passedCurrentChange"
          />
        </el-tab-pane>
        <el-tab-pane label="审核信息" name="verify">
          <span slot="label">
            审核信息
            <el-badge :value="unVerifyTotal" :max="99"></el-badge>
          </span>
          <div class="mg-t-20">
            <span class="l-hg-36">状态：</span>
            <el-select
              v-model="verify.status"
              placeholder="请选择"
              @change="verifySearch"
            >
              <el-option label="待审核" :value="1"></el-option>
              <el-option label="已拒绝" :value="3"></el-option>
            </el-select>
          </div>
          <el-table
            v-loading="verify.loading"
            :data="verify.list"
            class="wd-100-pc mg-t-20"
          >
            <el-table-column label="用户昵称">
              <template slot-scope="item">
                <img :src="item.row.avatar" class="wd-40 hg-40 bd-rd-50-pc" />
                <span>{{ item.row.nickname }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="phone" label="手机号码" />
            <el-table-column prop="remark" label="备注" />
            <el-table-column label="状态">
              <template slot-scope="item">
                <el-button
                  type="primary"
                  size="small"
                  round
                  v-if="item.row.status === 1"
                  >待审核</el-button
                >
                <el-button
                  type="warning"
                  size="small"
                  round
                  v-if="item.row.status === 3"
                  >已拒绝</el-button
                >
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="申请时间" />
            <el-table-column label="操作">
              <template slot-scope="item">
                <el-button
                  type="text"
                  size="small"
                  @click="pass(item)"
                  v-if="item.row.status === 1 || item.row.status === 3"
                >
                  通过
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="reject(item)"
                  v-if="item.row.status === 1"
                >
                  拒绝
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            class="mg-t-20 t-a-center"
            layout="total, prev, pager, next, sizes, jumper"
            :total="verify.total"
            :current-page="verify.currentPage"
            :page-size="verify.pageSize"
            @size-change="verifySizeChange"
            @current-change="verifyCurrentChange"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script src="./App.js"></script>
