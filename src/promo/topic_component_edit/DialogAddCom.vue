<template>
  <el-dialog
    :title="itemIndex >= 0 ? '编辑' : '添加'"
    :active-component="activeComponent"
    :visible.sync="sVisible"
    :append-to-body="true"
    :before-close="
      () => {
        sVisible = false;
      }
    "
  >
    <!-- 寺院下拉 -->
    <div v-show="activeComponent === 'templeComponent'" class="row">
      <div class="row-title">
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
    <div v-show="activeComponent === 'buddhistComponent'" class="row">
      <div class="row-title">
        佛事ID
      </div>
      <el-select v-model="templeId" filterable placeholder="请选择">
        <el-option
          v-for="item in buddhistList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <!-- 商品下拉 -->
    <div v-show="activeComponent === 'goodsComponent'" class="row">
      <div class="row-title">
        商品ID
      </div>
      <el-select v-model="templeId" filterable placeholder="请选择">
        <el-option
          v-for="item in buddhistList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>

    <div class="row">
      <span class="row-title">重定义名称</span>
      <el-input
        v-model="name"
        :disabled="activeComponent === 'templeComponent'"
        type="text"
        placeholder="重定义名称（可不填）"
      />
    </div>
    <div class="row">
      <span class="row-title">标签(多个用-连接)</span>
      <el-input
        v-model="label"
        :disabled="activeComponent === 'templeComponent'"
        type="text"
        placeholder="多个标签用 - 连接"
      />
    </div>
    <div class="row">
      <span class="row-title">描述重定义</span>
      <textarea
        v-model="detail"
        :disabled="activeComponent === 'templeComponent'"
        placeholder="重定义描述（可不填）"
        class="intro"
      />
    </div>
    <div class="row">
      <span class="row-title">按钮文字（最多5个字）</span>
      <el-input
        v-model="btnName"
        :disabled="activeComponent === 'templeComponent'"
        type="text"
        placeholder="按钮文字"
      />
    </div>
    <div class="row">
      <span class="row-title">封面图重定义</span>
      <Upload
        v-if="activeComponent !== 'templeComponent'"
        :images="covers"
        :multiple="false"
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
import Upload from '../../com/upload/Upload.vue';

export default {
  name: 'DialogAdd',
  components: {
    Upload,
  },
  props: {
    visible: {
      type: Boolean,
    },
    activeComponent: {
      default: '',
      type: String,
    },
    addComponentItemIndex: {
      default: 0,
      type: Number,
    },
    item: {
      default: {},
      type: Object,
    },
    itemIndex: {
      default: -1,
      type: Number,
    },
  },
  data() {
    return {
      sVisible: this.visible,
      templeList: [],

      templeId: '',
      buddhistList: [],

      // row data
      covers: [],
      name: '',
      detail: '',
      label: '',
      btnName: '',
    };
  },
  watch: {
    sVisible(val) {
      this.$emit('updateComVisible', val);
    },
    visible(val) {
      this.sVisible = val;
    },
    btnName(val, oldVal) {
      if (val && val.length >= 5) {
        this.btnName = this.btnName.slice(0, 5);
      }
    },
    item: {
      handler(obj, oldObj) {
        console.log('handler一行数据', obj);
        this.name = obj.name;
        this.templeId = obj.contentId;
        this.detail = obj.detail;
        this.label = obj.label;
        this.btnName = obj.btnName;
        if (obj.pic) {
          this.covers = [obj.pic];
        } else {
          this.covers = [];
        }
      },
      deep: true,
    },
  },
  created() {
    this.getTempleList();
    this.getBuddhistData();
  },
  methods: {
    getTempleList() {
      seeFetch('promo/topicComponentEdit/getTempleList', {}).then(res => {
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

      seeFetch('promo/topicComponentEdit/getBuddhistData', { size: 1000 }).then(
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

    handleClickSave() {
      const { activeComponent } = this;
      const rowData = {};
      rowData.id = this.templeId;

      if (!rowData.id) {
        Notification({
          type: 'error',
          title: '提示',
          message: '请选择需要添加的组件',
        });
        return;
      }

      rowData.contentId = rowData.id;
      rowData.pic = this.covers[0] || '';
      rowData.name = this.name;
      rowData.detail = this.detail;
      rowData.label = this.label;
      rowData.btnName = this.btnName;
      this.$emit('saveCom', rowData);
      this.$emit('updateComVisible', !1);
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

.row {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}
.row-title {
  display: inline-block;
  min-width: 150px;
  flex-shrink: 0;
  margin-right: 6px;
}
.intro {
  resize: none;
  padding: 10px;
  border-radius: 6px;
  outline: none;
  width: 100%;
  height: 100px;
}
</style>
