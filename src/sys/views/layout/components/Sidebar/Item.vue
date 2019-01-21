<template>
  <span>
    <!--<svg-icon v-if="icon" :icon-class="icon"/>-->
    <i class="el-icon-remove-outline" />
    <span v-if="title" slot="title"> {{ title }} </span>
  </span>
</template>
<script>
export default {
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
