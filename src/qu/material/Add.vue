<template>
  <el-dialog
    :visible="visible"
    :title="dialogTitle"
    :before-close="clickCancel"
    width="700px"
  >
    <div class="content">
      <el-alert
        title="提示：拖动图片或文字进行排序，点击文字或图片进行操作"
        type="success"
        effect="dark"
      />
      <div class="preview mg-t-20">
        <draggable v-model="jsonContent.content">
          <transition-group>
            <p
              v-for="(item, index) in jsonContent.content"
              :key="index"
              class="item"
              @click="showActions(index)"
            >
              <span v-if="item.type === 1">{{ item.content }}</span>
              <img v-if="item.type === 2" :src="item.content" />
            </p>
          </transition-group>
        </draggable>
      </div>
      <div class="row">
        <el-button size="small" @click="remakeContent">
          重新加载内容
        </el-button>
      </div>
      <div class="row">
        <div class="row-name">
          标题：
        </div>
        <el-input
          v-model="title"
          placeholder="请输入"
          size="small"
          maxlength="30"
          style="width: 100%"
        />
        <p class="mg-t-10">
          最多30字
        </p>
      </div>
      <div class="row">
        <div class="row-name">
          封面图片：
        </div>
        <div class="mg-b-10">
          <div
            v-for="(image, index) in covers"
            :key="image"
            class="image"
            @click="delImage(index)"
          >
            <img :src="image" class="image-img" />
            <button class="clean image-close">
              X
            </button>
          </div>
        </div>
        <div>
          <el-button size="small" @click="selectImages">
            选取内容的图片
          </el-button>
          <el-button size="small" class="mg-l-10 ps-relative">
            上传图片
            <div ref="upload" />
          </el-button>
        </div>
        <p class="mg-t-10">
          至少1张，最多3张，超过3张将只取前3张
        </p>
      </div>
      <div class="row">
        <div class="row-name">
          地域：
        </div>
        <el-select
          v-model="region"
          placeholder="请选择"
          size="small"
          filterable
          style="width: 100%"
        >
          <el-option label="请选择" value="" />
          <el-option v-for="r in regions" :key="r" :label="r" :value="r" />
        </el-select>
        <p class="mg-t-10">
          如稿件讲述的是某地域的事件，请添加该地域的标签
        </p>
      </div>
      <div class="row">
        <div class="row-name">
          是否原创：
        </div>
        <el-select
          v-model="original"
          placeholder="请选择"
          size="small"
          style="width: 100%"
        >
          <el-option label="否" :value="0" />
          <el-option label="是" :value="1" />
        </el-select>
      </div>
      <div class="row">
        <div class="row-name">
          发布账户：
        </div>
        <el-select
          v-model="publishAccount"
          placeholder="请选择"
          size="small"
          style="width: 100%"
        >
          <el-option
            v-for="item in publishAccounts"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <p class="mg-t-10">
          发布后不可修改，请谨慎选择
        </p>
      </div>
      <div class="row">
        <div class="row-name">
          发布作者：
        </div>
        <el-input
          v-model="publishAuthor"
          placeholder="请输入"
          size="small"
          style="width: 100%"
        />
        <p class="mg-t-10">
          默认：自在家
        </p>
      </div>
      <div class="row">
        <div class="row-name">
          发布时间：
        </div>
        <el-date-picker
          v-model="publishTime"
          align="right"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="small"
          style="width: 200px;"
        />
        <p class="mg-t-10">
          日期时间只可选在未来，并且至少选择2小时后
        </p>
        <p class="mg-t-10">
          发布后不可修改，请谨慎选择
        </p>
      </div>
    </div>
    <span slot="footer" v-loading="saving" class="dialog-footer">
      <el-button @click="clickCancel">
        取 消
      </el-button>
      <el-button type="primary" @click="clickOk(1)">
        保存
      </el-button>
      <el-button type="primary" @click="clickOk(2)">
        发布
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Notification } from 'element-ui';
import Draggable from 'vuedraggable';
import { getDate, numOfDateTime } from '@zzh/n-util';
import seeFetch from 'see-fetch';
import '@zzh/upload/dist/upload.css';
import '../../configs/upload';
import upload from '@zzh/upload';
import { addProps, regions, publishAccounts } from './data';
import {
  makeJsonItem,
  getJsonContent,
  PARSE_TYPE_TEXT,
  PARSE_TYPE_IMAGE,
} from './parse';

const computedProps = {};

addProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.quMaterial.add[name];
      },
      set(value) {
        const key = `quMaterial/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.quMaterial.add[name];
    };
  }
});

[
  'action',
  'actionSelected',
  'selectImageResult',
  'imagesSelected',
  'uploadImageVisible',
  'uploadImageResult',
  'imagesUploaded',
].forEach(name => {
  computedProps[name] = {
    get() {
      return this.$store.state.quMaterial[name];
    },
    set(value) {
      this.$store.state.quMaterial[name] = value;
    },
  };
});

export default {
  name: 'Add',
  components: {
    Draggable,
  },
  props: {
    ok: {
      type: Function,
      required: !0,
      default: undefined,
    },
  },
  data() {
    return {
      saving: !1,
      handleIndex: -1,
      regions,
      initUpload: !1,
      publishAccounts,
    };
  },
  computed: {
    ...computedProps,
  },
  watch: {
    actionSelected() {
      if (this.action === 'edit') {
        const item = this.jsonContent.content[this.handleIndex];

        this.$prompt('请输入内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: item.content,
          inputType: 'textarea',
        }).then(({ value }) => {
          if (!value) return;

          item.content = value;
        });

        return;
      }

      if (this.action === 'delete') {
        this.jsonContent.content.splice(this.handleIndex, 1);
        return;
      }

      if (
        this.action === 'insertImageBefore' ||
        this.action === 'insertImageAfter'
      ) {
        this.uploadImageResult = [];
        this.uploadImageVisible = !0;
        return;
      }

      // insertTextBefore, insertTextAfter, insertImageBefore, insertImageAfter
      this.$prompt('请输入内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea',
      }).then(({ value }) => {
        if (!value) return;

        const index =
          this.action === 'insertTextBefore'
            ? this.handleIndex
            : this.handleIndex + 1;

        const values = value.split('\n').filter(i => !!i);
        const items = values.map(i => makeJsonItem(PARSE_TYPE_TEXT, i));

        this.jsonContent.content.splice(index, 0, ...items);
      });
    },
    imagesSelected() {
      this.covers.push(...this.selectImageResult);
    },
    imagesUploaded() {
      const index =
        this.action === 'insertImageBefore'
          ? this.handleIndex
          : this.handleIndex + 1;

      const items = this.uploadImageResult.map(i =>
        makeJsonItem(PARSE_TYPE_IMAGE, i)
      );

      this.jsonContent.content.splice(index, 0, ...items);
    },
  },
  updated() {
    const { upload: uploadEl } = this.$refs;

    if (uploadEl && !this.initUpload) {
      upload(
        uploadEl,
        url => {
          this.covers.push(url);
        },
        { multiple: !0 }
      );

      this.initUpload = !0;
    }
  },
  methods: {
    showActions(index) {
      this.handleIndex = index;
      this.$store.state.quMaterial.actionVisible = !0;
    },
    delImage(index) {
      this.covers.splice(index, 1);
    },
    selectImages() {
      const imageItems = this.jsonContent.content.filter(
        i => i.type === PARSE_TYPE_IMAGE
      );

      if (!imageItems.length) {
        Notification({
          title: '提示',
          message: '内容没有图片可供选择',
        });
        return;
      }

      this.$store.state.quMaterial.imagesToSelect = imageItems.map(
        ({ content }) => ({
          url: content,
          selected: !1,
        })
      );
      this.$store.state.quMaterial.selectImageResult = [];
      this.$store.state.quMaterial.selectImageVisible = !0;
    },
    remakeContent() {
      this.$confirm(
        '重新加载内容会丢失当前正在编辑的内容，确定继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        this.jsonContent = getJsonContent(this.content);
      });
    },
    clickCancel() {
      this.$store.commit(`quMaterial/updateVisible`, !1);
    },
    clickOk(sequence) {
      if (this.saving) return;

      let error;

      // eslint-disable-next-line prefer-destructuring
      this.cover = this.covers[0];
      const {
        title,
        jsonContent,
        region,
        publishAccount,
        publishAuthor,
        original,
        covers,
        publishTime,
      } = this;

      if (!title) error = '标题不能为空';
      else if (title.length > 30) error = '标题最多30字';
      else if (!jsonContent.content.length) error = '内容不能为空';
      else if (!covers.length) error = '封面不能为空';
      else if (sequence === 2) {
        if (!publishTime) error = '发布时间不能为空';
        else {
          const date = getDate(
            new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
          );
          if (numOfDateTime(publishTime) < numOfDateTime(date.dateTime)) {
            error = '发布时间至少应在当前时间2小时后';
          }
        }
      }

      if (error) {
        Notification({
          title: '提示',
          message: error,
        });
        return;
      }

      this.saving = !0;

      const params = {
        id: this.updateId,
        title,
        jsonContent: JSON.stringify(jsonContent),
        region,
        publishAccount,
        original,
        publishAuthor: publishAuthor || '自在家',
        covers: covers.slice(0, 3).join(','),
      };

      if (sequence === 2) {
        params.publishTime = publishTime;
        params.publish = 1;
      }

      seeFetch('qu/material/update', params).then(res => {
        this.saving = !1;

        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        Notification({
          title: '提示',
          message: '操作成功',
        });

        this.$store.commit(`quMaterial/updateVisible`, !1);
        this.ok();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 0 20px;
}

.row {
  position: relative;
  margin-top: 20px;
  padding-left: 100px;
  min-height: 32px;

  &:first-child {
    margin-top: 0;
  }
}

.row-name {
  position: absolute;
  top: 0;
  left: 0;
  line-height: 32px;
  font-size: 16px;
}

.preview {
  width: 375px;
  border-radius: 5px;
  border: 1px solid #eee;
  padding: 20px;
  margin: 0 auto;

  img {
    width: 100%;
  }

  p {
    margin-bottom: 10px;
    cursor: pointer;
  }

  .item:hover {
    border-radius: 5px;
    background-color: #eee;
  }
}

.image {
  position: relative;
  display: inline-block;
  height: 100px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.image-img {
  height: 100%;
}

.image-close {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 18px;
  display: none;
}

.image:hover .image-close {
  display: block;
}
</style>
