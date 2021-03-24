<template>
  <div class="container">
    <el-card>
      <div>
        <span class="l-hg-32"> 搜索 </span>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-input
          v-model="search"
          placeholder="搜索标题或公众号"
          size="small"
          style="width: 250px"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="doSearch"
          /> </el-input
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <el-select
          v-model="type"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          @change="doSearch"
        >
          <el-option :value="0" label="全部" />
          <el-option :value="1" label="文章" />
          <el-option :value="2" label="视频" /> </el-select
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="l-hg-32"> 分组 </span>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-select
          v-model="filterGroup"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          @change="doSearch"
        >
          <el-option :value="0" label="全部" />
          <el-option
            v-for="group in groupList"
            :key="group.id"
            :value="group.id"
            :label="group.name"
          />
        </el-select>
      </div>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="id" label="id" />
          <el-table-column label="资源类型">
            <template slot-scope="item">
              <el-button v-if="item.row.hasImages" size="small" type="primary">
                图文 </el-button
              ><br /><br />
              <el-button v-if="item.row.hasVideos" size="small" type="primary">
                视频
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" />
          <el-table-column label="封面">
            <template slot-scope="item">
              <img :src="item.row.cover" class="wd-100" />
            </template>
          </el-table-column>
          <el-table-column prop="wxAccount" label="微信公众号" />
          <el-table-column prop="shortContentText" label="内容摘要" />
          <el-table-column label="是否已添加到素材库">
            <template slot-scope="item">
              {{ item.row.addedToLibrary ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column prop="pullTime" label="拉取时间" />
          <el-table-column label="操作">
            <template slot-scope="item">
              <el-button
                v-if="!item.row.addedToLibrary"
                type="text"
                size="small"
                @click="addToLibrary(item, 0)"
              >
                添加图文到素材库
              </el-button>

              <el-button
                v-if="item.row.hasVideos && !item.row.addedVideoToLibrary"
                type="text"
                size="small"
                @click="addToLibrary(item, 1)"
              >
                添加视频到素材库 </el-button
              ><el-button type="text" size="small" @click="showDetail(item)">
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="totalCount"
          :current-page="currentPage"
          background
          layout="prev, pager, next"
          style="margin-top: 40px"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" title="详情" width="400px">
      <div class="f-s-18">
        {{ detailItem.title }}
      </div>
      <div class="mg-t-20">
        {{ detailItem.wxAccount }}
      </div>
      <div class="dialog-content" v-html="detailItem.content" />
    </el-dialog>
  </div>
</template>

<script src="./App.js"></script>

<style src="./App.less" lang="less" scoped></style>

<style scoped>
.dialog-content {
  margin-top: 20px;
}

.dialog-content >>> img {
  max-width: 100% !important;
}

.dialog-content >>> iframe {
  width: 500px;
  height: 375px;
}
</style>
