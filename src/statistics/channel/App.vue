<template>
  <div class="container">
    <el-card>
      <div class="header">
        <div class="search-box">
          <span>渠道名搜索</span>
          <el-input v-model="channelSearch" class="search-input" />
          <el-select
            style="width: 50%;"
            v-model="type"
            placeholder="渠道类型"
            @change="onChangeType"
          >
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
          <el-button class="search" type="primary" @click="searchChannel">
            搜索
          </el-button>
        </div>
        <button class="add-channel" @click="add">
          创建渠道
        </button>
      </div>
      <div class="content">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column label="渠道名称">
            <template slot-scope="scope">
              <div>{{ scope.row.name }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="channel" label="渠道参数" />
          <el-table-column label="统计链接">
            <template slot-scope="scope">
              <div>
                {{
                  scope.row.url.indexOf('p_mc') !== -1
                    ? scope.row.url
                    : scope.row.url.indexOf('?') == -1
                    ? `${scope.row.url}?p_mc=${scope.row.channel}`
                    : `${scope.row.url}&p_mc=${scope.row.channel}`
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="endDate" label="过期时间" />
          <el-table-column label="备注" width="180">
            <template slot-scope="scope">
              <div class="remark-box">
                <div>
                  <div
                    v-if="!scope.row.remarkShow"
                    class="remark"
                    @click="modify(scope)"
                  >
                    {{ scope.row.remark ? scope.row.remark : '-' }}
                  </div>
                  <textarea
                    v-else
                    v-model="scope.row.remark"
                    v-focus="scope.row.remarkShow"
                    class="remark-textarea"
                    @blur="blur(scope)"
                  />
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div>
                <button class="btn" @click="toLaxin(scope.row)">
                  报表
                </button>
                <button class="btn" @click="edit(scope.row)">
                  编辑
                </button>
                <button class="btn del" @click="del(scope.row)">
                  删除
                </button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="total"
          :current-page="page"
          background
          layout="prev, pager, next"
          style="margin-top: 40px"
          :page-size="pageSize"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <Edit :item="item" :is-new="isNew" />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import Edit from './Edit';
import './fetch';

export default {
  components: {
    Edit,
  },
  directives: {
    focus: {
      inserted(el, { value }) {
        if (value) {
          el.focus();
        }
      },
    },
  },
  data() {
    return {
      loading: !1,
      list: [],
      newList: [],
      total: 10,
      page: 0,
      currentPage: 0,
      pageSize: 30,
      channelSearch: '', // 渠道号搜索
      type: '', // 分类
      typeList: [
        { id: 1, name: '闪屏' },
        { id: 2, name: '首页弹窗' },
        { id: 3, name: '支付后弹窗' },
        { id: 4, name: '好物三格' },
        { id: 5, name: '公众号推文' },
        { id: 6, name: '私域流量' },
        { id: 7, name: '十宫格' },
        { id: 8, name: '公众号菜单' },
        { id: 0, name: '其他运营位' },
      ],
      isNew: false, //  是否是创建新的渠道
      item: {}, // 当前点击的这一行的数据
      modifyRemark: !1,
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('statistics/channel/list', {
        channel: this.channelSearch,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        type: this.type,
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.loading = !1;

        this.total = res.data.count;

        this.list = res.data.list;

        window.scrollTo(0, 0);
      });
    },
    onChangeType() {
      this.currentPage = 0;
      this.fetchList();
    },
    searchChannel() {
      this.currentPage = 0;
      this.fetchList();
    },
    add() {
      this.isNew = true;
      this.$store.state.statisticsChannel.editVisible = !0;
    },
    modify(scope) {
      this.list.forEach(item => {
        item.remarkShow = !1;
      });
      scope.row.remarkShow = !0;
      this.newList = this.list;
      this.list = [];
      this.$nextTick(() => {
        this.list = this.newList;
      });
    },
    blur(scope) {
      this.list.forEach(item => {
        item.remarkShow = !1;
      });
      this.newList = this.list;
      this.list = [];
      this.$nextTick(() => {
        this.list = this.newList;
      });
      seeFetch('statistics/channel/save', {
        id: scope.row.id,
        name: scope.row.name,
        channel: scope.row.channel,
        url: scope.row.url,
        remark: scope.row.remark,
        endDate: scope.row.endDate,
      }).then(res => {
        if (res.success) {
          console.log(111);
        }
      });
    },
    edit(value) {
      this.isNew = false;
      this.item = value;
      this.$store.state.statisticsChannel.editVisible = !0;
    },
    del(row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          seeFetch('statistics/channel/save', {
            id: row.id,
            status: -1,
          }).then(res => {
            if (!res.success) return;

            window.location.reload();
          });
        })
        .catch(() => {});
    },
    toLaxin(item) {
      this.$router.push(`/stat/detail/${item.name}/${item.id}/${item.addTime}`);
    },
    pageChange(page) {
      this.page = page;
      this.currentPage = this.page - 1;
      this.channelSearch = '';
      this.fetchList();
    },
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  padding: 40px 20px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px 0 0;
  margin-bottom: 20px;
}
.search-box {
  display: flex;
  align-items: center;
  span {
    width: 70px;
    flex-shrink: 0;
  }
  .search {
    margin-left: 20px;
  }
}
.search-input {
  margin: 0 20px;
}
.add-channel {
  width: 100px;
  height: 36px;
  border: none;
  border-radius: 6px;
  background-color: #2db7f5;
  color: white;
  outline: none;
  cursor: pointer;
}
.btn {
  width: 50px;
  margin-right: 8px;
  color: white;
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: #2db7f5;
  cursor: pointer;
}
.remark-box {
  cursor: pointer;
}
.remark-textarea {
  width: 180px;
  outline: none;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-left: 2px;
}
.del {
  margin-top: 10px;
}
</style>
