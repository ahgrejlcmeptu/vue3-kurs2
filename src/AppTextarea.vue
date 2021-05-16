<template>
  <div class="form-control">
    <label :for="id">{{ label }}</label>
    <textarea
      id="value"
      rows="3"
      :id="id"
      :placeholder="placeholder"
      :value="value"
      @input="change"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "AppTextarea",
  props: {
    value: String,
    placeholder: {
      type: String,
      default: ''
    },
    label: String
  },
  emits: {
    // не понимаю что надо сделать, textarea в любом случае вернет что то
    'update:value': null
  },
  methods: {
    change (event) {
      this.$emit('update:value', event.target.value)
    }
  },
  data () {
    return {
      id: 'input-' + Math.random()
    }
  }
}
</script>

<style scoped>

</style>
