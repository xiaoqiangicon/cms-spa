<template>
  <div class="pd-20">
    <div
      class="c-fixed-loading"
      v-if="loading"
      v-loading="loading"
      :element-loading-text="loadingText"
    ></div>
    <el-card>
      <div class="clearfix">
        <el-button type="primary" @click="promo" class="fl-right"
          >招募推广员</el-button
        >
      </div>
    </el-card>
    <el-card class="mg-t-20">
      <div slot="header" class="clearfix">
        <span class="f-s-16">招募与管理</span>
      </div>
      <el-form ref="form" label-width="120px">
        <el-form-item label="人员招募">
          <el-radio-group v-model="recruit">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
          <div class="gray">默认开启招募；关闭后其他用户不能提交申请。</div>
        </el-form-item>
        <el-form-item label="人员审核">
          <el-radio-group v-model="verify">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
          <div class="gray">
            默认开启人员审核功能；其他用户申请成为你旗下销售员需要经过您审核，关闭则申请后直接通过审核。
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mg-t-20">
      <div slot="header" class="clearfix">
        <span class="f-s-16">招募页面</span>
      </div>
      <el-form ref="form" label-width="120px">
        <el-form-item label="页面标题">
          <el-input placeholder="请填写标题" v-model="title" />
        </el-form-item>
        <el-form-item label="详情描述">
          <div id="editor" class="editor"></div>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mg-t-20">
      <el-form ref="form" label-width="120px">
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script src="./App.js"></script>

<style lang="less" scoped>
.editor {
  line-height: 1.42857143;
}
</style>
