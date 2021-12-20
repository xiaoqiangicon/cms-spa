<template>
  <div class="contain">
    <el-card>
      <div class="filter">
        <el-button
          :class="{ 'filter-active': status === 1 }"
          @click="changeStatus(1)"
          >未审核</el-button
        >
        <el-button
          :class="{ 'filter-active': status === 0 }"
          @click="changeStatus(0)"
          >已审核</el-button
        >
        <el-button
          :class="{ 'filter-active': status === 2 }"
          @click="changeStatus(2)"
          >未通过</el-button
        >
      </div>
      <div
        style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 20px;"
      >
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="onChangeDatePicker"
        />
        <div style="display: flex;align-items: center;">
          <span style="display: inline-block; width: 100px;">佛事名搜索</span>
          <el-input placeholder="请输入佛事名" v-model="content"></el-input>
        </div>
      </div>

      <el-table v-loading="loading" :data="list">
        <el-table-column
          min-width="60px"
          prop="id"
          label="ID"
          :align="'center'"
        />
        <el-table-column
          min-width="60px"
          prop="name"
          label="寺院名称"
          :align="'center'"
        />
        <el-table-column
          min-width="60px"
          prop="registrant"
          label="联系人"
          :align="'center'"
        />
        <el-table-column
          min-width="60px"
          prop="mobile"
          label="联系电话"
          :align="'center'"
        />
        <el-table-column
          min-width="60px"
          prop="district"
          label="地区"
          :align="'center'"
        />
        <el-table-column
          min-width="60px"
          prop="addTime"
          label="提交时间"
          :align="'center'"
        />
        <el-table-column
          min-width="60px"
          prop="statusText"
          label="审核状态"
          :align="'center'"
        />
        <el-table-column
          min-width="60px"
          prop="postText"
          label="邮寄资料"
          :align="'center'"
        />
        <el-table-column
          min-width="60px"
          prop="updateTime"
          label="审核时间"
          :align="'center'"
        />
        <el-table-column
          min-width="60px"
          prop="auditor"
          label="审核人"
          :align="'center'"
        />
        <el-table-column label="操作" width="60px">
          <template slot-scope="scope">
            <span class="detail" @click="showDetail(scope.row)">详情</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        :current-page="pageNo"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        style="margin-top: 40px"
        @current-change="pageChange"
      />
    </el-card>

    <el-dialog title="详情" :visible.sync="dialogVisible">
      <el-tabs v-model="activeName">
        <el-tab-pane label="资料信息" name="detail">
          <div class="detail-item">
            <span>寺院名称：</span><span>{{ detail.name }}</span>
          </div>
          <hr />
          <div class="detail-item">
            <span>活动场地编号：</span><span>{{ detail.placeNo }}</span>
          </div>
          <hr />
          <div class="detail-item">
            <span>省份：</span><span>{{ detail.province }}</span>
          </div>
          <hr />
          <div class="detail-item">
            <span>城市：</span><span>{{ detail.city }}</span>
          </div>
          <hr />
          <div class="detail-item">
            <span>详细地址：</span><span>{{ detail.address }}</span>
          </div>
          <hr />
          <div class="detail-item">
            <span>寺院法人：</span><span>{{ detail.corporation }}</span>
          </div>
          <hr />
          <div class="detail-item">
            <span>手机号码：</span><span>{{ detail.name }}</span>
          </div>
          <hr />
          <div class="detail-item">
            <span>注册人：</span
            ><span data-ele="registrant">{{ detail.name }}</span>
          </div>
          <hr />
          <div class="detail-item">
            <span>手机号码：</span
            ><span data-ele="registrant-mobile">{{ detail.name }}</span>
          </div>
          <hr />
          <div class="detail-item">
            <span>寺院来源：</span
            ><span data-ele="source">{{ detail.name }}</span>
          </div>
          <hr />
        </el-tab-pane>
        <el-tab-pane label="认证资料" name="certificate">
          <div>
            <p>1.邮寄资料是否确认签收</p>
            <div>
              <el-radio v-model="detail.sendData" :label="1"
                >已确认邮寄</el-radio
              >
              <el-radio v-model="detail.sendData" :label="0">未邮寄</el-radio>
            </div>
          </div>
          <div>
            <p>2.请检查照片资料</p>
          </div>
          <div class="upload-certificate">
            <div class="upload-item">
              <p class="upload-title">宗教活动场地登记证</p>
              <img
                v-if="!uploadRegister.length"
                class="upload-pic-empty"
                :src="emptyPic"
              />
              <Upload :images="uploadRegister" />
            </div>
            <div class="upload-item">
              <p class="upload-title">对公账户许可证</p>
              <img
                v-if="!uploadAccount.length"
                class="upload-pic-empty"
                :src="emptyPic"
              />
              <Upload :images="uploadAccount" />
            </div>
            <div class="upload-item">
              <p class="upload-title">寺院合作协议书</p>
              <img
                v-if="!uploadCooperate.length"
                class="upload-pic-empty"
                :src="emptyPic"
              />
              <Upload :images="uploadCooperate" />
            </div>
            <div class="upload-item">
              <p class="upload-title">寺院住持身份证</p>
              <img
                v-if="!uploadCard.length"
                class="upload-pic-empty"
                :src="emptyPic"
              />
              <Upload :images="uploadCard" />
            </div>
            <div class="upload-item">
              <p class="upload-title">其他</p>
              <img
                v-if="!uploadOther.length"
                class="upload-pic-empty"
                :src="emptyPic"
              />
              <Upload :images="uploadOther" />
            </div>
          </div>
          <el-button type="primary" class="save" @click="saveUpload"
            >保存</el-button
          >
        </el-tab-pane>
        <el-tab-pane label="操作" name="modify">
          <div>
            <span>寺院通过审核标准</span>
          </div>
          <hr />
          <div>
            <p>1.已经确定邮寄资料就好</p>
            <p>2.照片资料《活动场地登记证》《银行对公账户证明》有就好</p>
            <p>3.基本信息资料与证件资料相符合就好</p>
          </div>
          <hr />
          <div>
            <el-checkbox-group v-model="detail.rightList">
              <el-checkbox
                v-for="item in rightList"
                :label="item.key"
                :key="item.key"
                >{{ item.name }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
          <hr />
          <div>
            <el-select v-model="detail.status">
              <el-option :value="0" label="通过审核"></el-option>
              <el-option :value="1" label="审核中"></el-option>
              <el-option :value="2" label="不通过审核"></el-option>
            </el-select>
            <el-select v-model="detail.placeType" placeholder="请选择类型">
              <el-option :value="1" label="寺院"></el-option>
              <el-option :value="2" label="道观"></el-option>
              <el-option :value="3" label="机构"></el-option>
            </el-select>
            <el-select v-model="detail.area" placeholder="请选择地区">
              <el-option
                :value="item"
                v-for="item in areaList"
                :label="item"
                :key="item"
              ></el-option>
            </el-select>
          </div>
          <el-button type="primary" class="save" @click="saveRight"
            >保存</el-button
          >
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import './fetch/index.js';
import Upload from '../../com/upload/Upload';
import { Notification } from 'element-ui';

export default {
  name: 'APP',
  data() {
    return {
      formatDate: [],
      date: ['', ''],
      content: '',
      loading: !0,
      total: 0,
      pageSize: 25,
      pageNo: 1,
      status: 1, // 1 未审核 0 已审核 2 未通过
      list: [],
      detail: {}, // 详情detail;
      dialogVisible: !1,
      activeName: 'detail',
      emptyPic:
        'http://imgs.zizaihome.com/a5b9e32f-d71f-460f-aa28-34b35876524a.jpg',
      uploadRegister: [],
      uploadCooperate: [],
      uploadCard: [],
      uploadAccount: [],
      uploadOther: [],
      checkList: [],
      rightList: [
        {
          name: '义工模块权限',
          key: 'pw_volunteer',
        },
        {
          name: '群发消息权限',
          key: 'pw_sendmsg',
        },
        {
          name: '佛事管理权限',
          key: 'pw_ceremony',
        },
        {
          name: '佛事订单权限',
          key: 'pw_order',
        },
        {
          name: '供佛墙管理权限',
          key: 'pw_buddha_wall',
        },
        {
          name: '供佛墙自录数据权限',
          key: 'pw_buddha_wall_record',
        },
        {
          name: '供佛墙订单权限',
          key: 'pw_buddha_wall_order',
        },
        {
          name: '寺院微站管理权限',
          key: 'pw_website',
        },
        {
          name: '客流模块权限',
          key: 'pw_guest_traffic',
        },
        {
          name: '功德主权限',
          key: 'pw_merit_rank',
        },
        {
          name: '文章模块权限',
          key: 'pw_article',
        },
        {
          name: '善款中心权限',
          key: 'pw_money_center',
        },
        {
          name: '功德机权限',
          key: 'pw_merit_machine',
        },
        {
          name: '禅在订单权限',
          key: 'pw_chanzai_order',
        },
        {
          name: '实景礼佛权限',
          key: 'pw_vr_devote',
        },
        {
          name: '寺院月报权限',
          key: 'pw_temple_monthly_report',
        },
        {
          name: '分销推广',
          key: 'pw_promotion',
        },
        {
          name: '自在云协同',
          key: 'pw_office',
        },
      ],
      areaList: [],
    };
  },
  components: {
    Upload,
  },
  created() {
    this.getList();
  },
  watch: {
    content() {
      this.getList();
    },
  },
  methods: {
    getList() {
      let { status, formatDate, content, pageNo, pageSize } = this;
      this.loading = !0;
      seeFetch('temple/verify/list', {
        status: status,
        startDate: formatDate[0],
        endDate: formatDate[1],
        name: content,
        pageNo,
        pageSize,
      }).then(res => {
        if (res.success) {
          this.list = res.data.list;
          this.total = res.data.total;
        }
        this.loading = !1;
      });
    },
    changeStatus(status) {
      this.status = status;
      this.loading = !0;
      this.getList();
    },
    onChangeDatePicker() {
      const { date } = this;
      this.currentPage = 1;

      if (date && date[0] && date[1]) {
        this.formatDate = date.map(item => this.formatTime(`${item}`));
      } else {
        this.formatDate = ['', ''];
      }
      this.getList();
    },
    formatTime(timeStr) {
      const date = new Date(timeStr);
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();

      return `${y}-${m >= 10 ? m : `0${m}`}-${d >= 10 ? d : `0${d}`}`;
    },
    showDetail(row) {
      seeFetch('/temple/verify/getArea', { refresh: 1 }).then(res => {
        if (res.errorCode === 0) {
          this.areaList = res.data.split(',');
        }
      });
      seeFetch('/temple/verfiy/detail', { id: row.id }).then(res => {
        if (res.errorCode === 0) {
          this.detail = res.data;
          console.log(res.data, 'detail');
          this.dialogVisible = !0;
        } else {
          Notification({
            title: '提示',
            type: 'error',
            message: res.msg,
          });
        }
      });
    },
    saveRight() {
      let { area, status, rightList, id, placeType } = this.detail;
      let params = {};
      params.area = area;
      params.status = status;
      params.id = id;
      params.placeType = placeType;
      // 先把所有权限置为0
      for (key in this.detail) {
        if (key.indexOf('pw_') > -1) {
          params[key] = 0;
        }
      }
      // 把选中的权限置为1
      rightList.forEach(right => {
        params[right] = 1;
      });
      seeFetch('/temple/verify/saveRights', params).then(res => {
        if (res.errorCode === 0) {
          this.dialogVisible = !1;
          Notification({
            title: '提示',
            type: 'success',
            message: `更改成功`,
          });
        } else {
          Notification({
            title: '提示',
            type: 'error',
            message: res.msg,
          });
        }
      });
    },
    pageChange(page) {
      this.pageNo = page;
      this.getList();
    },
    saveUpload() {
      let { id, sendData } = this.detail;
      let {
        uploadAccount,
        uploadOther,
        uploadCard,
        uploadCooperate,
        uploadRegister,
      } = this;

      seeFetch('/temple/verify/saveVerifyData', {
        id,
        sendData,
        placeNoPic: uploadRegister[0],
        otherCertificatePic: uploadOther[0],
        idCardPic: uploadCard[0],
        certificatePic: uploadCooperate[0],
        bankPic: uploadAccount[0],
      }).then(res => {
        if (res.errorCode === 0) {
          this.dialogVisible = !1;
          Notification({
            title: '提示',
            type: 'success',
            message: `更改成功`,
          });
        } else {
          Notification({
            title: '提示',
            type: 'error',
            message: res.msg,
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  padding-top: 0;
}
/deep/ .upload-container {
  display: flex !important;
  flex-direction: column;
  align-items: center;
}
/deep/ .upload-container .image {
  margin-right: 0;
}
/deep/ .upload-image {
  width: 200px;
  height: 200px;
}
/deep/ .upload-icon-container {
  height: auto !important;
}
/deep/ .upload-image-content {
  height: auto !important;
}
/deep/ .el-checkbox {
  margin-bottom: 10px;
}
.contain {
  padding: 20px;
}
.filter {
  margin-bottom: 20px;
}
.filter-active {
  color: #fff;
  background-color: #409eff;
  border: 1px solid #409eff;
}
.detail {
  cursor: pointer;
  color: #409eff;
}
.detail-item {
  padding: 8px 0;
}
hr {
  height: 1px;
  background-color: #eee;
  border: none;
}
.upload-certificate {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.upload-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  margin-right: 6%;
  &:nth-of-type(2n) {
    margin-right: 0;
  }
}
.upload-pic-empty {
  width: 200px;
  margin-bottom: 10px;
}
.save {
  display: block;
  margin: 20px auto 0;
}
</style>
