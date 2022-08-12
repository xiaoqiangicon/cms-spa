<template>
  <div class="contain">
    <el-card>
      <div style="margin-bottom: 20px;">
        <div class="filter">
          <div class="filter-left">
            <div>
              <el-button
                :class="{ 'filter-active': status === 0 }"
                @click="changeStatus(0)"
                >未认证</el-button
              >
              <el-button
                :class="{ 'filter-active': status === 1 }"
                @click="changeStatus(1)"
                >已认证</el-button
              >
            </div>
            <div>
              <el-radio-group v-model="filterTest" @change="changeVerify">
                <el-radio label="1">过滤测试寺院</el-radio>
                <el-radio label="0">不过滤测试寺院</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div>
            <span style="margin-right: 10px;color: #333;">标签搜索</span>
            <el-select v-model="tagId" @change="changeTag">
              <el-option label="全部" value="" />
              <el-option
                v-for="item in tagList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
        </div>
        <div>
          <div
            style="display:flex;justify-content: flex-end;align-items: center;"
          >
            <span style="margin-right: 10px;color: #333;">寺院名称搜索</span>
            <el-input
              v-model="name"
              placeholder="请输入寺院名称"
              style="width: 217px;"
            ></el-input>
          </div>
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
          prop="placeNo"
          label="登记编号"
          :align="'center'"
        />
        <el-table-column min-width="60px" label="安全认证" :align="'center'">
          <template slot-scope="scope">
            <el-select
              v-model="list[scope.$index].verify"
              @change="changeItemVerify(scope.row)"
            >
              <el-option label="未认证" :value="0" />
              <el-option label="已认证" :value="1" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          min-width="60px"
          prop="name"
          label="标签"
          :align="'center'"
        >
          <template slot-scope="scope">
            <el-select
              v-model="list[scope.$index].tagList"
              filterable
              multiple
              @change="changeItemTag(scope.row)"
            >
              <el-option
                v-for="item in tagList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          min-width="60px"
          prop="name"
          label="微信通知绑定"
          :align="'center'"
        >
          <template slot-scope="scope">
            <div
              @click="showInviteManager(scope.row)"
              style="color: #409eff; cursor: pointer;"
            >
              <div>
                <span
                  class="manager"
                  v-for="item in scope.row.managertList"
                  :key="item.id"
                  >{{ item.nickName }}</span
                >
              </div>
              <span
                v-if="!scope.row.managertList || !scope.row.managertList.length"
                >未添加</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px" :align="'center'">
          <template slot-scope="scope">
            <div>
              <div class="set" @click="showDetail(scope.row)">详情</div>
              <div class="set" @click="showRight(scope.row)">权限</div>
              <div
                v-if="!scope.row.is_offline"
                class="set"
                @click="close(scope.row)"
              >
                关闭寺院
              </div>
              <div v-else class="set red">寺院已关闭</div>
              <div
                v-if="scope.row.allowOp"
                class="set"
                @click="setAllowOp(scope.row)"
              >
                已启用运营事件
              </div>
              <div
                v-if="!scope.row.allowOp"
                class="set red"
                @click="setAllowOp(scope.row)"
              >
                运营事件已关闭
              </div>
              <div class="set" @click="showUnlock(scope.row)">账号解冻</div>
              <div class="set" @click="handleClickRemind(scope.row)">
                转单通知
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      :total="total"
      :current-page="pageNo"
      :page-size="pageSize"
      background
      layout="prev, pager, next"
      style="margin-top: 40px"
      @current-change="pageChange"
    />
    <DialogRemind
      :temple-id="curTempleId"
      :visible="dialogRemindVisible"
      @updateVisible="updateDialogRemindVisible"
    />
    <el-dialog title="资料信息" :visible.sync="detailDialogVisible">
      <el-form :model="detail" ref="form" label-position="'right'">
        <el-form-item label="登记编号">
          <el-input v-model="detail.placeNo"></el-input>
        </el-form-item>
        <el-form-item label="互联网宗教信息服务许可证">
          <el-input v-model="detail.netServiceNo"></el-input>
        </el-form-item>
        <el-form-item label="寺院地址">
          <el-input v-model="detail.address"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="detail.corporation"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="detail.mobile"></el-input>
        </el-form-item>
        <el-form-item label="经度">
          <el-input v-model="detail.chanzai_longitude"></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="detail.chanzai_latitude"></el-input>
        </el-form-item>
        <el-form-item label="寺院简介">
          <el-input
            type="textarea"
            placeholder="请输入寺院简介"
            v-model="detail.introduce"
          ></el-input>
        </el-form-item>
        <el-form-item label="寺院特色">
          <el-input
            v-model="detail.feature"
            maxlength="40"
            placeholder="请输入寺院特色"
          ></el-input>
        </el-form-item>
      </el-form>
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
          <p class="upload-title">寺院合作协议书</p>
          <img
            v-if="!uploadCooperate.length"
            class="upload-pic-empty"
            :src="emptyPic"
          />
          <Upload :images="uploadCooperate" />
        </div>
        <div class="upload-item">
          <p class="upload-title">寺院封面图片</p>
          <img
            v-if="!uploadCover.length"
            class="upload-pic-empty"
            :src="emptyPic"
          />
          <Upload :images="uploadCover" />
        </div>
        <div class="upload-item">
          <p class="upload-title">寺院印章图片</p>
          <img
            v-if="!uploadSeal.length"
            class="upload-pic-empty"
            :src="emptyPic"
          />
          <Upload :images="uploadSeal" />
        </div>
      </div>
      <el-button type="primary" class="save-detail" @click="saveDetail"
        >保存</el-button
      >
    </el-dialog>
    <el-dialog title="管理员信息" :visible.sync="managerDialogVisible">
      <div class="manager-list">
        <div class="manager" v-for="(item, key) in managerList" :key="item.id">
          <img class="avatar" :src="item.headImg" />
          <p>{{ item.nickName }}</p>
          <span class="remove" @click="removeManager(item, key)">×</span>
        </div>
      </div>
      <div>
        <p>请微信扫描左侧二维码，加入本寺佛事管理员。</p>
        <p>
          如需设置他人为佛事管理员，可拍下二维码图片，微信发给对方，然后长按图片识别。
        </p>
      </div>
      <div class="invite-qrcode">
        <div ref="qrCodeBox" style="display: inline-block; height: 100px" />
      </div>
    </el-dialog>
    <el-dialog title="权限管理" :visible.sync="rightDialogVisible">
      <div class="list">
        <div class="" v-for="item in managerRightList" :key="item.id">
          <p>账号：{{ item.username }}</p>
          <el-checkbox-group v-model="item.rightList">
            <el-checkbox
              v-for="item in rightList"
              :label="item.key"
              :key="item.key"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
      </div>
      <el-button type="primary" class="saveRight" @click="saveRight"
        >保存</el-button
      >
    </el-dialog>
    <el-dialog title="账号管理" :visible.sync="unlockDialogVisible">
      <div>
        <div v-for="item in managerRightList" :key="item.id">
          <p>
            <span>账号：</span>
            <span>{{ item.username }}</span>
            <span :class="item.isLock === 0 ? 'green' : 'red'">{{
              item.isLock ? '已冻结' : '正常使用'
            }}</span>
            <span
              v-if="item.isLock"
              class="green"
              style="cursor: pointer"
              @click="unlock(item)"
              >解冻</span
            >
          </p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./App.js"></script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  padding-top: 0;
  margin-top: 10px;
}
/deep/ .el-form-item {
  display: flex;
}
/deep/ .el-form-item__label {
  min-width: 68px;
}
/deep/ .el-form-item__content {
  flex: 1;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}
.filter-active {
  color: #fff;
  background-color: #409eff;
  border: 1px solid #409eff;
}
.filter-left {
  display: flex;
  align-items: center;
  div {
    margin-left: 10px;
  }
}
.manager {
  cursor: pointer;
  color: #409eff;
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
.save-detail {
  display: block;
  margin: 20px auto 0;
}
.manager-list {
  display: flex;
}
.manager {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 10px;
  p {
    margin: 0;
    color: #333;
  }
  .remove {
    display: none;
    position: absolute;
    right: -6px;
    top: -6px;
    font-size: 24px;
    font-weight: bold;
    border: 1px solid #333;
    border-radius: 50%;
    line-height: 16px;
    color: #333;
  }
}
.manager:hover .remove {
  display: block;
}
.avatar {
  width: 100px;
  height: 100px;
  margin-bottom: 5px;
  border-radius: 4px;
}
.invite-qrcode {
  text-align: center;
}

.set {
  cursor: pointer;
  color: #409eff;
}
.green {
  color: #409eff;
  margin-left: 10px;
}
.red {
  color: red;
  margin-left: 10px;
}
.saveRight {
  display: block;
  margin: 20px auto 0;
}
</style>
