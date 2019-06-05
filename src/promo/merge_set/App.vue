<template>
  <div class="container">
    <el-card class="header">
      <div class="f-s-18 mg-b-10">{{ buddhistName }}</div>
      <div class="gray">
        <div>
          <span class="mg-r-10">佛事ID：{{ buddhistId }}</span
          >|
          <span class="mg-l-10"
            >佛事状态：{{ isEnd ? '已结束' : '进行中' }}</span
          >
        </div>
        <div class="tip mg-t-20">
          组合订单：是用于APP“超度”和“祈福”模块的订单自动调度到寺院的功能。其中转单系统与推广佛事为互斥关系，但两者都可设置分享激励
        </div>
      </div>
    </el-card>
    <div class="body">
      <div class="aside card">
        <div class="clearfix head">
          <span class="f-s-18">选择项列表</span>
          <el-button
            class="fl-right"
            size="small"
            type="primary"
            @click="addDialogVisible = true"
            >添加组合项</el-button
          >
        </div>
        <div class="list">
          <div
            class="item"
            @click="changeSub(item.id)"
            :class="{ active: item.id === subId }"
            v-for="item in mergeSubList"
            :key="item.id"
          >
            <div class="id">{{ item.id }}</div>
            <div class="name">{{ item.name }}</div>
            <div class="opt">
              <el-tooltip
                v-if="item.isOrder && item.isZizaijiaCommodity"
                effect="dark"
                content="选择项被标记为自营佛事且有历史订单，不可删除"
                placement="top-end"
              >
                <el-button
                  size="mini"
                  icon="el-icon-warning"
                  style="color: #FAAD14;"
                  circle
                ></el-button>
              </el-tooltip>
              <el-button
                v-else
                size="mini"
                icon="el-icon-delete"
                circle
                @click="delSub(item.id)"
              ></el-button>
            </div>
          </div>
        </div>
      </div>
      <el-card class="main">
        <div class="head">
          <span class="f-s-18">选择项详情</span>
          <div class="fl-right">
            <el-button type="primary" @click="add">添 加</el-button>
            <el-button type="primary" @click="save">保 存</el-button>
          </div>
        </div>
        <el-table
          v-loading="loading"
          ref="table"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="name" label="寺院名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.templeId"
                placeholder="请选择"
                size="small"
                @change="handleChangeRowTemple(scope)"
                filterable
              >
                <el-option
                  v-for="item in transferTempleList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="佛事名称">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.buddhistId"
                placeholder="请选择"
                size="small"
                @change="handleChangeRowBuddhist(scope)"
                filterable
              >
                <el-option
                  v-for="item in scope.row.buddhistSelect"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="transferRate" label="选择项">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.subId"
                placeholder="请选择"
                size="small"
                filterable
              >
                <el-option
                  v-for="item in scope.row.subSelect"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="transferPrice" label="转单价格（元）">
            <template slot-scope="scope">
              <el-input v-model="scope.row.price" placeholder=""></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <Add
      :visible="addDialogVisible"
      :subList="subList"
      @updateVisible="updateDialogVisible"
      @save="addMergeSub"
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
import { Promise } from 'q';

