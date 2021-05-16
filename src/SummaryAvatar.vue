<template>
  <div class="avatar">
    <img :src="data">
  </div>
</template>

<script>
export default {
  name: "SummaryAvatar",
  props: {
    data: String
  }
}
</script>

<style scoped>

</style>
