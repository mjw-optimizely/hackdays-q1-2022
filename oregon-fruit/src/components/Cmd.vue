<template>
  <div class="cmd">
    <button v-on:click="meow">Meow</button>
  </div>
</template>

<script>
export default {
  name: 'CmdCmd',
  props: {
    msg: String
  },
  methods: {
    meow : function() {
      alert('Meow')
    }
  }
}
</script>

<style scoped>
</style>
