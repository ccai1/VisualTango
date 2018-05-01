<template>
  <div class="index">
    <MainFrame></MainFrame>
    <SidePanel
      :cards="this.cards"
      :addCard="addCard"
      :removeCard="removeCard"
      :inserting="this.inserting"
      :onClickAddNewCancel="onClickAddNewCancel"
      :onClickAddNew="onClickAddNew"
      :toggleCard="toggleCard"
    ></SidePanel>
  </div>
</template>

<script>
import SidePanel from './SidePanel.vue'
import MainFrame from './MainFrame.vue'

export default {
  data () {
    return {
      cards: [],
      inserting: false,
      currentExpended: -1 // the current expended card
    }
  },
  components: {
    'SidePanel': SidePanel,
    'MainFrame': MainFrame
  },
  methods: {
    // add a new card element to the list
    addCard (direction, height, weighted, unweighted, learning) {
      this.cards.push({
        type: 'card',
        initialized: true,
        expended: false,
        direction: direction,
        height: height,
        weighted: weighted,
        unweighted: unweighted,
        learning: learning
      })
      this.inserting = false
    },
    // remove a card by index
    removeCard (index) {
      if (index >= 0 && index <= this.cards.length - 1) {
        this.cards.splice(index, 1)
      }
    },
    // change the index of a card
    insertCardAfter (index, after) {
      if (index !== after && index >= 0 && index <= this.cards.length - 1 && after >= 0 && after <= this.cards.length - 1) {
        let element = this.cards[index]
        // remove item index
        this.cards.splice(index, 1)
        let insertAfter = after
        // check if index is before 'after'
        if (index < after) {
          insertAfter -= 1
        }
        // insert element back
        this.cards.splice(insertAfter + 1, 0, element)
      }
    },
    onClickAddNew () {
      this.inserting = true
    },
    onClickAddNewCancel () {
      this.inserting = false
    },
    toggleCard (index) {
      if (index === this.currentExpended) {
        this.cards[index].expended = false
        this.currentExpended = -1
      } else {
        if (this.currentExpended !== -1) {
          this.cards[this.currentExpended].expended = false
        }
        this.cards[index].expended = true
        this.currentExpended = index
      }
    }
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
