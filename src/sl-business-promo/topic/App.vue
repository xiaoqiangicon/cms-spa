<template>
  <div class="container">
    <el-card>
      <div class="tabs">
        专题列表
      </div>
      <div class="operation mg-t-20">
        <el-button
          class="fr"
          type="primary"
          size="medium"
          @click="handleClickCreate"
        >
          新建页面
        </el-button>
        <el-alert type="success" :closable="false" style="width: 50%;">
          <div class="f-s-14">
            编辑生成项目专题页面，设置销售员提成金额。一个专题页面可绑定多个销售员。<br />
            将生成的链接或二维码发送给销售员可直接使用。
          </div>
        </el-alert>
      </div>
      <div class="table">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="title" label="专题名称" />
          <el-table-column
            prop="addTime"
            width="200"
            label="添加时间"
            :align="'center'"
          />
          <el-table-column label="操作" :align="'center'" width="344">
            <template slot-scope="scope">
              <el-button
                type="success"
                size="mini"
                @click="handleClickEdit(scope.row)"
              >
                编辑页面
              </el-button>
              <el-button
                type="success"
                size="mini"
                @click="handleClickEditCom(scope.row)"
              >
                编辑组件
              </el-button>
              <el-button
                type="success"
                size="mini"
                @click="handleLink(scope.row)"
              >
                链接
              </el-button>
              <el-button
                type="success"
                size="mini"
                v-if="!1"
                @click="handleClickStatistic(scope.row)"
              >
                数据
              </el-button>
              <el-button
                type="success"
                size="mini"
                @click="handleClickDelete(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: right; margin-top: 20px;"
          layout="total, prev, pager, next, sizes, jumper"
          :page-size="pagination.pageSize"
          :current-page="pagination.page"
          :total="pagination.total"
          @size-change="onSizeChange"
          @current-change="onCurrentChange"
        />
      </div>
    </el-card>
    <el-dialog title="专题链接" :visible.sync="linkDialogVisible" width="40%">
      <div v-loading="linkDialogLoading">
        <div>
          <div
            class="link-row clearfix"
            v-for="(item, index) in activeSellers"
            :key="index"
          >
            <span style="line-height: 28px" v-if="item.id">{{
              item.name
            }}</span>
            <el-select
              v-else
              v-model="item.sellerId"
              size="mini"
              placeholder="请选择"
              filterable
            >
              <el-option
                v-for="i2 in allSellers"
                :key="i2.id"
                :label="i2.id + '-' + i2.name"
                :value="i2.id"
              ></el-option>
            </el-select>
            <el-button
              size="mini"
              type="warning"
              plain
              class="fl-right"
              v-if="item.id"
              @click="delSeller(item)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="success"
              plain
              class="fl-right"
              v-else
              @click="saveSeller(item)"
              >保存</el-button
            >
            <el-button
              size="mini"
              type="primary"
              plain
              class="fl-right mg-r-10"
              v-if="item.id"
              @click="showLink(item)"
              >复制链接</el-button
            >
          </div>
        </div>
        <el-button type="primary" class="mg-t-20" @click="addSeller"
          >添加销售员</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script src="./App.js"></script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
.tabs {
  font-size: 20px;
  font-weight: bold;
}
.operation {
  overflow: hidden;
}
.table {
  margin-top: 30px;
}

.link-row {
  padding: 10px 15px;
  border-radius: 4px;
  border: 1px solid #dddddd;
  box-shadow: 0 2px 4px 0 #dddddd;
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }
}
</style>
