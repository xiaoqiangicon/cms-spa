<template>
  <div>
    <div class="top">
      <el-select
        v-model="type"
        placeholder="请选择"
        size="small"
        style="width: 260px;"
        filterable
        @change="refresh"
      >
        <el-option
          v-for="item in typeList"
          :key="item.type"
          :value="item.type"
          :label="item.name"
        />
      </el-select>
      <el-button type="primary" size="small" @click="handleClickCreate">
        发 布
      </el-button>
    </div>
    <el-card>
      <el-table
        ref="table"
        v-loading="loading"
        :data="list"
        style="width: 100%"
      >
        <el-table-column label="进展内容" width="500">
          <template slot-scope="scope">
            <div>{{ scope.row.content }}</div>
            <div class="mg-t-10">
              <div
                v-for="img in scope.row.images"
                :key="img"
                class="img-container"
              >
                <img :src="img" alt="" />
              </div>
              <div
                v-for="video in scope.row.videos"
                :key="video"
                class="img-container"
              >
                <img :src="video + '?vframe/jpg/offset/1'" alt="" />
                <span class="pause-icon"></span>
                <div class="mask" @click="onClickPlayVideo(video)"></div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否推送">
          <template slot-scope="scope">
            <div>{{ scope.row.hasPush ? '已推送' : '无' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="发布时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleClickEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handleClickDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: right; margin-top: 20px;"
        layout="total, prev, pager, next, sizes, jumper"
        :page-size="pagination.pageSize"
        :current-page="pagination.page"
        :total="pagination.total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </el-card>
    <DialogEdit
      :detail="curDetail"
      :visible="dialogEditVisible"
      :typeList="typeList"
      @updateVisible="updateDialogEditVisible"
      @editPlayVideo="editPlayVideo"
      @success="refresh"
    />
    <VideoPlayer
      @hidePlayer="hidePlayer"
      :src="videoPlayerSrc"
      :visible="playerVisible"
    />
  </div>
</template>

<script>
// video.js
import seeFetch from 'see-fetch';
import './fetch';
import { Notification } from 'element-ui';
import DialogEdit from './DialogEdit';
import VideoPlayer from './VideoPlayer';

export default {
  components: {
    DialogEdit,
    VideoPlayer,
  },
  data() {
    return {
      loading: !1,
      list: [],
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
      },

      type: 1,
      typeList: [
        {
          type: 1,
          name: '超度',
        },
        {
          type: 2,
          name: '祈福',
        },
        {
          type: 3,
          name: '千寺祈福',
        },
      ],

      dialogEditVisible: !1,

      curDetail: {
        id: 0,
        content: '',
        images: [],
        videos: [],
        ifPush: !1,
      },

      videoPlayerSrc:
        'https://pic.zizaihome.com/6e33a93e-8457-4e9c-8dd1-62e993c7ca83.mp4',
      playerVisible: !1,
    };
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getList();
    },
    refresh() {
      this.pagination.page = 1;
      this.getList();
    },
    getList() {
      const { page, pageSize } = this.pagination;
      this.loading = !0;
      seeFetch('promo/ci/dynamic/getList', {
        page,
        pageSize,
        type: this.type,
      }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.pagination.total = res.data.total;
        this.list = res.data.list;
        this.loading = !1;
      });
    },
    hidePlayer() {
      this.playerVisible = !1;
    },
    onClickPlayVideo(video) {
      this.videoPlayerSrc = video;
      console.log('video', this.videoPlayerSrc);
      this.playerVisible = !0;
    },
    editPlayVideo(data) {
      this.videoPlayerSrc = data.src;
      this.playerVisible = !0;
    },
    handleClickCreate() {
      this.curDetail = {
        id: 0,
        content: '',
        images: [],
        videos: [],
        ifPush: !1,
      };
      this.dialogEditVisible = !0;
    },
    handleClickEdit(rowData) {
      this.curDetail = {
        ...rowData,
      };
      this.dialogEditVisible = !0;
    },
    handleClickDelete(rowData) {
      this.$confirm('此操作将删除选中动态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.loading = !0;
          seeFetch('promo/ci/dynamic/delete', { id: rowData.id }).then(res => {
            if (!res.success) {
              Notification({
                type: 'error',
                title: '提示',
                message: res.message,
              });
              return;
            }

            Notification({
              type: 'success',
              title: '提示',
              message: '删除成功',
            });

            this.getList();
          });
        })
        .catch(() => {});
    },
    updateDialogEditVisible(visible) {
      this.dialogEditVisible = visible;
    },
    onSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.pagination.page = 1;
      this.getList();
    },
    onCurrentChange(page) {
      this.pagination.page = page;
      this.getList();
    },
  },
};
</script>

<style lang="less">
.top {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 30px;
}
.img-container {
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
}
</style>
