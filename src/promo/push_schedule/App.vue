<template>
  <div class="container">
    <el-card>
      <el-radio-group v-model="listType" @change="refresh(1)">
        <el-radio-button label="2">定时发布</el-radio-button>
        <el-radio-button label="3">立刻发布</el-radio-button>
      </el-radio-group>
      <header class="header-box">
        <el-alert
          style="width: 600px;"
          type="success"
          :closable="false"
          v-html="headInfo"
        />
        <div class="header-right">
          <el-select
            v-model="searchScheduleCommodityId"
            filterable
            placeholder="全部"
            size="medium"
            style="width:60%"
            @change="refresh(2)"
          >
            <el-option
              v-for="item in searchScheduleCommodityList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary" round @click="showDiaLog(null, 1)">
            添加
          </el-button>
        </div>
      </header>
      <el-table class="popuplist-table" :data="tableData">
        <el-table-column min-width="60px" prop="pushTime" label="发送时间" />
        <el-table-column min-width="60px" label="推送">
          <template slot-scope="scope">
            <span v-if="scope.row.isNeedPush === 1">推送</span>
            <span v-else>不推送</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="80px"
          prop="commodityName"
          label="项目/模块"
        />
        <el-table-column min-width="120px" prop="content" label="内容" />
        <el-table-column min-width="120px" label="">
          <template slot-scope="scope">
            <el-image
              style="width: 60px"
              v-for="item in scope.row.img"
              :key="item"
              :src="item"
              :preview-src-list="scope.row.img"
            >
            </el-image>
            <div
              style="width: 60px;height:60px"
              class="el-image"
              v-for="video in scope.row.video"
              :key="video"
            >
              <img style="width: 60px" :src="video + '?vframe/jpg/offset/1'" />
              <span class="pause-icon"></span>
              <div class="mask" @click="onClickPlayVideo(video)"></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="60px" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.isShow === 1">已推送</span>
            <span v-else>待推送</span>
          </template>
        </el-table-column>
        <el-table-column min-width="70px" label="操作">
          <template slot-scope="scope">
            <div class="opt">
              <el-button type="text" @click="showDiaLog(scope.row, 2)">
                编辑
              </el-button>
              <el-button
                type="text"
                @click="showDeleteDialogVisible(scope.row.id)"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        style="text-align: content; margin-top: 20px;"
        layout="total, prev, pager, next, sizes, jumper"
        :page-size="pagination.pageSize"
        :current-page="pagination.page"
        :total="pagination.total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />

      <el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
        <span>你确定要删除该条信息吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteData()">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        :title="dialogVisibleType == 1 ? '添加' : '编辑'"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <el-form :model="scheduleData">
          <el-form-item label="项目名称：" :label-width="labelWidthSize">
            <el-select
              v-model="scheduleData.commodityId"
              filterable
              placeholder="请选择"
              size="medium"
              style="width:60%"
              :disabled="commodityIdDisabled"
            >
              <el-option
                v-for="item in scheduleCommodityList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="定时发布/推送时间："
            :label-width="labelWidthSize"
          >
            <el-date-picker
              v-model="scheduleData.pushTime"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
              :disabled="pushTimeDisabled"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="内容：" :label-width="labelWidthSize">
            <el-input
              type="textarea"
              v-model="scheduleData.content"
              resize="none"
              :autosize="{ minRows: 5 }"
              maxlength="300"
            ></el-input>
          </el-form-item>
          <el-form-item label="进展图片：" :label-width="labelWidthSize">
            <Upload :images="scheduleData.img" />
          </el-form-item>
          <el-form-item label="进展视频：" :label-width="labelWidthSize">
            <!-- 反馈视频 -->
            <div
              v-for="item in scheduleData.video"
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
            <el-alert
              title="图片格式支持JPG、PNG等，视频格式支持MP4、WMV、MOV等，文件大小不超过50M"
              type="info"
              :closable="false"
            >
            </el-alert>
          </el-form-item>
          <el-form-item label="引导链接：" :label-width="labelWidthSize">
            <el-radio-group
              v-model="urlType"
              @change="changeUrlRadio"
              :disabled="urlTypeDisabled"
            >
              <el-radio :label="1">修改引导链接</el-radio>
              <el-radio :label="0">不修改</el-radio>
            </el-radio-group>
            <el-input
              v-model="scheduleData.url"
              placeholder="请输入链接"
              v-bind:class="{ hiddenCommonClass: isHiddenClass }"
            ></el-input>
            <el-alert
              title="用户点击推送内容时的默认页面会变更为当前的页面，发布后不可修改。"
              type="info"
              :closable="false"
            >
            </el-alert>
          </el-form-item>
          <el-form-item label="推送：" :label-width="labelWidthSize">
            <el-radio-group
              v-model="scheduleData.isNeedPush"
              :disabled="isNeedPushDisabled"
            >
              <el-radio :label="1">推送给参与者</el-radio>
              <el-radio :label="0">不推送</el-radio>
            </el-radio-group>
            <el-alert
              title="为了保证良好的体验避免对用户造成过多的打扰，请分配好推送间隔时间"
              type="info"
              :closable="false"
            >
            </el-alert>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addOrUpdateData()">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
    <VideoPlayer
      @hidePlayer="hidePlayer"
      :src="videoPlayerSrc"
      :visible="playerVisible"
    />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import './fetch';
