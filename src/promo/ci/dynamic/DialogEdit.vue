<template>
  <div>
    <el-dialog
      v-loading="loading"
      :close-on-click-modal="false"
      :title="detail.id ? '编辑' : '发布'"
      :visible.sync="sVisible"
      class="dialog-edit"
      :before-close="
        () => {
          sVisible = false;
        }
      "
    >
      <div class="content">
        <el-form ref="form" :model="detail" label-width="80px">
          <el-form-item v-show="detail.id === 0" label="发布项目">
            <el-select
              v-model="type"
              placeholder="请选择"
              size="small"
              style="width: 260px;"
              filterable
            >
              <el-option
                v-for="item in typeList"
                :key="item.type"
                :value="item.type"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              v-model="detail.content"
              type="textarea"
              placeholder="请填写进展动态的内容"
              maxlength="300"
              rows="5"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="图片">
            <Upload :images="detail.images" :multiple="true" />
          </el-form-item>
          <el-form-item label="视频">
            <!-- 反馈视频 -->
            <div
              v-for="item in detail.videos"
              :key="item"
              class="fb-cell video-cell"
            >
              <video :src="item"></video>
              <div class="video-play" @click="onClickPlayVideo(item)"></div>
              <div @click="onClickVideoDelete(item)" class="video-delete"></div>
            </div>
            <!-- 视频上传 -->
            <el-upload
              ref="uploadVideo"
              :show-file-list="false"
              :action="uploadUrl"
              class="upload-video-container"
              :before-upload="beforeUploadVideo"
              :on-success="handleUploadVideoSuccess"
              :on-progress="handleUploadVideoProgress"
              :on-error="handleUploadVideoError"
            >
              <img
                class="upload-icon"
                src="https://pic.zizaihome.com/0f919be8-308e-11e8-b78b-00163e0c001e.png"
              />
            </el-upload>
          </el-form-item>
          <el-form-item v-show="detail.id === 0" label="推送">
            <el-switch v-model="detail.ifPush" />
            <div>报名当前计划的用户都会推送。推送环境：App Push</div>
          </el-form-item>
        </el-form>
      </div>
      <div class="foot">
        <el-button size="small" type="primary" @click="save">
          保存并发布
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import './fetch';
import { Notification } from 'element-ui';
import Upload from 'com/upload/Upload'; // eslint-disable-line import/no-unresolved
import VideoPlayer from './VideoPlayer';

