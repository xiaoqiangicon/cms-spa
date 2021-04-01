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
        <input v-model="channel" class="input-txt" type="text" />
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
    <div class="input-block">
      <span class="input-name">渠道类型</span>
      <el-select v-model="type" placeholder="渠道类型">
        <el-option
          v-for="item in typeList"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        />
      </el-select>
    </div>
    <div>
      <span class="input-name">过期时间</span>
      <el-date-picker v-model="endDate" type="date" placeholder="选择日期" />
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
import { Notification } from 'element-ui';

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
      id: 0,
      channelName: '',
      typeList: [
        { id: 1, name: '闪屏' },
        { id: 2, name: '首页弹窗' },
        { id: 3, name: '支付后弹窗' },
        { id: 4, name: '首页-自在好物-3宫格' },
        { id: 5, name: '公众号推文' },
        { id: 6, name: '私域流量' },
        { id: 7, name: '首页-十宫格' },
        { id: 8, name: '公众号菜单' },
        { id: 9, name: '视频直播' },
        { id: 10, name: '公众号回复' },
        { id: 11, name: '智慧日签页面的佛事' },
        { id: 12, name: '智慧日签页面的自在说推荐' },
        { id: 13, name: '首页-浮窗' },
        { id: 14, name: '首页-新手引导' },
        { id: 15, name: '首页-自在好物-更多页面' },
        { id: 16, name: '首页-中部轮播banner' },
        { id: 17, name: '首页-祈福佛事' },
        { id: 18, name: '首页-中下部2块左右广告位' },
        { id: 19, name: '祈福-顶部banner' },
        { id: 20, name: '祈福-祈福栏目' },
        { id: 21, name: '祈福-广告推荐' },
        { id: 22, name: '祈福-广告推荐-第一条' },
        { id: 23, name: '祈福-中部banner' },
        { id: 24, name: '修行-诵经-2个位置' },
        { id: 25, name: '自在说-主题活动' },
        { id: 26, name: '自在说-首条广告' },
        { id: 27, name: '自在说瀑布流广告-问答之间' },
        { id: 28, name: '我的-2块广告位' },
        { id: 30, name: 'SaaS广告位-支付完成页面' },
        { id: 31, name: 'SaaS广告位-我的订单详情' },
        { id: 32, name: '微信消息推送' },
        { id: 33, name: '硬件' },
        { id: 34, name: 'APP-PUSH' },
        { id: 0, name: '其他运营位' },
      ],
      type: '',
      channel: '',
      url: '',
      endDate: '',
    };
  },
  computed: {
    ...computedProps,
  },
  watch: {
    item: {
      handler(newValue, oldValue) {
        if (this.isNew) return;
        this.newItem = this.item;
        this.channelName = this.newItem.name;
        this.channel = this.newItem.channel;
        this.url = this.newItem.url;
        this.endDate = this.newItem.endDate;
        this.id = this.newItem.id;
        this.type = this.newItem.type;
      },
      deep: true,
    },
    isNew() {
      if (this.isNew) {
        this.channelName = '';
        this.channel = '';
        this.url = '';
        this.endDate = '';
        this.type = '';
      }
    },
  },
  methods: {
    clickCancel() {
      this.$store.state.statisticsChannel.editVisible = !1;
    },
    save() {
      if (!this.channelName) {
        Notification({
          title: '请输入渠道名',
          type: 'warning',
        });
        return;
      }
      if (!this.channel) {
        Notification({
          title: '请输入渠道参数',
          type: 'warning',
        });
        return;
      }
      if (!this.url) {
        Notification({
          title: '请输入链接',
          type: 'warning',
        });
        return;
      }
      if (!this.type && this.type !== 0) {
        Notification({
          title: '请选择渠道类型',
          type: 'warning',
        });
        return;
      }
      if (this.url.indexOf('p_mc') !== -1) {
        Notification({
          title: '链接请不要带上渠道参数',
          type: 'warning',
        });
        return;
      }
      if (!this.endDate) {
        Notification({
          title: '请输入截至日期',
          type: 'warning',
        });
        return;
      }
      seeFetch('statistics/channel/save', {
        id: this.id,
        name: this.channelName,
        channel: this.channel,
        url: this.url,
        endDate: this.format(this.endDate),
        remark: this.item.remark,
        type: this.type,
      }).then(res => {
        if (res.errorCode == -1) {
          Notification({
            title: `${res.msg}`,
            type: 'warning',
          });
          return;
        }
        if (!res.success) return;

        this.$store.state.statisticsChannel.editVisible = !1;
        this.channelName = '';
        this.url = '';
        this.endDate = '';
        this.channel = '';
        console.log(res);
        window.location.reload();
      });
    },
    format(timeStr) {
      const date = new Date(timeStr);
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();

      return `${y}-${m >= 10 ? m : `0${m}`}-${d >= 10 ? d : `0${d}`}`;
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
  font-weight: bold;
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
  cursor: pointer;
}
</style>
