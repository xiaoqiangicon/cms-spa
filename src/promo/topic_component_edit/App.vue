<template>
  <div class="contain">
    <el-card>
      <div class="menu">
        <div class="">
          <span>菜单按钮：</span>
          <el-button
            type="primary"
            :disabled="menuList.length >= 5"
            @click="showMenuAdd"
          >
            添加
          </el-button>
        </div>
        <div class="menu-list">
          <div v-for="(item, key) in menuList" :key="key" class="menu-item">
            <span>{{ item.name }}</span>
            <el-button size="mini" type="primary" @click="editMenuItem(item)">
              编辑
            </el-button>
            <el-button
              size="mini"
              :disabled="!!item.linkUrl"
              type="primary"
              @click="bindCom(item)"
            >
              绑定组件
            </el-button>
            <div class="close" @click="delMenu(item)">
              ×
            </div>
          </div>
        </div>
      </div>
      <div class="component-box">
        <span>页面组件：</span>
        <div class="component-list">
          <div
            v-for="(componentItem, key) in componentList"
            :key="key"
            class="component-item"
          >
            <div class="mg-b-20">
              <span class="mg-l-5"
                >{{
                  componentList[key].type === 1
                    ? '寺院'
                    : componentList[key].type === 2
                    ? '佛事'
                    : '商品'
                }}组件名称</span
              >
              <el-input
                v-model="componentList[key].name"
                class="mg-l-10"
                style="width: 200px;"
              />
              <div class="fl-right">
                <el-button
                  type="primary"
                  size="small"
                  @click="saveComponent(key)"
                >
                  保存组件
                </el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="handleClickAddComponentItem(key)"
                >
                  添 加
                </el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="showOrHideTable(key)"
                >
                  {{ componentList[key].show ? '收缩' : '展开' }}列表
                </el-button>
                <el-button
                  type="danger"
                  size="small"
                  @click="delComponent(key)"
                >
                  删除组件
                </el-button>
              </div>
            </div>
            <el-table
              v-show="componentList[key].show"
              ref="componentTable"
              border=""
              row-key="id"
              :data="componentList[key].dataList"
              stripe
              style="width: 100%"
            >
              <el-table-column prop="contentId" label="ID" :align="'center'" />
              <el-table-column prop="name" label="名称" :align="'center'" />
              <el-table-column prop="label" label="标签" :align="'center'" />
              <el-table-column
                prop="detail"
                label="描述重定义"
                :align="'center'"
              />
              <el-table-column label="封面图重定义" :align="'center'">
                <template slot-scope="scope">
                  <img
                    v-if="scope.row.pic"
                    class="pic"
                    :src="scope.row.pic"
                    alt=""
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="btnName"
                label="按钮文字"
                :align="'center'"
              />
              <el-table-column label="操作" :align="'center'">
                <template slot-scope="scope">
                  <el-button
                    type="success"
                    size="mini"
                    @click="delRow(scope.row, key)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="btn-list">
        <span>添加组件：</span>
        <el-button type="primary" @click="addComponent(1)">
          寺院组件
        </el-button>
        <el-button type="primary" @click="addComponent(2)">
          佛事组件
        </el-button>
        <el-button type="primary" @click="addComponent(3)">
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
    <DialogAddCom
      :active-component="activeComponent"
      :item="comItem"
      :visible="dialogAddComVisible"
      :add-component-item-index="addComponentItemIndex"
      @updateComVisible="updateDialogAddComVisible"
      @saveCom="addComItem"
    />
    <el-dialog :title="'绑定组件'" :visible.sync="bindVisible">
      <el-button type="primary" @click="addBindCom">
        添加组件库
      </el-button>
      <div ref="bindList" class="bind-list">
        <div v-for="(item, key) in bindComList" :key="key" class="bind-item">
          <span>{{ item.name }}</span>
          <span class="bind-close" @click="delBindCom(item)">×</span>
        </div>
      </div>
      <el-button class="save-bind" type="primary" @click="saveBindCom">
        保存
      </el-button>
    </el-dialog>
    <el-dialog :title="'选择组件'" :visible.sync="selectComVisible">
      <el-select v-model="selectComId" filterable placeholder="请选择">
        <el-option
          v-for="item in componentList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <div style="text-align: center;">
        <el-button type="primary" @click="saveSelectCom">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import './fetch/index';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import Sortable from 'sortablejs';
import DialogAddMenu from './DialogAddMenu.vue';
import DialogAddCom from './DialogAddCom.vue';

