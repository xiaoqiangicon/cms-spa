<template>
  <el-dialog
    v-loading="loading"
    title="详情"
    :visible.sync="sVisible"
    width="500"
    top="50px"
    :before-close="
      () => {
        sVisible = false;
      }
    "
  >
    <div class="panel">
      <div class="head">
        反馈内容
      </div>
      <div class="mg-t-10">
        <div class="mg-b-10">
          <div class="mg-b-10">
            图片：
          </div>
          <Upload :images="detail.images" :multiple="true" />
        </div>
        <div class="mg-b-10">
          <div class="mg-b-10">
            备注
          </div>
          <el-input
            v-model="detail.remark"
            placeholder="请输入备注内容，非必填"
          />
        </div>
        <div>
          <div class="mg-b-10">
            产品
          </div>
          <el-input
            v-model="detail.productNum"
            placeholder="产品编号（如：慈光101010）必填"
          />
        </div>
      </div>
      <div class="foot mg-t-10">
        <el-button type="primary" size="small" @click="save">
          {{ curTable === 'tableNot' ? '设为已处理' : '保存' }}
        </el-button>
      </div>
    </div>
    <div class="panel">
      <div class="head">
        订单信息
      </div>
      <div>
        <div class="row title">
          <div>用户信息</div>
          <div>功德芳名</div>
          <div>电话号码</div>
          <div>数值</div>
        </div>
        <div v-for="item in detail.userInfo" :key="item.userId" class="row">
          <div>
            {{ item.nickname }}
            <br />
            ID：{{ item.userId }}
          </div>
          <div>{{ item.name }}</div>
          <div>{{ item.tel }}</div>
          <div>{{ item.num }}</div>
        </div>
        <div class="row foot">
          <div>用户数：{{ detail.userInfo ? detail.userInfo.length : '' }}</div>
          <div />
          <div />
          <div>
            {{
              detail.userInfo
                ? detail.userInfo.reduce(
                    (prev, cur) => {
                      return { num: prev.num + cur.num };
                    },
                    { num: 0 }
                  ).num
                : ''
            }}
          </div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="head">
        订单详情
      </div>
      <div class="mg-t-10">
        <div>{{ detail.title }}</div>
        <div>{{ detail.subtitle }}</div>
        <div>订单号码：{{ detail.id }}</div>
        <div>生成时间：{{ detail.addTime }}</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import seeFetch from 'see-fetch';
import './fetch';
import { Notification } from 'element-ui';
import Upload from 'com/upload/Upload'; // eslint-disable-line import/no-unresolved

export default {
  components: {
    Upload,
  },
  props: {
    visible: Boolean,
    curTable: {
      type: String,
      default: 'TableNot',
    },
    detail: {
      type: Object,
      default: () => ({
        id: '',
        images: [],
        remark: '',
        productNum: '',

        userInfo: [],
        title: '',
        subtitle: '',
        orderNum: '',
        addTime: '',
      }),
    },
  },
  data() {
    return {
      loading: !1,
      sVisible: this.visible,
    };
  },
  watch: {
    visible(val) {
      this.sVisible = val;
    },
    sVisible(val) {
      this.$emit('updateVisible', val);
    },
  },
  methods: {
    save() {
      const { id, images, remark, productNum } = this.detail;

      this.loading = !0;
      seeFetch('promo/ci/list/handle', { id, images, remark, productNum }).then(
        res => {
          if (!res.success) {
            Notification({
              type: 'error',
              title: '提示',
              message: res.message,
            });
            return;
          }

          Notification({
            title: '提示',
            type: 'success',
            message: '保存成功',
          });
          this.$emit('updateVisible', !1);
          this.loading = !1;
          this.$emit('success');
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.panel {
  .head {
    font-size: 18px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
  }
  .foot {
    text-align: center;
  }
}

.row {
  display: flex;
  padding: 10px 0;
  &.title {
    border-bottom: 1px solid #ddd;
  }
  &.foot {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: #ecf8ff;
  }
  > div {
    text-align: center;
    flex: 1;
  }
}
</style>
