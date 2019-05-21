<template>
  <div class="container">
    <el-card class="header">
      <div class="f-s-18 mg-b-10">{{ buddhistName }}</div>
      <div class="gray">
        <span class="mg-r-10">佛事ID：{{ buddhistId }}</span>|
        <span class="mg-l-10">佛事状态：{{isEnd ? '已结束' : '进行中'}}</span>
      </div>
      <el-button
        style="position: absolute; bottom: 40px;right: 40px;"
        type="primary"
        @click="save"
      >保 存</el-button>
    </el-card>
    <div class="body">
      <div class="aside card">
        <div class="clearfix head">
          <span class="f-s-18">寺院列表</span>
          <el-button
            class="fl-right"
            size="small"
            type="primary"
            @click="addDialogVisible = true"
          >添加寺院</el-button>
        </div>
        <div class="list">
          <div
            class="item"
            @click="changeTemple(item.id)"
            :class="{active: item.id === templeId}"
            v-for="item in transferTempleList"
            :key="item.id"
          >
            <div class="id">{{item.id}}</div>
            <div class="name">{{item.name}}</div>
            <div class="opt">
              <el-button size="mini" icon="el-icon-delete" circle @click="delTemple(item.id)"></el-button>
            </div>
          </div>
        </div>
      </div>
      <el-card class="main">
        <el-table
          ref="table"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" :selectable="tableSelectable"></el-table-column>
          <el-table-column prop="name" label="选择项名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isZizaijiaCommodity" size="mini">自营</el-tag>
              <el-tooltip
                v-if="scope.row.isZizaijiaCommodity && scope.row.isOrder"
                class="item"
                effect="dark"
                content="佛事被标记为自营佛事且已存在历史订单，不可勾选和修改"
                placement="top-start"
              >
                <i class="el-icon-info" style="color: #FAAD14;"></i>
              </el-tooltip>
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格（元）">
            <template
              slot-scope="scope"
            >{{scope.row.price > 0 ? scope.row.price : scope.row.price === 0 ? '无需支付' : '随喜'}}</template>
          </el-table-column>
          <el-table-column prop="transferRate" label="转单比例">
            <template slot="header" slot-scope="scope">转单比例
              <el-tooltip
                class="item"
                effect="dark"
                content="转单比例和转单金额是互斥关系，若填写了其中一个则其“填写项”为不可填写状态。"
                placement="top-start"
              >
                <i class="el-icon-info" style="color: #409eff;"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-input style="width: 80px;" v-model="scope.row.transferRate" placeholder=""></el-input>
              <span class="mg-t-5 mg-r-5" slot="suffix">%</span>
            </template>
          </el-table-column>
          <el-table-column prop="transferPrice" label="转单金额（元）">
            <template slot-scope="scope">
              <el-input style="width: 80px;" v-model="scope.row.transferPrice" placeholder=""></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="fuBiRate" label="分享福币（%）">
            <template slot="header" slot-scope="scope">分享福币（%）
              <el-tooltip
                class="item"
                effect="dark"
                content="设置福币分成：用户分享当前佛事后，从分享链接支付的订单会按设置的比例的福币给他。"
                placement="top-start"
              >
                <i class="el-icon-info" style="color: #409eff;"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-input style="width: 80px;" v-model="scope.row.fuBiRate" placeholder=""></el-input>
              <span class="mg-t-5 mg-r-5" slot="suffix">%</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <Add
      :visible="addDialogVisible"
      :templeList="templeList"
      @updateVisible="updateDialogVisible"
      @save="addTemple"
    />
  </div>
</template>

<script>
import clone from 'clone';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch/index';
import Add from './Add';
import { setTimeout } from 'timers';

