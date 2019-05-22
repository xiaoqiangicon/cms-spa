<template>
  <div>
    <div class="tip">
      推广佛事：为某个寺院的佛事活动提供增值业务，可设定与公司的分成比例与福币分成
      其中转单系统与推广佛事为互斥关系，但两者都可设置分享激励
    </div>
    <div class="filter mg-b-20">
      <el-select size="small" v-model="templeId" placeholder="请选择寺院" @change="refresh">
        <el-option v-for="item in templeList" :key="item.id" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-input placeholder="请输入佛事ID" v-model="buddhistId" size="small" style="width:200px;">
        <el-button slot="append" icon="el-icon-search" @click="refresh"></el-button>
      </el-input>
      <el-button
        class="fl-right"
        size="small"
        type="primary"
        @click="()=>{dialogAddVisible=!0;}"
      >添加推广佛事</el-button>
    </div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="templeId" label="寺院ID" width="100" :align="'left'"></el-table-column>
      <el-table-column prop="buddhistName" label="佛事状态">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEnd" style="color: #67C23A;">进行中</span>
          <template v-else>
            <span v-if="scope.row.isFinish" style="color: #909399;">已确认</span>
            <span v-else style="color: #E6A23C;">已结束</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="buddhistName" label="佛事名称"></el-table-column>
      <el-table-column prop="templeName" label="寺院名称"></el-table-column>
      <el-table-column label="推广服务费" :align="'center'">
        <template slot-scope="scope">{{Number(100*scope.row.rate).toFixed(2)}}%</template>
      </el-table-column>
      <el-table-column prop="startTime" label="推广生效时间" :align="'center'"></el-table-column>
      <el-table-column prop="updateUser" label="最后编辑人" :align="'center'"></el-table-column>
      <el-table-column label="分享福币" :align="'center'">
        <template slot="header" slot-scope="scope">分享福币
          <el-tooltip
            class="item"
            effect="dark"
            content="设置福币分成：用户分享当前佛事后，从分享链接支付的订单会按设置的比例的福币给他。"
            placement="top-start"
          >
            <i class="el-icon-info" style="color: #409EFF;"></i>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span v-if="scope.row.isShareFuBi">已设置</span>
          <span v-else style="color: #409EFF;">未设置</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" :align="'right'">
        <template slot-scope="scope">
          <div v-show="scope.row.isEnd && !scope.row.isFinish">
            <el-button type="text" size="small" @click="handleClickWithdraw(scope.row)">确认提现</el-button>
          </div>
          <div>
            <el-button type="text" size="small" @click="handleClickEdit(scope.row)">推广编辑</el-button>
          </div>
          <div>
            <el-button type="text" size="small" @click="handleClickRecord(scope.row)">记录</el-button>
          </div>
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
    <el-dialog
      title="记录"
      :visible.sync="dialogRecordVisible"
      :before-close="() => {dialogRecordVisible=!1;}"
    >
      <el-table :data="recordList" style="width: 100%">
        <el-table-column prop="startTime" label="生效时间" align="left"></el-table-column>
        <el-table-column prop="rate" label="服务费用" align="center">
          <template slot-scope="scope">{{Number(100*scope.row.rate).toFixed(2)}}%</template>
        </el-table-column>
        <el-table-column prop="updateTime" label="编辑时间" align="center"></el-table-column>
        <el-table-column prop="updateUser" label="编辑用户" align="right"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      title="确认"
      :visible.sync="dialogWithdrawVisible"
      :before-close="() => {dialogWithdrawVisible = !1;}"
    >
      <div class="row">
        <div class="title">佛事名称</div>
        <div class="content">：{{curItem.buddhistName}}</div>
      </div>
      <div class="row">
        <div class="title">佛事ID</div>
        <div class="content">：{{curItem.buddhistId}}</div>
      </div>
      <div class="f-s-18" style="color: #F56C6C;">确认结算后不可取消</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogWithdrawVisible = !1">取 消</el-button>
        <el-button type="primary" @click="handleWithdraw">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加"
      :visible.sync="dialogAddVisible"
      :before-close="() => {dialogAddVisible = !1;}"
    >
      <div class="row">
        <div class="title">寺院</div>
        <div class="content">：
          <el-select v-model="addItem.templeId" placeholder="请选择" @change="getBuddhistList">
            <el-option
              v-for="item in templeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="row">
        <div class="title">佛事</div>
        <div class="content">：
          <el-select v-model="addItem.buddhistId" placeholder="请选择">
            <el-option
              v-for="item in buddhistList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="row">
        <div class="title">支付服务费</div>
        <div class="content">：
          <el-input style="width: 210px;" v-model="addItem.rate" placeholder=""></el-input>
          <span class="mg-l-5">%</span>
        </div>
      </div>
      <div class="row">
        <div class="title">生效时间</div>
        <div class="content">：
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="addItem.startTime"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = !1">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import './fetch/index';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

