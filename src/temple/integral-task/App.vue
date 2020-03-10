<template>
  <div class="container">
    <el-card>
      <div class="operation-box">
        <el-button type="primary" @click="showIntegralDialog(1)">
          添加任务
        </el-button>
      </div>
      <el-table
        v-loading="integralLoading"
        :data="integralList"
        style="width: 100%"
      >
        <el-table-column prop="title" label="标题" min-width="120" />
        <el-table-column prop="content" label="内容" min-width="150" />
        <el-table-column prop="integral" label="可获得积分" min-width="60" />
        <el-table-column prop="addTime" label="添加时间" min-width="90" />
        <el-table-column prop="userName" label="编辑用户" min-width="90" />
        <el-table-column label="操作" min-width="90">
          <template slot-scope="scope">
            <el-button
              type="text"
              :disabled="scope.row.status === 0"
              @click="updateIntegralStatus(0, scope.row, scope.$index)"
            >
              {{ scope.row.status === 0 ? '已发布' : '发布' }}
            </el-button>
            <el-button
              type="text"
              :disabled="scope.row.status === 0"
              @click="showIntegralDialog(2, scope.row, scope.$index)"
            >
              修改
            </el-button>
            <el-button
              type="text"
              @click="updateIntegralStatus(-1, scope.row, scope.$index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="integralTotal > 0"
        :total="integralTotal"
        :current-page="listParams.pageNumber"
        :page-size="listParams.pageSize"
        background
        layout="prev, pager, next"
        style="margin-top: 30px; text-align: center;"
        @current-change="getIntegralList"
      />
    </el-card>

    <el-dialog
      class="integral-dialog"
      :title="integralDialog.type === 1 ? '添加积分任务' : '编辑积分任务'"
      :visible.sync="integralDialog.visible"
    >
      <el-form
        ref="integralForm"
        :model="integralDialog.form"
        :rules="integralDialog.rules"
        label-width="100px"
        class="integral-form"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="integralDialog.form.title" type="input" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            v-model="integralDialog.form.content"
            type="textarea"
            :autosize="{ minRows: 5 }"
          />
        </el-form-item>
        <el-form-item label="可获得积分" prop="integral">
          <el-input v-model="integralDialog.form.integral" type="input" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addOrEditIntegral">
            确定
          </el-button>
          <el-button type="primary" @click="closeIntegralDialog">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification, Message } from 'element-ui';
import './fetch';

export default {
  name: 'App',
  data() {
    return {
      integralDialog: {
        type: 1,
        visible: false,
        currListIndex: '',
        form: {
          id: '',
          title: '',
          content: '',
          integral: '',
        },
        rules: {
          title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
          content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
          integral: [
            {
              required: true,
              pattern: /^[0-9]*$/,
              message: '请输入可获得积分数量',
              trigger: 'blur',
            },
          ],
        },
      },
      integralList: [],
      integralLoading: true,
      integralTotal: 0,
      listParams: {
        pageNumber: 1,
        pageSize: 20,
      },
    };
  },
  created() {
    this.getIntegralList();
  },
  methods: {
    // 获取积分任务列表
    getIntegralList(page) {
      const that = this;
      that.integralLoading = true;
      if (page) that.listParams.pageNumber = page;
      seeFetch('getIntegralList', that.listParams).then(res => {
        that.integralLoading = false;
        if (res.errorCode === 0 && res.data && res.data.list) {
          that.integralList = res.data.list;
          that.integralTotal = res.data.total;
        } else {
          Notification({
            title: '提示',
            message: res.message,
          });
        }
      });
    },
    // 添加和编辑积分任务
    addOrEditIntegral() {
      const that = this;
      that.$refs.integralForm.validate(valid => {
        if (!valid) {
          Message({
            type: 'warning',
            message: '请填写积分任务相关信息',
          });
        } else {
          const inte = that.integralDialog;
          seeFetch('addOrEditIntegral', {
            id: inte.form.id || '',
            title: inte.form.title,
            content: inte.form.content,
            integral: inte.form.integral,
          }).then(res => {
            if (res.errorCode === 0) {
              that.$refs.integralForm.resetFields();
              Notification({
                type: 'success',
                title: '提示',
                message: '更新成功',
              });
              that.closeIntegralDialog();
              setTimeout(() => {
                that.getIntegralList();
              });
            } else {
              Notification({
                title: '提示',
                message: res.message,
              });
            }
          });
        }
      });
    },
    // 显示积分任务对话框
    showIntegralDialog(type, item, index) {
      this.integralDialog.type = type;
      if (type === 2 && item) {
        this.integralDialog.form = { ...item };
        this.integralDialog.currListIndex = index;
      } else {
        this.integralDialog.form = {
          id: '',
          title: '',
          content: '',
          integral: '',
        };
      }
      this.integralDialog.visible = true;
    },
    closeIntegralDialog() {
      this.integralDialog.visible = false;
    },
    // 发布或删除积分任务
    updateIntegralStatus(type, item, index) {
      if (type === 0 && item.status === 0) return;
      const that = this;
      seeFetch('updateIntegralStatus', {
        id: item.id,
        status: type,
      }).then(res => {
        if (res.errorCode === 0) {
          if (type === 0) {
            that.integralList[index].status = 0;
          }
          if (type === -1) {
            that.integralList.splice(index, 1);
          }
          Notification({
            type: 'success',
            title: '提示',
            message: '更新成功',
          });
        } else {
          Notification({
            title: '提示',
            message: res.message,
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 30px 20px;
  .operation-box {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 30px;
  }
}
</style>
