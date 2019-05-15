<template>
  <el-dialog
    :visible="actionVisible"
    title="选择操作"
    :before-close="clickCancel"
    width="200px"
  >
    <div class="t-a-center">
      <el-button @click="go('edit')">
        编辑
      </el-button>
    </div>
    <div class="t-a-center mg-t-10">
      <el-button @click="go('insertTextBefore')">
        向前插入文字
      </el-button>
    </div>
    <div class="t-a-center mg-t-10">
      <el-button @click="go('insertImageBefore')">
        向前插入图片
      </el-button>
    </div>
    <div class="t-a-center mg-t-10">
      <el-button @click="go('insertTextAfter')">
        向后插入文字
      </el-button>
    </div>
    <div class="t-a-center mg-t-10">
      <el-button @click="go('insertImageAfter')">
        向后插入图片
      </el-button>
    </div>
    <div class="t-a-center mg-t-10">
      <el-button @click="go('delete')">
        删除
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
const computedProps = {};

['action', 'actionVisible'].forEach(name => {
  computedProps[name] = {
    get() {
      return this.$store.state.quMaterial[name];
    },
    set(value) {
      this.$store.state.quMaterial[name] = value;
    },
  };
});

export default {
  name: 'Action',
  computed: {
    ...computedProps,
  },
  methods: {
    clickCancel() {
      this.$store.state.quMaterial.actionVisible = !1;
    },
    go(action) {
      this.$store.state.quMaterial.action = action;
      this.$store.state.quMaterial.selectAction += 1;
      this.$store.state.quMaterial.actionVisible = !1;
    },
  },
};
</script>
