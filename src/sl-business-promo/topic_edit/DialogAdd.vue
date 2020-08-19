<template>
  <el-dialog
    :title="'添加' + title"
    :active-component="activeComponent"
    :visible.sync="sVisible"
    :before-close="
      () => {
        sVisible = false;
      }
    "
  >
    <!-- 寺院下拉 -->
    <div v-show="activeComponent === 'templeComponent'" class="mg-b-20">
      <div class="mg-b-20">
        寺院名称
      </div>
      <el-select v-model="templeId" filterable placeholder="请选择">
        <el-option
          v-for="item in templeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <!-- 佛事下拉  -->
    <div v-show="activeComponent === 'buddhistComponent'" class="mg-b-20">
      <div class="mg-b-20">
        佛事ID
      </div>
      <el-input
        v-model="buddhistId"
        class="mg-b-20"
        style="width:200px;"
        placeholder="请输入佛事id"
        clearable
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="getBuddhistData"
        />
      </el-input>
      <el-input
        v-model="buddhistData.name"
        placeholder="佛事名称"
        :disabled="true"
      />
    </div>
    <!-- 商品下拉 -->
    <div v-show="activeComponent === 'goodsComponent'" class="mg-b-20">
      <div class="mg-b-20">
        商品ID
      </div>
      <el-input
        v-model="goodsId"
        class="mg-b-20"
        style="width:200px;"
        placeholder="请输入佛事id"
        clearable
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="getBuddhistData"
        />
      </el-input>
      <el-input
        v-model="goodsData.name"
        placeholder="商品名称"
        :disabled="true"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClickSave">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

export default {
  name: 'DialogAdd',
  props: {
    title: {
      default: '',
      type: String,
    },
    visible: {
      type: Boolean,
    },
    activeComponent: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      sVisible: this.visible,
      templeList: [],

      templeId: '',

      goodsId: '',
      goodsData: {}, // name price
      buddhistId: '',
      buddhistData: {}, // name
    };
  },
  watch: {
    sVisible(val) {
      this.$emit('updateVisible', val);

      if (val) {
        this.init();
      }
    },
    visible(val) {
      this.sVisible = val;
    },
  },
  created() {
    this.getTempleList();
  },
  methods: {
    getTempleList() {
      seeFetch('sl-business-promo/topicEdit/getTempleList', {}).then(res => {
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
    getBuddhistData() {
      const { activeComponent } = this;
      let buddhistId;
      if (activeComponent === 'goodsComponent') {
        buddhistId = this.goodsId;
      } else if (activeComponent === 'buddhistComponent') {
        ({ buddhistId } = this);
      }

      seeFetch('sl-business-promo/topicEdit/getBuddhistData', {
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

        if (!res.data) {
          Notification({
            type: 'error',
            title: '提示',
            message: '你输入的ID无对应佛事',
          });

          this.goodsData = { name: '' };
          this.buddhistData = { name: '' };
          return;
        }

        if (activeComponent === 'goodsComponent') {
          this.goodsData = res.data;
        } else if (activeComponent === 'buddhistComponent') {
          this.buddhistData = res.data;
        }
      });
    },
    init() {
      this.templeId = '';
      this.buddhistId = '';
      this.buddhistData = { name: '' };
      this.goodsId = '';
      this.goodsData = { name: '' };
    },

    handleClickSave() {
      const { activeComponent } = this;
      const tag = activeComponent.split('Component')[0];
      let rowData = {};
      if (tag === 'temple') {
        rowData = this[`${tag}List`].find(item => item.id === this[`${tag}Id`]);
      } else if (tag === 'buddhist') {
        rowData = this.buddhistData;
      } else if (tag === 'goods') {
        rowData = this.goodsData;
      }

      if (!rowData.id) {
        Notification({
          type: 'error',
          title: '提示',
          message: '请选择需要添加的组件',
        });
        return;
      }

      if (!rowData.name) {
        Notification({
          type: 'error',
          title: '提示',
          message: '添加前请核实名称',
        });
        return;
      }

      this.$emit('save', rowData);
      this.$emit('updateVisible', !1);
    },
  },
};
</script>

<style lang="less" scoped>
.cell {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 10px;
}
.avatar {
  display: inline-block;
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.nickname {
  display: inline-block;
  margin-left: 10px;
}
</style>
