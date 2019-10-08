<template>
  <div>
    <div class="header">
      <div class="select-item">
        <div class="buddhist-name">
          <span>寺院名称</span>
          <el-select
            v-model="templeId"
            style="width: 350px;"
            clearable
            size="medium"
            filterable
            placeholder="请选择或填写关键词搜索"
            @change="onChangeTempleId"
          >
            <el-option
              v-for="item in templeList"
              :key="item.templeId"
              :label="item.templeName"
              :value="item.templeId"
            />
          </el-select>
          <el-select
            v-show="templeId"
            v-model="buddhistId"
            style="width: 200px;margin-left: 10px;margin-right: 10px"
            clearable
            size="medium"
            filterable
            placeholder="请选择佛事"
            @change="onChangeBuddhistId"
          >
            <el-option
              v-for="item in buddhistList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <span>评价类型</span>
          <el-select
            v-model="type"
            style="width: 120px;"
            clearable
            size="medium"
            filterable
            placeholder="全部"
            @change="onChangeBuddhistId"
          >
            <el-option
              v-for="item in statusList"
              :key="item.statusId"
              :label="item.name"
              :value="item.statusId"
            />
          </el-select>
        </div>
        <div class="buddhist-time">
          <span for="">评价时间</span>
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            unlink-panels
            @change="onChangeDatePicker"
          />
        </div>
      </div>
    </div>
    <div class="content">
      <el-table
        ref="multipleTable"
        v-loading="loadingList"
        highlight-current-row
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column label="寺院名称" prop="templeName" />
        <el-table-column label="评价用户" prop="nickName" />
        <el-table-column label="手机号码" prop="mobile" />
        <el-table-column label="参与项目" prop="commodityName" />
        <el-table-column label="评价类型" prop="evaluation" />
        <el-table-column label="评价内容" prop="labelRecordList">
          <template slot-scope="scope">
            <div v-for="(value, key) in scope.row.labelRecordList" :key="key">
              {{ value }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="文字评价" prop="content" />
        <el-table-column label="寺院回复">
          <template slot-scope="scope">
            <p>{{ scope.row.reply }}</p>
          </template>
        </el-table-column>
        <el-table-column label="评价时间" prop="addTime" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div
              class="delete"
              @click="
                isShowMask = true;
                deleteId = scope.row.id;
              "
            >
              删除
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mg-t-10" style="text-align: center;">
      <el-pagination
        :current-page.sync="currentPage"
        :page-sizes="[25, 50, 75, 100]"
        :page-size="currentSize"
        background=""
        layout="sizes, prev, pager, next"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div v-if="isShowMask" class="mask">
      <div class="delete-box">
        <div class="delete-header">
          <p>删除</p>
          <span>×</span>
        </div>
        <p class="delete-info">
          确定要删除吗？
        </p>
        <div class="delete-btn">
          <div class="confirm-delete" @click="onClickDelete">
            确认
          </div>
          <div class="cancel" @click="isShowMask = false">
            取消
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Notification } from 'element-ui';
import seeFetch from 'see-fetch';
import './fetch';

