<template>
<a @click="onClickHandler()" style="text-decoration:none;">
  <div v-if="this.type === 'play'"
    class="round-button"
    :style="{
      backgroundColor: '#32CD32'
    }"
  ><span class="button-text">P</span></div>
  <div v-else-if="this.type === 'typing' && this.enableTyping && this.enableTyping === true"
    class="round-button"
    :style="{
      backgroundColor: '#7FFFD4'
    }"
  ><span class="button-text">T</span></div>
  <div v-else-if="this.type === 'typing'"
    class="round-button"
    :style="{
      backgroundColor: '#A9A9A9'
    }"
  ><span class="button-text">T</span></div>
  <div v-else-if="this.type === 'clear'"
    class="round-button"
    :style="{
      backgroundColor: '#DC143C'
    }"
  ><span class="button-text">C</span></div>
  <div v-else-if="this.type === 'download'"
    class="round-button"
    :style="{
      backgroundColor: '#00008B'
    }"
  ><span class="button-text">D</span></div>
  <div v-else
    class="round-button"
    :style="{
      backgroundColor: '#B8860B'
    }"
  ><span class="button-text">U</span></div>
</a>
</template>

<script>
export default {
  props: [
    // play, typing, clear, download, upload
    'type',

    // onclick handle function
    'onClickHandler',

    // a flag whether typing is enabled
    'enableTyping'
  ]
}
</script>

<style scoped>
.round-button {
  position: relative;
  height: 50px;
  width: 50px;
  box-shadow: 0px 0px 5px 1px gray;
  border-radius: 50%;
  margin: 8px;
  cursor: pointer;
}
.button-text {
  position: relative;
  top: 8.8px;
  left: 0.6px;
  font-weight: bold;
  font-size: 23px;
  color: white;
}
</style>
