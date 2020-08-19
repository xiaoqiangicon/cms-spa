<template>
  <div class="add-menu-mask" v-if="sVisible">
    <div class="add-menu-content">
      <div class="add-menu-header">
        <div
          class="tab-item"
          @click="changeTab(1)"
          :class="{ 'tab-active': tab === 1 }"
        >
          {{ item.name ? '编辑菜单' : '添加菜单' }}
        </div>
        <div
          class="tab-item"
          @click="changeTab(2)"
          :class="{ 'tab-active': tab === 2 }"
        >
          发布进展
        </div>
        <div
          class="tab-item"
          @click="changeTab(3)"
          :class="{ 'tab-active': tab === 3 }"
        >
          进展动态
        </div>
        <div class="close-icon" @click="close">×</div>
      </div>
      <div class="content">
        <div v-if="tab === 1">
          <div class="row">
            <div class="row-name">
              名称：
            </div>
            <el-input
              v-model="name"
              placeholder="最多5个字"
              style="width: 100%;"
            />
          </div>
          <div class="row">
            <div class="row-name">
              <p style="margin: 0">图标：</p>
              <p style="margin: 0">(120*120最佳)</p>
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
            <span style="line-height: 32px;" v-else
              >开启链接后不可设置简介</span
            >
          </div>
          <div class="row">
            <div class="row-name">
              <p style="margin: 0">简介封面：</p>
              <p style="margin: 0">(110*150最佳)</p>
            </div>
            <Upload v-if="!urlSwitch" :images="introCovers" :multiple="false" />
            <span style="line-height: 32px;" v-else
              >开启链接后不可设置简介封面</span
            >
          </div>
          <div class="save-footer">
            <el-button type="primary" @click="handleClickSave">保 存</el-button>
          </div>
        </div>
        <div v-if="tab === 2">
          <div class="schedule-row">
            <span>内容</span>
            <el-input
              v-model="scheduleContent"
              type="textarea"
              resize="none"
              rows="6"
            />
          </div>
          <div class="schedule-row">
            <span>图片视频</span>
            <div class="">
              <div class="upload-btn">
                <div class="add-img" ref="upload">添加图片</div>
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
                  <el-button type="primary" size="mini">添加视频</el-button>
                </el-upload>
              </div>
              <div class="media">
                <!-- 进展图片 -->
                <div
                  v-for="item in images"
                  :key="item"
                  class="fb-cell img-cell"
                >
                  <img :src="item" alt="" />
                  <div @click="onClickImgDelete(item)" class="img-delete"></div>
                </div>
                <!-- 进展视频 -->
                <div
                  v-for="item in videos"
                  :key="item"
                  class="fb-cell video-cell"
                >
                  <video :src="item"></video>
                  <div class="video-play" @click="onClickPlayVideo(item)"></div>
                  <div
                    @click="onClickVideoDelete(item)"
                    class="video-delete"
                  ></div>
                </div>
                <!-- 视频正在上传 -->
                <div
                  v-show="curUploadVideo.uploading"
                  v-loading="curUploadVideo.uploading"
                  class="fb-cell"
                  :element-loading-text="curUploadVideo.progress + '%'"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                  <div
                    @click="onClickVideoUploadDelete"
                    class="video-uploading-delete"
                  ></div>
                </div>
              </div>
              <p class="">
                图片格式支持JPG、PNG等，视频格式支持MP4、WMV、MOV等，文件大小不超过50M
              </p>
            </div>
          </div>
          <div class="schedule-save">
            <el-button type="primary" @click="saveSchedule"
              >保存并发布</el-button
            >
          </div>
        </div>
        <div v-if="tab === 3">
          <div class="schedule-list" v-if="scheduleList.length">
            <div
              class="schedule-item"
              v-for="(item, key) in scheduleList"
              :key="key"
            >
              <div class="item-header">
                <p class="item-add-time">发布时间：{{ item.addTime }}</p>
                <div class="item-btn">
                  <el-button
                    v-if="item.isModify"
                    @click="cacelEditSchedule(item, key)"
                    >取消</el-button
                  >
                  <el-button
                    type="primary"
                    v-if="item.isModify"
                    @click="saveScheduleItem(item, key)"
                    >保存</el-button
                  >
                  <el-button
                    v-if="!item.isModify"
                    @click="editSchedule(item, key)"
                    >编辑</el-button
                  >
                </div>
              </div>
              <div v-if="!item.isModify" class="item-content">
                <div class="item-schedule-content">
                  {{ item.content }}
                </div>
                <div class="media">
                  <div
                    class="fb-cell img-cell"
                    v-for="(imgItem, key) in item.images"
                    :key="key"
                  >
                    <img :src="imgItem" alt="" />
                  </div>
                  <div
                    class="fb-cell video-cell"
                    v-for="(videoItem, key) in item.videos"
                    :key="key"
                  >
                    <video :src="videoItem"></video>
                    <div
                      class="video-play"
                      @click="onClickPlayVideo(videoItem)"
                    ></div>
                  </div>
                </div>
              </div>
              <div v-else class="item-edit-content">
                <div class="schedule-row">
                  <span>内容</span>
                  <el-input
                    v-model="scheduleItem.content"
                    type="textarea"
                    resize="none"
                    rows="6"
                  />
                </div>
                <div class="schedule-row">
                  <span>图片视频</span>
                  <div class="">
                    <div class="upload-btn">
                      <div class="add-img" ref="upload">添加图片</div>
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
                        <el-button type="primary" size="mini"
                          >添加视频</el-button
                        >
                      </el-upload>
                    </div>
                    <div class="media">
                      <!-- 进展图片 -->
                      <div
                        v-for="item in scheduleItem.images"
                        :key="item"
                        class="fb-cell img-cell"
                      >
                        <img :src="item" alt="" />
                        <div
                          @click="onClickItemImgDelete(item)"
                          class="img-delete"
                        ></div>
                      </div>
                      <!-- 进展视频 -->
                      <div
                        v-for="item in scheduleItem.videos"
                        :key="item"
                        class="fb-cell video-cell"
                      >
                        <video :src="item"></video>
                        <div
                          class="video-play"
                          @click="onClickPlayVideo(item)"
                        ></div>
                        <div
                          @click="onClickItemVideoDelete(item)"
                          class="video-delete"
                        ></div>
                      </div>
                      <!-- 视频正在上传 -->
                      <div
                        v-show="curUploadVideo.uploading"
                        v-loading="curUploadVideo.uploading"
                        class="fb-cell"
                        :element-loading-text="curUploadVideo.progress + '%'"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                      >
                        <div
                          @click="onClickVideoUploadDelete"
                          class="video-uploading-delete"
                        ></div>
                      </div>
                    </div>
                    <p class="">
                      图片格式支持JPG、PNG等，视频格式支持MP4、WMV、MOV等，文件大小不超过50M
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="schedule-empty">还没有发布进展动态哦~</div>
        </div>
      </div>
    </div>
    <VideoPlayer
      :src="videoPlayerSrc"
      :playVisible="playVisible"
      @updateVideoPlayer="updateVideoPlayer"
    />
  </div>
