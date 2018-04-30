<template>
  <div class="side-panel">
  </div>
</template>

<script>
import Card from './Card.vue'

export default {
  data () {
    return {}
  },
  components: {
    'Card': Card
  }
}
</script>

<style scoped>
.side-panel {
  position: relative;
  top: 1%;
  left: 1%;
  bottom: 1%;
  right: 1%;
  width: 20%;
  height: 98%;
  background-color: #FFEBCD;
  border-radius: 3px;
  box-shadow: 0px 0px 10px 1px;
}
</style>
