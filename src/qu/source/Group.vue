<template>
  <el-dialog
    :visible="groupDialogVisible"
    title="分组管理"
    :before-close="clickCancel"
    width="40%"
  >
    <div class="content">
      <el-table :data="groupList" style="width: 100%">
        <el-table-column prop="name" label="分组名称" />
        <el-table-column label="操作">
          <template slot-scope="item">
            <el-button type="text" size="small" @click="toDelete(item)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button size="small" class="mg-t-20" @click="add">
        添加分组
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { Notification } from 'element-ui';
import seeFetch from 'see-fetch';

const computedProps = {};

['groupList', 'groupDialogVisible'].forEach(name => {
  computedProps[name] = {
    get() {
      return this.$store.state.quSource[name];
    },
    set(value) {
      this.$store.state.quSource[name] = value;
    },
  };
});

export default {
  name: 'Group',
  computed: {
    ...computedProps,
  },
  methods: {
    fetchGroupList() {
      seeFetch('qu/source/groupList').then(res => {
        if (!res.success) return;

        if (res.data && res.data.length) this.groupList = res.data;
      });
    },
    clickCancel() {
      this.$store.state.quSource.groupDialogVisible = !1;
    },
    toDelete({ row: item }) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('qu/source/groupDelete', { id: item.id }).then(res => {
          if (!res.success) {
            Notification({
              title: '提示',
              message: res.message,
            });
            return;
          }

          Notification({
            title: '提示',
            message: '删除成功',
          });

          this.fetchGroupList();
        });
      });
    },
    add() {
      this.$prompt('添加分组', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if (!value) return;

        seeFetch('qu/source/groupAdd', {
          name: value,
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
            message: '添加成功',
          });

          this.fetchGroupList();
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 0 20px;
}
</style>
