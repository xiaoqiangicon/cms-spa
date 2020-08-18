<template>
  <div class="contain">
    <div class="add-button">
      <div>
        <span class="filter-time">时间过滤</span>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          unlink-panels
          @change="onChangeDatePicker"
        />
      </div>
      <div>
        <el-button type="primary" @click="download">
          导出Excel
        </el-button>
        <el-button type="primary" @click="addVisible = !0">
          添加
        </el-button>
      </div>
    </div>
    <el-card>
      <el-table v-loading="loading" :data="list" style="width: 100%">
        <el-table-column prop="id" label="项目id" :align="'center'" />
        <el-table-column prop="title" label="佛事" :align="'center'" />
        <el-table-column
          prop="collect_money"
          label="筹集金额"
          :align="'center'"
        />
        <el-table-column label="浏览/参与人次" :align="'center'">
          <template slot-scope="scope">
            <div>{{ scope.row.view_count }} / {{ scope.row.join_num }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="生效时间" :align="'center'" />
        <el-table-column prop="endTime" label="结束时间" :align="'center'" />
        <el-table-column prop="url" label="访问链接" :align="'center'" />
        <el-table-column label="操作" :align="'center'">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="toDetail(scope.row)">
              详情
            </el-button>
            <el-button type="text" size="small" @click="toDel(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="addVisible" width="500" title="添加">
      <div class="content">
        <div class="row">
          <div class="row-name">
            佛事选择：
          </div>
          <el-select v-model="commodityId" filterable placeholder="请选择">
            <el-option
              v-for="item in ceremonyList"
              :key="item.value"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="row">
          <div class="row-name">
            生效时间：
          </div>
          <el-date-picker
            v-model="takeEffectTimeRange"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clickCancel">
          取 消
        </el-button>
        <el-button v-loading="saving" type="primary" @click="clickOk">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

export default {
  data() {
    return {
      id: 0, // 参数id
      loading: !0,
      list: [],
      ceremonyList: [],
      addVisible: !1,
      commodityId: '',
      saving: !1,
      takeEffectTimeRange: [],
      date: ['', ''],
      formatDate: ['', ''],
    };
  },
  created() {
    const { id } = this.$route.params;
    this.id = parseInt(id, 10);
    this.fetch();
    this.fetchCeremony();
  },
  methods: {
    fetch() {
      this.loading = !0;
      seeFetch('promo/projectManageDetail/list', {
        userId: this.id,
        startTime: this.formatDate[0],
        endTime: this.formatDate[1],
      }).then(res => {
        if (res.errorCode === 0) {
          this.list = res.data.list;
        } else {
          Notification({
            title: '错误',
            message: '接口报错',
          });
        }
        this.loading = !1;
      });
    },
    onChangeDatePicker() {
      const { date } = this;
      this.formatDate = date.map(item => this.formatTime(`${item}`));

      this.fetch();
    },
    formatTime(timeStr) {
      const date = new Date(timeStr);
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();

      return `${y}-${m >= 10 ? m : `0${m}`}-${d >= 10 ? d : `0${d}`}`;
    },
    download() {
      if (!this.formatDate[0]) {
        Notification({
          title: '提示',
          message: '请选择时间段~',
        });
        return;
      }
      const url = `/user/downOrderListExcel?userId=${this.id}&startDate=${
        this.formatDate[0]
      }&endDate=${this.formatDate[1]}`;
      window.open(url);
    },
    fetchCeremony() {
      seeFetch('promo/projectManageDetail/ceremonyList', {
        size: 1000,
      }).then(res => {
        if (res.errorCode === 0) {
          this.ceremonyList = res.data;
        }
      });
    },
    toDel(row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('promo/projectManageDetail/del', {
          id: row.id,
          status: -1,
        }).then(res => {
          if (res.errorCode === 0) {
            window.location.reload();
          }
        });
      });
    },
    toDetail(row) {
      const id = row.commodityId;

      this.$router.push(`/promo/projectManageDetail/${id}`);
    },
    clickOk() {
      const { takeEffectTimeRange } = this;
      const startTime = takeEffectTimeRange[0];
      const endTime = takeEffectTimeRange[1];

      if (!this.commodityId) {
        Notification({
          title: '提示',
          message: '请选择佛事',
        });
        return;
      }
      this.saving = !0;
      seeFetch('promo/projectManageDetail/add', {
        userId: this.id,
        commodityId: this.commodityId,
        startTime,
        endTime,
      }).then(res => {
        if (res.errorCode === 0) {
        }
        this.saving = !1;
        this.addVisible = !1;
        window.location.reload();
      });
    },
    clickCancel() {
      this.addVisible = !1;
    },
  },
};
</script>

<style lang="less" scoped>
.contain {
  padding: 20px;
}
.add-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px 20px 0;
}
.filter-time {
  margin-right: 10px;
  color: rgb(144, 147, 153);
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
}
.row {
  position: relative;
  margin-top: 20px;

  &:first-child {
    margin-top: 0;
  }
}
</style>
