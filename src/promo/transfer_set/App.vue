<template>
  <div class="container">
    <el-card class="head">
      <div class="f-s-18 mg-b-10">
        {{ buddhistName }}
      </div>
      <div class="gray">
        <span class="mg-r-10">佛事ID：{{ buddhistId }}</span>|
        <span class="mg-l-10">佛事状态：进行中</span>
      </div>
    </el-card>
    <div class="body">
      <div class="aside">
        <el-card>
          <div class="mg-b-10">
            寺院列表
            <el-button
              class="fl-right"
              size="small"
              type="primary"
            >
              添加寺院
            </el-button>
          </div>
        </el-card>
      </div>
      <div class="main">
        <el-card>456</el-card>
      </div>
    </div>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import './fetch/index';

export default {
  name: 'App',
  components: {},
  data() {
    return {
      buddhistName: null,
      buddhistId: null,
      buddhistStatus: null,
      subdivideList: null,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const { id: buddhistId, name: buddhistName, buddhistStatus, subdivide: subdivideList } = JSON.parse(
        window.sessionStorage.getItem('promo/index/item')
      );
      this.buddhistId = buddhistId;
      this.buddhistName = buddhistName;
      this.buddhistStatus = buddhistStatus;
      this.subdivideList = subdivideList;
    },
    getTempleList() {

    },
    getTransferTempleList() {

    }

  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 40px 20px;
  .gray {
    color: #aeafae;
  }
  .head {
    height: 120px;
    margin-bottom: 20px;
  }
  .body {
    display: flex;
    .aside {
      flex-basis: 200px;
    }
    .main {
      flex-grow: 1;
      margin-left: 20px;
    }
  }
}
</style>
