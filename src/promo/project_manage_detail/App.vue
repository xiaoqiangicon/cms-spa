<template>
  <div class="contain">
    <div class="add-button">
      <el-button type="primary" @click="addVisible = !0">
        添加
      </el-button>
    </div>
    <el-card>
      <el-table v-loading="loading" :data="list" style="width: 100%">
        <el-table-column prop="id" label="佛事id" :align="'center'" />
        <el-table-column prop="title" label="佛事名称" :align="'center'" />
        <el-table-column
          prop="collect_money"
          label="筹集金额"
          :align="'center'"
        />
        <el-table-column label="浏览/参与人次" :align="'center'">
          <template slot-scope="scope">
            <div>{{ scope.row.join_num }} / {{ scope.row.view_count }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="生效时间" :align="'center'" />
        <el-table-column prop="endTime" label="结束时间" :align="'center'" />
        <el-table-column prop="url" label="访问链接" :align="'center'" />
        <el-table-column label="操作" :align="'center'">
          <template slot-scope="scope">
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
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="row">
          <div class="row-name">
            跳转链接：
          </div>
          <el-input v-model="redirect" style="width: 100%;" />
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
      redirect: '',
      commodityId: '',
      saving: !1,
      takeEffectTimeRange: [],
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
      seeFetch('promo/projectManageDetail/list', {}).then(res => {
        if (res.code === 0) {
          this.list = res.data.list;
        }
        this.loading = !1;
      });
    },
    fetchCeremony() {
      seeFetch('promo/projectManageDetail/ceremonyList', {
        status: 0,
        isTest: 1,
        isFinish: -1,
        pageNumber: 1000,
        commodityId: '',
        commodityName: '',
      }).then(res => {
        if (res.errorCode === 0) {
          this.ceremonyList = res.data.list;
        }
      });
    },
    toDel(row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('promo/projectManageDetail/del', { id: row.id }).then(res => {
          if (res.code === 0) {
            window.location.reload();
          }
        });
      });
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
      if (!this.redirect) {
        Notification({
          title: '提示',
          message: '请填写跳转链接',
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
        if (res.code === 0) {
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
  justify-content: flex-end;
  margin-bottom: 20px;
}
.row {
  position: relative;
  margin-top: 20px;

  &:first-child {
    margin-top: 0;
  }
}
</style>