export default {
  components: {
    DialogAddMenu,
    DialogAddCom,
  },
  data() {
    return {
      topicId: '',
      dialogAddVisible: !1,
      menuList: [],

      menuItem: {},
      bindVisible: !1,
      bindComList: [], // 当前菜单绑定的组件
      tagId: '', // 当前的菜单id

      selectComVisible: !1,
      selectComId: '',

      componentList: [], // 组件列表
      comItem: {}, // 选择的组件某条数据
      dialogAddComVisible: !1, // 添加组件项目弹框
      activeComponent: 'templeComponent', // 当前是什么类型
      addComponentItemIndex: 0, // 第几个组件添加项目

      componentData: {
        templeComponent: {
          name: '寺院组件',
          col: [
            { prop: 'contentId', label: 'ID' },
            { prop: 'name', label: '名称' },
            { prop: 'label', label: '标签' },
            { prop: 'detail', label: '描述重定义' },
            { prop: 'pic', label: '封面图重定义' },
            { prop: 'btnName', label: '按钮文字' },
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
  created() {
    let { id } = this.$route.params;
    id = parseInt(id, 10);
    if (id) {
      this.topicId = id;
      this.getDetail();
    }
  },
  methods: {
    initSortable() {
      const self = this;
      const $aTbody = this.$refs.componentTable;

      $aTbody.forEach((item, key) => {
        const $tbody = item.$el.querySelector('tbody');
        Sortable.create($tbody, {
          animation: 150,
          onEnd({ newIndex, oldIndex }) {
            const { dataList } = self.componentList[key];
            const oldRowData = dataList.splice(oldIndex, 1)[0];
            dataList.splice(newIndex, 0, oldRowData);
          },
        });
      });
    },

    // 获取原来有得数据
    getDetail() {
      seeFetch('promo/topicComponentEdit/getComponent', {
        topicId: this.topicId,
      }).then(res => {
        if (!res.errorCode) {
          this.componentList = res.data.componentList;
          this.menuList = res.data.tagList;
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
    // 添加菜单
    addMenu(menuData) {
      this.menuList.push(menuData);
    },
    // 删除菜单
    delMenu(item) {
      this.$confirm('确定删除此菜单吗？', '提示', {
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
              message: '删除菜单成功',
            });
          }
        });
      });
    },
    // 编辑菜单
    editMenuItem(item) {
      this.menuItem = item;
      this.dialogAddVisible = !0;
    },
    // 点击绑定组件
    bindCom(menuItem) {
      const bindJson = menuItem.componentJSON || [];
      this.tagId = menuItem.id;
      const bindCom = [];
      bindJson.forEach(item => {
        this.componentList.forEach(comItem => {
          if (item === comItem.id) {
            bindCom.push(comItem);
          }
        });
      });
      this.bindComList = bindCom;
      this.bindVisible = !0;
      // 初始化绑定组件可拖拽
      this.$nextTick(() => {
        const self = this;
        const $bindList = this.$refs.bindList;
        console.log($bindList);
        Sortable.create($bindList, {
          animation: 150,
          onEnd({ newIndex, oldIndex }) {
            const { dataList } = self.componentList[0];
            const oldRowData = dataList.splice(oldIndex, 1)[0];
            dataList.splice(newIndex, 0, oldRowData);
          },
        });
      });
    },
    // 选择可绑定组件框显示
    addBindCom() {
      this.selectComVisible = !0;
      this.bindVisible = !1;
    },
    // 保存选中组件菜单绑定
    saveSelectCom() {
      this.selectComVisible = !0;
      this.componentList.forEach((item, key) => {
        if (item.id === this.selectComId) {
          this.bindComList.push(this.componentList[key]);
        }
      });
      this.selectComId = '';
      this.bindVisible = !0;
    },
    // 删除绑定得组件
    delBindCom(menuItem) {
      console.log('menuItem', menuItem);
      this.$confirm('确定删除当前行吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.bindComList.forEach((item, key) => {
          if (item.id === menuItem.id) {
            this.bindComList.splice(key, 1);
          }
        });
      });
    },
    // 保存绑定组件
    saveBindCom() {
      const componentJSON = [];
      this.bindComList.forEach(item => {
        componentJSON.push(item.id);
      });
      const params = { tagId: this.tagId, componentJSON };
      seeFetch('promo/topicComponentEdit/addComponentTag', params).then(res => {
        if (!res.errorCode) {
          this.bindVisible = !1;
          this.selectComId = '';
          this.selectComVisible = !1;
          Notification({
            type: 'success',
            title: '提示',
            message: '保存绑定组件成功',
          });
        } else {
          Notification({
            type: 'error',
            title: '提示',
            message: '保存绑定组件失败',
          });
        }
      });
    },

    // 显示隐藏当前组件列表
    showOrHideTable(comIndex) {
      this.componentList[comIndex].show = !this.componentList[comIndex].show;
      this.$forceUpdate();
      this.$nextTick(() => {
        this.initSortable();
      });
    },
    updateDialogAddVisible(visible) {
      this.dialogAddVisible = visible;
    },
    // 点击增加一行当前组件数据
    handleClickAddComponentItem(comIndex) {
      this.addComponentItemIndex = comIndex;
      this.componentList[comIndex].show = !0;
      this.$forceUpdate();
      if (this.componentList[comIndex].type === 1) {
        this.activeComponent = 'templeComponent';
      } else if (this.componentList[comIndex].type === 2) {
        this.activeComponent = 'buddhistComponent';
      } else {
        this.activeComponent = 'goodsComponent';
      }
      this.dialogAddComVisible = !0;
    },
    // 插入增加的一行数据
    addComItem(rowData) {
      console.log(rowData);
      this.componentList[this.addComponentItemIndex].dataList.push(rowData);
      this.$forceUpdate();
    },
    // 删除插入的一行数据
    delRow(row, comIndex) {
      console.log(row, comIndex);

      this.$confirm('确定删除当前行吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.componentList[comIndex].dataList.forEach((dataItem, key) => {
          if (dataItem.contentId === row.contentId) {
            this.componentList[comIndex].dataList.splice(key, 1);
          }
        });

        let { id, name, type, dataList } = this.componentList[comIndex];
        id = id || 0;

        const params = { id, name, type, topicId: this.topicId, dataList };
        // seeFetch('promo/topicComponentEdit/addComponent', params).then(res => {
        //   if (!res.errorCode) {
        //     Notification({
        //       type: 'success',
        //       title: '提示',
        //       message: '保存组件成功',
        //     })
        //   } else {
        //     Notification({
        //       type: 'error',
        //       title: '提示',
        //       message: '保存组件失败',
        //     })
        //   }
        // })
      });
    },
    // 添加一个组件
    addComponent(type, index) {
      this.componentList.push({ type, show: !0, dataList: [] });
      this.$nextTick(() => {
        this.initSortable();
      });
    },
    // 添加组件弹框显示隐藏
    updateDialogAddComVisible(visible) {
      this.dialogAddComVisible = visible;
    },

    // 保存组件
    saveComponent(comIndex) {
      if (!this.componentList[comIndex].name) {
        Notification({
          type: 'warning',
          message: '请输入组件名称',
        });
        return;
      }
      let { id, name, type, dataList } = this.componentList[comIndex];
      id = id || 0;

      const params = { id, name, type, topicId: this.topicId, dataList };
      seeFetch('promo/topicComponentEdit/addComponent', params).then(res => {
        if (!res.errorCode) {
          Notification({
            type: 'success',
            title: '提示',
            message: '保存组件成功',
          });
        } else {
          Notification({
            type: 'error',
            title: '提示',
            message: '保存组件失败',
          });
        }
      });
    },
    // 删除组件
    delComponent(comIndex) {
      this.$confirm('确定删除当前组件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const comId = this.componentList[comIndex].id;

        seeFetch('promo/topicComponentEdit/delComponent', { id: comId }).then(
          res => {
            if (!res.errorCode) {
              this.componentList.forEach((comItem, key) => {
                if (comItem.id === comId) {
                  this.componentList.splice(key, 1);
                }
              });
              Notification({
                type: 'success',
                title: '提示',
                message: '删除组件成功',
              });
            } else {
              Notification({
                type: 'error',
                title: '提示',
                message: '删除组件失败',
              });
            }
          }
        );
      });
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
  span {
    margin-left: 6px;
    margin-right: 10px;
  }
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

.component-box {
  display: flex;
  span {
    flex-shrink: 0;
  }
}
.component-list {
  margin-bottom: 20px;
}
.component-item {
  position: relative;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  box-shadow: 3px 2px 5px rgba(0, 0, 0, 0.6);
}
.pic {
  width: 100px;
  height: 100px;
  border-radius: 8px;
}

.bind-item {
  position: relative;
  height: 40px;
  margin-top: 10px;
  padding-left: 18px;
  border: 1px solid #ccc;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.6);
  border-radius: 6px;
  line-height: 40px;
  cursor: pointer;
  user-select: none;
}
.bind-close {
  position: absolute;
  right: 20px;
  top: 0;
  font-size: 20px;
  cursor: pointer;
}
.save-bind {
  display: block;
  margin: 20px auto 0;
}
</style>
