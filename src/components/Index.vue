<template>
  <div class="index">
    <div class="floating-button-set">
      <RoundButton
        type="play"
      ></RoundButton>
      <RoundButton
        type="typing"
        :enableTyping="this.enableTyping"
        :onClickHandler="handleTypingButton"
      ></RoundButton>
      <RoundButton
        type="clear"
        :onClickHandler="handleClearButton"
      ></RoundButton>
      <RoundButton
        type="download"
        :onClickHandler="handleDownloadButton"
      ></RoundButton>
      <RoundButton
        type="upload"
      ></RoundButton>
    </div>
    <MainFrame></MainFrame>
    <SidePanel
      :cards="this.cards"
      :addCard="addCard"
      :removeCard="removeCard"
      :inserting="this.inserting"
      :onClickAddNewCancel="onClickAddNewCancel"
      :onClickAddNew="onClickAddNew"
      :expendCard="expendCard"
      :enableTyping="this.enableTyping"
      :updateDelay="updateDelay"
    ></SidePanel>
  </div>
</template>

<script>
import SidePanel from './SidePanel.vue'
import MainFrame from './MainFrame.vue'
import RoundButton from './RoundButton.vue'
import { isCookieEnabled, getCookie, setCookie } from 'tiny-cookie'
import { download } from '../helper/fileHelper'

export default {
  data () {
    return {
      cards: [],
      inserting: false,
      enableTyping: false
    }
  },
  mounted () {
    // see if cookie is enabled
    try {
      if (isCookieEnabled()) {
        let previousData = JSON.parse(getCookie('cards'))
        if (previousData instanceof Array) {
          // set data
          this.cards = previousData
        }
      }
    } catch (err) {
      console.log(err)
    }
  },
  beforeUpdate () {
    // update to cookie
    try {
      if (isCookieEnabled()) {
        setCookie('cards', JSON.stringify(this.cards))
      }
    } catch (err) {
      console.log(err)
    }
  },
  components: {
    'SidePanel': SidePanel,
    'MainFrame': MainFrame,
    'RoundButton': RoundButton
  },
  methods: {
    // add a new card element to the list
    addCard (name, direction, height, weighted, unweighted, learning, delay) {
      // TODO add validation methods

      this.cards.push({
        type: 'card',
        title: name,
        initialized: true,
        expended: false,
        direction: direction,
        height: height,
        weighted: weighted,
        unweighted: unweighted,
        learning: learning,
        delay: delay
      })
      this.inserting = false
      this.expendCard(this.cards.length - 1)
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
    expendCard (index) {
      if (index >= 0 && index < this.cards.length) {
        for (let i = 0; i < this.cards.length; i++) {
          this.cards[i].expended = false
        }
        this.cards[index].expended = true
      }
    },
    updateDelay (index, value) {
      this.cards[index].delay = value
    },
    // button handlers
    handleClearButton () {
      this.cards = []
    },
    handleTypingButton () {
      this.enableTyping = !this.enableTyping
    },
    handleDownloadButton () {
      download('poses', this.cards)
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
.floating-button-set {
  position: absolute;
  float: left;
  z-index: 999;
  top: 2%;
  left: 22.8%;
}
</style>
