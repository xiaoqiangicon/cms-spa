<template>
  <div class="container">
    <el-card>
      <div class="mg-b-20 dp-flex">
        <div ref="upload" class="upload-sec">
          <span>上传图片（自动压缩）</span>
        </div>
        <div class="wd-20 hg-10" />
        <div ref="uploadOrigin" class="upload-sec">
          <span>上传图片（不压缩）</span>
        </div>
      </div>
      <div class="body">
        <el-table :data="list" style="width: 100%">
          <el-table-column label="预览">
            <template slot-scope="item">
              <img class="wd-200" :src="item.row.url" />
            </template>
          </el-table-column>
          <el-table-column label="地址">
            <template slot-scope="item">
              <div :ref="'pre' + item.row.id" class="code">
                {{ item.row.url }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="item">
              <el-button type="text" size="small" @click="copy(item)">
                复制
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import upload from '../../../pro-com/src/upload';
import { makeUploadImageOptions } from '../../configs/upload';

export default {
  name: 'App',
  data() {
    return {
      id: 1,
      list: [],
    };
  },
  mounted() {
    const self = this;
    const { upload: uploadEl, uploadOrigin } = this.$refs;

    upload(
      makeUploadImageOptions({
        el: uploadEl,
        done(url) {
          self.list.unshift({ url, id: self.id });
          self.id += 1;
        },
        multiple: !0,
      })
    );
    upload(
      makeUploadImageOptions({
        el: uploadOrigin,
        done(url) {
          self.list.unshift({ url, id: self.id });
          self.id += 1;
        },
        multiple: !0,
        uploadOptions: {
          dataType: 'json',
          acceptFileTypes: /(.|\/)(gif|jpe?g|png)$/i,
          maxFileSize: 1024 * 1024,
          messages: {
            maxFileSize: '上传文件最大不能超过 1 MB ，请选择其他图片上传',
            acceptFileTypes: '请上传 jpg, png, gif 图片',
          },
        },
      })
    );
  },
  methods: {
    copy(item) {
      const preEl = this.$refs[`pre${item.row.id}`];
      const selection = window.getSelection();

      if (selection.rangeCount > 0) {
        selection.removeAllRanges();
      }

      const range = window.document.createRange();
      range.selectNode(preEl);
      selection.addRange(range);

      window.document.execCommand('copy');
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}

.body {
  margin-top: 20px;
}

.upload-sec {
  position: relative;
  flex: 1;
  height: 80px;
  line-height: 80px;
  font-size: 24px;
  text-align: center;
  background-color: #fafafa;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
}

.code {
  word-break: break-all;
}
</style>
