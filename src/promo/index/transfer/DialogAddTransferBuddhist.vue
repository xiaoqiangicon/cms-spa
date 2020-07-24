<template>
  <el-dialog title="添加佛事" :visible.sync="dialogAddTransferBuddhistVisible">
    <div class="mg-b-10 f-s-18">
      请选择转单佛事
    </div>
    <el-select
      v-model="buddhistId"
      placeholder="请选择"
      size="small"
      style="width: 200px;"
      filterable
      @change="onChangeBuddhist"
    >
      <el-option
        v-for="item in buddhistList"
        :key="item.id"
        :label="item.id + ' - ' + item.name"
        :value="item.id"
      />
    </el-select>
    <div class="mg-t-10 f-s-18 mg-b-10">
      请设置规格类型
    </div>
    <el-checkbox-group v-model="subList" size="mini">
      <div v-for="item in subdivideList" :key="item.id" class="mg-b-10">
        <el-tooltip
          v-if="
            (!!item.isZizaijiaCommodity && !!item.isOrder) ||
              item.price <= 0 ||
              item.wishOrderMoney > 0
          "
          effect="dark"
          :content="
            !!item.isZizaijiaCommodity && !!item.isOrder
              ? '自营佛事且已产生订单'
              : item.price === 0
              ? '无需支付'
              : '随喜'
          "
          placement="right"
        >
          <el-checkbox
            :label="item.id"
            :disabled="
              (!!item.isZizaijiaCommodity && !!item.isOrder) ||
                item.price <= 0 ||
                item.wishOrderMoney > 0 ||
                !!item.conversionSubdivide
            "
          >
            {{ item.subdivideName }}
          </el-checkbox>
        </el-tooltip>
        <el-checkbox
          v-else
          :label="item.id"
          :disabled="!!item.conversionSubdivide"
        >
          {{ item.subdivideName }}
        </el-checkbox>
      </div>
    </el-checkbox-group>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogAddTransferBuddhistVisible = false">
        取 消
      </el-button>
      <el-button type="primary" @click="save">
        保 存
      </el-button>
    </div>
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
    /* eslint-disable */
    computedProps[name] = function() {
      return this.$store.state.promoIndex.add[name];
    };
  }
});

export default {
  name: 'DialogAddTransferBuddhist',
  data() {
    return {
      buddhistId: '',
      buddhistList: [],
      subdivideList: [],
      subList: [],
    };
  },
  computed: {
    ...computedProps,
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getBuddhistList();
      this.buddhistId = '';
      this.subdivideList = [];
      this.subList = [];
    },
    getBuddhistList() {
      seeFetch('promo/index/getTransferAddBuddhistList', {}).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.buddhistList = res.data;
      });
    },
    onChangeBuddhist(id) {
      this.subdivideList = this.buddhistList.find(
        item => item.id === id
      ).subdivides;
      this.subList = [];
    },
    save() {
      const { subList, buddhistId } = this;

      if (!subList.length) {
        Notification({
          type: 'error',
          title: '提示',
          message: '至少选择一个选择项',
        });
        return;
      }

      this.$confirm('请确认信息准确无误，保存后将不可修改类型', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          seeFetch('promo/index/transfer/addBuddhist', {
            subList,
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

            Notification({
              type: 'success',
              title: '提示',
              message: '添加成功',
            });
            this.$emit('save');
            this.dialogAddTransferBuddhistVisible = false;
            this.init();
          });
        })
        .catch(() => {});
    },
  },
};
</script>