export default {
  name: 'App',
  components: {
    Add,
  },
  data() {
    return {
      loading: !0,

      buddhistId: null,
      buddhistName: null,
      buddhistStatus: null,
      subList: [], // 佛事的选择项数据 {id, name, conversionSubdivide, isConversion, isOrder, isZizaijiaCommodity, price}
      isEnd: null,
      addDialogVisible: !1,

      mergeSubList: [],
      transferTempleList: [], // 可设置的寺院列表数据
      templeBuddhistMap: {}, // {templeId: []}寺院 佛事 的 map , 每次请求数据后存储到本地, 优化请求

      subId: null, // 当前选中的组合项
      tableData: [], // {templeId, buddhistSelecte, buddhistId, subSelect, subId, price}
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const {
        buddhistId,
        buddhistName,
        buddhistStatus,
        subList,
        isEnd,
      } = JSON.parse(
        window.sessionStorage.getItem('promo/index/transfer/item')
      );
      this.buddhistId = buddhistId;
      this.buddhistName = buddhistName;
      this.buddhistStatus = buddhistStatus;
      this.subList = subList;
      this.isEnd = isEnd;

      this.getTransferTempleList(() => {
        this.getMergeSubList();
      });
    },
    getTransferTempleList(cb) {
      const { buddhistId } = this;
      seeFetch('promo/merge_set/getTransferTempleList', { buddhistId }).then(
        res => {
          if (!res.success) {
            Notification({
              type: 'error',
              title: '提示',
              message: res.message,
            });
            return;
          }

          this.transferTempleList = res.data;
          cb && cb();
        }
      );
    },
    getMergeSubList() {
      const { buddhistId } = this;
      seeFetch('promo/merge_set/getMergeSubList', { buddhistId }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }
        this.mergeSubList = res.data;
        if (this.mergeSubList.length) {
          this.subId = this.mergeSubList[0].id;
          this.createTableData(this.subId, res => {
            this.tableData = res;
          });
        }
      });
    },
    getBuddhistList(templeId) {
      return seeFetch('promo/merge_set/getBuddhistList', {
        id: templeId,
      }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }
        this.templeBuddhistMap[templeId] = res.data;
        console.log('单条数据获取结束');
        return res.data;
      });
    },
    createTableData(subId, cb) {
      this.loading = !0;

      // 根据当前选中的选择项 从服务器获取转单寺院列表 从服务器请求寺院对应的佛事列表
      const origin = this.mergeSubList.find(item => item.id == subId);
      let promiseAry = [];

      origin.subList.forEach(({ templeId, buddhistId, subId, price }) => {
        let resItem = {
          templeId,
          buddhistId,
          subId,
          price,
          buddhistSelect: [],
          subSelect: [],
        };

        let getData = new Promise((resolve, reject) => {
          if (this.templeBuddhistMap[templeId] === undefined) {
            resolve(this.getBuddhistList(templeId));
          } else {
            console.log('单条数据获取结束');
            resolve(this.templeBuddhistMap[templeId]);
          }
        });

        let handleData = () => {
          return getData.then(data => {
            resItem.buddhistSelect = data;
            // 本地模拟数据的时候这里报错会导致下边的语句不执行, 因此添加判断语句
            const findItem = data.find(item => item.id === buddhistId);
            if (findItem) {
              resItem.subSelecte = findItem.subList;
            }
            console.log('单条数据处理成功');
            return resItem;
          });
        };

        promiseAry.push(handleData());
      });

      Promise.all(promiseAry).then(res => {
        console.log('全部执行结束');
        console.log(res);
        this.loading = !1;
        cb(res);
      });
    },
    createSubmitData() {
      // 将当前的 tableData 转化为 submitData
      const { tableData, subId } = this;
      const params = { subId, mergeList: [] };
      tableData.forEach(({ templeId, buddhistId, subId, price }) => {
        if (templeId) {
          params.mergeList.push({
            templeId,
            buddhistId,
            subId,
            price: parseFloat(price),
          });
        }
      });

      return params;
    },
    updateDialogVisible(val) {
      this.addDialogVisible = val;
    },
    handleChangeRowTemple(scope) {
      const { templeId } = scope.row;

      // 重置 佛事 id 与选择项 id
      scope.row.buddhistId = '';
      scope.row.subId = '';

      // 获取寺院对应的佛事下拉数据
      const getData = new Promise((resolve, reject) => {
        if (this.templeBuddhistMap[templeId] === undefined) {
          this.getBuddhistList(templeId).then(data => resolve(data));
        } else {
          resolve(this.templeBuddhistMap[templeId]);
        }
      });

      getData.then(data => {
        scope.row.buddhistSelect = data;
        return data;
      });
    },
    handleChangeRowBuddhist(scope) {
      const { buddhistId, buddhistSelect } = scope.row;
      scope.row.subSelect = buddhistSelect.find(
        item => item.id === buddhistId
      ).subList;
    },
    add() {
      this.tableData.push({
        templeId: '',
        buddhistId: '',
        subId: '',
        buddhistSelected: [],
        subSelect: [],
        price: '',
      });
    },
    save() {
      if (!this.subId) {
        Notification({
          type: 'error',
          title: '提示',
          message: '您当前还未选中任何组合项哦',
        });
        return;
      }

      const params = this.createSubmitData();
      console.log(params);

      seeFetch('promo/merge_set/update', params).then(res => {
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
    changeSub(id) {
      this.subId = id;
      this.createTableData(id, res => {
        this.tableData = res;
      });
    },
    addMergeSub(id) {
      if (this.mergeSubList.find(item => item.id === id)) {
        this.$message({
          message: '此选择项已在选择项列表内',
          type: 'warning',
        });
        this.subId = id;
        this.createTableData(id, res => {
          this.tableData = res;
        });
      } else {
        const subData = this.subList.find(item => item.id === id);
        const { name, isOrder, isZizaijiaCommodity } = subData;

        this.mergeSubList.push({
          id,
          name,
          isOrder,
          isZizaijiaCommodity,
          subList: [],
        });
        this.subId = id;
        this.createTableData(id, res => {
          this.tableData = res;
        });
      }
    },
    delSub(id) {
      this.$confirm('此操作将删除选中的组合项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          seeFetch('promo/merge_set/delete', { id }).then(res => {
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
            message: '删除成功',
          });
          this.init();
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
.tip {
  width: 600px;
  padding: 20px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 4px;
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
    height: 200px;
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
      .head {
        height: 52px;
        line-height: 32px;
        padding-bottom: 20px;
        border-bottom: 2px solid #ebeef5;
      }

      height: 100%;
      flex-grow: 1;
      flex-shrink: 1;
      margin-left: 20px;
    }
  }
}
</style>
