<template>
  <div class="index">
    <MainFrame></MainFrame>
    <SidePanel></SidePanel>
  </div>
</template>

<script>
import SidePanel from './SidePanel.vue'
import MainFrame from './MainFrame.vue'

export default {
  props: {
  },
  components: {
    'SidePanel': SidePanel,
    'MainFrame': MainFrame
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #A9A9A9;
}
</style>
