<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item prop="title" label="专题名称">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item prop="introduce" label="专题简介">
        <el-input v-model="form.introduce" type="textarea" rows="5" />
      </el-form-item>
      <el-form-item label="展示心愿">
        <el-switch v-model="form.isShowWish" />
      </el-form-item>
      <el-form-item prop="cover" label="封面图片">
        <Upload :images="form.cover" :multiple="false" />
      </el-form-item>
      <el-form-item label="页面颜色">
        <div class="dib mg-r-30">
          <span class="vam">背景色：</span>
          <el-color-picker v-model="form.bgColor" class="vam" />
        </div>
        <div class="dib mg-r-30">
          <span class="vam">按钮背景颜色：</span>
          <el-color-picker v-model="form.btnBgColor" class="vam" />
        </div>
        <div class="dib mg-r-30">
          <span class="vam">文本颜色：</span>
          <el-color-picker v-model="form.textColor" class="vam" />
        </div>
      </el-form-item>
      <el-form-item prop="components" label="页面组件">
        <el-tabs v-model="activeComponent" type="border-card">
          <div v-loading="loadingComponentData">
            <div class="mg-b-20">
              <span class="mg-l-5">{{ curComponentData.name }}名称</span>
              <el-input
                v-model="form[activeComponent].title"
                class="mg-l-10"
                style="width: 200px;"
              />
              <el-button
                class="fl-right"
                type="primary"
                size="small"
                @click="handleClickAddComponent"
              >
                添 加
              </el-button>
            </div>
            <el-table
              ref="componentTable"
              border=""
              row-key="id"
              :data="form[activeComponent].list"
              stripe
              style="width: 100%"
            >
              <el-table-column
                v-for="item in curComponentData.col"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :align="'center'"
              />
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
          </div>
          <el-tab-pane label="寺院组件" name="templeComponent" />
          <el-tab-pane label="佛事组件" name="buddhistComponent" />
          <el-tab-pane label="商品组件" name="goodsComponent" />
        </el-tabs>
      </el-form-item>
      <div class="operation">
        <el-button type="primary" @click="handleClickSave">
          保 存
        </el-button>
      </div>
    </el-form>
    <DialogAdd
      :active-component="activeComponent"
      :title="componentData[activeComponent].name"
      :visible="dialogAddVisible"
      @updateVisible="updateDialogAddVisible"
      @save="savAdd"
    />
  </div>
</template>

<script>
import './fetch/index';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import Sortable from 'sortablejs';
import DialogAdd from './DialogAdd';
import Upload from '../../com/upload/Upload.vue';

export default {
  name: 'App',
  components: {
    Upload,
    DialogAdd,
  },
  data() {
    return {
      topicId: 0, // 默认新建
      componentType: 1, // 默认佛事

      form: {
        title: '',
        introduce: '',
        isShowWish: '',
        cover: [],
        bgColor: '',
        btnBgColor: '',
        textColor: '',
        components: [],
        templeComponent: { title: '', list: [] },
        buddhistComponent: { title: '', list: [] },
        goodsComponent: { title: '', list: [] },
      },

      rules: {
        title: [{ required: !0, message: '请输入专题名称', trigger: 'blur' }],
        introduce: [
          { required: !0, message: '请输入专题简介', trigger: 'blur' },
        ],
      },

      activeComponent: 'templeComponent',
      loadingComponentData: !1,

      componentData: {
        templeComponent: {
          name: '寺院组件',
          col: [{ prop: 'id', label: 'ID' }, { prop: 'name', label: '名称' }],
        },
        buddhistComponent: {
          name: '佛事组件',
          col: [{ prop: 'id', label: 'ID' }, { prop: 'name', label: '名称' }],
        },
        goodsComponent: {
          name: '商品组件',
          col: [
            { prop: 'id', label: 'ID' },
            { prop: 'name', label: '名称' },
            { prop: 'price', label: '价格' },
          ],
        },
      },

      dialogAddVisible: !1,
    };
  },
  computed: {
    // 用来渲染表格dom的静态数据
    curComponentData() {
      // name col title list
      const { activeComponent, componentData } = this;
      const res = {};
      res.name = componentData[activeComponent].name;
      res.col = componentData[activeComponent].col;
      return res;
    },
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
      let { id } = this.$route.params;
      id = parseInt(id, 10);
      if (id) {
        this.topicId = id;
        this.getDetail();
        // this.form = JSON.parse(window.sessionStorage['promo/topic/item']);
      }
    },
    initSortable() {
      const self = this;
      const $tbody = this.$refs.componentTable.$el.querySelector('tbody');
      Sortable.create($tbody, {
        animation: 150,
        onEnd({ newIndex, oldIndex }) {
          const { list } = self.form[self.activeComponent];
          const oldRowData = list.splice(oldIndex, 1)[0];
          list.splice(newIndex, 0, oldRowData);
        },
      });
    },
    getDetail() {
      const { topicId } = this;

      seeFetch('promo/topicEdit/getDetail', { topicId }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });

          return;
        }

        console.log(res.data);
        this.form = res.data;
      });
    },
    updateDialogAddVisible(visible) {
      this.dialogAddVisible = visible;
    },
    handleClickAddComponent() {
      this.dialogAddVisible = !0;
    },
    handleClickDelete(rowData) {
      const { activeComponent } = this;
      const { id } = rowData;
      const findIndex = this.form[activeComponent].list.findIndex(
        item => item.id === id
      );
      this.$confirm('此操作将删除选中的组件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.form[activeComponent].list.splice(findIndex, 1);
      });
    },
    savAdd(rowData) {
      const { activeComponent } = this;
      this.form[activeComponent].list.unshift(rowData);
    },
    handleClickSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const {
            title,
            bgColor,
            btnBgColor,
            textColor,
            introduce,
            isShowWish,
            cover,
            templeComponent,
            buddhistComponent,
            goodsComponent,
          } = this.form;
          // 数据检验
          const verifyMessage = [];
          if (!cover.length) verifyMessage.push('请上传封面');
          if (!bgColor) verifyMessage.push('请选择背景颜色');
          if (!btnBgColor) verifyMessage.push('请选择按钮背景颜色');
          if (!textColor) verifyMessage.push('请选择文本颜色');

          if (verifyMessage.length) {
            Notification({
              type: 'warning',
              title: '提示',
              message: verifyMessage[0],
            });
            return;
          }

          const componentJson = [
            {
              type: 1,
              title: templeComponent.title,
              ids: templeComponent.list.map(item => item.id).join(','),
            },
            {
              type: 2,
              title: buddhistComponent.title,
              ids: buddhistComponent.list.map(item => item.id).join(','),
            },
            {
              type: 3,
              title: goodsComponent.title,
              ids: goodsComponent.list.map(item => item.id).join(','),
            },
          ];

          // 数据上传
          seeFetch('promo/topicEdit/update', {
            id: this.topicId,
            title,
            introduce,
            isShowWish,
            cover,
            bgColor,
            btnBgColor,
            textColor,
            componentJson,
          }).then(res => {
            if (!res.success) {
              Notification({
                type: 'error',
                title: '提示',
                message: res.message,
              });

              return;
            }

            Notification({
              type: 'success',
              title: '提示',
              message: '保存成功',
            });

            this.$router.push(`/promo/topic`);
          });
        }
      });
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
.vam {
  vertical-align: middle;
}
.dib {
  display: inline-block;
}
</style>
