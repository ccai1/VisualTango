<template>
  <div class="index">
    <input id="file-upload" ref="upload" type="file" style="display: none" @change="onChangeUpload" />
    <MainFrame :playFrame="this.playFrame" :cPlayFrame="this.cPlayFrame"></MainFrame>

      <div class="sidePanel-container">
        <SidePanel
          float="left"
          :listOfMoves="listOfMoves"
          :handleOneMove="handleOneMove"
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

    <div class="sidePanel-container">
      <SidePanel
        float="right"
        :listOfMoves="listOfMoves"
        :handleOneMove="handleOneMove"
      ></SidePanel>
    </div>

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

    // if (this.listOfMoves.length === 0) {
    //   console.log('indexHere')
    //   //console.log(preloadData)
    //   //this.listOfMoves[0] = preloadData
    //   //this.listOfMoves[1] = preloadData
    //   //console.log(this.listOfMoves[0]) works
    //   //console.log(this.listOfMoves[1])
    // }
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
    findComplement(card) {

        // bunch of matching stuff
        let frame = 0
        if (card == undefined) {
          frame = 0
        }
        else {
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

          frame = parseInt(Mapping[direction][height][weighted][unweighted][leaning])
        }
        return frame
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
          let currentDelay = parseFloat(oneMove[this.currentCardIndex].delay)
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
              this.cPlayFrame = this.findComplement(this.currentCard)
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
        this.cPlayFrame = this.findComplement(this.currentCard)
        move()
      }
    },
    // handleDanceButton () {
    //   console.log('starting loop')
    //   setTimeout(this.handleMoveButton(), 7000)
    // },
    handleClearButton () {
      this.cards = []
      this.playFrame = 0
      this.cPlayFrame = 0
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
</style>
