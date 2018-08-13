<template>
  <center>
  <div class="side-panel">

    <Slideout :touch="false" :duration=5 :toggleSelectors="['.basic-button', '.lib-button']" @on-open="logger" class="slideout">
      <nav id="menu">
        <Library
          :handleOneMove="handleOneMove"
          :listOfMoves="listOfMoves"
          :addMove="addMove"
          :findComplement="findComplement"
          :updatePlayFrame="updatePlayFrame"
          :updatePlayFrameSample="updatePlayFrameSample"
          :listOfSamples="listOfSamples"
        ></Library>
      </nav>
      <main id="panel">
  			<header>
  				<div>
            <button class="basic-button">&#x219e; library</button>
          </div>
  			</header>
  		</main>
    </Slideout>

   <!-- <header class="mdl-layout__header">
      <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
        <a href="#fixed-tab-1" class="mdl-layout__tab is-active">Tab 1</a>
        <a href="#fixed-tab-2" class="mdl-layout__tab">Tab 2</a>
        <a href="#fixed-tab-3" class="mdl-layout__tab">Tab 3</a>
      </div>
    </header> -->

    <h2>Your Routine</h2>

    <Dragglable v-model="this.listOfMoves" :list="this.listOfMoves">
      <Move v-for="(move, moveIndex) in this.listOfMoves"
      :key="moveIndex"
      :mCards="move.cards"
      :moveIndex="moveIndex"
      :handleOneMove="handleOneMove"
      :removeOneMove="removeOneMove"
      :addMove="addMove"
      :isSample='false'
      :findComplement="findComplement"
      :copyCard="copyCard"
      :pasteMoveHere="pasteMoveHere"
      :addCard="addCard"
      :updatePlayFrame="updatePlayFrame"
      :changedCard="changedCard"
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
import Library from './Library.vue'
import { validateCard, matchFrameIndex } from '../helper/cardHelper'
import {$,jQuery} from 'jquery'

export default {
  props: [
    'listOfMoves',
    'handleOneMove',
    'findComplement',
    'updatePlayFrame',
    'updatePlayFrameSample',
    'listOfSamples',
  ],
  components: {
    'Move': Move,
    'Card': Card,
    'Dragglable': Dragglable,
    'Slideout': Slideout,
    'Library': Library,
  },
  data() {
    return {
      copiedCard: [],
    }
  },
  created() {
    if (this.listOfMoves.length === 0) {
      for (let i = 0; i < 3; i+=1) {
        let move = this.preloadCopy()
        move.moveIndex = i
        this.addMove(move)
      }
    }
  },
  methods: {
    logger() {
      console.log("open event")
    },
    open () {
      console.log('slideoutOpen')
    },
    addMove (move) {
      this.listOfMoves.push(move)
      this.addListOfMoves(this.listOfMoves)
    },
    addListOfMoves(list) {
      this.listOfMoves = list
    },
    addNewMove() {
      this.addMove(this.preloadCopy())
    },
    addCard (name, direction, height, weighted, unweighted, leaning, delay, moveIndex) {
      let card = {
        type: 'card',
        title: name.trim(),
        initialized: true,
        expended: false,
        direction: direction.trim().replace(/\s+/g, '-'),
        height: height.trim().replace(/\s+/g, '-'),
        weighted: weighted.trim().replace(/\s+/g, '-'),
        unweighted: unweighted.trim().replace(/\s+/g, '-'),
        leaning: leaning.trim().replace(/\s+/g, '-'),
        delay: delay
      }
      // validate
      if (validateCard(card)) {
        this.listOfMoves[moveIndex].cards.push(card)
        this.inserting = false
      }
    },
    copyCard(moveIndex, cardIndex) {
      let card = this.listOfMoves[moveIndex].cards[cardIndex]
      console.log('card is', card)
      let newCard = JSON.parse( JSON.stringify( card ) )
      console.log('new card is', newCard)
      this.copiedCard = newCard
    },
    changedCard(moveIndex, changedCards) {
      this.listOfMoves[moveIndex].cards = changedCards
    },
    removeOneMove(index) {
      if (index >= 0 && index <= this.listOfMoves.length - 1) {
        this.listOfMoves.splice(index, 1)
      }
    },
    pasteMoveHere(moveIndex) {
      try {
        let card = this.copiedCard
        this.addCard(card.title, card.direction, card.height,
          card.weighted, card.unweighted, card.leaning, card.delay, moveIndex)
      }
      catch (err) {
        console.log(err)
      }
    },
    preloadCopy() {
      let data = []
      for (let j = 0; j < preloadData.length; j+=1) {
        data.push(JSON.parse( JSON.stringify( preloadData[j] ) ))
      }
      let move = {
        cards: data,
        isSample: 'false',
      }
      return move
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
  background-color: #FFFAF0;
  border-radius: 3px;
  box-shadow: 0px 0px 10px 1px;
  overflow: auto;
}
.slideout {
  padding-top: 11%;
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
    background-color: #FFFAF0;
    color: #2c3e50;
  }
  .slideout-menu-left {
    left: 0;
  }
  .slideout-menu-right {
    right: 0;
  }
  .slideout-panel {
    /* background-color: #4B5; */
    position: relative;
    z-index: 1;
  }
  .slideout-open,
  .slideout-open body,
  .slideout-open .slideout-panel {
    overflow: scroll;
  }
  .slideout-open .slideout-menu {
    display: block;
  }
  .basic-button {
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 0px 0px 3px 3px gray;
    font-size: 14px;
  }
  #menu {
    top: 1%;
    height: 98%;
    left: 1.1%;
    box-shadow: 0px 0px 1px 1px gray;
    border-radius: 3px;
    z-index: 1;
    width: 19.8%;
  }
</style>
