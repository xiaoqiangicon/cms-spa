<template>
  <el-dialog
    :title="'添加菜单（最多添加5个菜单）'"
    :visible.sync="sVisible"
    :append-to-body="true"
    :before-close="
      () => {
        sVisible = false;
      }
    "
  >
    <div class="content">
      <div class="row">
        <div class="row-name">
          名称：
        </div>
        <el-input v-model="name" placeholder="最多5个字" style="width: 100%;" />
      </div>
      <div class="row">
        <div class="row-name">
          图标：
        </div>
        <Upload :images="covers" :multiple="false" />
      </div>
      <div class="row">
        <div class="row-name">
          链接：
        </div>
        <el-switch v-model="urlSwitch" />
        <div v-if="urlSwitch">
          <el-input v-model="url" class="url-input" style="width: 100%;" />
        </div>
      </div>
      <div class="row">
        <div class="row-name">
          简介：
        </div>
        <textarea v-if="!urlSwitch" v-model="introduce" class="introduce" />
        <span style="line-height: 32px;" v-else>开启链接后不可设置简介</span>
      </div>
      <div class="row">
        <div class="row-name">
          简介封面：
        </div>
        <Upload v-if="!urlSwitch" :images="introCovers" :multiple="false" />
        <span style="line-height: 32px;" v-else
          >开启链接后不可设置简介封面</span
        >
      </div>
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
  name: 'App',
  components: {
    Upload,
  },
  props: {
    item: {
      default: {},
      type: Object,
    },
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      id: 0,
      sVisible: this.visible,
      name: '',
      url: '',
      covers: [],
      introCovers: [],
      introduce: '',
      urlSwitch: !1,
    };
  },
  watch: {
    sVisible(val) {
      this.$emit('updateVisible', val);
    },
    visible(val) {
      this.sVisible = val;
    },
    item: {
      handler(obj, oldObj) {
        console.log('菜单数据', obj);
        this.name = obj.name;
        this.id = obj.id;
        this.introduce = obj.detail;
        if (obj.linkUrl) {
          this.urlSwitch = !0;
          this.url = obj.linkUrl;
        } else {
          this.urlSwitch = !1;
          this.url = '';
        }
        if (obj.pic) {
          this.covers = [obj.pic];
        } else {
          this.covers = [];
        }
        if (obj.coverPic) {
          this.introCovers = [obj.coverPic];
        } else {
          this.introCovers = [];
        }
      },
      deep: true,
    },
    name(val, oldVal) {
      if (val && val.length >= 5) {
        this.name = this.name.slice(0, 5);
      }
    },
  },
  methods: {
    verify() {
      if (!this.name) {
        Notification({
          type: 'error',
          title: '提示',
          message: '添加前请核实名称',
        });
        return;
      }
      if (!this.covers.length) {
        Notification({
          type: 'error',
          title: '提示',
          message: '请上传图标',
        });
        return;
      }
      if (!this.introCovers.length) {
        Notification({
          type: 'error',
          title: '提示',
          message: '请上传简介封面',
        });
        return;
      }
      if (
        this.urlSwitch &&
        this.url.indexOf('https://wx.zizaihome.com/') === -1
      ) {
        Notification({
          type: 'error',
          title: '提示',
          message: '你填写的域名不在白名单',
        });
        return;
      }
      if (!this.urlSwitch) {
        this.url = '';
      }
      if (!this.introduce) {
        Notification({
          type: 'error',
          title: '提示',
          message: '请填写简介',
        });
        return;
      }
      const params = {
        id: this.item.id || 0,
        name: this.name,
        pic: this.covers[0],
        coverPic: this.introCovers[0],
        linkUrl: this.url,
        detail: this.introduce,
        topicId: this.$route.params.id,
      };
      seeFetch('promo/topicComponentEdit/addTag', params).then(res => {
        if (!res.errorCode) {
          params.id = res.data.id;
          if (this.item.id) {
            params.isModify = !0;
          }
          this.$emit('save', params);
          this.$emit('updateVisible', !1);
          Notification({
            type: 'success',
            title: '提示',
            message: '保存成功',
          });
        } else {
          Notification({
            type: 'error',
            title: '提示',
            message: '保存失败',
          });
        }
      });
    },
    handleClickSave() {
      this.verify();
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 0 20px;
}

.row {
  position: relative;
  margin-top: 20px;
  padding-left: 120px;
  min-height: 32px;

  &:first-child {
    margin-top: 0;
  }
}

.url-input {
  margin-top: 10px;
  margin-bottom: 20px;
}
.introduce {
  resize: none;
  padding: 10px;
  border-radius: 6px;
  outline: none;
  width: 100%;
  height: 100px;
}

.row-name {
  position: absolute;
  top: 0;
  left: 0;
  line-height: 32px;
  font-size: 16px;
}
</style>
