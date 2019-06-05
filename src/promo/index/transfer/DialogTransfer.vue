<template>
  <el-dialog
    title="转单设置"
    :visible.sync="visible"
    :before-close="
      () => {
        sVisible = false;
      }
    "
  >
    <div class="mg-b-20">
      <span class="mg-r-10">请 选 择</span>
      <el-select
        v-model="transferTempleId"
        placeholder="请选择"
        size="small"
        style="width: 200px;"
        filterable
        @change="onChangeTransferTemple"
      >
        <el-option
          v-for="item in transferTempleList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <div class="mg-b-10">
      <span class="mg-r-5">转单价格</span>
      <el-input
        v-model.number="price"
        style="width: 200px;"
        placeholder="请输入价格"
      />
      <span class="mg-l-10">/ 单</span>
    </div>
    <div class="mg-b-10">
      <span class="mg-r-5">转单比例</span>
      <el-input
        v-model.number="percent"
        style="width: 200px;"
        placeholder="请输入价格"
      />
      <span class="mg-l-10">% / 单</span>
    </div>
    <div class="tip">
      <div>温馨提示</div>
      <div>“确认转单”前请确认寺院名称以及转单价格</div>
    </div>
    <div
      class="mg-t-20"
      style="text-align:center;"
    >
      <el-button
        type="primary"
        @click="handleClickConfirm"
      >
        确认
      </el-button>
    </div>
    <el-dialog
      title="转单确认"
      :visible.sync="dialoguSbmitVisible"
      :before-close="
        () => {
          dialoguSbmitVisible = false;
        }
      "
      append-to-body
    >
      <div class="row">
        <div class="title">
          佛事名称
        </div>
        <div class="content">
          {{ transferBuddhistName }}
        </div>
      </div>
      <div class="row">
        <div class="title">
          转移寺院
        </div>
        <div class="content">
          {{ transferTempleName }}
        </div>
      </div>
      <div class="row">
        <div class="title">
          转单数量
        </div>
        <div class="content">
          {{ transferOrderIds.length }}
        </div>
      </div>
      <div class="row">
        <div class="title">
          总计原价（元）
        </div>
        <div class="content">
          {{ originPriceSum }}
        </div>
      </div>
      <div class="row">
        <div class="title">
          转单价格（元）
        </div>
        <div class="content">
          {{ priceSum }}
        </div>
      </div>
      <div class="tip">
        <div>温馨提示</div>
        <div>“确认转单”前请确认寺院名称以及转单价格</div>
      </div>
      <div
        class="mg-t-20"
        style="text-align:center;"
      >
        <el-button
          type="primary"
          @click="handleClickSubmit"
        >
          确认转单
        </el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

import { addProps } from '../data';

const computedProps = {};
addProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.promoIndex.add[name];
      },
      set(value) {
        const key = `promoIndex/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.promoIndex.add[name];
    };
  }
});

export default {
  name: 'DialogTransfer',
  props: ['visible'], //
  data() {
    return {
      sVisible: this.visible,

      transferTempleList: [], // 转单寺院列表
      transferTempleId: '', // 转单寺院

      originPrice: '', // 转单原价
      price: '', // 转单价格
      percent: '', // 转单百分比

      dialoguSbmitVisible: !1,
    };
  },
  computed: {
    ...computedProps,
    transferTempleName() {
      const findItem = this.transferTempleList.find(
        item => item.id === parseInt(this.transferTempleId)
      );
      if (findItem) {
        return findItem.name;
      } 
        return '';
      
    },
    originPriceSum() {
      const { originPrice, transferOrderIds } = this;

      return (originPrice * transferOrderIds.length).toFixed(4);
    },
    priceSum() {
      const { price, originPrice, percent, transferOrderIds } = this;
      return (price
        ? price * this.transferOrderIds.length
        : (percent / 100) * this.transferOrderIds.length
      ).toFixed(4);
    },
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
      this.transferTempleList = [];
      this.transferTempleId = '';
      this.originPrice = '';
      this.price = '';
      this.percent = '';
      this.originPriceSum = '';
      this.priceSum = '';
      this.getTransferTempleList();
    },
    getTransferTempleList() {
      const { transferBuddhistId: buddhistId } = this;
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
    onChangeTransferTemple(transferTempleId) {
      // 获取转单选择项的 subId
      // 多订单 获取全局的 transferSubId
      // 单订单 获取 全局的 transferOrderDetail 里的subId
      const subId = this.transferSubId
        ? this.transferSubId
        : this.transferOrderDetail.subId;

      // 获取转单选择项的原价
      const { price: originPrice } = this.transferSubList.find(
        item => item.id === subId
      );

      // 这里有可能设置了寺院选择项 有可能没设置
      const transferTempleSubList = this.transferTempleList.find(
        item => item.id === transferTempleId
      ).subList;
      const findSub = transferTempleSubList.find(item => item.id === subId);
      let price;
      let percent;

      if (findSub) {
        // 设置了的读取设置配置
        ({ price, percent } = findSub);
      } else {
        // 未设置赋值为原价
        price = originPrice;
        percent = 0;
      }

      this.originPrice = originPrice;
      this.price = price;
      this.percent = percent;
    },
    handleClickConfirm() {
      const { originPrice, price, percent } = this;

      if (!this.transferTempleId) {
        Notification({
          type: 'warning',
          title: '提示',
          message: '请选择转单寺院',
        });
        return;
      }

      if (price && percent) {
        Notification({
          type: 'warning',
          title: '提示',
          message: '转单价格和转单比例只有一项生效',
        });
        return;
      }

      this.dialoguSbmitVisible = !0;
    },
    handleClickSubmit() {
      const {
        transferBuddhistId: buddhistId,
        transferTempleId: templeId,
        transferOrderIds: orderIds,
        price,
        percent,
      } = this;

      seeFetch('promo/index/transfer/transfer', {
        buddhistId,
        templeId,
        orderIds,
        price,
        percent,
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
          message: '操作成功',
        });

        this.$emit('submit');
        this.dialoguSbmitVisible = !1;
        this.$emit('updateVisible', !1);
      });
    },
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
  margin-bottom: 10px;
  .title {
    flex-basis: 100px;
  }
}
</style>
