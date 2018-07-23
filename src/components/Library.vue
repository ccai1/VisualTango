<template>
  <div class="library">
    <button class="lib-button">&#x21A0; back </button>
    <h2> Library </h2>

    <h3> The Cross </h3>
    <Move
      :cards="Array.from(cross, x => x)"
      :handleOneMove="handleOneMove"
      :addMove="addMove"
      :isSample='true'
    ></Move>
    <h3> Back Step </h3>
    <Move
      :cards="Array.from(backStep, x => x)"
      :handleOneMove="handleOneMove"
      :addMove="addMove"
      :isSample='true'
    ></Move>
    <h3> Side Step </h3>
    <Move
      :cards="Array.from(sideStep, x => x)"
      :handleOneMove="handleOneMove"
      :addMove="addMove"
      :isSample='true'
    ></Move><br>
  </div>

</template>

<script>
import Move from './Move.vue'
import preloadData from '../../static/preload.json'
import cross from '../../static/cross.json'
import backStep from '../../static/back-step.json'
import sideStep from '../../static/side-step.json'

export default {
  props: [
    'handleOneMove',
    'addMove',
  ],
  components: {
    'Move': Move,
  },
  data() {
    return {
    'preloadData': preloadData,
    'cross': cross,
    'backStep': backStep,
    'sideStep': sideStep,
  }
  },
}

</script>

<style>
.library {
  padding-top: 8%;
}
.lib-button {
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 0px 0px 3px 3px gray;
  font-size: 14px;
  background-color: #FFFAF0;
  color: #2c3e50;
}
button:hover {
  background-color: #2c3e50;
  color: #FFFAF0;
}
</style>
