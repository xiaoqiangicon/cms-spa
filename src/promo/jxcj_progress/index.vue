<template>
  <div class="app-container clearfix">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd">
        新建发布内容
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        style="width: 100%;"
        border
      >
        <el-table-column label="寺院信息">
          <template slot-scope="scope">
            <img
              :src="scope.row.headImg"
              style="width: 50px; height: 50px; border-radius: 25px; margin-right: 10px"
            />
            <span style="line-height: 50px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="装藏状态">
          <template slot-scope="scope">
            <el-switch
              :value="scope.row.isFinish"
              active-text="完成"
              inactive-text="进行中"
              :active-value="1"
              :inactive-value="0"
              @change="value => switchStatus(value, scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="num" label="装藏数量" />
        <el-table-column prop="content" label="内容" />
        <el-table-column label="图片">
          <template slot-scope="scope" v-if="scope.row.pic">
            <el-image
              class="wd-80 hg-80 mg-b-10 mg-r-10"
              v-for="(url, index) in scope.row.pic.split(',')"
              :key="index"
              :src="url"
              :preview-src-list="scope.row.pic.split(',')"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.$index, scope.row)"
            >
              更新
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNo"
        :page-size="listQuery.pageSize"
        :page-sizes="[10, 20, 50]"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      :title="isUpdate ? '更新进展' : '发布进展'"
      :visible.sync="dialogVisible"
      width="700px"
    >
      <el-form :model="item" label-width="120px" size="small">
        <el-form-item label="寺院名称：" required>
          <el-input v-model="item.name" style="width: 250px" />
        </el-form-item>
        <el-form-item label="寺院头像：" required>
          <div v-if="item.headImg" class="img-box">
            <img :src="item.headImg" />
            <div class="img-box-overlay" @click="item.headImg = null">
              <i class="el-icon-delete" />
            </div>
          </div>
          <div
            ref="avatarUpload"
            class="el-upload el-upload--picture-card upload-box"
            v-show="!item.headImg"
          >
            <i class="el-icon-plus" />
          </div>
        </el-form-item>
        <el-form-item label="内容：" required>
          <el-input
            v-model="item.content"
            type="textarea"
            rows="3"
            show-word-limit
            maxlength="300"
            placeholder="请填写进展动态的内容"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="图片：" required>
          <div
            v-for="(url, index) in item.pic ? item.pic.split(',') : []"
            :key="index"
            class="img-box"
          >
            <img :src="url" />
            <div class="img-box-overlay" @click="delImage(index)">
              <i class="el-icon-delete" />
            </div>
          </div>
          <div
            ref="imageUpload"
            class="el-upload el-upload--picture-card upload-box"
          >
            <i class="el-icon-plus" />
          </div>
        </el-form-item>
        <el-form-item label="装藏数量：">
          <el-input v-model="item.num" style="width: 250px" />
          <p class="mg-b-0 mg-t-5">
            填写当前发布进展时的装藏数量，此数量在用户端的展示会累计增加，为空或“0”不增加
          </p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="handleDialogConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
.upload-box {
  position: relative;
  width: 60px;
  height: 60px;
  line-height: 58px;
  border-radius: 4px;

  i {
    font-size: 14px;
  }
}

.img-box {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 60px;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}

.img-box-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  line-height: 60px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  display: none;

  i {
    font-size: 14px;
    color: #fff;
  }
}

.img-box:hover .img-box-overlay {
  display: block;
}
</style>
