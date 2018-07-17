<template>
  <div class="side-panel">
    <!-- a list of cards -->
    <Dragglable v-model="this.cards" :list="this.cards">
      <Card v-for="(card, index) in this.cards"
        :key="index"
        :index="index"
        :id="'card-' + index"
        :title="card.title"
        :type="card.type"
        :initialized="card.initialized"
        :expended="card.expended"
        :direction="card.direction"
        :height="card.height"
        :weighted="card.weighted"
        :unweighted="card.unweighted"
        :leaning="card.leaning"
        :timeDelay="card.delay"
        :removeCard="removeCard"
        :expendCard="expendCard"
        :enableTyping="enableTyping"
        :submitChanges="submitChanges"
      >
      </Card>
    </Dragglable>

    <!-- inserting a new card -->
    <Card v-if="this.inserting"
      type="card"
      :initialized="false"
      :onAddingNewSubmit="this.addCard"
      :onAddingNewCancel="this.onClickAddNewCancel"
      :enableTyping="this.enableTyping"
    ></Card>
    <Card v-else @click.native="onClickAddNew()"></Card>
    <button
          class="side-button"
          style="border: 5px; background-color: #1E90FF"
          @click="onAddingNewCancel()"
    >move</button>
  </div>
</template>

<script>
import Card from './Card.vue'
import Dragglable from 'vuedraggable'

export default {
  props: [
    // a list of cards
    'cards',

    // modify card list
    'addCard',
    'removeCard',

    // open and close add new panel
    'inserting', // flag
    'onClickAddNew',
    'onClickAddNewCancel',

    // expending
    'expendCard',

    // a flag whether typing is enabled
    // if it is enabled, then all the dropdowns need to be typing
    'enableTyping',

    // update
    'submitChanges'
  ],
  components: {
    'Card': Card,
    'Dragglable': Dragglable
  },
  created() {
    console.log('sidePanel called')
    console.log(this.cards)
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
  background-color: #F5F5DC;
  border-radius: 3px;
  box-shadow: 0px 0px 10px 1px;
  overflow: auto;
}
.side-button {
  color: white;
  position: relative;
  border-radius: 3px;
  box-shadow: 0px 0px 1px 1px gray;
  cursor: pointer;
}
</style>