export default {
  name: 'App',
  components: {
    Add,
  },
  data() {
    return {
      buddhistId: null,
      buddhistName: null,
      buddhistStatus: null,
      subList: [], // 佛事的选择项数据 {id, name, conversionSubdivide, isConversion, isOrder, isZizaijiaCommodity, price}
      isEnd: null,

      addDialogVisible: !1,

      templeList: [],
      transferTempleList: [],

      templeId: 1,

      tableData: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const {
        id: buddhistId,
        name: buddhistName,
        buddhistStatus,
        subList,
        isEnd,
      } = JSON.parse(window.sessionStorage.getItem('promo/index/item'));
      this.buddhistId = buddhistId;
      this.buddhistName = buddhistName;
      this.buddhistStatus = buddhistStatus;
      this.subList = subList;
      this.isEnd = isEnd;

      this.getTempleList();
      this.getTransferTempleList(() => {
        const { transferTempleList } = this;
        if (transferTempleList.length) {
          this.templeId = transferTempleList[0].id;
          this.tableData = transferTempleList[0].subList;
          this.updateTableSelected();
        }
      });
    },
    getTempleList() {
      seeFetch('promo/transfer_set/getTempleList', {}).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.templeList = res.data;
      });
    },
    getTransferTempleList(cb) {
      const { buddhistId } = this;
      seeFetch('promo/transfer_set/getTransferTempleList', { buddhistId }).then(
        res => {
          if (!res.success) {
            Notification({
              type: 'error',
              title: '提示',
              message: res.message,
            });
            return;
          }
          this.transferTempleList = res.data.map(item =>
            this.createTableData(item)
          );
          cb && cb();
        }
      );
    },
    tableSelectable(row) {
      if(row.price <= 0) return false;

      if(row.isZizaijiaCommodity && row.isOrder) return false;

      return true;
    },
    // 将服务器数据转化为表格数据
    // 本地 subList {id, name, conversionSubdivide, isConversion, isOrder, isZizaijiaCommodity, price}
    // 服务器 subList {id, name, price, transferPrice, transferRate, fuBiRate}
    createTableData(item) {
      const { subList } = this;
      let res = { ...item };
      res.subList = clone(subList);

      res.subList.forEach(sub => {
        const findSub = item.subList.find(itemSub => itemSub.id === sub.id);
        if (findSub) {
          sub.selected = true;

          // 赋值服务器字段 并设置为选中状态
          const { transferPrice, transferRate, fuBiRate } = findSub;
          sub.transferPrice = transferPrice;
          sub.transferRate = transferRate;
          sub.fuBiRate = fuBiRate;
        } else {
          sub.selected = false;

          // 补全字段
          sub.transferPrice = 0;
          sub.transferRate = 0;
          sub.fuBiRate = 0;
        }
      });
      return res;
    },
    // 生成上传数据
    // 处理本地的transferTempleList [{id, subList: [{}]}] 数据并上传
    // 本地 subList {id, name, price, transferPrice, transferRate, fuBiRate}
    // 服务器 subList {id, transferPrice, transferRate}
    createSubmitData() {
      const { buddhistId, transferTempleList } = this;
      let params = { buddhistId };

      params.transferTempleList = clone(transferTempleList);
      params.transferTempleList = params.transferTempleList.map(item => {
        let res = { id: item.id, subList: [] };

        item.subList.forEach(sub => {
          if (sub.selected && sub.price > 0) {
            res.subList.push({
              transferPrice: sub.transferPrice,
              transferRate: sub.transferRate,
            });
          }
        });

        return res;
      });

      return params;
    },
    updateTableSelected() {
      this.tableData.forEach(item => {
        if (item.selected) {
          setTimeout(() => {
            this.$refs.table.toggleRowSelection(item, true);
          });
        }
      });
    },
    updateDialogVisible(val) {
      this.addDialogVisible = val;
    },
    handleSelectionChange(selectedAry) {
      const { templeId } = this;

      const index = this.transferTempleList.findIndex(
        item => item.id === templeId
      );
      this.transferTempleList[index].subList.forEach(sub => {
        if (selectedAry.find(item => item.id === sub.id)) {
          sub.selected = true;
        } else {
          sub.selected = false;
        }
      });
    },
    save() {
      const params = this.createSubmitData();
      console.log(params);
      seeFetch('promo/transfer_set/update', params).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }
      });

      Notification({
        type: 'success',
        title: '提示',
        message: '保存成功',
      });
      this.init();
    },
    changeTemple(id) {
      this.templeId = id;
      this.tableData = this.transferTempleList.find(
        item => item.id === id
      ).subList;
      this.updateTableSelected();
    },
    addTemple(id) {
      if (this.transferTempleList.find(item => item.id === id)) {
        this.$message({
          message: '此寺院已在转单寺院列表内',
          type: 'warning',
        });
        this.templeId = id;
        this.tableData = this.transferTempleList.find(
          item => item.id === id
        ).subList;
      } else {
        const index = this.templeList.findIndex(item => item.id === id);
        const { name } = this.templeList[index];
        const tableData = this.createTableData({ id, name, subList: [] });
        this.transferTempleList.push(tableData);
        this.templeId = id;
        this.tableData = tableData.subList;
        this.updateTableSelected();
      }
    },
    delTemple(id) {
      this.$confirm('此操作将删除选中寺院, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const index = this.transferTempleList.findIndex(
            item => item.id === id
          );
          this.transferTempleList.splice(index, 1);
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
.gray {
  color: #aeafae;
}
.card {
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  .header {
    height: 120px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    position: relative;
  }
  .body {
    flex-grow: 1;
    display: flex;
    .aside {
      flex-basis: 300px;
      flex-shrink: 0;
      height: 100%;
      .head {
        height: 52px;
        line-height: 32px;
        padding-bottom: 20px;
        border-bottom: 2px solid #ebeef5;
      }
      .list {
        position: absolute;
        top: 80px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: scroll;
        .item {
          display: flex;
          height: 40px;
          line-height: 40px;
          margin: 0 20px 10px 20px;

          cursor: pointer;
          border-radius: 4px;
          &.active {
            background: #409eff;
          }
          .id {
            flex-basis: 60px;
            text-align: center;
          }
          .name {
            flex-grow: 1;
          }
          .opt {
            margin-right: 5px;
          }
        }
      }
    }
    .main {
      height: 100%;
      flex-grow: 1;
      flex-shrink: 1;
      margin-left: 20px;
    }
  }
}
</style>
