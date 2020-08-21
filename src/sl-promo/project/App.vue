<template>
  <div class="pd-20">
    <el-card>
      <el-alert type="success" :closable="false">
        <div class="f-s-14">
          1.当前列表是所有可推广的项目。<br />
          2.管理员设置销售价后并标记为“上架”状态则会以“销售价”出现在业务员的项目选择库中。<br />
          3.若标记为“已下架”状态时当前项目将不出现在业务员和基层销售员的专题列表中，已推广出去的链接产生新的订单将不再对业务员和基层销售员结算。<br />
          4.管理员可设置销售价，查看推广数据记录与管理项目。
        </div>
      </el-alert>
      <div class="mg-t-20 t-a-right">
        <el-input
          v-model="keyword"
          placeholder="搜索ID或项目名称"
          class="mg-r-20"
          style="width: 250px;"
          @change="search"
        ></el-input>
        <el-button @click="search">搜索</el-button>
      </div>
      <el-table v-loading="loading" :data="list" class="wd-100-pc mg-t-20">
        <el-table-column prop="id" label="Id" />
        <el-table-column prop="name" label="项目名称" />
        <el-table-column prop="totalOrders" label="订单数量" />
        <el-table-column prop="payAmount" label="支付金额（元）" />
        <el-table-column prop="slProfit" label="分成金额（元）">
          <template slot="header" slot-scope="item">
            {{ item.column.label }}
            <el-tooltip placement="top">
              <div slot="content">
                当前渠道主体的收益金额
              </div>
              <i class="el-icon-question question" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="promoProfit" label="销售分成金额（元）">
          <template slot="header" slot-scope="item">
            {{ item.column.label }}
            <el-tooltip placement="top">
              <div slot="content">
                当前渠道主体下的业务员与业务员旗下的销售员的收入金额
              </div>
              <i class="el-icon-question question" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="costAmount" label="渠道成本金额（元）">
          <template slot="header" slot-scope="item">
            {{ item.column.label }}
            <el-tooltip placement="top">
              <div slot="content">
                项目来源渠道（自在家）的成本金额
              </div>
              <i class="el-icon-question question" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="推广状态">
          <template slot="header" slot-scope="item">
            {{ item.column.label }}
            <el-tooltip placement="top">
              <div slot="content">
                1.“已下架”状态时当前佛事将不出现在推广员的列表中；<br />
                2.已经有该佛事的专题也去掉；<br />
                3.已推广出去的链接产生新的订单将不对推广员结算。<br /><br />
                设为下架状态，已推广的链接若产生新的订单将不再对所有业务员、销售员结算利润。
              </div>
              <i class="el-icon-question question" />
            </el-tooltip>
          </template>
          <template slot-scope="item">
            <el-switch
              :value="!item.row.offline"
              active-text="是"
              inactive-text="否"
              @change="value => changeOffline(value, item)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="item">
            <el-button type="text" @click="toManage(item)">管理</el-button>
            <el-button type="text" @click="toData(item)">数据</el-button>
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
