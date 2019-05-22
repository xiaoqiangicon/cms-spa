<template>
  <div class="container">
    <el-card class="info">
      <h2>{{buddhistName}}</h2>
      <div class="mg-b-20">
        {{templeName}}
        <span class="mg-l-5 mg-r-5">|</span>
        佛事ID：{{buddhistId}}
      </div>
    </el-card>
    <el-card>
      <el-table :data="subList" style="width: 100%">
        <el-table-column prop="name" label="选择项名称"></el-table-column>
        <el-table-column prop="price" label="价格（元）" align="center"></el-table-column>
        <el-table-column label="推广服务费" align="center">
          <template slot="header" slot-scope="scope">推广服务费
            <el-tooltip class="item" effect="dark" content="转单价格请在“推广设置”中设置" placement="top-start">
              <i class="el-icon-info" style="color: #409EFF;"></i>
            </el-tooltip>
            <el-button type="primary" size="mini" @click="handleClickEditRate">编辑</el-button>
          </template>
          <template slot-scope="scope">{{Number(100*rate).toFixed(2)}}%</template>
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
            <div style="cursor: pointer;" @click="handleClickEditFuBiPercent(scope.row)">
              {{Number(100*scope.row.shareFuBiPercent).toFixed(2)}}%
              <i
                style="color: #409EFF;"
                class="el-icon-edit"
              ></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="curItem.name"
      :visible.sync="dialogEditFuBiVisible"
      :before-close="()=>{dialogEditFuBiVisible=!1;}"
    >
      <div>分享福币
        <el-input style="width: 100px;" v-model="curItem.shareFuBiPercent" placeholder=""></el-input>%
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFuBiSet">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogEditRateVisible"
      :before-close="()=>{dialogEditRateVisible=!1;}"
    >
      <div class="row">
        <div class="title">支付服务费</div>
        <div class="content">：
          <el-input style="width: 210px;" v-model="rate" placeholder=""></el-input>
          <span class="mg-l-5">%</span>
        </div>
      </div>
      <div class="row">
        <div class="title">生效时间</div>
        <div class="content">：
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="startTime"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitRateSet">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'buddhistEdit',
  data() {
    return {
      buddhistName: null,
      buddhistId: null,
      templeName: null,
      isPromotion: null,
      rate: null,
      startTime: null,
      subList: null,

      dialogEditFuBiVisible: !1,
      dialogEditRateVisible: !1,

      curItem: {
        name: '',
        price: '',
        shareFuBiPercent: '',
      },
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
      const {
        buddhistId,
        buddhistName,
        templeName,
        isPromotion,
        rate,
        startTime,
        subList,
      } = sessionItem;

      this.buddhistId = buddhistId;
      this.buddhistName = buddhistName;
      this.templeName = templeName;
      this.isPromotion = isPromotion;
      this.rate = rate;
      this.startTime = startTime;
      this.subList = subList;
    },

    handleClickEditRate() {
      this.dialogEditRateVisible = !0;
    },
    submitRateSet() {},

    handleClickEditFuBiPercent(rowData) {
      this.curItem = rowData;
      this.dialogEditFuBiVisible = !0;
    },
    submitFuBiSet() {},
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


