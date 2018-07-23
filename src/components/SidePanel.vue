<template>
  <center>
  <div class="side-panel">
    <!-- a list of cards -->
    <h2>&#x219e
    </h2>
    <!-- <Slideout menu="#menu" panel="#panel" :toggleSelectors="['.toggle-button']" @on-open="open">
      <nav class="menu">
        <div>Menu</div>
      </nav>
      <main class="panel">
        <header>
          <div>
            <button class="toggle-button">☰</button>
            Panel
          </div>
        </header>
      </main>
    </Slideout> -->

    <Dragglable v-model="this.listOfMoves" :list="this.listOfMoves">
      <Move v-for="(move, moveIndex) in this.listOfMoves"
      :key="moveIndex"
      :cards="move.cards"
      :moveIndex="moveIndex"
      :handleOneMove="handleOneMove"
      :removeOneMove="removeOneMove"
      :addMove="addMove"
      >
      </Move>

    </Dragglable><br>

    <button
          class="basic-button"
          style="border: 5px; background-color: green; color: white"
          @click="addNewMove()"
    >add new move</button><br><br>
  </div>
</center>
</template>

<script>
import Card from './Card.vue'
import Dragglable from 'vuedraggable'
import Slideout from 'vue-slideout'
import Move from './Move.vue'
import preloadData from '../../static/preload.json'

export default {
  props: [
    'listOfMoves',
    'handleOneMove',
  ],
  components: {
    'Move': Move,
    'Card': Card,
    'Dragglable': Dragglable,
    'Slideout': Slideout,
  },
  created() {
    if (this.listOfMoves.length === 0) {
      for (let i = 0; i < 3; i+=1) {
        let move = {
          cards: Array.from(preloadData, x => x),
          moveIndex: i
        }
        console.log('this is one move', move)
        this.addMove(move)
      }
    }
  //   // console.log('listOf 0',this.listOfMoves[0])
  //   // console.log('listOf 1',this.listOfMoves[1])
  },
  methods: {
    addMove (move) {
      this.listOfMoves.push(move)
      this.addListOfMoves(this.listOfMoves)
    },
    addListOfMoves(list) {
      this.listOfMoves = list
    },
    addNewMove() {
      let move = {
        cards: Array.from(preloadData, x => x),
        index: this.listOfMoves.length,
      }
      //console.log('this is one move', move)
      this.addMove(move)
    },
    removeOneMove(index) {
      if (index >= 0 && index <= this.listOfMoves.length - 1) {
        this.listOfMoves.splice(index, 1)
      }
    },
  }
}
</script>

<style scoped>
.side-panel {
  left: 1%;
  bottom: 1%;
  right: 1%;
  width: 90%;
  height: 80%;
  background-color: #F5F5DC;
  border-radius: 3px;
  box-shadow: 0px 0px 10px 1px;
  overflow: auto;
}
.slideout-menu {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 256px;
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 0;
    display: none;
    background-color: #1D1F20;
    color: white;
  }
  .slideout-menu-left {
    left: 0;
  }
  .slideout-menu-right {
    right: 0;
  }
  .slideout-panel {
    background-color: #4B5;
    color: white;
    position: relative;
    z-index: 1;
    will-change: transform;
    min-height: 100vh;
  }
  .slideout-open,
  .slideout-open body,
  .slideout-open .slideout-panel {
    overflow: hidden;
  }
  .slideout-open .slideout-menu {
    display: block;
  }
  .basic-button {
    border-radius: 3px;
    box-shadow: 0px 0px 3px 3px gray;
    font-size: 14px;
  }

</style>
