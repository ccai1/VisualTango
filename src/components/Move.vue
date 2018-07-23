<!-- DELETE BUTTON DOESN'T work
MOVES NOT DRAGGABLE
TOP HTML DOESN'T WORK
do clear and download buttons
 -->

<template>
  <div class="move">
  <input id="file-upload" ref="upload" type="file" style="display: none" @change="onChangeUpload" />
  <h3>Move {{this.moveIndex + 1}}</h3>
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
          @click="testingThisMove()"
    >move</button>
    <button
          class="side-button"
          style="border: 5px; background-color: #DC143C"
          @click="removeThisMove()"
    >delete</button>
    <br>
  </div>
</template>

<script>
import Card from './Card.vue'
import SidePanel from './SidePanel.vue'
import Index from './Index.vue'
import { validateCard, matchFrameIndex } from '../helper/cardHelper'
import preloadData from '../../static/preload.json'
import { isCookieEnabled, getCookie, setCookie } from 'tiny-cookie'
import axios from 'axios'
import Dragglable from 'vuedraggable'

export default {
  components: {
    'SidePanel': SidePanel,
    'Card': Card,
    'Dragglable': Dragglable,
  },
  props: [
    // a list of cards
    'cards',
    'moveIndex',
    'handleOneMove',
    'removeOneMove',
    'addMove',
  ],
  data() {
    return {
      inserting: false,
      enableTyping: false,
      playing: false,
      currentCard: 0,
      inserting: false,
    }
  },
  mounted () {
    // see if cookie is enabled
    // console.log('this.cards', this.cards)
    // console.log('this.listOfCards', this.listOfCards)
    this.$emit('add-move', this.cards)
    try {
      if (isCookieEnabled()) {
        let previousData = JSON.parse(getCookie('this.cards'))
        if (previousData instanceof Array) {
          // set data
          this.cards = previousData
        }
      }
    } catch (err) {
      console.log(err)
    }
    // this.$parent.listOfMoves.push(this.cards)
    // console.log('this.cards after', this.cards)
    // console.log('this.listOfCards after', this.listOfCards)
    // if (this.cards.length === 0) {
    //   //console.log('move')
    //   //this.cards[0] = preloadData
    //   //this.cards[1] = preloadData
    //   this.cards = this.listOfCards
    // }
  },
  beforeUpdate () {
    // update to cookie
    //this.$emit('add-move', this.cards)
    try {
      if (isCookieEnabled()) {
        setCookie('cards', JSON.stringify(this.cards))
      }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    // add a new card element to the list
    testingThisMove () {
      this.handleOneMove(this.cards)
    },
    removeThisMove () {
      console.log('the first one is', this.cards[0].title)
      this.removeOneMove(this.moveIndex)
    },
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
    addCard (name, direction, height, weighted, unweighted, leaning, delay) {
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
        this.cards.push(card)
        this.inserting = false
        this.expendCard(this.cards.length - 1)
      }
    },
    // remove a card by index
    removeCard (index) {
      if (index >= 0 && index <= this.cards.length - 1) {
        this.cards.splice(index, 1)
        this.playFrame = 0
      }
    },
    onClickAddNew () {
      if (!this.playing) {
        this.inserting = true
      }
    },
    onClickAddNewCancel () {
      this.inserting = false
    },
    expendCard (index) {
      if (!this.playing && index >= 0 && index < this.cards.length) {
        for (let i = 0; i < this.cards.length; i++) {
          this.cards[i].expended = false
        }
        this.cards[index].expended = true
        this.playFrame = matchFrameIndex(this.cards[index])
      }
    },
    // card update functions
    submitChanges (index, changes) {
      if (!this.playing) {
        let c = this.cards[index]
        c.direction = changes.direction
        c.height = changes.height
        c.weighted = changes.weighted
        c.unweighted = changes.unweighted
        c.leaning = changes.leaning
        c.delay = changes.delay
        if (validateCard(c)) {
          this.cards[index] = c
          return true
        }
      }
      return false
    },
    onChangeUpload (event) {
      let files = event.target.files || event.dataTransfer.files
      if (files.length === 1) {
        let reader = new FileReader()
        reader.onload = (e) => {
          let uri = e.target.result
          axios.get(uri).then((res) => {
            let data = res.data
            if (data instanceof Array) {
              this.cards = data
            }
          }).catch((err) => {
            console.log(err)
          })
        }
        reader.readAsDataURL(files[0])
      } else {
        console.log('length of files is not 1')
      }
      // clear the value here otherwise it won't work
      // the next time we upload the same file.
      document.getElementById('file-upload').value = ''
    },
  }
}
</script>

<style scoped>
.move {
  top: 1%;
  width: 100%;
  position: relative;
}
.side-button {
  color: white;
  position: relative;
  border-radius: 3px;
  box-shadow: 0px 0px 1px 1px gray;
  cursor: pointer;
}
</style>
