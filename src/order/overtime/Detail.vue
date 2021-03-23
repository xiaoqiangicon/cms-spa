<template>
  <div class="container">
    <div class="row">
      <div class="row-left">名称</div>
      <div class="row-right">{{ detail.name }}</div>
    </div>
    <div class="row">
      <div class="row-left">选择项</div>
      <div class="row-right">{{ detail.subdivideName }}</div>
    </div>
    <div class="row">
      <div class="row-left">数量</div>
      <div class="row-right">{{ detail.buy_num }}</div>
    </div>
    <div class="row">
      <div class="row-left">支付金额</div>
      <div class="row-right">{{ detail.price }}</div>
    </div>
    <div class="row">
      <div class="row-left">下单时间</div>
      <div class="row-right">{{ detail.add_time }}</div>
    </div>
    <div class="row">
      <div class="row-left">支付流水号</div>
      <div class="row-right">{{ detail.order_id }}</div>
    </div>
    <hr />
    <div class="row">
      <div class="row-left">联系人：</div>
      <div class="row-right"></div>
    </div>
    <div class="row">
      <div class="row-left">联系电话：</div>
      <div class="row-right"></div>
    </div>
    <div class="row">
      <div class="row-left">备注：</div>
      <div class="row-right">{{ detail.userComment }}</div>
    </div>
    <hr />
    <div class="posis">
      <div class="row" v-for="(item, key) in detail.posiscript" :key="key">
        <div class="row-left">{{ item.name }}</div>
        <div class="row-right">{{ item.value }}</div>
      </div>
    </div>
    <hr />
    <div class="row" v-if="type === 0">
      <div class="row-left">上传反馈图</div>
      <div class="row-right">
        <Upload :images="uploadImg" />
      </div>
    </div>
    <div class="row" v-if="type === 0">
      <div class="row-left">上传反馈视频</div>
      <div class="row-right">
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
      </div>
    </div>
    <div class="save" v-if="type === 0">
      <el-button @click="save" type="primary">设为已处理</el-button>
    </div>
  </div>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';
import Upload from '../../com/upload/Upload';
import { Notification } from 'element-ui';

export default {
  name: 'Detail',
  props: {
    detail: {
      required: !0,
      type: Object,
      default: {},
    },
    type: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      uploadImg: [],
      uploadVideos: [],
      curUploadVideo: {
        uploading: !1,
        progress: 0,
      },
      videoPlayerSrc: '',
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
  components: {
    Upload,
  },
  methods: {
    onClickVideoDelete(video) {
      let videos = [...this.detail.videos];
      videos.splice(videos.indexOf(video), 1);
      this.detail.videos = videos;
    },
    hidePlayer() {
      this.playerVisible = !1;
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
      this.uploadVideos.push(res.data.pic);
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
      let picUrl = this.uploadImg.join(',');
      let videoUrl = this.uploadVideos.join(',');
      seeFetch('order/overtime/finish', {
        orderId: this.detail.orderId,
        picUrl,
        videoUrl,
      }).then(res => {
        Notification({
          type: 'success',
          title: '提示',
          message: '保存成功',
        });
        window.location.reload();
      });
    },
  },
};
</script>
<style>
.el-dialog__body {
  padding-top: 10px !important;
}
</style>

<style lang="less" scoped>
.container {
  width: 100%;
}
.row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
}
.row-left {
  width: 160px;
  flex-shrink: 0;
}
hr {
  height: 1px;
  margin: 20px 0;
  background-color: #ddd;
  border: none;
}
.save {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
