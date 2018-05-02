<template>
<a @click="this.onClickHandler()" style="text-decoration:none;">
  <div class="round-button"
    :style="{
      backgroundColor: this.backgroundColor
    }"
  ><span class="button-text">{{ this.content }}</span></div>
</a>
</template>

<script>
export default {
  data () {
    let bgColor = ''
    let ctt = ''

    if (this.type === 'play') {
      bgColor = '#32CD32'
      ctt = 'P'
    } else if (this.type === 'typing') {
      if (this.enableTyping && this.enableTyping === true) {
        bgColor = '#FFFFFF'
      } else {
        bgColor = '#A9A9A9'
      }
      ctt = 'T'
    } else if (this.type === 'clear') {
      bgColor = '#DC143C'
      ctt = 'C'
    } else if (this.type === 'download') {
      bgColor = '#00008B'
      ctt = 'D'
    } else { // upload
      bgColor = '#B8860B'
      ctt = 'U'
    }

    return {
      backgroundColor: bgColor,
      content: ctt
    }
  },
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
