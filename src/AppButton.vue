<template>
  <button class="btn" :class="color" @click="$emit('action')" :disabled="disabled">
    <!--{{ text }}-->
    <slot></slot>
  </button>
</template>

<script>
export default {
  emits: {
    'action': null
  },
  props: {
    color: {
      type: String,
      default: '',
      validator(value) {
        return ['', 'primary', 'danger'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
