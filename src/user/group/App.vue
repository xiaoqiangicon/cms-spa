<template>
  <div class="contain">
    <el-card>
      <div class="header">
        <el-select
          style="width: 50%"
          v-model="detail"
          size="small"
          placeholder="请选择用户分群"
          filterable
          @change="refresh"
          value-key="id"
        >
          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.name + '（' + item.total + '人）'"
            :value="item"
          />
        </el-select>
        <el-button type="primary" @click="create">创建</el-button>
      </div>
      <div class="content" v-if="detail">
        <div class="row">
          <span class="row-left">名称：</span>
          <el-input
            type="text"
            v-model="detail.name"
            placeholder="请输入分群名称"
          />
        </div>
        <hr />
        <div class="row">
          <span class="row-left">用户属性：</span>
          <el-select v-model="detail.userType">
            <el-option label="所有用户" :value="0"></el-option>
            <el-option label="微信用户" :value="1"></el-option>
            <el-option label="APP用户" :value="2"></el-option>
          </el-select>
        </div>
        <div class="row">
          <span class="row-left">规则类型：</span>
          <el-select v-model="detail.ruleType">
            <el-option label="只算一次" :value="1"></el-option>
            <el-option label="每天更新" :value="2"></el-option>
          </el-select>
        </div>
        <div class="row" v-if="provinceJson">
          <span class="row-left">省份：</span>
          <el-select class="mgR20" v-model="provinceJson.symbol">
            <el-option label="包含" :value="1"></el-option>
            <el-option label="不包含" :value="0"></el-option>
          </el-select>
          <el-select
            class="mgR20"
            v-model="provinceJson.provinceList"
            multiple
            placeholder="请输入省份名称"
          >
            <el-option
              v-for="item in provinces"
              :value="item"
              :key="item"
              :label="item"
            ></el-option>
          </el-select>
          <el-button @click="delAddressFil('provinceJson')">删除</el-button>
        </div>
        <div class="row" v-if="cityJson">
          <span class="row-left">城市：</span>
          <el-select class="mgR20" v-model="cityJson.symbol">
            <el-option label="包含" :value="1"></el-option>
            <el-option label="不包含" :value="0"></el-option>
          </el-select>
          <el-select
            class="mgR20"
            v-model="cityJson.cityList"
            multiple
            placeholder="请输入城市名称"
          >
            <el-option
              v-for="item in citys"
              :value="item"
              :key="item"
              :label="item"
            ></el-option>
          </el-select>
          <el-button @click="delAddressFil('cityJson')">删除</el-button>
        </div>
        <div class="row" v-if="detail.registerType > -1">
          <span class="row-left">注册（激活）时间：</span>
          <el-select class="mgR20" v-model="detail.registerType">
            <el-option label="最近" :value="0"></el-option>
            <el-option label="时间段" :value="1"></el-option>
          </el-select>
          <div class="flex-row mgR20" v-if="detail.registerType === 0">
            <el-input
              class="mgR10"
              placeholder="请输入天数"
              v-model="detail.registerTime"
            />
            <span>天</span>
          </div>
          <div class="flex-row" v-else>
            <el-date-picker
              v-model="registerDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="onChangeDatePicker"
            />
          </div>
          <el-button @click="delRegiTimeFil">删除</el-button>
        </div>
        <div class="">
          <el-button @click="addProvinceFil">添加省份过滤</el-button>
          <el-button @click="addCityFil">添加城市过滤</el-button>
          <el-button @click="addRegiTimeFil"
            >添加注册（激活）时间过滤</el-button
          >
        </div>
        <hr />
        <div v-for="(item, key) in detail.ruleJson" :key="key">
          <div class="filter-item" v-if="item.ruleName === 'paySuccess'">
            <div class="filter-header">
              <span class="row-left mgR10">支付成功</span>
              <el-select class="mgR10" v-model="item.type">
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                  @change="changeType(item)"
                />
              </el-select>
              <el-select class="mgR10" v-model="item.symbol">
                <el-option label="=" :value="1"></el-option>
                <el-option label="≥" :value="2"></el-option>
                <el-option label="≤" :value="3"></el-option>
                <el-option label="≥&<" :value="4"></el-option>
              </el-select>
              <el-input
                class="mgR10"
                style="max-width: 20%"
                placeholder="请输入"
                v-model="item.number"
              />
              <el-input
                class="mgR10"
                style="max-width: 20%"
                placeholder="第2个操作数"
                v-if="item.symbol === 4"
                v-model="item.number2"
              ></el-input
              ><span class="mgR10">次</span>
              <el-button @click="delFil('paySuccess')">删除</el-button>
            </div>
            <div class="filter-content flex-row" v-if="item.type === 2">
              <span class="row-left">佛事ID：</span>
              <el-input
                class="mgR10"
                style="max-width: 50%"
                v-model="item.contentId"
                placeholder="请输入佛事ID"
              />
              <span>多个佛事ID之间使用半角逗号(,)隔开 </span>
            </div>
            <div class="filter-content flex-row">
              <span class="row-left">在：</span>
              <el-select class="mgR10" v-model="item.dateType">
                <el-option label="最近" :value="1" />
                <el-option label="时间段" :value="0" />
              </el-select>
              <div class="flex-row" v-if="item.dateType === 1">
                <el-input
                  type="number"
                  class="mgR10"
                  v-model="item.days"
                ></el-input
                ><span>天</span>
              </div>
              <div class="flex-row" v-if="item.dateType === 0">
                <el-date-picker
                  v-model="paySuccessDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="onChangeDatePicker(item)"
                />
              </div>
            </div>
          </div>
          <div class="filter-item" v-if="item.ruleName === 'payMoney'">
            <div class="filter-header">
              <span class="row-left mgR10">支付金额</span>
              <el-select class="mgR10" v-model="item.type">
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                  @change="changeType(item)"
                />
              </el-select>
              <el-select class="mgR10" v-model="item.symbol">
                <el-option label="=" :value="1"></el-option>
                <el-option label="≥" :value="2"></el-option>
                <el-option label="≤" :value="3"></el-option>
                <el-option label="≥&<" :value="4"></el-option>
              </el-select>
              <el-input
                class="mgR10"
                style="max-width: 20%"
                placeholder="请输入"
                v-model="item.number"
              />
              <el-input
                class="mgR10"
                style="max-width: 20%"
                placeholder="第2个操作数"
                v-if="item.symbol === 4"
                v-model="item.number2"
              ></el-input
              ><span class="mgR10">次</span>
              <el-button @click="delFil('payMoney')">删除</el-button>
            </div>
            <div class="filter-content flex-row" v-if="item.type === 2">
              <span class="row-left">佛事ID：</span>
              <el-input
                class="mgR10"
                style="max-width: 50%"
                v-model="item.contentId"
                placeholder="请输入佛事ID"
              />
              <span>多个佛事ID之间使用半角逗号(,)隔开 </span>
            </div>
            <div class="filter-content flex-row">
              <span class="row-left">在：</span>
              <el-select class="mgR10" v-model="item.dateType">
                <el-option label="最近" :value="1" />
                <el-option label="时间段" :value="0" />
              </el-select>
              <div class="flex-row" v-if="item.dateType === 1">
                <el-input
                  type="number"
                  class="mgR10"
                  v-model="item.days"
                ></el-input
                ><span>天</span>
              </div>
              <div class="flex-row" v-if="item.dateType === 0">
                <el-date-picker
                  v-model="payMoneyDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="onChangeDatePicker(item)"
                />
              </div>
            </div>
          </div>
          <div class="filter-item" v-if="item.ruleName === 'startApp'">
            <div class="filter-header">
              <span class="row-left">启动APP：</span>
              <el-select class="mgR10" v-model="item.symbol">
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
              <el-button @click="delFil('startApp')">删除</el-button>
            </div>
            <div class="filter-content flex-row">
              <span class="row-left">在：</span>
              <el-select class="mgR10" v-model="item.dateType">
                <el-option label="最近" :value="1" />
                <el-option label="时间段" :value="0" />
              </el-select>
              <div class="flex-row" v-if="item.dateType === 1">
                <el-input
                  type="number"
                  class="mgR10"
                  v-model="item.days"
                ></el-input
                ><span>天</span>
              </div>
              <div class="flex-row" v-if="item.dateType === 0">
                <el-date-picker
                  v-model="startAppDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="onChangeDatePicker(item)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="filter-item" v-if="showAddUserId">
          <div class="filter-header">
            <p>添加指定用户(仅可上传用户ID,获取userId找技术)：</p>
            <el-button @click="delUserFil">删除</el-button>
          </div>
          <div class="filter-content flex-row" style="flex-wrap: wrap;">
            <el-input
              class="mgR10"
              style="width: 200px;margin-bottom: 10px;"
              type="number"
              v-for="(item, index) in detail.userList"
              v-model="item.id"
              :key="index"
            ></el-input>
            <el-button @click="addUserFil" style="margin-bottom: 10px;"
              >添加</el-button
            >
          </div>
        </div>
        <div class="filter-item-add">
          <el-button type="primary" @click="addFill('paySuccess')"
            >添加支付成功过滤</el-button
          >
          <el-button type="primary" @click="addFill('payMoney')"
            >添加支付金额过滤</el-button
          >
          <el-button type="primary" @click="addFill('startApp')"
            >添加启动APP过滤</el-button
          >
          <el-button type="primary" @click="addUserFil">添加指定用户</el-button>
        </div>
        <hr />
        <div class="">
          <el-button
            class="del-btn"
            @click="del"
            v-if="detail && detail.id > -1"
            >删除</el-button
          >
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script src="./App.js"></script>

<style lang="less" scoped src="./index.less"></style>
