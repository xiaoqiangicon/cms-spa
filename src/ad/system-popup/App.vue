/** * 弹窗广告列表 */
<template>
  <div class="container">
    <el-card class="header-box">
      <el-alert
        style="width: 600px;"
        type="success"
        :closable="false"
        title="功能控制：1.SaaS后台首页弹窗 2.管理小程序首页弹窗"
        description="展示逻辑：只有一个广告位为开启状态：每次登录或打开都会展示。 多个广告位为开启状态：按照优先级越大排序。点击关闭或跳转后则下次会展示优先级后面在生效时间内的广告。相同生效时间内的广告，展示优先级最高的。"
      />
      <div class="header-right">
        <el-button type="primary" round @click="showEditDialog(1)">
          添加
        </el-button>
      </div>
    </el-card>

    <el-card>
      <el-table
        v-loading="isLoadingPopupList"
        :data="popupList"
        class="popuplist-table"
      >
        <el-table-column min-width="60px" prop="sort" label="优先级" />
        <el-table-column min-width="100px" prop="name" label="名称" />
        <el-table-column min-width="60px" prop="visitNum" label="查看次数" />
        <el-table-column min-width="60px" prop="articleId" label="跳转文章ID" />
        <el-table-column min-width="200px" label="生效时间">
          <template slot-scope="scope">
            <div class="valid-time">
              <div class="start-time">
                {{ scope.row.startTime }}
              </div>
              <div class="icon-time">
                -
              </div>
              <div class="end-time">
                {{ scope.row.endTime }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" prop="addTime" label="添加时间" />
        <el-table-column min-width="80px" label="操作">
          <template slot-scope="scope">
            <div class="opt">
              <el-button type="text" @click="showEditDialog(2, scope.row)">
                编辑
              </el-button>
              <el-button
                type="text"
                @click="switchDelPopupDialog(true, scope.row.id, scope.$index)"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="popupTotal > 0"
        :total="popupTotal"
        :current-page="listParams.pageNumber"
        :page-size="listParams.pageSize"
        background
        layout="prev, pager, next"
        style="margin-top: 40px"
        @current-change="getPopupList"
      />
    </el-card>

    <edit-dialog
      :visible.sync="editDialog.visible"
      :type="editDialog.type"
      :data="editDialog.data"
      @updateAdItem="updateAdItem"
      @updateAllAdItem="getPopupList"
    />

    <el-dialog
      title="提示"
      :visible.sync="delPopupDialog.visible"
      :before-close="switchDelPopupDialog"
      width="30%"
    >
      <span>
        确定删除 '{{
          typeof delPopupDialog.index === 'number'
            ? popupList[delPopupDialog.index].name
            : ''
        }}' 吗
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="switchDelPopupDialog(false)">取 消</el-button>
        <el-button type="primary" @click="delAdPopUp">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import EditDialog from './EditDialog';
import './fetch';

export default {
  name: 'App',
  components: { EditDialog },
  data() {
    return {
      isLoadingPopupList: true,
      delPopupDialog: {
        visible: false,
        id: '',
        index: '',
      },
      editDialog: {
        visible: false,
        type: 1,
        data: {},
      },
      popupList: [],
      popupTotal: 0,
      listParams: {
        pageNumber: 1,
        pageSize: 20,
      },
    };
  },
  created() {
    this.getPopupList();
  },
  methods: {
    // 获取弹窗广告列表
    getPopupList(page) {
      this.isLoadingPopupList = true;
      if (page) this.listParams.pageNumber = page;
      seeFetch('erpAD/getErpADList', this.listParams).then(res => {
        this.isLoadingPopupList = false;
        if (res.errorCode === 0 && res.data) {
          this.popupList = res.data.data || [];
          this.popupTotal = res.data.total || 0;
        } else {
          Notification({
            title: '提示',
            message: res.msg || '获取获取弹出广告失败',
          });
        }
      });
    },
    // 显示编辑\新建广告弹窗对话框
    showEditDialog(type, item) {
      this.editDialog.type = type;
      this.editDialog.data = item || {};
      this.editDialog.visible = true;
    },
    // 切换 '删除广告弹窗' 确认对话框
    switchDelPopupDialog(type, id, index) {
      if (typeof type !== 'boolean') type = false;
      this.delPopupDialog.id = id || '';
      this.delPopupDialog.index = index || index === 0 ? index : '';
      this.delPopupDialog.visible = type;
    },
    // 删除广告弹窗
    delAdPopUp() {
      const { id, index } = this.delPopupDialog;
      seeFetch('erpAD/addAndUpdateErpAD', {
        id,
        status: -1,
      }).then(res => {
        if (res.errorCode === 0) {
          this.$message.success('删除成功');
          this.popupList.splice(index, 1);
          this.switchDelPopupDialog(false);
        } else {
          this.$message.error((res && res.msg) || '删除失败');
        }
      });
    },
    // 更新修改数据
    updateAdItem(id, res) {
      this.popupList.some((e, index) => {
        if (id == e.id) {
          for (const key in res) {
            this.popupList[index][key] = res[key];
          }
        }
        return id == e.id;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 30px 20px;
  .header-box {
    margin-bottom: 15px;
    /deep/ .el-card__body {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
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
</style>
