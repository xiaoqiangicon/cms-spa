<template>
  <el-dialog
    :visible="editVisible"
    :title="isNew ? '添加' : '编辑'"
    :before-close="clickCancel"
    width="540px"
  >
    <div class="input-block">
      <span>任务名称：</span>
      <input v-model="mission" class="input-txt" type="text" />
    </div>
    <div class="input-block">
      <div class="search-box">
        <span>目标寺院：</span>
        <el-select
          v-model.number="templeId"
          width="300"
          placeholder="请选择寺院"
          filterable
          :disabled="!isNew"
        >
          <el-option :key="0" label="全部" :value="0" />
          <el-option
            v-for="item in templeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
    </div>
    <div class="input-block">
      <span>积分：</span>
      <el-select
        v-model.number="status"
        size="small"
        width="100"
        placeholder="请选择寺院"
        filterable
        :disabled="!isNew"
      >
        <el-option
          v-for="item in operateList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <input v-model="coin" :disabled="!isNew" class="input-coin" type="text" />
      <span class="coin-span">元</span>
    </div>
    <div class="save-block">
      <button class="save" @click="save">
        保存
      </button>
    </div>
  </el-dialog>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

const computedProps = {};

['editVisible'].forEach(name => {
  computedProps[name] = {
    get() {
      return this.$store.state.buddhistIntegrate[name];
    },
    set(value) {
      this.$store.state.buddhistIntegrate[name] = value;
    },
  };
});

export default {
  name: 'Edit',
  props: {
    item: {
      required: !1,
      default: () => ({}),
    },
    templeList: {
      required: !0,
    },
    isNew: {
      required: !0,
    },
  },
  data() {
    return {
      templeId: 0,
      mission: '',
      status: 0,
      coin: 0,
      operateList: [
        {
          name: '增加',
          id: 0,
        },
        {
          name: '减少',
          id: 1,
        },
      ],
    };
  },
  computed: {
    ...computedProps,
  },
  watch: {
    item: {
      handler(newValue, oldValue) {
        if (this.isNew) return;
        this.coin = newValue.coin;
        if (this.coin > 0) {
          this.status = 0;
        } else {
          this.status = 1;
          this.coin = Math.abs(newValue.coin);
        }
        this.mission = newValue.mission;
        this.templeId = newValue.templeId;
      },
      deep: true,
    },
    editVisible(newValue, oldValue) {
      if (!newValue) {
        this.mission = '';
        this.status = 0;
        this.coin = 0;
        this.templeId = 0;
      }
    },
  },
  methods: {
    clickCancel() {
      this.$store.state.buddhistIntegrate.editVisible = !1;
    },
    save() {
      if (this.isNew) {
        if (!this.mission) {
          Notification({
            title: `请填写任务名称`,
            type: 'warning',
          });
          return;
        }
        if (this.templeId === 0) {
          Notification({
            title: `请选择寺院`,
            type: 'warning',
          });
          return;
        }
        if (this.coin <= 0) {
          Notification({
            title: `请输入正确的积分数量`,
            type: 'warning',
          });
          return;
        }
        seeFetch('buddhist/integrate/insertMission', {
          templeId: this.templeId,
          coin:
            this.status == 0
              ? parseInt(this.coin, 10)
              : -parseInt(this.coin, 10),
          mission: this.mission,
        }).then(res => {
          if (res.errorCode == -1) {
            Notification({
              title: `${res.msg}`,
              type: 'warning',
            });
            return;
          }
          if (!res.success) return;

          this.$store.state.buddhistIntegrate.editVisible = !1;

          window.location.reload();
        });
      } else {
        seeFetch('buddhist/integrate/editMission', {
          id: this.item.id,
          mission: this.mission,
        }).then(res => {
          if (res.errorCode == -1) {
            Notification({
              title: `${res.msg}`,
              type: 'warning',
            });
            return;
          }
          this.$store.state.buddhistIntegrate.editVisible = !1;

          window.location.reload();
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.input-block {
  margin-bottom: 20px;
  span {
    display: inline-block;
    width: 70px;
    text-align: right;
  }
  .coin-span {
    display: inline;
  }
}
.input-txt {
  width: 300px;
  height: 30px;
  padding-left: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
}
.input-coin {
  width: 60px;
  height: 30px;
  padding-left: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
}

.save-block {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.save {
  display: inline-block;
  width: 100px;
  height: 36px;
  margin: 0 auto;
  border: none;
  border-radius: 6px;
  outline: none;
  background-color: #409eff;
  color: white;
  cursor: pointer;
}
</style>
