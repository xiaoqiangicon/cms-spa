<template>
  <div class="container">
    <el-card>
      <div ref="upload" class="upload-sec mg-b-20">
        <span>上传文件</span>
      </div>
      <div class="body">
        <el-table :data="list" style="width: 100%">
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
import upload from '../../../../../pro-com/src/upload';
import { makeUploadFileOptions } from '../../configs/upload';

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
    const { upload: uploadEl } = this.$refs;

    upload(
      makeUploadFileOptions({
        el: uploadEl,
        done(url) {
          self.list.unshift({ url, id: self.id });
          self.id += 1;
        },
        multiple: !0,
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
  width: 100%;
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
