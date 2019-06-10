<template>
  <div
    v-show="visible"
    class="video-player-mask"
    @click.self="onClickMask"
  >
    <div class="video-player-container">
      <video
        ref="videoPlayer"
        class="video-js vjs-big-play-centered vjs-4-3"
      >
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that
          <a
            href="https://videojs.com/html5-video-support/"
            target="_blank"
          >supports HTML5 video</a>
        </p>
      </video>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
  name: 'VideoPlayer',
  props: {
    src: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: !1,
    },
  },
  data: () => ({
    player: null,
    options: {
      controls: !0,
      preload: 'auto',
      autoplay: !1,
      fluid: !0,
      language: 'zh-cN',
      muted: !1,
      sources: '',
    },
  }),
  watch: {
    visible(newValue) {
      if (newValue) {
        this.reload();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.player = videojs(this.$refs.videoPlayer, this.options, () => {});
    });
  },
  methods: {
    reload() {
      const { player, src } = this;
      if (!src) return;

      player.pause();
      player.src(src);
      player.load(src);
    },
    onClickMask() {
      this.player.pause();
      this.$emit('close');
    },
  },
};
</script>

<style lang="less" scoped>
.video-player-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99999999;
}
.video-player-container {
  width: 600px;
  height: 400px;
  margin: 100px auto;
}
.video-js {
  width: 100%;
}
</style>
