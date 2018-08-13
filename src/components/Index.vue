<template>
  <div class="index">
    <input id="file-upload" ref="upload" type="file" style="display: none" @change="onChangeUpload" />
    <MainFrame :playFrame="this.playFrame" :cPlayFrame="this.cPlayFrame">
    </MainFrame>

      <div class="sidePanel-container">
        <SidePanel
          float="left"
          :listOfMoves="listOfMoves"
          :handleOneMove="handleOneMove"
          :findComplement="findComplement"
          :updatePlayFrame="updatePlayFrame"
          :updatePlayFrameSample="updatePlayFrameSample"
          :listOfSamples="listOfSamples"
        ></SidePanel>
      </div>

    <div class="floating-button-set">
      <RoundButton
        type="dance"
        :onClickHandler="handleDanceButton"
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

    <form class="speed">
    <fieldset>
        <legend>Speed</legend>
        <div>
            <input type="radio" id="slow" name="drone" @click="slowSpeedHandler()"/>
            <label for="slow">Slow</label>
        </div>

        <div>
            <input type="radio" id="normal" name="drone" @click="normalSpeedHandler()" checked/>
            <label for="normal">Normal</label>
        </div>

        <div>
            <input type="radio" id="fast" name="drone" @click="fastSpeedHandler()"/>
            <label for="fast">Fast</label>
        </div>
    </fieldset>
  </form>

  </div>
</template>

<script>
import MainFrame from './MainFrame.vue'
import RoundButton from './RoundButton.vue'
import { isCookieEnabled, getCookie, setCookie } from 'tiny-cookie'
import { validateCard, matchFrameIndex } from '../helper/cardHelper'
import Mapping from '../helper/animationMapping'
import { download } from '../helper/fileHelper'
import axios from 'axios'
import SidePanel from './SidePanel'
import cross from '../../static/cross.json'
import backStep from '../../static/back-step.json'
import sideStep from '../../static/side-step.json'

