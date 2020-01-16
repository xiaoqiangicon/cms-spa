<template>
  <div>
    <el-dialog
      title="订单详情"
      :visible.sync="visible"
      :before-close="
        () => {
          sVisible = false;
        }
      "
    >
      <div class="row">
        <div class="title">
          佛事名称
        </div>
        ：{{ transferOrderDetail.buddhistName }}
      </div>
      <div class="row">
        <div class="title">
          规格
        </div>
        ：{{ transferOrderDetail.subName }}
      </div>
      <div class="row">
        <div class="title">
          数量
        </div>
        ：{{ transferOrderDetail.buyNum }}
      </div>
      <div class="row">
        <div class="title">
          支付
        </div>
        ：{{ transferOrderDetail.price }}
      </div>
      <div class="row">
        <div class="title">
          转单价格
        </div>
        ：{{ transferOrderDetail.transferPrice }}
      </div>
      <div class="row">
        <div class="title">
          下单时间
        </div>
        ：{{ transferOrderDetail.addTime }}
      </div>
      <div class="row">
        <div class="title">
          订单号
        </div>
        ：{{ transferOrderDetail.orderId }}
      </div>
      <div class="row">
        <div class="title">
          外部订单号
        </div>
        ：{{ transferOrderDetail.orderNum }}
      </div>
      <div class="row">
        <div class="title">
          支付流水号
        </div>
        ：{{ transferOrderDetail.wxId }}
      </div>
      <template v-if="transferOrderDetail.feedBackImg">
        <div class="bar" />
        <div class="row">
          <div class="title">
            反馈图
          </div>
          <div class="content">
            ：
            <template v-if="transferOrderDetail.feedBackImg.length">
              <div
                v-for="item in transferOrderDetail.feedBackImg"
                :key="item"
                class="img-container"
              >
                <img :src="item" />
              </div>
            </template>
            <div v-else>
              无
            </div>
          </div>
        </div>
      </template>
      <template v-if="transferOrderDetail.feedBackVideo">
        <div class="bar" />
        <div class="row">
          <div class="title">
            反馈视频
          </div>
          <div class="content">
            ：
            <template v-if="transferOrderDetail.feedBackVideo.length">
              <div
                v-for="item in transferOrderDetail.feedBackVideo"
                :key="item"
                class="img-container"
              >
                <img :src="item + '?vframe/jpg/offset/1'" />
                <i
                  class="video-play el-icon-video-play"
                  @click="onClickPlayVideo(item)"
                />
              </div>
            </template>
            <div v-else>
              无
            </div>
          </div>
        </div>
      </template>
      <template v-if="transferOrderDetail.ps">
        <div class="bar" />
        <div
          v-for="item in transferOrderDetail.ps"
          :key="item.inputId"
          class="row"
        >
          <template v-if="item.type === 14 && item.value">
            <div
              v-for="img in item.value.split(',')"
              :key="img"
              class="img-container"
            >
              <img :src="img" />
            </div>
          </template>
          <template v-else-if="item.type === 13" />
          <template v-else>
            <div class="title">
              {{ item.name }}
            </div>
            ：
            <div class="content">
              {{ item.value }}
            </div>
          </template>
        </div>
      </template>
    </el-dialog>
    <VideoPlayer
      :visible="videoPlayerVisible"
      :src="videoPlayerSrc"
      @close="
        () => {
          videoPlayerVisible = !1;
        }
      "
    />
  </div>
</template>

<script>
import { addProps } from '../data';
import VideoPlayer from './VideoPlayer';

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
  name: 'DialogDetail',
  props: {
    visible: Boolean,
  },
  components: {
    VideoPlayer,
  },
  data() {
    return {
      sVisible: this.visible,
      videoPlayerVisible: !1,
      videoPlayerSrc: '',
    };
  },
  computed: {
    ...computedProps,
  },
  watch: {
    visible(val) {
      this.sVisible = val;
    },
    sVisible(val) {
      this.$emit('updateVisible', val);
    },
  },
  methods: {
    onClickPlayVideo(video) {
      this.videoPlayerSrc = video;
      this.videoPlayerVisible = !0;
    },
  },
};
</script>

<style lang="less" scoped>
.bar {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
}
.row {
  display: flex;
  margin-bottom: 10px;
  .title {
    flex-basis: 100px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
  }
  .img-container {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .video-play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      cursor: pointer;
      color: #409eff;
    }
  }
}
</style>
