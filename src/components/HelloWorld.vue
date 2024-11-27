<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button
      type="button"
      @click="count++"
    >count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a
      href="https://vuejs.org/guide/quick-start.html#local"
      target="_blank"
    >create-vue</a>, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
    >Vue Docs Scaling up Guide</a>.
  </p>
  <div class="demo-test">ghs</div>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped lang="less">
@width: 10px;
@bg: #000;
.read-the-docs {
  color: #888;
}
.demo-test {
  display: block;
  width: @width;
  color: @bg;
}
</style>
