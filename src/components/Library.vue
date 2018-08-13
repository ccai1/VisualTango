<template>
  <div class="library">
    <button class="lib-button">&#x21A0; back </button>
    <h2> Library </h2>

    <Move v-for="(move, moveIndex) in this.listOfSamples"
    :name="move.name"
    :mCards="move.cards"
    :moveIndex="moveIndex"
    :handleOneMove="handleOneMove"
    :addMove="addMove"
    :isSample='true'
    :findComplement="findComplement"
    :updatePlayFrame="updatePlayFrame"
    :sampleMove="moveIndex"
    :updatePlayFrameSample="updatePlayFrameSample"
    >
  </Move><br>
  </div>

</template>

<script>
import Move from './Move.vue'
import preloadData from '../../static/preload.json'

export default {
  props: [
    'handleOneMove',
    'addMove',
    'findComplement',
    'updatePlayFrame',
    'moveIndex',
    'updatePlayFrameSample',
    'listOfSamples',
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
