<template>
  <el-dialog title="转单设置" :visible.sync="visible" :before-close="()=>{sVisible = false}">
    <div class="mg-b-20">
      <span class="mg-r-5">请 选 择</span>
      <el-select
        v-model="transferTempleId"
        placeholder="请选择"
        size="small"
        style="width: 200px;"
        filterable
      >
        <el-option
          v-for="item in transferTempleList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <div>转单价格
      <el-input style="width: 200px;" v-model="transferPrice" placeholder="请输入内容"></el-input>/ 单
    </div>
    <div class="tip">
      <div>温馨提示</div>
      <div>“确认转单”前请确认寺院名称以及转单价格</div>
    </div>
    <div class="mg-t-20" style="text-align:center;">
      <el-button type="primary" @click="handleClickConfirm">确认</el-button>
    </div>
    <el-dialog
      title="转单确认"
      :visible.sync="dialoguSbmitVisible"
      :before-close="()=>{dialoguSbmitVisible = false}"
      append-to-body
    >
      <div class="row">
        <div class="title">佛事名称</div>
        <div class="content"></div>
      </div>
      <div class="row">
        <div class="title">转移寺院</div>
        <div class="content"></div>
      </div>
      <div class="row">
        <div class="title">转单数量</div>
        <div class="content"></div>
      </div>
      <div class="row">
        <div class="title">总计原价（元）</div>
        <div class="content"></div>
      </div>
      <div class="row">
        <div class="title">转单价格（元）</div>
        <div class="content"></div>
      </div>
      <div class="tip">
        <div>温馨提示</div>
        <div>“确认转单”前请确认寺院名称以及转单价格</div>
      </div>
      <div class="mg-t-20" style="text-align:center;">
        <el-button type="primary" @click="handleClickSubmit">确认转单</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

export default {
  name: 'dialogTransfer',
  props: ['detail', 'visible'], // detail {buddhistId, orderIds}
  data() {
    return {
      sVisible: this.visible,

      transferTempleList: [],
      transferTempleId: '',
      transferPrice: '',

      dialoguSbmitVisible: !1,
    };
  },
  watch: {
    visible(val) {
      this.sVisible = val;
      if (val) {
        this.init();
      }
    },
    sVisible(val) {
      this.$emit('updateVisible', val);
    },
  },
  methods: {
    init() {
      this.transferTempleId = '';
      this.transferPrice = '';
      this.getTransferTempleList();
    },
    getTransferTempleList() {
      const { buddhistId } = this;
      seeFetch('promo/index/transfer/getTransferTempleList', {
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
        this.transferTempleList = res.data;
      });
    },
    handleClickConfirm() {
      this.dialoguSbmitVisible = !0;
    },
    handleClickSubmit() {},
  },
};
</script>

<style lang="less" scoped>
.tip {
  width: 400px;
  padding: 10px;
  margin-top: 20px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 4px;
}
.row {
  display: flex;
  .title {
    flex-basis: 100px;
  }
}
</style>


