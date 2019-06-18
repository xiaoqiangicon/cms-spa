<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="专题名称">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="专题简介">
        <el-input v-model="form.introduce" type="textarea" rows="5" />
      </el-form-item>
      <el-form-item label="展示心愿">
        <el-switch v-model="form.isShowWish" />
      </el-form-item>
      <el-form-item label="封面图片">
        <Upload :images="form.cover" />
      </el-form-item>
      <el-form-item label="页面组件">
        <el-tabs type="border-card">
          <el-card class="mg-b-10">
            <div class="mg-b-20">
              <span class="mg-l-5">组件名称</span>
              <el-input class="mg-l-10" style="width: 200px;" />
              <div class="fl-right">
                <el-button type="primary" size="small">
                  保 存
                </el-button>
                <el-button type="primary" size="small">
                  添 加
                </el-button>
              </div>
            </div>
            <el-table border="" :data="tableData" stripe style="width: 100%">
              <el-table-column
                prop="id"
                width="100"
                label="ID"
                :align="'center'"
              />
              <el-table-column prop="title" label="名称" :align="'center'" />
              <el-table-column prop="price" label="价格" :align="'center'" />
              <el-table-column label="操作" :align="'center'">
                <template slot-scope="scope">
                  <el-button
                    type="success"
                    size="mini"
                    @click="handleClickDelete(scope.row)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-tab-pane label="寺院组件" />
          <el-tab-pane label="佛事组件" />
          <el-tab-pane label="商品组件" />
        </el-tabs>
      </el-form-item>
      <div class="operation">
        <el-button type="primary" @click="onSubmit">
          保 存
        </el-button>
      </div>
    </el-form>
    <!-- <DialogRemind
      :temple-id="curTempleId"
      :visible="dialogRemindVisible"
      @updateVisible="updateDialogRemindVisible"
    />-->
  </div>
</template>

<script>
import './fetch/index';
// import seeFetch from 'see-fetch';
// import { Notification } from 'element-ui';
// import DialogRemind from './DialogRemind';
import Upload from '../../com/upload/Upload.vue';

export default {
  name: 'App',
  components: {
    Upload,
    // DialogRemind,
  },
  data() {
    return {
      loading: !0,

      form: {
        title: '',
        introduce: '',
        isShowWish: '',
        cover: '',
        components: [],
      },

      component: {
        temple: {
          name: '寺院组件',
          col: ['id', 'name'],
        },
        buddhist: {
          name: '佛事组件',
          col: ['id', 'name'],
        },
        goods: {
          name: '商品组件',
          col: ['id', 'name', 'price'],
        },
      },

      curComponentData: {
        name: '',
        tableData: [],
      },

      dialogRemindVisible: !1,
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.$nextTick(() => {
      this.initSortable();
    });
  },
  methods: {
    init() {
      const { id } = this.$route.params;
      // console.log(id);
      if (id) {
        this.form = JSON.parse(window.sessionStorage['promo/topic/item']);
        // console.log(this.form)
      }
    },
    initSortable() {},
    updateDialogRemindVisible(visible) {
      this.dialogRemindVisible = visible;
    },
    onUpload() {},
    onSubmit(rowData) {
      const { id } = rowData;
      this.curTempleId = id;
      this.dialogRemindVisible = !0;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 75%;
  padding: 40px 20px;
}
.operation {
  position: fixed;
  top: 130px;
  right: 100px;
}
</style>
