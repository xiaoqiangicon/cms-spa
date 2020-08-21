<template>
  <div class="pd-20">
    <el-card>
      <el-tabs v-model="tabName">
        <el-tab-pane label="业务员" name="business">
          <div>
            <span class="l-hg-36 mg-l-10">开始时间：</span>
            <el-date-picker
              v-model="business.startTime"
              align="right"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始时间"
              size="small"
              style="width: 200px;"
              @change="businessSearch"
            />
            <span class="l-hg-36 mg-l-10">结束时间：</span>
            <el-date-picker
              v-model="business.endTime"
              align="right"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="结束时间"
              size="small"
              style="width: 200px;"
              @change="businessSearch"
            />
          </div>
          <el-table
            v-loading="business.loading"
            :data="business.list"
            class="wd-100-pc mg-t-20"
          >
            <el-table-column prop="id" label="Id" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="totalOrders" label="订单（笔）" sortable />
            <el-table-column prop="totalAmount" label="销售额（元）" sortable />
            <el-table-column
              prop="totalIncome"
              label="业务员收入（包含自己的销售收入）"
            >
              <template slot="header" slot-scope="item">
                {{ item.column.label }}
                <el-tooltip placement="top">
                  <div slot="content">
                    业务人员通过招募销售员后项目的分成收入，包含自己通过销售项目的收入，对应项目设置中的”销售分成”金额。
                  </div>
                  <i class="el-icon-question question" />
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="销售员" name="seller">
          <div>
            <span class="l-hg-36 mg-l-10">开始时间：</span>
            <el-date-picker
              v-model="seller.startTime"
              align="right"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始时间"
              size="small"
              style="width: 200px;"
              @change="sellerSearch"
            />
            <span class="l-hg-36 mg-l-10">结束时间：</span>
            <el-date-picker
              v-model="seller.endTime"
              align="right"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="结束时间"
              size="small"
              style="width: 200px;"
              @change="sellerSearch"
            />
            <span class="l-hg-36 mg-l-10">所属业务员：</span>
            <el-select
              v-model="seller.businessUserId"
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
            <el-button class="fl-right" @click="sellerSearch">搜索</el-button>
            <el-input
              v-model="seller.sellerUserName"
              placeholder="销售员"
              class="fl-right mg-r-20"
              style="width: 150px;"
              @change="sellerSearch"
            ></el-input>
          </div>
          <el-table
            v-loading="seller.loading"
            :data="seller.list"
            class="wd-100-pc mg-t-20"
          >
            <el-table-column prop="id" label="Id" />
            <el-table-column prop="sellerUserName" label="姓名" />
            <el-table-column label="所属业务员">
              <template slot-scope="item">
                {{ item.row.businessUserId }}-{{ item.row.businessUserName }}
              </template>
            </el-table-column>
            <el-table-column prop="totalIncome" label="累计收入" />
            <el-table-column prop="createTime" label="提现时间" />
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
  </div>
</template>

<script src="./App.js"></script>
