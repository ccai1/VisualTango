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
    >
    </Card>
    <Card v-if="inserting"
      type="card"
      :initialized="false"
      :onAddingNewSubmit="this.addCard"
      :onAddingNewCancel="onClickAddNewCancel"
    ></Card>
    <Card v-else @click.native="onClickAddNew()"></Card>
    <br /><br />
  </div>
</template>

<script>
import Card from './Card.vue'

export default {
  data () {
    return {
      inserting: false // a flag to indicate if user is inserting a new card
    }
  },
  props: [
    // a list of cards
    'cards',

    // pass in from parent
    'addCard',
    'removeCard'
  ],
  components: {
    'Card': Card
  },
  methods: {
    onClickAddNew () {
      this.inserting = true
    },
    onClickAddNewCancel () {
      this.inserting = false
    }
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
