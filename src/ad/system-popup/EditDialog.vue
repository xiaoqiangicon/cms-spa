/** * 弹窗广告 编辑对话框组件 */
<template>
  <div class="container-dialog">
    <el-dialog
      :title="type === 1 ? '新建' : '编辑'"
      :visible.sync="visible"
      :before-close="closeDialog"
    >
      <el-form ref="editForm" :model="editForm" :rules="editFormRules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="文章ID" prop="articleId">
          <el-input v-model="editForm.articleId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="优先级" prop="sort">
          <el-input v-model="editForm.sort" autocomplete="off" />
        </el-form-item>
        <el-form-item label="生效时间" prop="startTime" class="vaild-time">
          <el-date-picker
            v-model="vaildTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="广告图" prop="picUrl">
          <el-upload
            class="avatar-uploader"
            :action="uploadImgApi"
            :show-file-list="false"
            :on-success="uploadImg"
            :before-upload="uploadImgCheck"
          >
            <img v-if="editForm.picUrl" :src="editForm.picUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">
          取 消
        </el-button>
        <el-button type="primary" @click="submitForm">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Notification } from 'element-ui';
import seeFetch from 'see-fetch';
import './fetch';
import { dateToString } from '../../util';

export default {
  name: 'EditDialog',
  props: {
    visible: Boolean,
    type: Number,
    data: Object,
  },
  data() {
    return {
      id: 0,
      editForm: {
        name: '',
        articleId: '',
        sort: '',
        startTime: '',
        endTime: '',
        picUrl: '',
      },
      vaildTime: [],
      editFormRules: {
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur',
          },
        ],
        articleId: [
          {
            required: true,
            pattern: /^[0-9]*$/,
            message: '请正确输入文章ID',
            trigger: 'blur',
          },
        ],
        sort: [
          {
            required: true,
            pattern: /^[0-9]*$/,
            message: '请正确输入优先级',
            trigger: 'blur',
          },
        ],
        startTime: [
          {
            required: true,
            message: '请输入生效时间',
            trigger: 'blur',
          },
        ],
        picUrl: [
          {
            required: true,
            message: '请上传广告图',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {
    // 上传图片接口
    uploadImgApi() {
      return window.location.hostname.indexOf('localhost') === -1
        ? '/upload'
        : '/mock/upload.json';
    },
  },
  watch: {
    // 显示对话框时 重置表单数据
    visible(newVal, oldVal) {
      if (!newVal) return;
      this.id = this.type === 1 ? 0 : this.data.id;
      this.vaildTime = [];
      for (const k in this.editForm) {
        if (this.type === 1) {
          this.editForm[k] = '';
        } else {
          this.editForm[k] = this.data[k];
          if (k === 'startTime') this.vaildTime[0] = new Date(this.data[k]);
          if (k === 'endTime') this.vaildTime[1] = new Date(this.data[k]);
        }
      }
    },
    // 生效时间 选择日期联动
    vaildTime(newVal) {
      if (newVal && newVal.length) {
        this.editForm.startTime = dateToString(newVal[0]);
        this.editForm.endTime = dateToString(newVal[1]);
      } else {
        this.editForm.startTime = '';
        this.editForm.endTime = '';
      }
    },
  },
  created() {},
  methods: {
    // 提交表单保存弹窗广告数据
    submitForm() {
      const that = this;
      that.$refs.editForm.validate(valid => {
        if (!valid) {
          that.$message({
            message: '请正确填写相关信息',
            type: 'error',
          });
        } else {
          seeFetch('erpAD/addAndUpdateErpAD', {
            id: that.id,
            ...that.editForm,
          }).then(res => {
            if (res.errorCode === 0) {
              that.closeDialog();
              this.$message.success('保存成功');
            } else {
              this.$message.error((res && res.msg) || '保存失败');
            }
          });
        }
      });
    },
    // 上传图片回调
    uploadImg(res, file) {
      if (file.status === 'success' && res.data.pic) {
        this.editForm.picUrl = res.data.pic;
      } else {
        this.$message.error((res && res.msg) || '上传图片失败');
      }
    },
    // 上传图片类型检查
    uploadImgCheck(file) {
      if (!/image\/jpg|image\/jpeg|image\/png|image\/gif"/.test(file.type)) {
        this.$message.error('上传图片只能是 JPG、JPEG、PNG、GIF 格式!');
        return false;
      }
      return true;
    },
    // 关闭本组件弹窗
    closeDialog() {
      this.$emit('update:visible', false);
    },
  },
};
</script>

<style lang="less" scoped>
.container-dialog {
  /deep/ .el-dialog__body {
    padding-bottom: 0;
  }
  .vaild-time {
    /deep/ .el-form-item__label {
      float: none;
    }
    /deep/ .el-range-separator {
      width: 6%;
    }
  }
  .avatar-uploader /deep/ .el-upload {
    margin-left: 20px;
    margin-top: 12px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 120px;
    display: block;
  }
}
</style>