export default {
  name: 'Buddhist',
  data() {
    return {
      buddhistId: '',
      templeId: '',

      list: [],

      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
      },

      templeList: [],
      buddhistList: [],

      addItem: {
        templeId: '',
        buddhistId: '',
        rate: '',
        startTime: '',
      },

      curItem: {
        buddhistId: '',
        templeId: '',
      },

      recordList: [],

      dialogRecordVisible: !1,
      dialogWithdrawVisible: !1,
      dialogAddVisible: !1,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getList();
      this.getTempleList();
    },
    refresh() {
      this.pagination.page = 1;
      this.getList();
    },
    getTempleList() {
      seeFetch('promo/index/buddhist/getTempleList', {}).then(res => {
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
    getBuddhistList() {
      const { templeId } = this.addItem;
      seeFetch('promo/index/buddhist/getBuddhistList', { templeId }).then(
        res => {
          if (!res.success) {
            Notification({
              type: 'error',
              title: '提示',
              message: res.message,
            });
            return;
          }

          this.buddhistList = res.data;
        }
      );
    },
    getList() {
      const { buddhistId, templeId } = this;
      const { page, pageSize } = this.pagination;

      seeFetch('promo/index/buddhist/getList', {
        page,
        pageSize,
        templeId,
        buddhistId,
      }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.pagination.total = res.data.total;
        this.list = res.data.list;
      });
    },
    getRecordList() {
      const { templeId, buddhistId } = this.curItem;

      return seeFetch('promo/index/buddhist/getRecordList', {
        templeId,
        buddhistId,
      }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.recordList = res.data;
        return res.data;
      });
    },
    withdraw() {
      const { templeId, buddhistId } = this.curItem;
      return seeFetch('promo/index/buddhist/withdraw', {
        templeId,
        buddhistId,
      }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        return res.data;
      });
    },
    update() {
      const { templeId, buddhistId, rate, startTime } = this.addItem;

      return seeFetch('promo/index/buddhist/update', {
        templeId,
        buddhistId,
        rate,
        startTime,
      }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        return res.data;
      });
    },
    handleClickWithdraw(rowData) {
      this.curItem = rowData;
      this.dialogWithdrawVisible = !0;
    },
    handleWithdraw() {
      this.withdraw().then(() => {
        Notification({
          type: 'success',
          title: '提示',
          message: '提现成功',
        });

        this.dialogWithdrawVisible = !1;
        this.getList();
      });
    },
    handleClickAdd() {
      this.$router.push(`/promo/buddhistEdit/0`);
    },
    handleClickEdit(rowData) {
      window.sessionStorage['promo/index/buddhist/item'] = JSON.stringify(
        rowData
      );
      this.$router.push(`/promo/buddhistEdit/${rowData.templeId}`);
    },
    handleClickRecord(rowData) {
      this.curItem = rowData;

      this.getRecordList().then(() => {
        this.dialogRecordVisible = !0;
      });
    },
    handleAdd() {
      const { templeId, buddhistId, rate, startTime } = this.addItem;

      if (!templeId) {
        Notification({
          type: 'error',
          title: '提示',
          message: '请选择寺院',
        });
        return;
      }

      if (!buddhistId) {
        Notification({
          type: 'error',
          title: '提示',
          message: '请选择佛事',
        });
        return;
      }

      if (!rate) {
        Notification({
          type: 'error',
          title: '提示',
          message: '请填写支付服务费',
        });
        return;
      }

      // 分销推广不超过 100
      const isPromotion = this.buddhistList.find(item => item.id === buddhistId)
        .isPromotion;

      if (isPromotion && rate > 100) {
        Notification({
          type: 'error',
          title: '提示',
          message: '当前佛事正在分销推广中，分成比例不可超过100%',
        });
        return;
      }

      if (!startTime) {
        Notification({
          type: 'error',
          title: '提示',
          message: '请选择生效时间',
        });
        return;
      }

      if (new Date(startTime).getTime() < new Date().getTime()) {
        Notification({
          type: 'error',
          title: '提示',
          message: '生效时间不能在此刻时间之前',
        });
        return;
      }

      this.update().then(() => {
        Notification({
          type: 'success',
          title: '提示',
          message: '添加成功',
        });
        this.refresh();
        this.getTempleList();
        this.addItem = {
          templeId: '',
          buddhistId: '',
          rate: '',
          startTime: '',
        };
        this.dialogAddVisible = !1;
      });
    },
    onSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.pagination.page = 1;
      this.getList();
    },
    onCurrentChange(page) {
      this.pagination.page = page;
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
.tip {
  width: 400px;
  padding: 15px;
  border: 1px solid #b7eb8f;
  border-radius: 4px;
  background-color: #f6ffed;
  color: rgba(0, 0, 0, 0.65);
}
.filter {
  margin-top: 20px;
}
.row {
  display: flex;
  font-size: 18px;
  margin-bottom: 10px;
  .title {
    flex-basis: 100px;
  }
}
</style>