import Upload from 'com/upload/Upload';
import VideoPlayer from './VideoPlayer';

export default {
  data() {
    return {
      dialogVisible: false,
      deleteDialogVisible: false,
      dialogVisibleType: 1,
      scheduleCommodityList: [],
      scheduleData: {
        commodityId: '请选择',
        pushTime: '',
        content: '',
        isNeedPush: 1,
        url: '',
        img: [],
        video: [],
        id: 0,
        isShow: 0,
      },
      labelWidthSize: '120px',
      urlType: 0,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
        },
      },
      isHiddenClass: true,

      tableData: [],

      pagination: {
        page: 1,
        total: 0,
        pageSize: 20,
      },
      videoPlayerSrc:
        'https://pic.zizaihome.com/d26db34b-3739-4fbb-beb7-2c0b4bd0c9e0.mp4',
      playerVisible: !1,
      dialogEditVisible: !1,
      deleteDataId: 0,
      pushTimeDisabled: false,
      commodityIdDisabled: false,
      urlTypeDisabled: false,
      isNeedPushDisabled: false,
      listType: 2,
      headInfo:
        '定时发布进展动态仅支持：佛事项目。\n请自行确定推送和发布时间流程，若设置推送请注意项目与项目之间保持推送时间的间隔，避免过度打扰到用户。\n注意：1.“未到发布时间”前提交的内容都可修改编辑，包括但不限于推送的控制、文案修改和图片替换等。\n2.过了“设定发布时间”则只能修改文案、图片或直接删除。',
      searchScheduleCommodityList: [],
      searchScheduleCommodityId: 0,
      curUploadVideo: {
        uploading: !1,
        progress: 0,
      },
    };
  },
  components: {
    Upload,
    VideoPlayer,
  },
  created() {
    this.getScheduleCommodityList();
    this.getScheduleList();
  },
  computed: {
    // 上传图片接口
    uploadUrl() {
      return window.location.hostname.indexOf('localhost') === -1
        ? '/upload'
        : '/mock/upload.json';
    },
  },
  methods: {
    //刷新列表
    refresh(refreshType) {
      if (this.listType == 2) {
        this.headInfo =
          '定时发布进展动态仅支持：佛事项目。\n请自行确定推送和发布时间流程，若设置推送请注意项目与项目之间保持推送时间的间隔，避免过度打扰到用户。\n注意：1.“未到发布时间”前提交的内容都可修改编辑，包括但不限于推送的控制、文案修改和图片替换等。\n2.过了“设定发布时间”则只能修改文案、图片或直接删除。';
      } else {
        this.headInfo =
          '普通发布进展动态仅支持：1.超度模块 2.祈福模块 3.千寺祈福模块。\n注意：关于佛事项目的发布去对应账户的SaaS后台发布和修改，也可使用导航里的“定时发布”。';
      }
      if (refreshType == 1) {
        this.searchScheduleCommodityId = 0;
      }
      this.pagination.page = 1;
      this.getScheduleList();
    },
    //展示编辑、新增弹窗
    showDiaLog(scheduleJSON, type) {
      var data = JSON.stringify(scheduleJSON);
      if (this.listType == 3) {
        this.pushTimeDisabled = true;
      } else {
        this.pushTimeDisabled = false;
      }
      this.commodityIdDisabled = false;
      this.urlTypeDisabled = false;
      this.isNeedPushDisabled = false;
      if (scheduleJSON == null) {
        this.scheduleData.commodityId = '请选择';
        this.scheduleData.pushTime = new Date();
        this.scheduleData.content = '';
        this.scheduleData.isNeedPush = 1;
        this.scheduleData.url = '';
        this.scheduleData.img = [];
        this.scheduleData.video = [];
        this.scheduleData.isShow = 0;
        this.changeUrlRadio('0');
        this.urlType = 0;
        this.scheduleData.id = 0;
      } else {
        this.scheduleData.commodityId = scheduleJSON.commodityId;
        this.scheduleData.pushTime = scheduleJSON.pushTime;
        this.scheduleData.content = scheduleJSON.content;
        this.scheduleData.isNeedPush = scheduleJSON.isNeedPush;
        this.scheduleData.url = scheduleJSON.url;
        this.scheduleData.img = [...scheduleJSON.img];
        this.scheduleData.video = [...scheduleJSON.video];
        this.scheduleData.id = scheduleJSON.id;
        this.scheduleData.isShow = scheduleJSON.isShow;
        if (this.scheduleData.url == '') {
          this.changeUrlRadio('0');
          this.urlType = 0;
        } else {
          this.changeUrlRadio('1');
          this.urlType = 1;
        }
        if (scheduleJSON.isShow == 1) {
          this.pushTimeDisabled = true;
          this.commodityIdDisabled = true;
          this.urlTypeDisabled = true;
          this.isNeedPushDisabled = true;
        }
      }
      this.dialogVisible = true;
      this.dialogVisibleType = type;
    },
    //展示删除弹窗
    showDeleteDialogVisible(id) {
      this.deleteDialogVisible = true;
      this.deleteDataId = id;
    },
    //删除数据
    deleteData() {
      console.log(this.deleteDataId);
      var id = this.deleteDataId;
      var status = -1;
      seeFetch('addCommoditySchedule', { id, status }).then(res => {
        this.deleteDialogVisible = false;
        this.refresh();
      });
    },
    //添加和更新数据
    addOrUpdateData() {
      var commodityId = this.scheduleData.commodityId;
      var pushTime = this.scheduleData.pushTime;
      var isNeedPush = this.scheduleData.isNeedPush;
      var isShow = this.scheduleData.isShow;
      var type = this.listType;
      // console.log(pushTime instanceof Date);
      if (commodityId == '0') {
        alert('请选择佛事之后再保存内容');
        return;
      }
      console.log(pushTime);
      if (pushTime instanceof Date) {
        if (
          pushTime.getHours() < new Date().getHours() &&
          isNeedPush == 1 &&
          isShow == 0 &&
          type != 3
        ) {
          alert('推送时间不能小于当前时间');
          return;
        }
        pushTime = this.formatDate(pushTime);
      } else {
        if (
          new Date(pushTime).getTime() < new Date().getTime() &&
          isNeedPush == 1 &&
          isShow == 0 &&
          type != 3
        ) {
          alert('推送时间不能小于当前时间');
          return;
        }
      }
      var content = this.scheduleData.content;
      var url = this.scheduleData.url;
      var img = '';
      for (var i = 0; i < this.scheduleData.img.length; i++) {
        if (img == '') {
          img += this.scheduleData.img[i] + '';
        } else {
          img += ',' + this.scheduleData.img[i];
        }
      }
      var video = '';
      for (var i = 0; i < this.scheduleData.video.length; i++) {
        if (video == '') {
          video += this.scheduleData.video[i] + '';
        } else {
          video += ',' + this.scheduleData.video[i];
        }
      }
      var id = this.scheduleData.id;
      console.log(pushTime);
      if (
        pushTime.slice(pushTime.length - 5, pushTime.length) != '00:00' &&
        isNeedPush == 1 &&
        isShow == 0 &&
        type != 3
      ) {
        alert('推送时间必须为整点');
        return;
      }

      seeFetch('addCommoditySchedule', {
        id,
        commodityId,
        pushTime,
        content,
        isNeedPush,
        url,
        img,
        video,
        type,
      }).then(res => {
        this.dialogVisible = false;
        this.refresh();
      });
    },
    //获取佛事列表
    getScheduleCommodityList() {
      seeFetch('ceremony/getScheduleCommodityList', {}).then(res => {
        this.scheduleCommodityList = [...res.data.list];
        for (var i = 0; i < this.scheduleCommodityList.length; i++) {
          this.scheduleCommodityList[i].name =
            this.scheduleCommodityList[i].id +
            '-' +
            this.scheduleCommodityList[i].name;
        }
        this.searchScheduleCommodityList = [...this.scheduleCommodityList];
        this.searchScheduleCommodityList.unshift({
          name: '全部',
          id: 0,
        });
      });
    },
    //获取进展列表
    getScheduleList() {
      var pageNo = this.pagination.page;
      var pageSize = this.pagination.pageSize;
      var type = this.listType;
      var commodityId = this.searchScheduleCommodityId;
      seeFetch('ceremony/getScheduleList', {
        pageNo,
        pageSize,
        type,
        commodityId,
      }).then(res => {
        for (var i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i]['video'] != '') {
            res.data.list[i]['video'] = res.data.list[i]['video'].split(',');
          } else {
            res.data.list[i]['video'] = [];
          }
          if (res.data.list[i]['img'] != '') {
            res.data.list[i]['img'] = res.data.list[i]['img'].split(',');
          } else {
            res.data.list[i]['img'] = [];
          }
        }
        this.tableData = res.data.list;
        this.pagination.total = res.data.total;
        console.log(this.tableData);
      });
    },
    //控制url选项，选择填写的时候url文本框展示与隐藏
    changeUrlRadio(val) {
      if (val == '1') {
        this.isHiddenClass = false;
      } else {
        this.isHiddenClass = true;
      }
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
      this.scheduleData.video.push(res.data.pic);
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
    onClickPlayVideo(video) {
      this.videoPlayerSrc = video;
      console.log('video', this.videoPlayerSrc);
      this.playerVisible = !0;
    },
    onClickVideoDelete(video) {
      let videos = [...this.scheduleData.video];
      videos.splice(videos.indexOf(video), 1);
      this.scheduleData.video = videos;
    },
    onSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.pagination.page = 1;
      this.getScheduleList();
    },
    onCurrentChange(page) {
      this.pagination.page = page;
      this.getScheduleList();
    },
    hidePlayer() {
      this.playerVisible = !1;
    },
    editPlayVideo(data) {
      this.videoPlayerSrc = data.src;
      this.playerVisible = !0;
    },
    //将date类型数据转为string
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      var d = date.getDate();
      d = d < 10 ? '0' + d : d;
      var h = date.getHours();
      var minute = date.getMinutes();
      minute = minute < 10 ? '0' + minute : minute;
      var second = date.getSeconds();
      second = minute < 10 ? '0' + second : second;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .header-box {
    margin: 20px 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .popuplist-table {
    .valid-time {
      display: flex;
      > div {
        flex: 1;
        text-align: center;
      }
      .icon-time {
        flex: 0 0 30px;
        padding: 0 6px;
      }
    }
  }
  /deep/ .el-pagination {
    text-align: center;
  }
}

.hiddenCommonClass {
  display: none;
}

.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  cursor: pointer;
}
.pause-icon {
  position: absolute;
  background-image: url('https://pic.zizaihome.com/7788d7f2-8007-11e8-b517-00163e0c001e.png');
  background-repeat: no-repeat;
  width: 32px;
  height: 32px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.upload-video-container {
  display: inline-block;
  vertical-align: top;
}

.video-cell {
  video {
    width: 100%;
    height: 100%;
    background-color: #edeef5;
  }
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
</style>
