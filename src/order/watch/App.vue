<template>
  <div class="contain">
    <el-card>
      <div class="filter">
        <el-radio-group v-model="verify" @change="getList">
          <el-radio-button :label="0">未认证</el-radio-button>
          <el-radio-button :label="1">已认证</el-radio-button>
        </el-radio-group>
        <el-radio-group
          v-model="isTest"
          @change="getList"
          style="margin-left: 20px;"
        >
          <el-radio-button :label="1">过滤测试寺院</el-radio-button>
          <el-radio-button :label="0">不过滤测试寺院</el-radio-button>
        </el-radio-group>
      </div>
      <el-table v-loading="loading" :data="list">
        <el-table-column prop="id" label="寺院ID" :align="'center'" sortable />
        <el-table-column
          prop="templeName"
          label="寺院名称"
          :align="'center'"
          sortable
        />
        <el-table-column
          prop="days"
          label="最后处理时间"
          :align="'center'"
          sortable
          :sort-method="
            (a, b) => {
              return a.days - b.days;
            }
          "
        >
          <template slot-scope="scope"> {{ scope.row.days }}天前 </template>
        </el-table-column>
        <el-table-column
          prop="count"
          label="未处理订单数"
          :align="'center'"
          sortable
          :sort-method="
            (a, b) => {
              return a.count - b.count;
            }
          "
        />
        <el-table-column
          prop="count2"
          label="超时未处理数"
          :align="'center'"
          sortable
          :sort-method="
            (a, b) => {
              return a.count2 - b.count2;
            }
          "
        />
        <el-table-column
          prop="count3"
          label="催单数"
          :align="'center'"
          sortable
          :sort-method="
            (a, b) => {
              return a.count3 - b.count3;
            }
          "
        />
        <el-table-column label="催单数" :align="'center'">
          <template slot-scope="scope">
            <span class="detail-btn" @click="toDetail(scope.row)">详情</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';

export default {
  name: 'App',
  data() {
    return {
      verify: 1,
      isTest: 1,
      list: [],
      loading: !1,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let { isTest, verify } = this;
      this.loading = !0;
      seeFetch('order/watch/list', { isTest, verify }).then(res => {
        if (res.success) {
          this.list = res.data;
        } else {
          alert('出错了');
        }
        this.loading = !1;
      });
    },
    toDetail(row) {
      this.$router.push({
        path: `/temple-order`,
        query: { id: row.id, name: row.templeName },
      });
    },
    sort(a, b) {
      return a - b;
    },
  },
};
</script>

<style lang="less" scoped>
.contain {
  padding: 10px 20px;
}
.filter {
  margin-bottom: 20px;
}
.detail-btn {
  color: dodgerblue;
  cursor: pointer;
}
</style>
