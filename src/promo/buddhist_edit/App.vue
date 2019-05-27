<template>
  <div class="container">
    <el-card class="info">
      <h2>{{buddhistData.buddhistName}}</h2>
      <div class="mg-b-20">
        {{buddhistData.templeName}}
        <span class="mg-l-5 mg-r-5">|</span>
        佛事ID：{{buddhistData.buddhistId}}
      </div>
    </el-card>
    <el-card>
      <el-table :data="buddhistData.subList" style="width: 100%">
        <el-table-column prop="name" label="选择项名称"></el-table-column>
        <el-table-column prop="price" label="价格（元）" align="center"></el-table-column>
        <el-table-column label="推广服务费" align="center">
          <template slot="header" slot-scope="scope">推广服务费
            <el-tooltip class="item" effect="dark" content="转单价格请在“推广设置”中设置" placement="top-start">
              <i class="el-icon-info" style="color: #409EFF;"></i>
            </el-tooltip>
            <el-button type="primary" size="mini" @click="handleClickEditRate">编辑</el-button>
          </template>
          <template slot-scope="scope">{{Number(100*buddhistData.rate).toFixed(2)}}%</template>
        </el-table-column>
        <el-table-column label="分享福币" align="center">
          <template slot="header" slot-scope="scope">分享福币（%）
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
            <div
              v-if="scope.row.price !== 0"
              style="cursor: pointer;"
              @click="handleClickEditFuBiPercent(scope.row)"
            >
              {{scope.row.shareFuBiPercent}}%
              <i style="color: #409EFF;" class="el-icon-edit"></i>
            </div>
            <div v-else>-</div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- DialogEditFuBi -->
    <el-dialog
      :title="curSubItem.name"
      :visible.sync="dialogEditFuBiVisible"
      :before-close="()=>{dialogEditFuBiVisible=!1;}"
    >
      <div>
        <span class="mg-r-5">分享福币</span>
        <el-input style="width: 100px;" v-model.number="tempCurSubItem.shareFuBiPercent" placeholder=""></el-input>
        <span class="mg-l-5">%</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFuBiSet">保 存</el-button>
      </span>
    </el-dialog>
    <!-- DialogEdit -->
    <el-dialog
      title="提示"
      :visible.sync="dialogEditVisible"
      :before-close="()=>{dialogEditVisible=!1;}"
    >
      <div class="row">
        <div class="title">支付服务费</div>
        <div class="content">：
          <el-input style="width: 210px;" v-model.number="tempRateHandle" placeholder=""></el-input>
          <span class="mg-l-5">%</span>
        </div>
      </div>
      <div class="row">
        <div class="title">生效时间</div>
        <div class="content">：
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="tempStartTime"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Notification } from 'element-ui';
import './fetch/index';
import seeFetch from 'see-fetch';

export default {
  name: 'buddhistEdit',
  data() {
    return {
      buddhistData: {}, // buddhistId buddhistName templeName isPromotion promotionPercent rate startTime subList

      tempRateHandle: null, // * 100
      tempStartTime: null,

      dialogEditFuBiVisible: !1,
      dialogEditVisible: !1,

      curSubItem: {}, // id name price shareFuBiPercent
      tempCurSubItem: {}, // id name price shareFuBiPercent
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const id = parseInt(this.$route.params.id, 10);
      const sessionItem = JSON.parse(
        window.sessionStorage.getItem('promo/index/buddhist/item')
      );
      this.buddhistData = sessionItem;

      const { rate, startTime } = sessionItem;

      this.tempRateHandle = rate * 100;
      this.tempStartTime = startTime;
    },

    handleClickEditRate() {
      this.dialogEditVisible = !0;
    },
    submit() {
      const { buddhistId, templeId, isPromotion } = this.buddhistData;
      const { tempRateHandle: rate, tempStartTime: startTime } = this;

      if (!rate) {
        Notification({
          type: 'error',
          title: '提示',
          message: '请填写支付服务费',
        });
        return;
      }

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

      seeFetch('promo/buddhist_edit/update_buddhist_set', {
        templeId,
        buddhistId,
        rate: rate / 100,
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

        Notification({
          type: 'success',
          title: '提示',
          message: '保存成功',
        });

        this.buddhistData.rate = rate / 100;
        this.startTime = startTime;
        this.dialogEditVisible = !1;
      });
    },

    handleClickEditFuBiPercent(rowData) {
      this.curSubItem = rowData;
      this.tempCurSubItem = { ...rowData };
      this.dialogEditFuBiVisible = !0;
    },
    submitFuBiSet() {
      const { promotionPercent } = this.buddhistData;
      const { id: subId } = this.tempCurSubItem;
      let {shareFuBiPercent} = this.tempCurSubItem;

      if (promotionPercent + shareFuBiPercent > 100) {
        Notification({
          type: 'warning',
          title: '提示',
          message: `福币分成比例不可超过${100 - promotionPercent}`,
        });
        return;
      }

      if (!shareFuBiPercent) {
        // 设置为 0 或不填 提示 为不设置分成
        Notification({
          type: 'info',
          title: '提示',
          message: '设置为0或不填将保存为不设置分成',
        });
        shareFuBiPercent = 0;
      }

      seeFetch('promo/buddhist_edit/update_sub_set', { subId, shareFuBiPercent }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        Notification({
          type: 'success',
          title: '提示',
          message: '保存成功',
        });

        this.curSubItem.shareFuBiPercent = shareFuBiPercent;
        this.dialogEditFuBiVisible = !1;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  padding: 40px;
}
.info {
  margin-bottom: 20px;
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


