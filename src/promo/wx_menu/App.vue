<template>
  <div class="contain">
    <el-card>
      <div class="header">
        <div class="tips">
          <h3>自在家zizaihome的公众号菜单设置。</h3>
          <p>1.用户分群展示，可挂钩分群系统的分群效果；</p>
          <p>
            2.分组的数量只能有一个，但是一个用户只能看到影响他最近的一条菜单组（“最近”：添加自定义菜单组的时间顺序）；
          </p>
          <p>3.添加后直接在渠道统计中自动进行统计；</p>
          <p>4.仅支持链接形式；</p>
          <p>5.编辑或修改完成后需点击“保存”按钮再点击同步到微信；</p>
          <p>6.点击“同步到微信”可更新用户分组的用户数据（需手动）。</p>
        </div>
        <div class="sync-btn" @click="sync">同步菜单到微信</div>
      </div>
      <div class="btn-list">
        <div
          :class="{
            'btn-item': !0,
            'active-btn': activeSetting.id === item.id,
          }"
          v-for="(item, key) in list"
          :key="key"
          @click="changeTab(item)"
        >
          {{ item.name }}
        </div>
        <div class="btn-item btn-add" @click="editMenu(0)">
          添加自定义菜单组
        </div>
      </div>
      <div class="rule-box" v-if="activeSetting.id">
        <div class="rule-left">
          <span>展示用户群组</span>
          <div class="rule">{{ activeSetting.ruleName }}</div>
        </div>
        <div class="rule-btn">
          <el-button type="primary" @click="editMenu(1)">编辑</el-button>
          <el-button type="danger" @click="del" v-if="activeSetting.type !== 0"
            >删除</el-button
          >
        </div>
      </div>
      <el-button
        @click="editFirstMenu(0)"
        style="margin-top: 30px"
        type="primary"
        v-if="
          activeSetting.menuJson &&
            activeSetting.menuJson.menu.button.length < 3
        "
        >添加一级菜单</el-button
      >
      <div class="menu-box" v-if="activeSetting.menuJson">
        <div
          class="menu-item"
          v-for="(item, key) in activeSetting.menuJson.menu.button"
          :key="key"
        >
          <div class="menu-header">
            <div class="menu-name">
              {{ item.name }}
              <div class="modify" @click="editFirstMenu(1, key)">修改</div>
              <div class="del" @click="delFirstMenu(key)">删除</div>
            </div>
            <el-button
              type="primary"
              v-if="item.sub_button && item.sub_button.length < 5"
              @click="editSubMenu(0, {}, key)"
              >添加二级菜单</el-button
            >
          </div>
          <div
            class="sub-menu"
            v-for="(sub, subKey) in item.sub_button"
            :key="subKey"
          >
            <span class="sub-menu-name">{{ sub.name }}</span>
            <span class="sub-menu-url">{{
              sub.redirectType === 1
                ? `跳转h5链接：${sub.url}`
                : sub.redirectType === 2
                ? `跳转公众号文章ID：${sub.article_id}`
                : sub.redirectType === 3
                ? `跳转抄经小程序页面：${sub.pagepath}`
                : `跳转h5链接：${sub.url}`
            }}</span>
            <div>
              <el-button
                type="primary"
                @click="editSubMenu(1, sub, key, subKey)"
                >编辑</el-button
              >
              <el-button type="danger" @click="delSubMenu(item, sub, subKey)"
                >删除</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog :title="editTitle" :visible.sync="dialogEditMenuVisible">
      <div class="edit-row">
        <span>自定义菜单名称</span>
        <el-input v-model="cloneActiveSetting.name" autocomplete="off" />
      </div>
      <div class="edit-row">
        <span>展示用户群组（只可选择一个群组）</span>
        <el-select v-model="cloneActiveSetting.ruleId" placeholder="请选择位置">
          <el-option
            v-for="(item, key) in ruleList"
            :key="key"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveEditMenu">
          保存
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="二级菜单项" :visible.sync="dialogEditSubMenuVisible">
      <div class="edit-row">
        <span>二级菜单名称</span>
        <el-input v-model="cloneSubMenu.name" autocomplete="off" />
      </div>
      <div class="redirect-type-row">
        <el-button
          :type="cloneSubMenu.redirectType === 1 ? 'primary' : 'default'"
          @click="changeRedirectType(1)"
          >跳转h5链接</el-button
        >
        <el-button
          :type="cloneSubMenu.redirectType === 2 ? 'primary' : 'default'"
          @click="changeRedirectType(2)"
          >跳转公众号文章</el-button
        >
        <el-button
          :type="cloneSubMenu.redirectType === 3 ? 'primary' : 'default'"
          @click="changeRedirectType(3)"
          >跳转抄经小程序</el-button
        >
      </div>
      <div class="edit-row" v-if="cloneSubMenu.redirectType === 1">
        <span>跳转h5链接</span>
        <el-input v-model="cloneSubMenu.url" autocomplete="off" />
      </div>
      <div class="edit-row" v-if="cloneSubMenu.redirectType === 2">
        <span>公众号文章,填写ID</span>
        <el-input
          v-model="cloneSubMenu.article_id"
          autocomplete="off"
          type="number"
          @input="
            () => {
              this.$forceUpdate();
            }
          "
        />
      </div>
      <div class="edit-row" v-if="cloneSubMenu.redirectType === 3">
        <span>跳转小程序页面（询问开发）</span>
        <el-input
          v-model="cloneSubMenu.pagepath"
          autocomplete="off"
          @input="
            () => {
              this.$forceUpdate();
            }
          "
        />
        <span style="margin-top: 10px;"
          >备用跳转链接（用户未使用新版微信时跳转）</span
        >
        <el-input v-model="cloneSubMenu.url" autocomplete="off" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveSubEditMenu">
          保存
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="一级菜单项" :visible.sync="dialogEditFirstMenuVisible">
      <div class="edit-row">
        <span>一级菜单名称</span>
        <el-input v-model="firstMenuName" autocomplete="off" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveFirstMenu">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';

