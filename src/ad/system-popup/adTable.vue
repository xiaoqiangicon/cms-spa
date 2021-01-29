/** * 弹窗广告列表 */
<template>
  <div class="container">
    <header class="header-box">
      <el-alert
        style="width: 600px;"
        type="success"
        :closable="false"
        v-html="headInfo"
      />
      <div class="header-right">
        <el-button type="primary" round @click="showEditDialog(1)">
          添加
        </el-button>
      </div>
    </header>

    <el-table
      v-loading="isLoadingPopupList"
      :data="popupList"
      class="popuplist-table"
    >
      <el-table-column
        v-if="adType === 1"
        min-width="60px"
        prop="sort"
        label="优先级"
      />
      <el-table-column
        v-if="adType === 1"
        min-width="100px"
        prop="name"
        label="名称"
      />
      <el-table-column
        v-if="adType === 2 || adType === 3"
        min-width="60px"
        prop="position"
        label="位置"
      />
      <el-table-column min-width="60px" prop="visitNum" label="查看次数" />
      <el-table-column min-width="100px" prop="link" label="跳转链接" />
      <el-table-column
        min-width="100px"
        prop="tobeExpire"
        :align="'center'"
        label="佛事有效性"
      />
      <el-table-column min-width="200px" label="生效时间" :align="'center'">
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
      <el-table-column min-width="70px" label="操作">
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

    <edit-dialog
      :visible.sync="editDialog.visible"
      :type="editDialog.type"
      :data="editDialog.data"
      :ad-type="adType"
      @updateAdItem="updateAdItem"
      @updateAllAdItem="delayGetPopupList"
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
  props: {
    adType: {
      type: Number,
      required: true,
    },
  },
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
  computed: {
    // 头部提示信息
    headInfo() {
      if (this.adType === 1)
        return `
功能控制：1.SaaS后台首页弹窗 2.管理小程序首页弹窗
<br/><br/>
因小程序的限制：弹窗广告位和小程序首页推荐位只能使用文章的ID或无支付的佛事ID，不能使用外链。
<br/><br/>
展示逻辑：只有一个广告位为开启状态：每次登录或打开都会展示。 多个广告位为开启状态：按照优先级越大排序。点击关闭或跳转后则下次会展示优先级后面在生效时间内的广告。相同生效时间内的广告，展示优先级最高的。`;
      if (this.adType === 2)
        return 'SaaS首页推荐位可添加多个：每次只能手动控制一个位置的内容是否展示。';
      if (this.adType === 3)
        return '因小程序的限制：弹窗广告位和小程序首页推荐位只能使用文章的ID或无支付的佛事ID，不能使用外链。';
      return '';
    },
  },
  created() {
    this.getPopupList();
  },
  methods: {
    // 获取弹窗广告列表
    getPopupList(page) {
      this.isLoadingPopupList = true;
      if (page) this.listParams.pageNumber = page;
      seeFetch('erpAD/getErpADList', {
        type: this.adType,
        ...this.listParams,
      }).then(res => {
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
    // 延时更新列表数据
    delayGetPopupList() {
      this.isLoadingPopupList = true;
      setTimeout(() => {
        this.getPopupList();
      }, 1000);
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
        type: this.adType,
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
  .header-box {
    margin: 20px 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
