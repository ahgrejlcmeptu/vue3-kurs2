<template>
  <div class="form-control">
    <label :for="id">{{ label }}</label>
    <select
      :id="id"
      :value="value"
      @input="change"
    >
      <option
        v-for="item in options"
        :value="item.value"
        :key="item.value"
      >{{ item.title }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "AppSelect",
  props: {
    value: String,
    label: String,
    options: {
      type: Array,
      default: []
    }
  },
  emits: {
    'update:value'(value) {
      if (value) {
        return true
      }
      console.warn('Нет параметра value для emit update:value')
      return false
    }
  },
  methods: {
    change (event) {
      console.log(event.target.value)
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
