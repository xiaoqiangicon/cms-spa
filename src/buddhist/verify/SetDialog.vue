<template>
  <el-dialog title="设置" :visible.sync="setDialog">
    <el-tabs type="border-card">
      <el-tab-pane label="佛事运营">
        <div class="tabs">
          <div class="row">
            <span class="row-left">是否对外公开</span>
            <el-select v-model="isPrivate">
              <el-option :value="0" label="公开"></el-option>
              <el-option :value="1" label="不公开"></el-option>
            </el-select>
          </div>
          <div class="tips">
            用于领取奖品、活动策略的佛事<br />
            控制1.APP祈福列表 2.我的善缘再结善缘是否展示
          </div>
          <div class="row" v-if="isPrivate === 0">
            <span class="row-left">祈福列表跳转</span>
            <el-input v-model="opUrl"></el-input>
          </div>
          <div class="tips" v-if="isPrivate === 0">
            若在APP祈福列表中希望用户点击可跳转到活动落地页，<br />
            请在此处填写活动落地页的地址，默认为空不修改跳转。
          </div>
          <div class="row">
            <span class="row-left">适用环境选择</span>
            <el-select v-model="isOnlyChanzai">
              <el-option :value="0" label="全平台"></el-option>
              <el-option :value="1" label="只在APP"></el-option>
              <el-option :value="2" label="只在SAAS"></el-option>
            </el-select>
          </div>
          <div class="tips">
            用于控制当前佛事在APP环境是否可以对外分享，默认可分享。
          </div>
          <div class="row">
            <span class="row-left">限制新/旧用户访问：</span>
            <el-select v-model="userAllowType">
              <el-option :value="0" label="不限制"></el-option>
              <el-option :value="1" label="新用户不能访问"></el-option>
              <el-option :value="2" label="老用户不能访问"></el-option>
            </el-select>
          </div>
          <div class="tips">
            新用户 ：APP注册时间小于3个自然日，老用户：APP注册时间大于3个自然日
          </div>
          <div class="row">
            <span class="row-left">绑定用户群：</span>
            <el-select v-model="userGroupId">
              <el-option :value="0" label="全部用户"></el-option>
              <el-option
                v-for="(item, key) in ruleList"
                :label="item.name"
                :value="item.id"
                :key="key"
              ></el-option>
            </el-select>
          </div>
          <div class="tips">只能绑定的用户群才能打开该佛事</div>
          <div class="row">
            <span class="row-left">分享小图：</span>
            <Upload :images="images" :multiple="!1" />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="提现设置">
        <div class="tips">
          可控制当前佛事的规格是否给寺院进行结算补贴手续费：<br />
          1.若标记了“不补贴”则SaaS端和小程序端不能对该规格进行删除操作。<br />
          2.不进行补贴的规格订单，转单并处理之后，第二天就能提取结算。
        </div>
        <el-table :data="subList">
          <el-table-column prop="name" label="规格名称" />
          <el-table-column label="价格" :align="'center'">
            <template slot-scope="scope">
              <div>
                {{ scope.row.price !== -1 ? scope.row.price : '随喜' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="限制提现" :align="'center'">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isHandlingFee"
                :active-value="0"
                :inactive-value="1"
              ></el-switch>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="分成设置">
        <div class="tips">
          可设置每个佛事订单与法师的分成<br />
          接单价格为法师接单可拿到的金额<br />
          转单佛事不可设置分成
        </div>
        <el-table :data="subList">
          <el-table-column prop="name" label="规格名称" />
          <el-table-column label="原价" :align="'center'">
            <template slot-scope="scope">
              <div>
                {{ scope.row.price !== -1 ? scope.row.price : '随喜' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="接单价格" :align="'center'">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.wishOrderMoney"
                :disabled="scope.row.price < 0"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="处理要求" :align="'center'">
            <template slot-scope="scope">
              <el-input v-model="scope.row.blessWishPrompt"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="创作者推广设置">
        <div class="tips">
          创作者包括但不限于：短视频、自在说等创作者(大V、KOL)<br />
          设置当前的分成比例可将项目标记为创作者推广项目，用于创作者在发布短视频等内容时可关联系统的项目。用户从内容进入关联项目后产生的金额将会按以下比例对创作者分成。（随喜类型规格除外）
        </div>
        <el-table :data="subdivideList">
          <el-table-column prop="name" label="规格名称" />
          <el-table-column label="原价" :align="'center'">
            <template slot-scope="scope">
              <div>
                {{ scope.row.price !== -1 ? scope.row.price : '随喜' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="分成金额" :align="'center'">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.promotionMoney"
                :disabled="scope.row.price < 0"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-button type="primary" class="save" @click="save" v-loading="isSaving"
      >保存</el-button
    >
  </el-dialog>
</template>

<script>
import Upload from '../../com/upload/Upload';
import { setProps } from './data';
import seeFetch from 'see-fetch';
import { Promise } from 'q';
const computedProps = {};

setProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.buddhistVerify.set[name];
      },
      set(value) {
        this.$store.state.buddhistVerify.set[name] = value;
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.buddhistVerify.set[name];
    };
  }
});

export default {
  name: 'SetDialog',
  components: {
    Upload,
  },
  data() {
    return {
      ruleList: [],
      images: [],
      subdivideList: [],
      isSaving: false,
    };
  },
  created() {
    seeFetch('/buddhist/verify/opruleList', {}).then(res => {
      if (res.success) {
        this.ruleList = res.data;
      }
    });
  },
  watch: {
    setDialog(newVal) {
      if (newVal) {
        seeFetch('/buddhist/verify/commoditySubdivideList', {
          commodityId: this.id,
        }).then(res => {
          if (res.success) {
            this.subdivideList = res.data;
          }
        });
      }
    },
  },
  computed: {
    ...computedProps,
  },
  components: {
    Upload,
  },
  methods: {
    async save() {
      if (this.isSaving) return;
      this.isSaving = true;
      // 佛事运营
      let p1 = await seeFetch('/buddhist/verify/setIsPrivate', {
        commodityId: this.id,
        isOnlyChanzai: this.isOnlyChanzai,
        isPrivate: this.isPrivate,
        opUrl: this.isPrivate ? '' : this.opUrl,
        sharePic: this.images[0] || '',
        userAllowType: this.userAllowType,
        userGroupId: this.userGroupId,
      });

      // 创作者推广设置
      let parameter = [];
      this.subdivideList.forEach(item => {
        let subItem = {};
        subItem.promotionMoney = item.price < 0 ? 0 : item.promotionMoney;
        subItem.subdivideId = item.id;
        parameter.push(subItem);
      });
      console.log(parameter, 'parameter', this.subdivideList);
      let p2 = await seeFetch('/buddhist/verify/updatePromotionSubdivide', {
        parameter,
      });

      // 提现设置
      let unLimitSub = this.subList.filter(item => item.isHandlingFee);
      let subIdList = '';
      unLimitSub.forEach(item => {
        subIdList = subIdList + item.id + ',';
      });
      console.log(unLimitSub, 'unLimitSub', subIdList);
      let p3 = await seeFetch('/buddhist/verify/updateHandlingFee', {
        commodityId: this.id,
        subList: subIdList,
      });

      // 分成设置
      let subList = [];
      this.subList.forEach(item => {
        let subItem = {};
        subItem.subId = item.id + '';
        subItem.money = item.wishOrderMoney || 0;
        subItem.blessWishPrompt = item.blessWishPrompt || '';
        subList.push(subItem);
      });

      seeFetch('/buddhist/verify/addAndUpdateSubdividePercent', {
        commodityId: this.id,
        subList,
      }).then(res => {
        if (res.success && p1.success && p2.success && p3.success) {
          this.setDialog = !1;
          this.isSaving = false;
          this.showMsg('更新成功');
        }
      });
    },
    showMsg(msg, type) {
      Notification({
        title: '提示',
        type: type || 'success',
        message: msg,
      });
    },
  },
};
</script>

<style scoped>
>>> .el-dialog__header {
  text-align: center;
  background: #65cea7;
}
>>> .el-dialog__title {
  color: #fff;
}
>>> .el-dialog__body {
  padding: 0 0 20px 0 !important;
}
>>> .el-tabs__nav {
  width: 100%;
}
>>> .el-tabs__item {
  width: 25%;
  box-sizing: border-box;
  text-align: center;
}
>>> .el-tabs__content {
  padding: 30px 40px 20px;
}
>>> .el-dialog__body .el-tabs--border-card {
  box-shadow: none;
  border: none;
}
</style>

<style lang="less" scoped>
.row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.row-left {
  display: inline-block;
  flex-shrink: 0;
  width: 190px;
}
.tips {
  margin-bottom: 10px;
  border: 1px solid #b7eb8f;
  background-color: #f6ffed;
  border-radius: 4px;
  padding: 10px;
  overflow: hidden;
}
.save {
  display: flex;
  margin: 0 auto;
}
</style>
