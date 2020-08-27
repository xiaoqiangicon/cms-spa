<template>
  <div class="pd-20">
    <el-card>
      <el-alert type="success" :closable="false">
        <div class="f-s-14">
          1.当前列表是所有可推广的项目。<br />
          2.可设置建议零售价，销售员的提成金额，查看推广数据记录与管理项目。
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
        <el-table-column prop="businessProfit" label="业务员收入（元）" />
        <el-table-column prop="sellerProfit" label="销售员提成金额（元）" />
        <el-table-column label="操作">
          <template slot-scope="item">
            <el-button type="text" @click="toManage(item)">价格设置</el-button>
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
