<template>
  <div class="contain">
    <el-card>
      <div class="menu">
        <div class="">
          <span>菜单按钮</span>
          <el-button type="primary" @click="showMenuAdd">
            添加
          </el-button>
        </div>
        <div class="menu-list">
          <div v-for="(item, key) in menuList" :key="key" class="menu-item">
            <span>{{ item.name }}</span>
            <el-button type="primary" @click="editMenuItem(item)">
              编辑
            </el-button>
            <el-button :disabled="item.linkUrl" type="primary">
              绑定组件
            </el-button>
            <div class="close" @click="delMenu(item)">
              ×
            </div>
          </div>
        </div>
      </div>
      <div class="component-list">
        <div class="component-item">
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
      </div>
      <div class="btn-list">
        <el-button type="primary">
          寺院组件
        </el-button>
        <el-button type="primary">
          佛事组件
        </el-button>
        <el-button type="primary">
          商品组件
        </el-button>
      </div>
    </el-card>
    <DialogAddMenu
      :visible="dialogAddVisible"
      :item="menuItem"
      @updateVisible="updateDialogAddVisible"
      @save="addMenu"
    />
  </div>
</template>

<script>
import './fetch/index';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import DialogAddMenu from './DialogAddMenu.vue';

export default {
  components: {
    DialogAddMenu,
  },
  data() {
    return {
      topicId: '',
      dialogAddVisible: !1,
      menuList: [
        { id: 1, name: '1' },
        { id: 2, name: '2' },
        { id: 3, name: '3' },
      ],
      menuItem: {},
      form: {
        title: '',
        introduce: '',
        isShowWish: !1,
        cover: [],
        bgColor: '',
        btnBgColor: '',
        textColor: '',
        components: [],
        templeComponent: { title: '', list: [] },
        buddhistComponent: { title: '', list: [] },
        goodsComponent: { title: '', list: [] },
      },

      activeComponent: 'templeComponent',
      loadingComponentData: !1,

      componentData: {
        templeComponent: {
          name: '寺院组件',
          col: [
            { prop: 'id', label: 'ID' },
            { prop: 'name', label: '名称' },
            { prop: 'tag', label: '标签' },
            { prop: 'intro', label: '描述重定义' },
            { prop: 'pic', label: '封面图重定义' },
            { prop: 'btn', label: '按钮文字' },
          ],
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
            { prop: 'priceStr', label: '价格' },
          ],
        },
      },
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
    let { id } = this.$route.params;
    id = parseInt(id, 10);
    if (id) {
      this.topicId = id;
      this.getDetail();
      // this.form = JSON.parse(window.sessionStorage['promo/topic/item']);
    }
  },
  methods: {
    getDetail() {
      seeFetch('promo/topicComponentEdit/getComponent', {
        topicId: this.topicId,
      }).then(res => {
        if (!res.errorCode) {
        } else {
          Notification({
            title: '提示',
            type: 'error',
            message: '接口出错',
          });
        }
      });
    },
    showMenuAdd() {
      this.menuItem = {};
      this.dialogAddVisible = !0;
    },
    delMenu(item) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('promo/topicComponentEdit/addTag', {
          id: item.id,
          topicId: this.topicId,
          status: -1,
        }).then(res => {
          if (!res.errorCode) {
            this.menuList.forEach((menuItem, key) => {
              if (menuItem.id === item.id) {
                this.menuList.splice(key, 1);
              }
            });
            Notification({
              type: 'success',
              title: '提示',
              message: '删除成功',
            });
          }
        });
      });
    },
    editMenuItem(item) {
      this.menuItem = item;
      this.dialogAddVisible = !0;
    },
    addMenu(menuData) {
      console.log(menuData);
      this.menuList.push(menuData);
    },
    updateDialogAddVisible(visible) {
      this.dialogAddVisible = visible;
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
    handleClickAddComponent() {
      this.dialogAddVisible = !0;
    },
  },
};
</script>

<style lang="less" scoped>
.contain {
  padding: 20px;
}

.menu-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}
.menu-item {
  position: relative;
  padding: 6px;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 10x solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
  border-radius: 4px;
}
.close {
  position: absolute;
  right: -5px;
  top: -16px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 18px;
  font-size: 18px;
  color: #ccc;
  cursor: pointer;
}

.component-list {
  margin-bottom: 20px;
}
.component-item {
  position: relative;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 3px 2px 5px rgba(0, 0, 0, 0.6);
}
</style>
