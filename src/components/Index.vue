<template>
  <div class="index">
    <input ref="upload" type="file" style="display: none" @change="onChangeUpload" />
    <div class="floating-button-set">
      <RoundButton
        type="play"
        :onClickHandler="handlePlayButton"
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
        :onClickHandler="handleUploadButton"
      ></RoundButton>
    </div>
    <MainFrame :playFrame="this.playFrame"></MainFrame>
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
import { validateCard, matchFrameIndex } from '../helper/cardHelper'
import axios from 'axios'

export default {
  data () {
    return {
      cards: [],
      inserting: false,
      enableTyping: false,

      // playing
      playing: false,
      currentCard: 0,
      clock: (new Date()).getTime(), // millieseconds since 1970-1-1
      playFrame: 0
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
      if (!this.playing) {
        this.inserting = true
      }
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
        this.playFrame = matchFrameIndex(this.cards[index])
      }
    },
    updateDelay (index, value) {
      if (!this.playing) {
        this.cards[index].delay = value
      }
    },
    // button handlers
    handlePlayButton () {
      // set playing flag and counter
      if (this.cards.length > 0) {
        this.playing = true
        this.currentCard = 0
        this.inserting = false
        // start playing
        let play = () => {
          // get the delay of the current card
          let currentDelay = parseFloat(this.cards[this.currentCard].delay)
          // convert into millieseconds
          let currentDelayMilli = currentDelay * 1000
          // get current time
          let currentClock = (new Date()).getTime()
          if (currentClock - this.clock >= currentDelayMilli) { // should end this card
            if (this.currentCard + 1 === this.cards.length) {
              // end playing
              console.log('play end')
              this.playing = false
              this.playFrame = 0
            } else {
              // go to the next card
              this.currentCard += 1
              // reset timer
              this.clock = (new Date()).getTime()
              this.playFrame = matchFrameIndex(this.cards[this.currentCard])
              console.log('play card: ', this.currentCard)
              setTimeout(play, 1)
            }
          } else {
            // continue with the current card
            setTimeout(play, 1)
          }
        }

        // go!
        console.log('start play')
        this.clock = (new Date()).getTime() // set the first timer
        this.playFrame = matchFrameIndex(this.cards[this.currentCard])
        console.log('play card: ', this.currentCard)
        play()
      }
    },
    handleClearButton () {
      this.cards = []
    },
    handleTypingButton () {
      this.enableTyping = !this.enableTyping
    },
    handleDownloadButton () {
      if (!this.playing) {
        download('poses', this.cards)
      }
    },
    handleUploadButton () {
      if (!this.playing) {
        this.$refs.upload.click()
      }
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
