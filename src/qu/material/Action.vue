<template>
  <el-dialog
    :visible="actionVisible"
    title="选择操作"
    :before-close="clickCancel"
    width="200px"
  >
    <div class="t-a-center">
      <el-button @click="go(ACTION_EDIT)">
        编辑
      </el-button>
    </div>
    <div class="t-a-center mg-t-10">
      <el-button @click="go(ACTION_INSERT_TEXT_BEFORE)">
        向前插入文字
      </el-button>
    </div>
    <div class="t-a-center mg-t-10">
      <el-button @click="go(ACTION_INSERT_IMAGE_BEFORE)">
        向前插入图片
      </el-button>
    </div>
    <div class="t-a-center mg-t-10">
      <el-button @click="go(ACTION_INSERT_TEXT_AFTER)">
        向后插入文字
      </el-button>
    </div>
    <div class="t-a-center mg-t-10">
      <el-button @click="go(ACTION_INSERT_IMAGE_AFTER)">
        向后插入图片
      </el-button>
    </div>
    <div class="t-a-center mg-t-10">
      <el-button @click="go(ACTION_CROP_IMAGE)">
        裁剪图片
      </el-button>
    </div>
    <div class="t-a-center mg-t-10">
      <el-button @click="go(ACTION_DELETE)">
        删除
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  ACTION_EDIT,
  ACTION_DELETE,
  ACTION_INSERT_TEXT_BEFORE,
  ACTION_INSERT_TEXT_AFTER,
  ACTION_INSERT_IMAGE_BEFORE,
  ACTION_INSERT_IMAGE_AFTER,
  ACTION_CROP_IMAGE,
} from './constant';

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
  data() {
    return {
      ACTION_EDIT,
      ACTION_DELETE,
      ACTION_INSERT_TEXT_BEFORE,
      ACTION_INSERT_TEXT_AFTER,
      ACTION_INSERT_IMAGE_BEFORE,
      ACTION_INSERT_IMAGE_AFTER,
      ACTION_CROP_IMAGE,
    };
  },
  computed: {
    ...computedProps,
  },
  methods: {
    clickCancel() {
      this.$store.state.quMaterial.actionVisible = !1;
    },
    go(action) {
      this.$store.state.quMaterial.action = action;
      this.$store.state.quMaterial.actionSelected += 1;
      this.$store.state.quMaterial.actionVisible = !1;
    },
  },
};
</script>
