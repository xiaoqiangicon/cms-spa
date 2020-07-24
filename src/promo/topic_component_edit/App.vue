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
    };
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
        console.log(res);
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
</style>
