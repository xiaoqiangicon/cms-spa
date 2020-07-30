<template>
  <div>
    <div class="text-container">Welcome</div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
};
</script>

<style scoped>
.text-container {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 100px;
  line-height: 100px;
  margin-top: -50px;
  text-align: center;
  font-size: 20px;
  user-select: none;
}
</style>