export default {
  data () {
    return {
      listOfMoves: [],
      enableTyping: false,
      // playing
      playing: false,
      currentCardIndex: 0,
      currentCard: undefined,
      currentMove: 0,
      clock: (new Date()).getTime(), // millieseconds since 1970-1-1
      playFrame: 0,
      cPlayFrame: 0,
      speedFactor: 1,
      listOfSamples: [],
    }
  },
  mounted () {
    // see if cookie is enabled
    try {
      if (isCookieEnabled()) {
        // let previousData = JSON.parse(getCookie('listOfMoves'))
        // if (previousData instanceof Array) {
        //   // set data
        //   this.listOfMoves = previousData
        // }
      }
    } catch (err) {
      console.log(err)
    }
    this.addSampleMove('Cross', cross)
    this.addSampleMove('Back Step', backStep)
    this.addSampleMove('Side Step', sideStep)
  },
  beforeUpdate () {
    // update to cookie
    try {
      if (isCookieEnabled()) {
        setCookie('listOfMoves', JSON.stringify(this.listOfMoves))
      }
    } catch (err) {
      console.log(err)
    }
  },
  components: {
    'MainFrame': MainFrame,
    'RoundButton': RoundButton,
    'SidePanel': SidePanel,
  },
  methods: {
    addSampleMove(title, move) {
      let data = []
      for (let j = 0; j < move.length; j+=1) {
        data.push(JSON.parse( JSON.stringify( move[j] ) ))
      }
      let copiedMove = {
        name: title,
        cards: data,
        isSample: 'true',
      }
      this.listOfSamples.push(copiedMove)
    },
    updatePlayFrame(moveIndex, index) {
      let card = this.listOfMoves[moveIndex].cards[index]
      this.playFrame = matchFrameIndex(card)
      this.cPlayFrame = matchFrameIndex(this.findComplement(card))
    },
    updatePlayFrameSample(sampleMove, index) {
      console.log('list is', this.listOfSamples)
      let card = this.listOfSamples[sampleMove].cards[index]
      this.playFrame = matchFrameIndex(card)
      this.cPlayFrame = matchFrameIndex(this.findComplement(card))
    },
    slowSpeedHandler() {
      this.speedFactor = 2
    },
    normalSpeedHandler() {
      this.speedFactor = 1
    },
    fastSpeedHandler() {
      this.speedFactor = 0.5
    },
    findComplement(card) {

        let cCard = 0
        // bunch of matching stuff
        if (card != undefined) {
          let direction = card.direction
          let height = card.height //will need to adjust
          let weighted = card.weighted //will need to adjust
          if (card.weighted === 'left') {
            weighted = 'right' }
          else {
            weighted = 'left'}

          let unweighted = card.unweighted
          let leaning = 'neutral'

          // if (card.leaning === 'forward') {
          //   leaning = 'backward'
          // }
          // else {
          //   leaning = 'forward'
          // }

          cCard = {
            type: 'card',
            title: card.title,
            initialized: true,
            expended: card.expended,
            direction: direction,
            height: height,
            weighted: weighted,
            unweighted: unweighted,
            leaning: leaning,
            delay: card.delay
          }
        }
        return cCard

    },
    handleDanceButton () {
      var cur = 0
      // for (let i = 0; i < this.listOfMoves.length; i++) {
      //   for (let j = 0; j < this.listOfMoves[i].length; j++) {
      //     console.log(this.listOfMoves[i][j].title)
      //   }
      // }
      let move = () => {
        let oneMove = this.listOfMoves[cur].cards
        let currentDelay = parseFloat(oneMove[0].delay * (oneMove.length - 1))
        let currentClock = (new Date()).getTime()
        let currentDelayMilli = currentDelay * 1000
        if (currentClock - this.clock >= currentDelayMilli) {
          if (cur == this.listOfMoves.length) {
            console.log('end move')
          }
          else {
            cur += 1
            this.clock = (new Date()).getTime()
            this.handleOneMove(oneMove)
            setTimeout(move, 1)
          }
        }
        else {
          setTimeout(move, 1)
        }
      }
      move()
    },
    handleOneMove(oneMove) {
      // set playing flag and counter
      if (oneMove.length > 0) {
        this.playing = true
        this.currentCardIndex = 0
        this.inserting = false
        // close expended panel
        for (let i = 0; i < oneMove.length; i++) {
          if (oneMove[i].expended) {
            oneMove[i].expended = false
            break
          }
        }
        // start playing
        let move = () => {
          // get the delay of the current card
          let currentDelay = parseFloat(oneMove[this.currentCardIndex].delay) * this.speedFactor
          // convert into millieseconds
          let currentDelayMilli = currentDelay * 1000
          // get current time
          let currentClock = (new Date()).getTime()
          //time spent on this card is >= specified delay
          if (currentClock - this.clock >= currentDelayMilli) { // should end current card
            if (this.currentCardIndex + 1 === oneMove.length) { //if last card in stack, end
              // end playing
              console.log('play end')
              this.playing = false
              this.playFrame = 0
              this.cPlayFrame = 0
            } else { //if not last card, go to the next card
              //console.log('current card', this.currentCardIndex)
              // reset timer
              this.currentCardIndex += 1
              this.clock = (new Date()).getTime()
              this.currentCard = oneMove[this.currentCardIndex]
              this.playFrame = matchFrameIndex(this.currentCard)
              this.cPlayFrame = matchFrameIndex(this.findComplement(this.currentCard))
              console.log('play card: ', this.currentCardIndex)
              setTimeout(move, 1)
            }
          } else {
            // continue with the current card
            // setTimeout: execute the function after the designated time
            setTimeout(move, 1)
          }
        }

        // go!
        this.clock = (new Date()).getTime() // set the first timer
        this.playFrame = matchFrameIndex(oneMove[this.currentCardIndex])
        this.cPlayFrame = 0
        move()
      }
    },
    handleClearButton () {
      this.listOfMoves = []
      this.playFrame = 0
      this.cPlayFrame = 0
    },
    handleTypingButton () {
      this.enableTyping = !this.enableTyping
    },
    handleDownloadButton () {
      if (!this.playing) {
        download('poses', this.listOfMoves)
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
      // clear the value here otherwise it won't work
      // the next time we upload the same file.
      document.getElementById('file-upload').value = ''
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
.sidePanel-container {
  height: 98%;
  padding-top: 0.5%;
  width: 22%;
  overflow: scroll;
}
.speed {
  position: absolute;
  float: right;
  z-index: 999;
  top: 2%;
  left: 90.5%;
  color: white;
}
</style>