export default {
  name: 'APP',
  data() {
    return {
      list: [],
      ruleList: [],
      activeSetting: {},
      cloneActiveSetting: {},
      dialogEditMenuVisible: !1,
      editTitle: '',
      editMenuType: 0,
      dialogEditSubMenuVisible: !1,
      cloneSubMenu: {},
      isEditSubMenu: !0,
      subMenuKey: 0,
      menuKey: 0,
      dialogEditFirstMenuVisible: !1,
      modifyFirstMenuNameKey: 0,
      firstMenuName: '',
      isEditFirstMenu: !0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      seeFetch('promo/wx_menu/ruleList', {}).then(ruleList => {
        this.ruleList = ruleList.data;
        seeFetch('promo/wx_menu/list', {}).then(res => {
          res.data.forEach(item => {
            if (item.type === 0) {
              this.activeSetting = item;
            }
            ruleList.data.forEach(rule => {
              if (item.ruleId === rule.id) {
                item.ruleName = rule.name;
              }
            });
          });
          this.list = res.data;
        });
      });
    },
    sync() {
      seeFetch('promo/wx_menu/syncMenu', {}).then(res => {
        if (res.success) {
          this.$message({
            message: '同步成功',
            type: 'success',
          });
        } else {
          this.$message.error('同步失败');
        }
      });
    },
    changeTab(item) {
      this.activeSetting = item;
    },
    editFirstMenu(type, key) {
      this.dialogEditFirstMenuVisible = !0;

      this.modifyFirstMenuNameKey = key;
      if (type === 1) {
        this.isEditFirstMenu = !0;
        this.firstMenuName = this.activeSetting.menuJson.menu.button[key].name;
      } else {
        this.isEditFirstMenu = !1;
        this.firstMenuName = '';
      }
    },
    delFirstMenu(key) {
      this.$confirm(
        `确定要删除${this.activeSetting.menuJson.menu.button[key].name}吗？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        this.activeSetting.menuJson.menu.button.splice(key, 1);
        seeFetch('promo/wx_menu/edit', { type: 1, ...this.activeSetting }).then(
          res => {
            this.$message({
              message: '保存成功',
              type: 'success',
            });
          }
        );
      });
    },
    saveFirstMenu() {
      let key = this.modifyFirstMenuNameKey;
      console.log(this.activeSetting);
      if (this.isEditFirstMenu) {
        this.activeSetting.menuJson.menu.button[key].name = this.firstMenuName;
      } else {
        this.activeSetting.menuJson.menu.button.push({
          name: this.firstMenuName,
          sub_button: [],
        });
      }
      seeFetch('promo/wx_menu/edit', { ...this.activeSetting }).then(res => {
        this.dialogEditFirstMenuVisible = !1;
        this.$message({
          message: '保存成功',
          type: 'success',
        });
      });
    },
    editMenu(type) {
      if (type === 0) {
        this.editTitle = '添加自定义菜单组';
        this.cloneActiveSetting = {};
      } else {
        this.editTitle = this.activeSetting.name;
        this.cloneActiveSetting = { ...this.activeSetting };
      }
      this.editMenuType = type;
      this.dialogEditMenuVisible = !0;
    },
    saveEditMenu() {
      this.activeSetting.name = this.cloneActiveSetting.name;
      this.activeSetting.ruleId = this.cloneActiveSetting.ruleId;
      this.ruleList.forEach(item => {
        if (item.id === this.activeSetting.ruleId) {
          this.activeSetting.ruleName = item.name;
        }
      });
      if (this.editMenuType === 0) {
        // 新增
        this.activeSetting.id = 0;
        this.activeSetting.type = 1;
        this.activeSetting.menuJson = { menu: { button: [] } };
      }

      seeFetch('promo/wx_menu/edit', { ...this.activeSetting }).then(res => {
        this.dialogEditMenuVisible = !1;
        this.$message({
          message: '保存成功',
          type: 'success',
        });
        window.location.reload();
      });
    },
    del() {
      this.$confirm(`确定要删除${this.activeSetting.name}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('promo/wx_menu/del', { id: this.activeSetting.id }).then(
          res => {
            window.location.reload();
          }
        );
      });
    },
    editSubMenu(type, sub, key, subKey) {
      this.dialogEditSubMenuVisible = !0;
      this.cloneSubMenu = { ...sub };
      this.isEditSubMenu = type;
      this.subMenuKey = subKey; // 记录编辑的二级菜单的下标
      this.menuKey = key; // 记录一级菜单的下标
      if (!this.cloneSubMenu.type) this.cloneSubMenu.type = 'view';
      if (!this.cloneSubMenu.redirectType) this.cloneSubMenu.redirectType = 1; // 1h5 2公众号文章 3跳转小程序
    },
    changeRedirectType(type) {
      if (type === 1) {
        this.cloneSubMenu.type = 'view';
        this.cloneSubMenu.redirectType = 1;
        this.cloneSubMenu.article_id = '';
        this.cloneSubMenu.pagepath = '';
        this.cloneSubMenu.appid = '';
      } else if (type === 2) {
        this.cloneSubMenu.type = 'article_id';
        this.cloneSubMenu.redirectType = 2;
        this.cloneSubMenu.pagepath = '';
        this.cloneSubMenu.appid = '';
        this.cloneSubMenu.url = '';
      } else if (type === 3) {
        this.cloneSubMenu.type = 'miniprogram';
        this.cloneSubMenu.redirectType = 3;
        this.cloneSubMenu.article_id = '';
        this.cloneSubMenu.pagepath = '';
        this.cloneSubMenu.appid = 'wx6adb6feee35a0077';
      }
      this.$forceUpdate();
    },
    validateSubSave(subMenu) {
      if (subMenu.redirectType === 1 && !subMenu.url) {
        this.$message({
          message: '请填写跳转链接',
          type: 'error',
        });
        return false;
      }
      if (subMenu.redirectType === 2 && !subMenu.article_id) {
        this.$message({
          message: '请填写公众号文章ID',
          type: 'error',
        });
        return false;
      }
      if (subMenu.redirectType === 3 && (!subMenu.pagepath || !subMenu.url)) {
        this.$message({
          message: '请填写小程序页面和备选链接',
          type: 'error',
        });
        return false;
      }
      return true;
    },
    saveSubEditMenu() {
      if (!this.validateSubSave(this.cloneSubMenu)) return;
      if (this.isEditSubMenu) {
        this.activeSetting.menuJson.menu.button[this.menuKey].sub_button[
          this.subMenuKey
        ] = this.cloneSubMenu;
      } else {
        this.activeSetting.menuJson.menu.button[this.menuKey].sub_button.push(
          this.cloneSubMenu
        );
      }
      console.log(this.activeSetting, 'save');
      seeFetch('promo/wx_menu/edit', { ...this.activeSetting }).then(res => {
        this.dialogEditSubMenuVisible = !1;
        this.$message({
          message: '保存成功',
          type: 'success',
        });
      });
    },
    delSubMenu(item, sub, index) {
      this.$confirm(`确定要删除${sub.name}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // params.id = this.activeSetting.id;
        // params.ruleId = this.activeSetting.ruleId;
        // params.name = this.activeSetting.name;
        item.sub_button.splice(index, 1);
        // params.menuJson = { menu: { button: [item] } }
        console.log(this.activeSetting, sub, index, 'sub');

        seeFetch('promo/wx_menu/edit', { type: 1, ...this.activeSetting }).then(
          res => {
            this.$message({
              message: '保存成功',
              type: 'success',
            });
          }
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './common.scss';

.contain {
  padding: 20px;
}
.header {
  display: flex;
  align-items: center;
}
.tips {
  padding: 10px 20px;
  border: 1px solid $baseColor;
  border-radius: 6px;
  background-color: $lightColor;
  color: $baseColor;
  h3 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  p {
    margin: 0;
    margin-bottom: 4px;
  }
}
.sync-btn {
  width: 160px;
  margin-left: 20px;
  background-color: $baseColor;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
}
.btn-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 24px;
}
.btn-item {
  margin-right: 20px;
  padding: 0 8px;
  border: 1px solid $baseColor;
  line-height: 34px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}
.active-btn {
  background-color: $lightColor;
  color: $baseColor;
}
.btn-add {
  background-color: $baseColor;
  color: #fff;
}
.rule-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  padding: 10px 20px;
  border: 1px solid $baseColor;
  border-radius: 6px;
  font-size: 16px;
}
.rule-left {
  display: flex;
  align-items: center;
  span {
    margin-right: 20px;
  }
}
.rule {
  padding: 0 8px;
  background-color: $ruleLightColor;
  color: $ruleColor;
  border-radius: 4px;
  line-height: 32px;
  font-size: 16px;
  border: 1px solid $ruleColor;
}
.menu-box {
  margin-top: 30px;
}
.menu-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.menu-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  margin-right: 40px;
  font-size: 18px;
  font-weight: bold;
  border: 1px dotted #ccc;
  text-align: center;
  line-height: 40px;
}
.modify,
.del {
  padding: 0 6px;
  margin-left: 20px;
  font-size: 14px;
  font-weight: normal;
  color: $baseColor;
  border: 1px solid $baseColor;
  line-height: 24px;
  border-radius: 12px;
  cursor: pointer;
}
.del {
  color: #f60;
  border: 1px solid #f60;
}
.sub-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px;
  margin-bottom: 20px;
  margin-left: 50px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
.sub-menu-name {
  font-size: 16px;
  font-weight: bold;
  margin-right: 30px;
}
.sub-menu-url {
  display: inline-block;
  max-width: 30%;
  font-size: 14px;
  color: #999;
  line-height: 20px;
  word-break: break-all;
}
.edit-row {
  display: flex;
  flex-direction: column;
  &:nth-of-type(2) {
    margin-top: 20px;
  }
  span {
    margin-bottom: 10px;
  }
}
.redirect-type-row {
  margin: 20px 0 10px 0;
}
</style>
