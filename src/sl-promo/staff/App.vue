<template>
  <div class="pd-20">
    <el-card>
      <el-tabs v-model="tabName">
        <el-tab-pane label="业务员" name="business">
          <div class="clearfix">
            <el-button type="primary" class="fl-right" @click="addBusiness"
              >添加业务员</el-button
            >
            <el-alert type="success" style="width: 50%;" :closable="false">
              <div class="f-s-14">
                业务员是渠道主主体下的工作人员：设定销售价格、编辑推广专题和管理销售人员。<br />
                销售员是属于业务员旗下的基层执行人员。
              </div>
            </el-alert>
          </div>
          <div class="mg-t-20">
            <span class="l-hg-36">排序：</span>
            <el-select
              v-model="business.sort"
              placeholder="请选择"
              @change="businessSearch"
            >
              <el-option label="默认排序" :value="0"></el-option>
              <el-option label="按销售额倒序排序" :value="1"></el-option>
              <el-option label="按订单数倒序排序" :value="2"></el-option>
            </el-select>
            <el-button class="fl-right" @click="businessSearch">搜索</el-button>
            <el-input
              v-model="business.keyword"
              placeholder="人员名字/手机号码"
              class="fl-right mg-r-20"
              style="width: 250px;"
              @change="businessSearch"
            ></el-input>
          </div>
          <el-table
            v-loading="business.loading"
            :data="business.list"
            class="wd-100-pc mg-t-20"
          >
            <el-table-column prop="id" label="Id" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="phone" label="手机号码（登录账户）" />
            <el-table-column prop="totalOrders" label="累计订单（笔）" />
            <el-table-column prop="totalAmount" label="累计销售额（元）" />
            <el-table-column prop="totalIncome" label="累计收入">
              <template slot="header" slot-scope="item">
                {{ item.column.label }}
                <el-tooltip placement="top">
                  <div slot="content">
                    业务员的累积利润：建议零售价 - 销售员提成金额
                  </div>
                  <i class="el-icon-question question" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="totalSellers" label="累计收入">
              <template slot-scope="item">
                {{ item.row.totalSellers }}
                <el-button
                  type="primary"
                  size="mini"
                  class="mg-l-10"
                  @click="toSellers(item)"
                  >查看</el-button
                >
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="添加时间" />
            <el-table-column label="操作">
              <template slot-scope="item">
                <el-button
                  type="text"
                  size="small"
                  @click="detailBusiness(item)"
                >
                  详情
                </el-button>
                <el-button type="text" size="small" @click="editBusiness(item)">
                  编辑
                </el-button>
                <el-button type="text" size="small" @click="delBusiness(item)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            class="mg-t-20 t-a-center"
            layout="total, prev, pager, next, sizes, jumper"
            :total="business.total"
            :current-page="business.currentPage"
            :page-size="business.pageSize"
            @size-change="businessSizeChange"
            @current-change="businessCurrentChange"
          />
        </el-tab-pane>
        <el-tab-pane label="销售员" name="seller">
          <div class="clearfix">
            <el-alert type="success" style="width: 50%;" :closable="false">
              <div class="f-s-14">
                业务员是渠道主主体下的工作人员：设定销售价格、编辑推广专题和管理销售人员。<br />
                销售员是属于业务员旗下的基层执行人员。
              </div>
            </el-alert>
          </div>
          <div class="mg-t-20">
            <span class="l-hg-36">状态：</span>
            <el-select
              v-model="seller.status"
              placeholder="请选择"
              @change="sellerSearch"
            >
              <el-option label="未禁用" :value="0"></el-option>
              <el-option label="已禁用" :value="2"></el-option>
            </el-select>
            <span class="l-hg-36 mg-l-10">所属业务员：</span>
            <el-select
              v-model="seller.businessId"
              placeholder="请选择"
              @change="sellerSearch"
            >
              <el-option label="所有" :value="0"></el-option>
              <el-option
                v-for="(item, index) in allBusiness"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <span class="l-hg-36 mg-l-10">排序：</span>
            <el-select
              v-model="seller.sort"
              placeholder="请选择"
              @change="sellerSearch"
            >
              <el-option label="默认排序" :value="0"></el-option>
              <el-option label="按销售额倒序排序" :value="1"></el-option>
              <el-option label="按订单数倒序排序" :value="2"></el-option>
            </el-select>
            <el-button class="fl-right" @click="sellerSearch">搜索</el-button>
            <el-input
              v-model="seller.keyword"
              placeholder="人员名字/手机号码"
              class="fl-right mg-r-20"
              style="width: 250px;"
              @change="sellerSearch"
            ></el-input>
          </div>
          <el-table
            v-loading="seller.loading"
            :data="seller.list"
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
                  @click="detailSeller(item)"
                  v-if="item.row.status === 0"
                >
                  详情
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="blockSeller(item)"
                  v-if="item.row.status === 0"
                >
                  禁用
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="unblockSeller(item)"
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
            :total="seller.total"
            :current-page="seller.currentPage"
            :page-size="seller.pageSize"
            @size-change="sellerSizeChange"
            @current-change="sellerCurrentChange"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      :title="businessItem.id ? '编辑业务员' : '添加业务员'"
      :visible.sync="businessDialogVisible"
      width="40%"
    >
      <el-form :model="businessItem" label-width="150px" size="small">
        <el-form-item label="姓名：" required>
          <el-input v-model="businessItem.name" style="width: 250px" />
        </el-form-item>
        <el-form-item label="手机号码（登录账户）：" required>
          <el-input
            v-model="businessItem.phone"
            type="number"
            style="width: 250px"
          />
        </el-form-item>
        <el-form-item label="登录密码：" required>
          <el-input v-model="businessItem.password" style="width: 250px" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="businessDialogVisible = false"
          >取 消</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="handleBusinessDialogConfirm()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script src="./App.js"></script>
