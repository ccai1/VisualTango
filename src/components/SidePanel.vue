<template>
  <div class="side-panel">
    <Card v-for="(card, index) in this.cards"
      :key="index"
      :id="'card-' + index"
      :title="'pose - ' + (index+1)"
      :type="card.type"
      :initialized="card.initialized"
      :expended="card.expended"
      :direction="card.direction"
      :height="card.height"
      :weighted="card.weighted"
      :unweighted="card.unweighted"
      :learning="card.learning"
      @click.native="toggleCard(index)"
    >
    </Card>
    <Card v-if="this.inserting"
      type="card"
      :initialized="false"
      :onAddingNewSubmit="this.addCard"
      :onAddingNewCancel="this.onClickAddNewCancel"
    ></Card>
    <Card v-else @click.native="onClickAddNew()"></Card>
    <br /><br />
  </div>
</template>

<script>
import Card from './Card.vue'

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
    'toggleCard'
  ],
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
  background-color: #F5F5DC;
  border-radius: 3px;
  box-shadow: 0px 0px 10px 1px;
  overflow-y: scroll;
}
</style>