export default {
  components: {
    Upload,
    VideoPlayer,
  },
  props: {
    visible: Boolean,
    detail: {
      type: Object,
      default: () => ({
        id: 0,
        content: '',
        images: [],
        videos: [],
        ifPush: !1,
      }),
    },
    typeList: Array,
  },
  data() {
    return {
      loading: !1,
      sVisible: this.visible,
      type: 1,
      curUploadVideo: {
        uploading: !1,
        progress: 0,
      },
      videoPlayerSrc:
        'https://pic.zizaihome.com/6e33a93e-8457-4e9c-8dd1-62e993c7ca83.mp4',
      playerVisible: !1,
    };
  },
  computed: {
    // 上传图片接口
    uploadUrl() {
      return window.location.hostname.indexOf('localhost') === -1
        ? '/upload'
        : '/mock/upload.json';
    },
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
    onClickVideoDelete(video) {
      let videos = [...this.detail.videos];
      videos.splice(videos.indexOf(video), 1);
      this.detail.videos = videos;
    },
    onClickPlayVideo(video) {
      this.$emit('editPlayVideo', { src: video, playerVisible: !0 });
      return;
      this.videoPlayerSrc = video;
      this.playerVisible = !0;
      // this.$store.commit({ type: 'updateVideoPlayerVisible', state: true });
    },
    hidePlayer() {
      this.playerVisible = !1;
    },
    onClickVideoUploadDelete() {
      this.$refs.uploadVideo.abort();
      this.curUploadVideo = {
        uploading: !1,
        progress: 0,
      };
      console.log('取消上传');
    },
    beforeUploadVideo(file) {
      const MAX_SIZE = 50;
      const ACCEPT_FILE_TYPES = /^video\/(avi|mp4|wmv|mov|ogg|flv|rmvb)$/i;

      if (this.curUploadVideo.uploading) {
        Notification({
          type: 'info',
          title: '提示',
          message: '暂不支持多选上传哦，请耐心等待',
        });
        return false;
      }
      console.log('beforeUploadVideo');
      console.log(file);

      const isLarge = file.size / 1024 / 1024 > MAX_SIZE;

      if (!ACCEPT_FILE_TYPES.test(file.type)) {
        Notification({
          type: 'warning',
          title: '提示',
          message: '请上传正确的视频格式',
        });
        return false;
      }

      if (isLarge) {
        Notification({
          type: 'warning',
          title: '提示',
          message: `上传视频大小不能超过${MAX_SIZE}MB哦!`,
        });
        return false;
      }

      this.curUploadVideo = {
        uploading: !0,
        progress: 0,
      };
    },
    handleUploadVideoSuccess(res) {
      console.log('handleUploadVideoSuccess');
      this.detail.videos.push(res.data.pic);
      this.curUploadVideo = {
        uploading: !1,
        progress: 0,
      };
    },
    handleUploadVideoProgress(e) {
      console.log('handleUploadVideoProgress');
      this.curUploadVideo.progress = e.percent.toFixed(0);
    },
    handleUploadVideoError(err, file, fileList) {
      console.log('handleUploadVideoError');
      Notification({
        type: 'error',
        title: '提示',
        message: '未知错误，请刷新页面重试',
      });
      this.curUploadVideo = {
        uploading: !1,
        progress: 0,
      };
    },
    save() {
      const { id, content, images, videos, ifPush, type } = this.detail;
      // 数据验证
      const verifyMsg = [];

      if (!content) verifyMsg.push('请填写内容');

      if (!images.length) verifyMsg.push('请上传图片');

      if (verifyMsg.length) {
        Notification({
          type: 'error',
          title: '提示',
          message: verifyMsg[0],
        });
        return;
      }

      this.loading = !0;
      seeFetch('promo/ci/dynamic/update', {
        id,
        content,
        images,
        video: videos.join(','),
        ifPush,
        type: type >= 0 ? type : this.type,
      }).then(res => {
        if (!res.success) {
          this.loading = !1;
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        Notification({
          title: '提示',
          type: 'success',
          message: '保存成功',
        });
        this.$emit('updateVisible', !1);
        this.loading = !1;
        this.$emit('success');
      });
    },
  },
};
</script>

<style lang="less" scoped>
.foot {
  margin-top: 20px;
  text-align: center;
}
.video-cell {
  video {
    width: 100%;
    height: 100%;
    background-color: #edeef5;
  }
}
.video-delete,
.video-uploading-delete {
  background: url('https://pic.zizaihome.com/4c8b28d8-455b-11e9-9667-00163e0c001e.png')
    no-repeat;
  background-size: 24px 24px;
  position: absolute;
  width: 24px;
  height: 24px;
  top: -10px;
  right: -10px;
  cursor: pointer;
  z-index: 99999;
}
.upload-video-container {
  display: inline-block;
  vertical-align: top;
}
.fb-cell {
  font-size: 0;
  width: 100px;
  height: 100px;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 15px;
  position: relative;
  vertical-align: middle;
}
.upload-icon {
  display: inline-block;
  width: 100px;
  height: 100px;
}
.video-play {
  background: url('https://pic.zizaihome.com/7788d7f2-8007-11e8-b517-00163e0c001e.png')
    no-repeat;
  background-size: 30px 30px;
  position: absolute;
  width: 30px;
  height: 30px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
</style>