export default {
  name: 'App',
  components: {},
  data() {
    return {
      loadingList: true,

      isShowMask: false, // 是否显示删除框
      deleteId: '',
      // 列表请求参数
      templeId: '', // 寺院ID
      buddhistId: '', // 佛事ID
      date: ['', ''],
      formatDate: ['', ''], // 开始时间结束时间
      type: 0, // 状态ID
      currentPage: 1,
      currentSize: 25,
      totalCount: 128,

      // 数据
      buddhistList: [],
      templeList: [],
      list: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
      statusList: [
        {
          name: '全部',
          statusId: 0,
        },
        {
          name: '体验不佳',
          statusId: 3,
        },
        {
          name: '满意',
          statusId: 2,
        },
        {
          name: '很赞',
          statusId: 1,
        },
      ],
    };
  },
  created() {
    this.requestTempleList();
    this.requestList();
    this.requestBuddhist();
  },
  methods: {
    // 格式化时间
    formatTime(timeStr) {
      const date = new Date(timeStr);
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();

      return `${y}-${m >= 10 ? m : `0${m}`}-${d >= 10 ? d : `0${d}`}`;
    },
    // 获取列表
    requestList() {
      const {
        templeId,
        buddhistId,
        formatDate,
        currentPage,
        currentSize,
        type,
      } = this;

      seeFetch('temple/comment/getList', {
        templeId: parseInt(templeId, 10) | 0,
        commodityId: parseInt(buddhistId, 10) | 0,
        startTime: formatDate[0],
        endTime: formatDate[1],
        pageNum: currentPage - 1,
        pageSize: currentSize,
        evaluation: type,
      }).then(res => {
        if (!res.success) return;

        const commodityList = [];
        res.data.dataList.forEach(item => {
          const single = {};
          single.commodityId = item.id;
          single.name = item.subdivideName;
          commodityList.push(single);
        });
        // this.buddhistList = commodityList;
        this.list = res.data.dataList;
        this.loadingList = false;
        this.totalCount = res.data.total;
      });
    },
    // 获取寺院列表
    requestTempleList() {
      seeFetch('temple/comment/getTempleList', {}).then(res => {
        if (!res.success) return;

        this.templeList = res.data;
      });
    },
    // 获取佛事列表
    requestBuddhist() {
      seeFetch('temple/comment/getBuddhistList', {
        templeId: this.templeId,
      }).then(res => {
        this.buddhistList = res.data;
      });
    },
    // 佛事ID改变时
    onChangeTempleId() {
      this.onChangeFilter();
      this.requestBuddhist();
    },
    onChangeBuddhistId() {
      this.onChangeFilter();
    },
    // 按时间搜索
    onChangeDatePicker() {
      const { date } = this;
      this.formatDate = date.map(item => this.formatTime(`${item}`));
      this.onChangeFilter();
    },
    onChangeFilter() {
      this.currentPage = 1;
      this.requestList();
    },
    // 删除
    onClickDelete(row) {
      seeFetch('temple/comment/delEvaluation', { id: this.deleteId }).then(
        res => {
          if (!res.success) return;

          this.isShowMask = false;
          Notification({
            title: '消息',
            message: '操作成功',
            type: 'success',
          });
        }
      );
    },
    handleSizeChange(size) {
      this.currentSize = size;
      this.currentPage = 1;
      this.requestList();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.requestList();
    },
  },
};
</script>

<style lang="less" scoped>
main {
  padding: 15px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0 50px;
  padding: 0 3%;
}
.buddhist-time {
  margin-top: 20px;
}
.sort-item {
  display: flex;
}
.sort-comment-item {
  width: 120px;
  padding: 4px;
  margin-left: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;

  p {
    margin: 0;
  }
}

.tabs {
  height: 42px;
  line-height: 40px;
  border-bottom: 2px solid #6fba2c;
  margin-bottom: 10px;
  box-sizing: content-box;
  .tab-panel {
    width: 200px;
    text-align: center;
    float: left;
    background-color: #fff;
    margin-right: 20px;
    border: 1px solid #e0e0e0;
    cursor: pointer;
    &.active {
      color: #fff;
      background-color: #6fba2c;
      border: 1px solid #6fba2c;
    }
  }
}

.delete {
  color: #409eff;
  cursor: pointer;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
}
.delete-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  background: white;
  border-radius: 8px;
}
.delete-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
}
.delete-info {
  padding: 30px;
  text-align: center;
}
.delete-btn {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.confirm-delete,
.cancel {
  width: 60px;
  height: 30px;
  text-align: center;
  color: white;
  border-radius: 4px;
  line-height: 30px;
  background: #409eff;
  cursor: pointer;
}
.cancel {
  margin-left: 20px;
  background: #ccc;
}
</style>
