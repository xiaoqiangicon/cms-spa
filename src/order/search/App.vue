<template>
  <div class="container">
    <el-card>
      <div class="search">
        <div>
          <el-select
            v-model="searchType"
            size="small"
            placeholder="请选择寺院"
            filterable
            style="line-height: 32px;height: 32px;"
            @change="changeSearchType"
          >
            <el-option label="订单ID" :value="1"></el-option>
            <el-option label="自在家号" :value="2"></el-option>
            <el-option label="手机号" :value="3"></el-option>
            <el-option label="物流号" :value="4"></el-option>
          </el-select>
          <el-input v-model="search" style="width: 320px;">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getList"
            ></el-button>
          </el-input>
        </div>
        <div class="tips">
          <p>1.仅可搜索佛事类型相关订单。</p>
          <p>
            2.其他模块的订单无单独反馈与流程因此有问题的很少，
            若需查询请联系技术人员。
          </p>
        </div>
      </div>
      <div class="search-more" v-if="searchType === 2 || searchType === 3">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="onChangeDatePicker"
        />
        <el-select
          v-model="status"
          size="small"
          placeholder="请选择寺院"
          filterable
          style="line-height: 32px;height: 32px;margin-left: 10px;"
        >
          <el-option label="全部" :value="-1"></el-option>
          <el-option label="已处理" :value="1"></el-option>
          <el-option label="未处理" :value="0"></el-option>
        </el-select>
        <el-button @click="getList" type="primary" style="margin-left: 20px;"
          >搜索</el-button
        >
      </div>
      <el-table v-loading="loading" :data="list" class="table">
        <el-table-column
          width="60px"
          prop="orderTypeText"
          label="来源"
          :align="'center'"
        />
        <el-table-column prop="conversionName" label="名称" :align="'center'">
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.name }}</span>
              <div
                :class="{
                  'conversion-main': scope.row.conversionType === 1,
                  'conversion-sub': scope.row.conversionType !== 1,
                }"
              >
                {{ scope.row.conversionName }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="templeName" label="订单寺院" :align="'center'" />
        <el-table-column prop="price" label="金额" :align="'center'" />
        <el-table-column label="备注" :align="'center'">
          <template slot-scope="scope">
            <span>{{ scope.row.userComment || '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="200px" label="反馈内容" :align="'center'">
          <template slot-scope="scope">
            <div class="media">
              <el-image
                v-for="item in scope.row.disposePicUrl"
                :key="item"
                :src="
                  item.indexOf('?imageMogr') > -1
                    ? item + '/gravity/center/crop/!60x60'
                    : item + imgNail
                "
                :preview-src-list="scope.row.disposePicUrl"
              >
              </el-image>
              <div
                style="width: 60px;height:60px"
                class="el-image"
                v-for="video in scope.row.disposeVideoUrl"
                :key="video"
                @click="onClickPlayVideo(video)"
              >
                <img
                  style="width: 60px"
                  :src="video + '?vframe/jpg/offset/1'"
                />
                <span class="pause-icon"></span>
                <div class="mask"></div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="payTime" label="下单时间" :align="'center'" />
        <el-table-column prop="orderNo" label="订单ID" :align="'center'" />
        <el-table-column prop="statusText" label="订单处理" :align="'center'" />
        <el-table-column prop="sort" label="操作" :align="'center'">
          <template slot-scope="scope">
            <div class="detail-btn" @click="showDetail(scope.row)">
              订单详情
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="订单详情" :visible.sync="dialogVisble" width="600px">
        <div class="row">
          <span class="row-left">订单类型：</span
          ><span class="row-right">{{
            detail.isChanzai ? 'APP' : '微信'
          }}</span>
        </div>
        <div class="row">
          <span class="row-left">订单ID：</span
          ><span class="row-right">{{ detail.orderNo }}</span>
        </div>
        <div class="row">
          <span class="row-left">寺院：</span
          ><span class="row-right">{{ detail.templeName }}</span>
        </div>
        <div class="row">
          <span class="row-left">状态：</span
          ><span class="row-right">{{
            detail.isFinish ? '已完成' : '未完成'
          }}</span>
        </div>
        <hr />
        <div class="row">
          <span class="row-left">名称：</span
          ><span class="row-right">{{ detail.name }}</span>
        </div>
        <div class="row">
          <span class="row-left">选择项：</span
          ><span class="row-right">{{ detail.subdivideName }}</span>
        </div>
        <div class="row">
          <span class="row-left">数量：</span
          ><span class="row-right">{{ detail.num }}</span>
        </div>
        <div class="row">
          <span class="row-left">支付金额：</span
          ><span class="row-right">{{ detail.price }}</span>
        </div>
        <div class="row">
          <span class="row-left">下单时间：</span
          ><span class="row-right">{{ detail.payTime }}</span>
        </div>
        <div class="row">
          <span class="row-left">支付流水号：</span
          ><span class="row-right">{{ detail.wxTransactionId }}</span>
        </div>
        <div class="row">
          <span class="row-left">退款信息：</span
          ><span class="row-right">{{ detail.refundMessage }}</span>
        </div>
        <hr />
        <div class="row">
          <span class="row-left">用户ID：</span
          ><span class="row-right">{{ detail.userId }}</span>
        </div>
        <div class="row">
          <span class="row-left">用户昵称：</span
          ><span class="row-right">{{ detail.userName }}</span>
        </div>
        <div class="row">
          <span class="row-left">是否为APP用户：</span
          ><span class="row-right">{{ detail.isChanzaiText }}</span>
        </div>
        <div class="row">
          <span class="row-left">自在家号：</span
          ><span class="row-right">{{ detail.numberAccount }}</span>
        </div>
        <hr />
        <div class="row">
          <span class="row-left">联系人：</span
          ><span class="row-right">{{ detail.userName }}</span>
        </div>
        <div class="row">
          <span class="row-left">联系电话：</span
          ><span class="row-right">{{ detail.mobile }}</span>
        </div>
        <div class="row">
          <span class="row-left">备注：</span
          ><span class="row-right">{{ detail.userComment }}</span>
        </div>
        <hr />
        <div
          class="row modify-row"
          v-for="(item, key) in detail.posiscript"
          :key="key"
        >
          <span class="row-left">{{ item.name }}：</span
          ><el-input
            class="row-right"
            v-model="item.value"
            :disabled="!isModify"
          ></el-input>
        </div>
        <div class="row">
          <span class="row-left">心愿是否为匿名</span>
          <el-radio-group
            v-model="detail.isCryptonymWish"
            :disabled="!isModify"
          >
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
        <div class="row">
          <span class="row-left">是否匿名用户头像</span>
          <el-radio-group :disabled="!isModify" v-model="detail.isCryptonymBuy">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
        <el-button type="primary" @click="modify" v-if="!isModify"
          >修改</el-button
        >
        <el-button
          type="primary"
          @click="saveModify"
          v-if="isModify"
          v-loading="updateLoading"
          >保存</el-button
        >
        <el-button type="primary" @click="cancelModify" v-if="isModify"
          >取消</el-button
        >
        <hr />
        <div class="row">
          <span class="row-left">快递单号</span
          ><span class="row-right">{{ detail.logisticsOrder }}</span>
        </div>
        <hr />
        <div class="">
          <el-button type="primary" @click="clickRefundBtn"
            >取消并退款给用户</el-button
          >
          <el-button type="primary" @click="setOvertimeOrder"
            >设为超时未处理订单</el-button
          >
        </div>
      </el-dialog>
      <el-dialog title="退款详情" :visible.sync="refundVisible" width="600px">
        <div class="">
          <span>退款说明：</span>
          <el-input type="textarea" v-model="content"></el-input>
        </div>
        <div class="">
          <span>上传图片：</span>
          <Upload :images="uploadImages" :multiple="!0" />
        </div>
        <div class="">
          <el-button type="primary" @click="refund">确定</el-button>
          <el-button>取消</el-button>
        </div>
      </el-dialog>
      <VideoPlayer
        @hidePlayer="hidePlayer"
        :src="videoPlayerSrc"
        :visible="playerVisible"
      />
    </el-card>
  </div>
</template>

<script src="./App.js"></script>

<style lang="less">
.el-range-editor--medium.el-input__inner,
.el-input--medium .el-input__inner {
  height: 32px;
  line-height: 32px;
}
</style>

<style lang="less" scoped src="./app.less"></style>
