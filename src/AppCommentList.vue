<template>
  <div class="card">
    <h2>Комментарии</h2>
    <ul class="list"  v-if="comments.length">
      <li
        class="list-item"
        v-for="comment in comments"
        :key="comment.id"
      >
        <div>
          <p><strong>{{ comment.email }}</strong></p>
          <small>{{ comment.body }}</small>
        </div>
      </li>
    </ul>
    <p v-else>{{ alert }}</p>
  </div>
</template>

<script>
export default {
  name: "AppCommentList",
  props: {
    comments: {
      type: Array,
      default: []
    },
    alert: String
  }
}
</script>

<style scoped>

</style>
