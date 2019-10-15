<template>
  <el-dialog
    :visible="editVisible"
    title="编辑"
    :before-close="clickCancel"
    width="600px"
  >
    <div class="input-block">
      <label>
        <span class="input-name">渠道名称</span>
        <input v-model="channelName" class="input-txt" type="text" />
      </label>
      <p class="info">
        名称仅用于创建者区分的备注，无其他含义。
      </p>
    </div>
    <div class="input-block">
      <label>
        <span class="input-name">渠道参数</span>
        <input v-model="param" class="input-txt" type="text" />
      </label>
      <p class="info">
        使用者根据各自内部规则，为每个推广渠道指定的唯一编号。一般命名方式是渠道名称+使用方式缩写，如在公众号的某个文章推广：app_gongzh
      </p>
    </div>
    <div class="input-block">
      <label>
        <span class="input-name">统计链接</span>
        <input v-model="url" class="input-txt" type="text" />
      </label>
      <p class="info">
        需要统计的自在家链接地址，佛事、文章或专题页面
      </p>
    </div>
    <div>
      <span class="input-name">过期时间</span>
      <el-date-picker v-model="expireTime" type="date" placeholder="选择日期" />
      <p class="info">
        一般是推广的结束的时间，或者在这个时间点在无需监控数据
      </p>
    </div>
    <div class="save-block">
      <button class="save" @click="save">
        保存
      </button>
    </div>
  </el-dialog>
</template>

<script>
import seeFetch from 'see-fetch';

const computedProps = {};

['editVisible'].forEach(name => {
  computedProps[name] = {
    get() {
      return this.$store.state.statisticsChannel[name];
    },
    set(value) {
      this.$store.state.statisticsChannel[name] = value;
    },
  };
});

export default {
  name: 'Edit',
  props: {
    item: {
      required: !1,
      default: () => ({}),
    },
    isNew: {
      required: !0,
    },
  },
  data() {
    return {
      newItem: {},
      channelName: '',
      param: '',
      url: '',
      expireTime: '',
    };
  },
  computed: {
    ...computedProps,
  },
  watch: {
    item: {
      handler(newValue, oldValue) {
        if (this.isNew) return;
        console.log(this.item);
        this.newItem = this.item;
        this.channelName = this.newItem.name;
        this.param = this.newItem.params;
        this.url = this.newItem.url;
        this.expireTime = this.newItem.expireTime;
      },
      deep: true,
    },
    isNew() {
      if (this.isNew) {
        this.channelName = '';
        this.param = '';
        this.url = '';
        this.expireTime = '';
      }
    },
  },
  methods: {
    clickCancel() {
      this.$store.state.statisticsChannel.editVisible = !1;
    },
    save() {
      console.log('save');
      seeFetch('statistics/channel/save', {
        channelName: this.channelName,
        param: this.param,
        url: this.url,
        expireTime: this.expireTime,
      }).then(res => {
        if (!res.success) return;

        this.$store.state.statisticsChannel.editVisible = !1;
        this.channelName = '';
        this.url = '';
        this.expireTime = '';
        this.param = '';
      });
    },
  },
};
</script>

<style scoped>
p {
  margin: 0;
}

.input-block {
  margin-bottom: 10px;
}
.input-name {
  margin-right: 8px;
}
.input-txt {
  width: 300px;
  height: 30px;
  padding-left: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
}
.info {
  margin-top: 8px;
  padding-left: 64px;
  padding-right: 40px;
  color: #999;
}
.save-block {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.save {
  display: inline-block;
  width: 100px;
  height: 36px;
  margin: 0 auto;
  border: none;
  border-radius: 6px;
  outline: none;
  background-color: #409eff;
  color: white;
}
</style>
