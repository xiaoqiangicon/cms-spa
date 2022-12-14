<template>
  <div class="container">
    <el-card>
      <div>
        <el-button size="small" plain @click="toNav(1)">
          善款统计
        </el-button>
        <el-button size="small" plain @click="toNav(2)">
          善款明细
        </el-button>
        <el-button size="small" plain type="primary">
          特殊提现
        </el-button>
      </div>
      <div class="mg-t-20">
        <el-select
          v-model="filterTemple"
          filterable
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          @change="changeTemple"
        >
          <el-option label="所有寺院" :value="0" />
          <el-option
            v-for="item in temples"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select
          v-model="filterType"
          filterable
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          @change="changeType"
        >
          <el-option label="所有类别" :value="0" />
          <el-option
            v-for="item in types"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select
          v-if="subIds && subIds.length"
          v-model="filterSubId"
          filterable
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          @change="changeSubId"
        >
          <el-option label="所有子类别" :value="0" />
          <el-option
            v-for="item in subIds"
            :key="item.id"
            :label="item.id + '-' + item.name"
            :value="item.id"
          />
        </el-select>
        <el-button class="fl-right" size="small" @click="take">
          特殊提现
        </el-button>
      </div>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="time" label="提现时间" />
          <el-table-column prop="templeName" label="寺院名称" />
          <el-table-column prop="typeName" label="类别" />
          <el-table-column prop="timeRegion" label="电子账单时间段" />
          <el-table-column prop="amount" label="金额" />
          <el-table-column label="操作">
            <template slot-scope="item">
              <el-button
                v-if="item.row.handling"
                size="small"
                @click="del(item)"
              >
                撤回
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="totalCount"
          :current-page="currentPage"
          background
          layout="prev, pager, next"
          style="margin-top: 40px"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <el-dialog :visible.sync="confirmDialogVisible" title="提示" width="30%">
      <div class="t-a-center">
        <div>发送特殊提现账单，请确认以下信息：</div>
        <div class="red mg-t-20">寺院名称：{{ selectedTempleName }}</div>
        <div class="red mg-t-10">项目名称：{{ selectedTypeName }}</div>
        <div v-if="filterSubId" class="red mg-t-10">
          子项目名称：{{ selectedSubTypeName }}
        </div>
        <div class="mg-t-20">
          处理完成后请在“待办事项”中处理特殊账单
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDialogVisible = !1">
          取 消
        </el-button>
        <el-button type="primary" :disabled="doTakeBtnDisabled" @click="doTake">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch';

// types 缓存
const typesCache = {};

export default {
  name: 'App',
  data() {
    return {
      doTakeBtnDisabled: false,
      filterStartDate: '',
      filterEndDate: '',
      filterTemple: 0,
      filterType: 0,
      filterSubId: 0,
      loading: !0,
      currentPage: 1,
      totalCount: 0,
      list: [],
      temples: [],
      types: [],
      subIds: [],
      confirmDialogVisible: !1,
      selectedTempleName: '',
      selectedTypeName: '',
      selectedSubTypeName: '',
    };
  },
  created() {
    seeFetch('finance/special/temples').then(res => {
      if (!res.success || !res.data || !res.data.length) {
        Notification({
          title: '提示',
          message: '获取寺院数据失败',
        });
        return;
      }

      this.temples = res.data;
    });

    this.fetchList();
    this.fetchTypes();
  },
  methods: {
    toNav(sequence) {
      if (sequence === 1) this.$router.push('/finance/stat');
      else if (sequence === 2) this.$router.push('/finance/summary');
      else if (sequence === 3) this.$router.push('/finance/special');
    },
    fetchList() {
      this.loading = !0;

      seeFetch('finance/special/list', {
        page: this.currentPage,
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.loading = !1;
        if (this.currentPage === 1) this.totalCount = res.totalCount;
        this.list = res.data;

        window.scrollTo(0, 0);
      });
    },
    fetchTypes() {
      if (typesCache[this.filterTemple]) {
        this.types = typesCache[this.filterTemple];
        this.afterFetchTypes();
      } else {
        seeFetch('finance/special/types', { templeId: this.filterTemple }).then(
          res => {
            if (!res.success || !res.data || !res.data.length) {
              typesCache[this.filterTemple] = [];
              return;
            }

            typesCache[this.filterTemple] = res.data;
            this.types = res.data;
            this.afterFetchTypes();
          }
        );
      }
    },
    pageChange(page) {
      this.currentPage = page;
      this.fetchList();
    },
    doSearch() {
      this.currentPage = 1;
      this.fetchList();
    },
    take() {
      if (!this.filterTemple) {
        Notification({
          title: '提示',
          message: '请选择一个寺院',
        });
        return;
      }

      if (this.filterType && this.subIds.length && !this.filterSubId) {
        Notification({
          title: '提示',
          message: '请选择一个子类别',
        });
        return;
      }

      this.confirmDialogVisible = !0;
    },
    doTake() {
      this.doTakeBtnDisabled = true;
      seeFetch('finance/special/add', {
        templeId: this.filterTemple,
        type: this.filterType,
        subId: this.filterSubId,
      }).then(res => {
        this.doTakeBtnDisabled = false;
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        Notification({
          title: '提示',
          message: '添加成功',
        });

        this.confirmDialogVisible = !1;
        this.doSearch();
      });
    },
    changeTemple() {
      this.filterType = 0;
      this.filterSubId = 0;
      this.fetchTypes();

      const selectedTempleItem = this.temples.find(
        i => i.id === this.filterTemple
      );
      if (selectedTempleItem) this.selectedTempleName = selectedTempleItem.name;
      else this.selectedTempleName = '所有寺院';
    },
    afterFetchTypes() {
      const typeItem = this.types.find(i => i.id === this.filterType);

      if (!typeItem) {
        this.subIds = [];
        this.selectedTypeName = '所有类别';
      } else {
        this.subIds = typeItem.children;
        this.selectedTypeName = typeItem.name;
      }
    },
    changeType() {
      this.filterSubId = 0;
      this.afterFetchTypes();
    },
    changeSubId() {
      const subIdItem = this.subIds.find(i => i.id === this.filterSubId);

      if (!subIdItem) {
        this.selectedSubTypeName = '所有子类别';
      } else {
        this.selectedSubTypeName = subIdItem.name;
      }
    },
    del({ row: item }) {
      if (!item.takeId) {
        Notification({
          title: '提示',
          message: '该订单不可撤回',
        });
        return;
      }

      this.$confirm('确定撤回这个订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('finance/special/del', {
          id: item.takeId,
        }).then(res => {
          if (!res.success) {
            Notification({
              title: '提示',
              message: res.message,
            });
            return;
          }

          Notification({
            title: '提示',
            message: '撤回成功',
          });

          this.pageChange(this.currentPage);
        });
      });
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
</style>
