<template>
  <div class="pd-20">
    <el-card>
      <div class="mg-b-40">
        <div class="f-s-16">{{ foShiItem.name }}</div>
        <div class="mg-t-10">
          <span>项目状态：</span>
          <span class="blue" v-if="foShiItem.status === -1">未开始</span>
          <span class="green" v-else-if="foShiItem.status === 0">进行中</span>
          <span class="red" v-else-if="foShiItem.status === 1">已结束</span>
          <span v-else>未知状态</span>
          <span
            >&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;添加时间：{{
              foShiItem.addTime.slice(0, 10)
            }}</span
          >
          <div class="fl-right" v-if="foShiItem.status !== 1">
            <span>推广状态：</span>
            <el-switch
              :value="!!foShiItem.online"
              active-text="是"
              inactive-text="否"
              @change="value => changeOnline(value)"
            />
          </div>
        </div>
      </div>
      <el-tabs v-model="tabName">
        <el-tab-pane label="价格设置" name="setting">
          <div class="clearfix">
            计算方式：利润 = 渠道价 -
            供应价（活动报名、无需支付和随喜支付项不计算在内）
          </div>
          <el-table
            v-loading="setting.loading"
            :data="setting.list"
            class="wd-100-pc mg-t-20"
          >
            <el-table-column prop="name" label="选择项名称">
              <template slot-scope="item">
                <img class="wd-50 mg-r-10" :src="item.row.cover" />
                {{ item.row.name }}
              </template>
            </el-table-column>
            <el-table-column prop="phone" label="供应价（元）">
              <template slot-scope="item">
                <span v-if="item.row.costPrice > 0">{{
                  item.row.costPrice
                }}</span>
                <span v-else-if="item.row.costPrice < 0">随喜</span>
                <span v-else>无需支付</span>
              </template>
            </el-table-column>
            <el-table-column prop="channelPrice" label="渠道价">
              <template slot="header" slot-scope="item">
                {{ item.column.label }}
                <el-tooltip placement="top">
                  <div slot="content">
                    对业务员展示的价格。<br />
                    设置的零售价不低于供应价，设置或修改完需手动点击保存。保存成功后即时生效。
                  </div>
                  <i class="el-icon-question question" />
                </el-tooltip>
              </template>
              <template slot-scope="item">
                <el-input
                  v-show="
                    showEditChannelPrice &&
                      editChannelPriceIndex === item.$index
                  "
                  v-model="editChannelPrice"
                  style="width: 100px;"
                  @blur="blurChannelPrice"
                  :ref="'editInput' + item.$index"
                ></el-input>
                <div
                  v-show="
                    !(
                      showEditChannelPrice &&
                      editChannelPriceIndex === item.$index
                    )
                  "
                >
                  <span
                    v-if="setting.listState[item.$index].loading"
                    class="pd-l-15"
                    ><i class="el-icon-loading"></i
                  ></span>
                  <span
                    v-else-if="item.row.costPrice > 0"
                    @click="updateSelection(item)"
                    class="edit-item"
                  >
                    {{ item.row.channelPrice }}
                    <i class="el-icon-edit" v-if="foShiItem.status !== 1"></i>
                  </span>
                  <span v-else>-</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="推广数据" name="sale">
          <div class="mg-t-20">
            <span class="l-hg-36">状态：</span>
            <el-select
              v-model="sale.status"
              placeholder="请选择"
              @change="saleSearch"
            >
              <el-option label="全部" :value="-1"></el-option>
              <el-option label="已结算" :value="0"></el-option>
              <el-option label="未处理" :value="1"></el-option>
              <el-option label="确认中" :value="2"></el-option>
            </el-select>
            <span class="l-hg-36 mg-l-10">开始时间：</span>
            <el-date-picker
              v-model="sale.startTime"
              align="right"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始时间"
              size="small"
              style="width: 200px;"
              @change="saleSearch"
            />
            <span class="l-hg-36 mg-l-10">结束时间：</span>
            <el-date-picker
              v-model="sale.endTime"
              align="right"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="结束时间"
              size="small"
              style="width: 200px;"
              @change="saleSearch"
            />
            <el-button class="fl-right" @click="saleSearch">搜索</el-button>
            <el-input
              v-model="sale.keyword"
              placeholder="业务员名字/手机号码"
              class="fl-right mg-r-20"
              style="width: 250px;"
              @change="saleSearch"
            ></el-input>
          </div>
          <el-table
            v-loading="sale.loading"
            :data="sale.list"
            class="wd-100-pc mg-t-20"
          >
            <el-table-column prop="orderNum" label="订单号码" />
            <el-table-column prop="payTime" label="支付时间" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="payAmount" label="支付金额（元）" />
            <el-table-column prop="saleAmount" label="零售价（元）" />
            <el-table-column prop="businessIncome" label="业务员收入（元）" />
            <el-table-column prop="sellerIncome" label="销售员收入（元）" />
            <el-table-column label="所属业务员">
              <template slot-scope="item">
                <el-button type="text" @click="toBusiness(item)"
                  >{{ item.row.businessUserId }}-{{
                    item.row.businessUserName
                  }}</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="销售员">
              <template slot-scope="item">
                <el-button type="text" @click="toSeller(item)"
                  >{{ item.row.sellerUserId }}-{{
                    item.row.sellerUserName
                  }}</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template slot="header" slot-scope="item">
                {{ item.column.label }}
                <el-tooltip placement="top">
                  <div slot="content">
                    已结算：当前订单的对销售员的提成金额已经可以提现<br />
                    确认中：当前订单的系统核查中，完成后提成金额可提现<br />
                    未处理：当前订单的还在处理中，提成金额不可提现
                  </div>
                  <i class="el-icon-question question" />
                </el-tooltip>
              </template>
              <template slot-scope="item">
                <el-button
                  v-if="item.row.status === 0"
                  type="success"
                  size="mini"
                  plain
                  round
                  style="padding: 5px 10px;"
                  >已结算</el-button
                >
                <el-button
                  v-if="item.row.status === 2"
                  type="primary"
                  size="mini"
                  plain
                  round
                  style="padding: 5px 10px;"
                  >确认中</el-button
                >
                <el-button
                  v-if="item.row.status === 1"
                  type="warning"
                  size="mini"
                  plain
                  round
                  style="padding: 5px 10px;"
                  >未处理</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            class="mg-t-20 t-a-center"
            layout="total, prev, pager, next, sizes, jumper"
            :total="sale.total"
            :current-page="sale.currentPage"
            :page-size="sale.pageSize"
            @size-change="saleSizeChange"
            @current-change="saleCurrentChange"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script src="./App.js"></script>

<style lang="less" scoped>
.edit-item {
  display: inline-block;
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 4px;

  &:hover {
    background-color: #ccc;
  }
}
</style>
