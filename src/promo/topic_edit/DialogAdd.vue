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
    <!-- 佛事下拉 -->
    <div v-show="activeComponent === 'buddhistComponent'" class="mg-b-20">
      <div class="mg-b-20">
        佛事名称
      </div>
      <el-select v-model="buddhistId" filterable placeholder="请选择">
        <el-option
          v-for="item in buddhistList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <!-- 商品下拉 -->
    <div v-show="activeComponent === 'goodsComponent'" class="mg-b-20">
      <div class="mg-b-20">
        商品名称
      </div>
      <el-select v-model="goodsId" filterable placeholder="请选择">
        <el-option
          v-for="item in goodsList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
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
      buddhistList: [],
      goodsList: [],

      templeId: '',
      buddhistId: '',
      goodsId: '',
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
    this.getBuddhistList();
    this.getGoodsList();
  },
  methods: {
    getTempleList() {
      seeFetch('promo/topicEdit/getTempleList', {}).then(res => {
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
      seeFetch('promo/topicEdit/getBuddhistList', {}).then(res => {
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
    getGoodsList() {
      seeFetch('promo/topicEdit/getGoodsList', {}).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });

          return;
        }

        this.goodsList = res.data;
      });
    },
    init() {
      this.templeId = '';
      this.buddhistId = '';
      this.goodsId = '';
    },

    handleClickSave() {
      const { activeComponent } = this;
      const tag = activeComponent.split('Component')[0];
      const rowData = this[`${tag}List`].find(
        item => item.id === this[`${tag}Id`]
      );
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