</template>
<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import Upload from '../../com/upload/Upload.vue';
import VideoPlayer from './VideoPlayer.vue';
import { makeUploadImageOptions } from '../../configs/upload';
import upload from '../../../../pro-com/src/upload';

export default {
  name: 'App',
  components: {
    Upload,
    VideoPlayer,
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
      uploadUrl: `${window.location.origin}/upload/`, // 上传地址 返回 {msg, result:0, url}

      tab: 1,
      id: 0,
      sVisible: this.visible,
      name: '',
      url: '',
      covers: [],
      introCovers: [],
      introduce: '',
      urlSwitch: !1,

      // 发送进展
      scheduleContent: '',
      scheduleUrl: '',
      videos: [], // 进展视频
      images: [], // 进展图片
      curUploadVideo: {
        // 上传视频
        uploading: !1,
        progress: 0,
      },

      // 编辑进展
      scheduleList: [],
      scheduleItem: {},

      // 播放视频
      videoPlayerSrc: '',
      playVisible: !1,
      initUpload: !1, // 初始化上传图片

      saving: !1,
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
  updated() {
    const { upload: uploadEl } = this.$refs;

    if (uploadEl) {
      upload(
        makeUploadImageOptions({
          el: uploadEl,
          done: url => {
            if (this.tab === 2) {
              this.images.push(url);
            } else {
              this.scheduleItem.images.push(url);
            }
          },
          multiple: !0,
        })
      );
    }
  },
  methods: {
    changeTab(tab) {
      if (!this.item.name) return;
      if (this.tab === tab) return;
      this.tab = tab;
      if (tab === 3) {
        seeFetch('sl-business-promo/topicComponentEdit/listSchedule', {
          tabId: this.item.id,
          pageSize: 10,
          pageNo: 0,
        }).then(res => {
          if (res.errorCode === 0) {
            this.scheduleList = res.data.list;
          } else {
            Notification({
              title: '提示',
              type: 'error',
              message: '请求出错',
            });
            return;
          }
        });
      }
    },
    handleClickSave() {
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
      if (!this.urlSwitch && !this.introCovers.length) {
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
      if (!this.urlSwitch && !this.introduce) {
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
        topicId: parseInt(this.$route.params.id, 10),
      };
      seeFetch('sl-business-promo/topicComponentEdit/addTag', params).then(
        res => {
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
        }
      );
    },
    onClickImgDelete(img) {
      let images = [...this.images];
      images.splice(images.indexOf(img), 1);
      this.images = images;
    },
    onClickVideoDelete(video) {
      let videos = [...this.videos];
      videos.splice(videos.indexOf(video), 1);
      this.videos = videos;
    },
    onClickPlayVideo(video) {
      console.log(video);
      this.videoPlayerSrc = video;
      this.playVisible = !0;
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
      console.log('handleUploadVideoSuccess', res);
      if (this.tab === 2) {
        this.videos.push(res.data.pic);
      } else {
        this.scheduleItem.videos.push(res.data.pic);
      }
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
    saveSchedule() {
      const { scheduleContent, scheduleUrl, videos, images } = this;
      let topicId = parseInt(this.$route.params.id, 10);
      let tagId = this.item.id;
      if (!scheduleContent) {
        Notification({
          title: '提示',
          type: 'warning',
          message: '请填写进展内容',
        });
        return;
      }

      if (!this.saving) {
        this.saving = !0;
        seeFetch('sl-business-promo/topicComponentEdit/editSchedule', {
          topicId,
          tabId: tagId,
          content: scheduleContent,
          img: images.join(','),
          video: videos.join(','),
        }).then(res => {
          if (res.errorCode === 0) {
            Notification({
              title: '提示',
              type: 'success',
              message: '发布进展成功',
            });
            this.scheduleContent = '';
            this.images = [];
            this.videos = [];
            this.changeTab(3);
          } else {
            Notification({
              title: '提示',
              type: 'error',
              message: '发布进展失败',
            });
            return;
          }
          this.saving = !1;
        });
      }
    },

    // 发布记录
    cacelEditSchedule(item, key) {
      this.scheduleList[key].isModify = !1;
      console.log(this.scheduleList);
      this.$forceUpdate();
    },
    editSchedule(item, key) {
      this.scheduleList.forEach(item => {
        item.isModify = !1;
      });
      this.scheduleList[key].isModify = !0;
      this.scheduleItem = item;
      this.$forceUpdate();
    },
    onClickItemImgDelete(img) {
      let images = [...this.scheduleItem.images];
      images.splice(this.scheduleItem.images.indexOf(img), 1);
      this.scheduleItem.images = images;
    },
    onClickItemVideoDelete(video) {
      let videos = [...this.scheduleItem.videos];
      videos.splice(this.scheduleItem.videos.indexOf(video), 1);
      this.scheduleItem.videos = videos;
    },
    saveScheduleItem(scheduleItem) {
      let params = {};
      params.id = scheduleItem.id;
      params.topicId = parseInt(this.$route.params.id, 10);
      params.tabId = this.item.id;
      params.content = scheduleItem.content;
      params.img = scheduleItem.images.join(',');
      params.video = scheduleItem.videos.join(',');

      console.log('saving', params, scheduleItem);
      if (!this.saving) {
        this.saving = !0;
        seeFetch(
          'sl-business-promo/topicComponentEdit/editSchedule',
          params
        ).then(res => {
          if (res.errorCode === 0) {
            Notification({
              title: '提示',
              type: 'success',
              message: '保存成功',
            });
            scheduleItem.isModify = !1;
            this.$forceUpdate();
          } else {
            Notification({
              title: '提示',
              type: 'error',
              message: '保存失败',
            });
            return;
          }
        });
        this.saving = !1;
      }
    },
    updateVideoPlayer(status) {
      this.playVisible = status;
    },
    close() {
      this.tab = 1;
      this.$emit('updateVisible', !1);
    },
  },
};
</script>

<style lang="less" scoped>
.add-menu-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2000;
  overflow-y: scroll;
}
.add-menu-content {
  width: 740px;
  margin: 60px auto 0;
  background-color: #fff;
  border-radius: 20px;
  min-height: 370px;
  z-index: 2001;
}

.content {
  padding: 0 30px 20px 30px;
}

.add-menu-header {
  position: relative;
  display: flex;
  height: 50px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  border-radius: 20px 0 0 0;
  overflow: hidden;
}
.close-icon {
  position: absolute;
  right: 30px;
  top: 10px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.tab-item {
  width: 120px;
  height: 100%;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  cursor: pointer;
}

.tab-active {
  color: #fff;
  font-weight: bold;
  background-color: #409eff;
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

.save-footer {
  margin-top: 20px;
  text-align: center;
}

// tab 2
.schedule-row {
  display: flex;
  margin-top: 20px;
  span {
    width: 100px;
    flex-shrink: 0;
  }
  p {
    margin: 0;
    margin-top: 6px;
  }
  &:nth-of-type(1) {
    margin-top: 0;
  }
}
.upload-btn {
  display: flex;
}
.add-img {
  position: relative;
  width: 80px;
  height: 28px;
  margin-right: 20px;
  line-height: 28px;
  color: #fff;
  background: #409eff;
  border-radius: 4px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}
.media {
  margin-top: 20px;
}
.item-shcedule-media {
  display: flex;
  flex-wrap: wrap;
}
.fb-cell {
  font-size: 0;
  width: 120px;
  height: 120px;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 15px;
  position: relative;
  vertical-align: middle;
  &:nth-child(3n) {
    margin-right: 0;
  }
}
.img-cell {
  img {
    width: 100%;
    height: 100%;
  }
}
.video-cell {
  video {
    width: 100%;
    height: 100%;
    background-color: #edeef5;
  }
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
.img-delete,
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
.special-text {
  color: #aaa;
}
.schedule-save {
  margin-top: 20px;
  text-align: center;
}

// tab 3
.schedule-empty {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 80px;
}
.schedule-item {
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px #999;
  margin-bottom: 16px;
  padding: 0 18px 20px 36px;
  border-radius: 8px;
}
.item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
}
.item-content,
.item-edit-content {
  padding-top: 10px;
}
</style>
