<template>
  <div class="cmd">
    <button v-on:click="meow">Meow</button>
    <textarea ref="stdout"/>
    <textarea ref="stderr"/>
    <textarea ref="msgs"/>
  </div>
</template>

<script>
// https://stackoverflow.com/questions/54459442/module-not-found-error-cant-resolve-child-process-how-to-fix
// import ChildProcess from "child_process";
// const { spawn } = require('child_process');
import { spawn } from 'child_process'

export default {
  name: "CmdCmd",
  components: {
    // ChildProcess,
  },
  props: {
    cmd: String,
  },
  methods: {
    meow: function () {
      this.$refs.msgs.textContent = "Cat's meowing, dude.\n"
      const ls = spawn(this.cmd)

      ls.stdout.on("data", (data) => {
        this.$refs.stdout.textContent = 'stdout: ' + data;
      });

      ls.stderr.on("data", (data) => {
        this.$refs.stderr.textContent = 'stderr: ' + data;
      });

      ls.on("close", (code) => {
        this.$refs.msgs.textContent += 'child process exited with code ' + code
      });
      this.$refs.msgs.textContent = "Yep.\n"
    },
  },
};
</script>

<style scoped>
textarea {
  width: 100%;
}
</style>
