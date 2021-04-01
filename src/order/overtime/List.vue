<template>
  <div class="contain">
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="佛事名称" :align="'center'" />
      <el-table-column prop="templeName" label="订单寺院" :align="'center'" />
      <el-table-column prop="price" label="金额" :align="'center'" />
      <el-table-column prop="userComment" label="备注" :align="'center'" />
      <el-table-column
        label="反馈内容"
        width="240px"
        v-if="type === 1"
        :align="'center'"
      >
        <template slot-scope="scope">
          <div class="detail">
            <div class="" v-for="item in scope.row.pics" :key="item">
              <el-image
                style="width: 100px; height: 100px;margin-right: 10px;margin-bottom: 10px;border-radius: 4px;"
                :src="item + '?imageMogr2/strip'"
                :preview-src-list="[item + '?imageMogr2/strip']"
              />
            </div>
            <div
              class="video-container"
              v-for="item in scope.row.videos"
              :key="item"
            >
              <img
                class="dispose-video"
                :src="item + '?vframe/jpg/offset/1'"
                alt=""
              />
              <span class="pause-icon"></span>
              <div class="mask" @click="onClickPlayVideo(video)"></div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="处理备注"
        v-if="type === 1"
        :align="'center'"
      />
      <el-table-column prop="add_time" label="下单时间" :align="'center'" />
      <el-table-column prop="order_id" label="订单ID" :align="'center'" />
      <el-table-column label="操作" :align="'center'">
        <template slot-scope="scope">
          <div class="detail">
            <el-button size="small" @click="toDetail(scope.row)">
              订单详情
            </el-button>
            <el-button size="small" @click="revoke(scope.row)">
              撤回
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :current-page="page"
      :page-size="pageSize"
      background
      layout="prev, pager, next"
      style="margin-top: 40px"
      @current-change="pageChange"
    />
    <el-dialog :visible.sync="dialogVisible" :title="'详情'">
      <Detail @editPlayVideo="editPlayVideo" :detail="detail" :type="type" />
    </el-dialog>
    <VideoPlayer
      @hidePlayer="hidePlayer"
      :src="videoPlayerSrc"
      :visible="playerVisible"
    />
  </div>
</template>

<script>
import Detail from './Detail';
import VideoPlayer from 'com/video/VideoPlayer.vue';
import seeFetch from 'see-fetch';

let isRevoking = !1;
export default {
  name: 'List',
  data() {
    return {
      dialogVisible: !1,
      detail: {},
      videoPlayerSrc:
        'https://pic.zizaihome.com/6e33a93e-8457-4e9c-8dd1-62e993c7ca83.mp4',
      playerVisible: !1,
    };
  },
  props: {
    type: {
      requied: !0,
      type: Number,
      default: 0,
    },
    list: {
      requied: !1,
      type: Array,
      default: [],
    },
    total: {
      required: !0,
      type: Number,
    },
    page: {
      required: !0,
      type: Number,
    },
    pageSize: {
      required: !0,
      type: Number,
    },
  },
  components: {
    Detail,
    VideoPlayer,
  },
  created() {},
  methods: {
    onClickPlayVideo(video) {
      this.videoPlayerSrc = video;
      console.log('video', this.videoPlayerSrc);
      this.playerVisible = !0;
    },
    editPlayVideo(data) {
      this.videoPlayerSrc = data.src;
      this.playerVisible = !0;
    },
    hidePlayer() {
      this.playerVisible = !1;
    },
    toDetail(row) {
      this.detail = row;
      this.dialogVisible = !0;
    },
    revoke(row) {
      this.$confirm('确定要撤回吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          if (isRevoking) return;
          isRevoking = !0;
          seeFetch('order/overtime/revoke', {
            orderId: row.order_id,
          }).then(res => {
            isRevoking = !1;
            if (!res.success) return;

            window.location.reload();
          });
        })
        .catch(() => {});
    },
    pageChange(page) {
      this.$emit('changePage', page);
    },
  },
};
</script>
<style>
.video-js {
  height: 400px;
}
</style>

<style lang="less" scoped>
.detail {
  display: flex;
  flex-wrap: wrap;
}
.dispose-img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.video-container {
  position: relative;
  width: 100px;
  height: 100px;
  display: inline-block;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
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
</style>
