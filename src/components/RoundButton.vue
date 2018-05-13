<template>
<a @click="onClickHandler()" style="text-decoration:none;">
  <div v-if="this.type === 'play'"
    class="round-button"
    :style="{
      backgroundColor: '#32CD32'
    }"
  ><span class="button-text">Play</span></div>
  <div v-else-if="this.type === 'typing' && this.enableTyping && this.enableTyping === true"
    class="round-button"
    :style="{
      backgroundColor: '#7FFFD4'
    }"
  ><span class="button-text">Toggle</span></div>
  <div v-else-if="this.type === 'typing'"
    class="round-button"
    :style="{
      backgroundColor: '#A9A9A9'
    }"
  ><span class="button-text">Toggle</span></div>
  <div v-else-if="this.type === 'clear'"
    class="round-button"
    :style="{
      backgroundColor: '#DC143C'
    }"
  ><span class="button-text">Clear</span></div>
  <div v-else-if="this.type === 'download'"
    class="round-button"
    :style="{
      backgroundColor: '#00008B'
    }"
  ><span class="button-text">Save</span></div>
  <div v-else
    class="round-button"
    :style="{
      backgroundColor: '#B8860B'
    }"
  ><span class="button-text">Resume</span></div>
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
  height: 60px;
  width: 60px;
  box-shadow: 0px 0px 5px 1px gray;
  border-radius: 50%;
  margin: 8px;
  cursor: pointer;
}
.button-text {
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  line-height: 60px;
  color: white;
}
</style>
