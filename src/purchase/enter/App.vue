<template>
  <div class="contain">
    <el-card>
      <el-button class="add" type="primary" @click="add">添加</el-button>
      <el-table v-loading="loading" :data="list" style="width: 100%">
        <el-table-column prop="id" label="ID" :align="'center'" />
        <el-table-column label="物流单号" :align="'center'" width="120">
          <template slot-scope="scope">
            <div>{{ scope.row.expressName }}</div>
            <div>{{ scope.row.expressNo }}</div>
            <div
              :class="{
                'light-btn': scope.row.expressStatus === 0,
                'del-btn': scope.row.expressStatus !== 0,
              }"
            >
              {{ scope.row.expressStatusText }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="收件单位信息" :align="'center'" width="140">
          <template slot-scope="scope">
            <div
              :class="{
                'light-btn': scope.row.templeId > 0,
                'del-btn': scope.row.templeId <= 0,
              }"
            >
              {{ scope.row.registerTempleTest }}
            </div>
            <div>{{ scope.row.templeName }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="receiverName"
          label="收件信息"
          :align="'center'"
        />
        <el-table-column
          prop="receiverPhone"
          label="收件电话"
          :align="'center'"
        />
        <el-table-column
          prop="receiverAddress"
          label="收件地址"
          :align="'center'"
        />
        <el-table-column label="采购渠道" :align="'center'" width="140">
          <template slot-scope="scope">
            <div>{{ scope.row.platform }}</div>
            <div>{{ scope.row.platformOrderNo }}</div>
          </template>
        </el-table-column>
        <el-table-column label="明细" :align="'center'" width="140">
          <template slot-scope="scope">
            <div v-for="(item, key) in scope.row.purchasingList" :key="key">
              物品({{ key + 1 }})：{{ item.name }}；数量：{{ item.num
              }}{{ item.unit }}；采购金额：{{ item.money }}元
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" :align="'center'" width="160">
          <template slot-scope="scope">
            <div class="btn-top">
              <span class="detail light-btn btn" @click="edit(scope.row)"
                >编辑</span
              >
              <span class="del light-btn btn" @click="del(scope.row)"
                >删除</span
              >
            </div>
            <div>
              <span
                class="light-btn detail btn"
                v-if="scope.row.expressStatus"
                @click="update(scope.row)"
                >更新物流状态</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%">
      <div class="express">
        <p class="row-title" style="margin-top: 0;">物流单号</p>
        <div class="express-info">
          <el-input
            style="width: 80%"
            type="input"
            v-model="form.expressNo"
            @blur="checkExpress"
          ></el-input>
          <span>{{ form.expressName }}</span>
        </div>
        <div class="express-status">
          <div>
            <el-radio v-model="form.isFinish" :label="1">更新物流状态</el-radio>
            <el-radio v-model="form.isFinish" :label="0"
              >不更新物流状态</el-radio
            >
          </div>
          <p class="express-tips">是否检查物流签收状态</p>
        </div>
      </div>
      <div class="post-info">
        <p class="row-title">收件人单位</p>
        <div class="temple-status">
          <el-radio-group v-model="form.templeType" @change="changeTempleType">
            <el-radio :label="1">入驻寺院</el-radio>
            <el-radio :label="2">未入驻寺院</el-radio>
            <el-radio :label="3">执行用途</el-radio>
          </el-radio-group>
        </div>
        <el-input
          v-if="form.templeType === 3"
          v-model="form.usePlace"
          placeholder="请填写执行项目的用途"
        ></el-input>
        <el-input
          v-if="form.templeType === 2"
          v-model="form.templeName"
          placeholder="请填写未入驻寺院名称"
        ></el-input>
        <el-select
          v-model="templeInfo"
          placeholder="请选择"
          style="width: 40%"
          v-if="form.templeType === 1"
          filterable
          @change="changeTemple"
          value-key="id"
        >
          <el-option
            v-for="item in templeList"
            :key="item.id"
            :label="item.id + ' - ' + item.temple_name"
            :value="item"
          />
        </el-select>
        <div class="consignee-info" v-if="form.templeType !== 3">
          <div class="consignee-top">
            <div class="consignee-row">
              <p class="consignee-row-title">收件人姓名</p>
              <el-input v-model="form.receiverName"></el-input>
            </div>
            <div class="consignee-row">
              <p class="consignee-row-title">收件人电话</p>
              <el-input v-model="form.receiverPhone" type="number"></el-input>
            </div>
          </div>
          <div class="consignee-row">
            <p class="consignee-row-title">收件人地址</p>
            <el-input v-model="form.receiverAddress"></el-input>
          </div>
        </div>
      </div>
      <div class="">
        <p class="row-title">物品明细</p>
        <div>
          <el-input
            placeholder="请填写当前平台对应的订单号码"
            v-model="form.platformOrderNo"
            class="input-with-select"
            style="width: 408px;"
            type="number"
          >
            <el-select
              slot="prepend"
              v-model="form.platform"
              placeholder="请选择采购平台"
              style="width: 120px;"
            >
              <el-option
                v-for="item in platform"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-input>
          <div
            clas="purchase"
            v-for="(item, key) in form.purchasingList"
            :key="key"
          >
            <el-input
              class="purchase-item"
              v-model="item.name"
              style="width: 40%"
              placeholder="物品名称"
            ></el-input>
            <el-input
              class="purchase-item"
              v-model="item.money"
              style="width: 18%"
              placeholder="金额(元)"
              type="number"
            ></el-input
            ><span>元</span>
            <el-input
              class="purchase-item"
              v-model="item.num"
              style="width: 18%"
              placeholder="数量"
              type="number"
            ></el-input>
            <el-select
              v-model="item.unit"
              placeholder="请选择"
              style="width: 16%"
              filterable
            >
              <el-option
                v-for="item in unit"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <el-button class="add-purchase" type="primary" @click="addPurchase"
            >添加物品</el-button
          >
        </div>
      </div>
      <p class="dialog-tips">
        温馨提示：相同物流单号物品支持可添加多个物品；如有其他快递费、保价费等关联此物流单号的支出请使“添加其他费用”。
      </p>
      <el-button class="save-dialog" type="primary" @click="saveDialog"
        >保存</el-button
      >
    </el-dialog>
    <div class="fixed">
      <p class="">总计物品数量：{{ totalItem }}（件）</p>
      <p class="">总计采购金额：{{ totalMoney }}（元）</p>
    </div>
  </div>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

export default {
  name: 'APP',
  data() {
    return {
      loading: !0,
      list: [],
      id: '',
      dialogVisible: !1,
      form: {
        id: 0,
        purchasing_id: '',
        expressNo: '',
        expressName: '',
        comCode: '',
        isFinish: 0,
        templeType: 1,
        templeId: '',
        templeName: '',
        usePlace: '',
        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        platform: '',
        platformOrderNo: '',
        purchasingList: [],
      },
      templeList: [],
      templeInfo: '',
      platform: ['淘宝', '京东', '1688', '拼多多', '其他'],
      unit: [
        '个',
        '件',
        '盒',
        '条',
        '台',
        '只',
        '支',
        '双',
        '架',
        '束',
        '瓶',
        '本',
        '面',
        '片',
        '张',
        '枚',
        '袋',
        '包',
        '株',
        '场',
        '顶',
        '项',
        '套',
        '盏',
        '篇',
        '副',
        '节',
        '幅',
        '份',
        '粒',
        '颗',
        '串',
      ],
      totalItem: 0,
      totalMoney: 0,
    };
  },
  created() {
    this.id = parseInt(this.$route.params.id, 10);
    this.form.purchasing_id = this.id;
    this.fetchList();
    this.getTempleList();
  },
  watch: {
    dialogVisible(newVal) {
      if (!newVal) {
        this.form = {
          id: 0,
          purchasing_id: '',
          expressNo: '',
          expressName: '',
          comCode: '',
          isFinish: 0,
          templeType: 1,
          templeId: '',
          templeName: '',
          usePlace: '',
          receiverName: '',
          receiverPhone: '',
          receiverAddress: '',
          platform: '',
          platformOrderNo: '',
          purchasingList: [],
        };
        this.form.purchasing_id = this.id;
        this.templeInfo = '';
      }
    },
  },
  methods: {
    fetchList() {
      const { id } = this;

      seeFetch('purchase/enter/getContent', {
        id,
      }).then(res => {
        if (res.errorCode === 0) {
          this.list = res.data.list;
          this.totalMoney = res.data.totalMoney / 100;
          this.totalItem = res.data.totalItem;
        } else {
          this.showError(res.msg);
        }
        this.loading = !1;
      });
    },
    getTempleList() {
      seeFetch('purchase/enter/getTempleList', {}).then(res => {
        if (res.errorCode === 0) {
          this.templeList = res.data;
        } else {
          this.showError(res.msg);
        }
      });
    },
    add() {
      this.dialogVisible = !0;
    },
    edit(row) {
      this.dialogVisible = !0;
      this.templeInfo = { id: row.templeId, temple_name: row.templeName };
      if (row.usePlace) {
        row.templeType = 3;
      } else {
        row.templeType = row.templeId > 0 ? 1 : 2;
      }
      row.isFinish = row.expressStatus === 0 ? 1 : 0;
      this.form = JSON.parse(JSON.stringify(row));
    },
    del(row) {
      this.$confirm(`确定要删除吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('purchase/enter/delContent', { id: row.id }).then(res => {
          if (res.errorCode === 0) {
            this.showSuccess('删除成功');
            this.fetchList();
          } else {
            this.showError(res.msg);
          }
        });
      });
    },
    update(row) {
      this.$confirm(`若确认已签收，请点击更新`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('purchase/enter/checkContent', { id: row.id }).then(res => {
          if (res.errorCode === 0) {
            this.showSuccess('更新成功');
            this.fetchList();
          } else {
            this.showError(res.msg);
          }
        });
      });
    },
    checkExpress() {
      if (!this.form.expressNo) return;

      seeFetch('purchase/enter/checkExpressNo', {
        expressNo: this.form.expressNo,
      }).then(res => {
        if (res.errorCode === 0) {
          this.form.expressName = res.data.name;
          this.form.comCode = res.data.comCode;
        } else {
          this.showError(res.msg);
        }
      });
    },
    changeTempleType() {
      this.form.templeName = '';
      this.form.templeId = '';
      this.templeInfo = '';
    },
    changeTemple(templeInfo) {
      this.form.templeName = templeInfo.temple_name;
      this.form.templeId = templeInfo.id;
    },
    addPurchase() {
      this.form.purchasingList.push({
        name: '',
        money: '',
        num: '',
        unit: '',
      });
    },
    validate() {
      if (!this.form.expressNo) {
        return '请填写物流单号';
      }
      if (this.form.templeType === 3 && !this.form.usePlace) {
        return '请填写使用用途';
      }
      if (!this.form.platform || !this.form.platformOrderNo) {
        return '请填写采购平台及单号';
      }
      if (
        this.form.templeType !== 3 &&
        (!this.form.templeName ||
          !this.form.receiverName ||
          !this.form.receiverPhone ||
          !this.form.receiverAddress)
      ) {
        return '请填写收获信息';
      }

      return '';
    },
    saveDialog() {
      let validateText = this.validate();
      if (validateText) {
        this.showError(validateText);
        return;
      }
      if (this.form.templeType === 2) {
        this.form.templeId = 0;
      }
      seeFetch('purchase/enter/editContent', this.form).then(res => {
        if (res.errorCode === 0) {
          this.dialogVisible = !1;
          this.showSuccess('保存成功');
          this.fetchList();
        } else {
          this.showError(res.msg);
        }
      });
    },
    pageChange(page) {
      this.pageNo = page;
      this.fetchList();
    },
    showSuccess(msg) {
      Notification({
        title: '提示',
        type: 'success',
        message: msg || '更改成功',
      });
    },
    showError(msg) {
      Notification({
        title: '提示',
        type: 'error',
        message: msg || '接口出错啦~',
      });
    },
  },
};
</script>

<style>
.el-dialog__body {
  padding-top: 16px !important;
}
</style>

<style lang="less" scoped>
.contain {
  padding: 20px;
}
p {
  margin: 0;
}
.add {
  float: right;
  width: 100px;
  margin: 10px 0 20px 0;
}
.btn {
  display: block;
  cursor: pointer;
  margin: 0 auto;
}
.light-btn {
  display: inline-block;
  padding: 0px 6px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 18px;
  background-color: #f2f8fe;
  color: #73bbff;
  border: 1px solid #73bbff;
}
.del {
  display: block;
  width: 60px;
  margin: 10px auto;
  background-color: #fef7ef;
  border: 1px solid #f9be72;
  color: #f9be72;
}
.del-btn {
  display: inline-block;
  padding: 0px 6px;
  background-color: #fef7ef;
  border: 1px solid #f9be72;
  color: #f9be72;
  border-radius: 12px;
}
.row-title {
  margin-bottom: 6px;
  margin-top: 15px;
  font-weight: bold;
}
.purchase {
  display: flex;
}
.express-status {
  margin-top: 8px;
}
.express-tips {
  margin-top: 5px;
  color: #999;
}
.temple-status {
  margin-bottom: 8px;
}
.consignee-top {
  display: flex;
  justify-content: space-between;
  div {
    flex: 1;
  }
}
.consignee-row {
  margin-top: 10px;
}
.consignee-row-title {
  margin-bottom: 5px;
}
.purchase-item {
  margin-top: 10px;
}
.add-purchase {
  margin-top: 10px;
}
.dialog-tips {
  margin-top: 16px;
  padding: 4px 16px;
  background-color: #f2f8fe;
  color: #73bbff;
  border: 1px solid #73bbff;
  border-radius: 8px;
}
.save-dialog {
  display: block;
  width: 40%;
  margin: 16px auto 0;
  border-radius: 20px;
}

.fixed {
  width: 100%;
  padding: 16px 40px;
  margin: 50px auto 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  background-color: #fff;
}
</style>
