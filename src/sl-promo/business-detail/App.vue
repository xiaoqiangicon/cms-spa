<template>
  <div class="pd-20">
    <el-card>
      <div class="clearfix">
        <div class="bd-rd-4 pd-15 fl-right bd-d">
          <div>累计收入（元）</div>
          <div style="font-size: 24px">{{ item.totalIncome }}</div>
        </div>
        <div class="bd-rd-4 pd-15 fl-right bd-d mg-r-10">
          <div>累计销售额（元）</div>
          <div style="font-size: 24px">{{ item.totalAmount }}</div>
        </div>
        <div class="bd-rd-4 pd-15 fl-right bd-d mg-r-10">
          <div>累计订单（笔）</div>
          <div style="font-size: 24px">{{ item.totalOrders }}</div>
        </div>
        <div class="bd-rd-4 pd-15 fl-right bd-d mg-r-10">
          <div>旗下销售员（人）</div>
          <div style="font-size: 24px">
            <span class="blue">{{ item.totalSellers }}</span>
            <el-button type="primary" size="mini" round plain @click="toSellers"
              >查看</el-button
            >
          </div>
        </div>
        <div class="mg-t-10">
          <span class="f-s-18">{{ item.name }}</span>
          <el-button
            type="warning"
            size="mini"
            plain
            round
            style="padding: 5px 10px;"
            >业务员</el-button
          ><br />
        </div>
        <div class="mg-t-10">
          ID：{{ item.id }} | 手机号码：{{ item.phone }}
        </div>
      </div>
      <div style="margin-top: 80px">
        <span class="l-hg-36">状态：</span>
        <el-select v-model="status" placeholder="请选择" @change="search">
          <el-option label="全部" :value="-1"></el-option>
          <el-option label="已结算" :value="0"></el-option>
          <el-option label="未处理" :value="1"></el-option>
          <el-option label="确认中" :value="2"></el-option>
        </el-select>
        <span class="l-hg-36 mg-l-10">开始时间：</span>
        <el-date-picker
          v-model="startTime"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="开始时间"
          size="small"
          style="width: 200px;"
          @change="search"
        />
        <span class="l-hg-36 mg-l-10">结束时间：</span>
        <el-date-picker
          v-model="endTime"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="结束时间"
          size="small"
          style="width: 200px;"
          @change="search"
        />
      </div>
      <el-table v-loading="loading" :data="list" class="wd-100-pc mg-t-20">
        <el-table-column prop="orderNum" label="订单号码" />
        <el-table-column prop="payTime" label="支付时间" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="payAmount" label="支付金额（元）" />
        <el-table-column prop="saleAmount" label="零售价（元）" />
        <el-table-column prop="businessIncome" label="业务员收入（元）" />
        <el-table-column prop="sellerIncome" label="销售员收入（元）" />
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
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </el-card>
  </div>
</template>

<script src="./App.js"></script>
