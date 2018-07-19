<template>
  <div class="index">
    <input id="file-upload" ref="upload" type="file" style="display: none" @change="onChangeUpload" />
    <MainFrame :playFrame="this.playFrame" ></MainFrame>
    <!-- <Move @add-move="addMove":ref="movez"></Move>
    <Move @add-move="addMove":ref="movez"></Move>
    <Move @add-move="addMove":ref="movez"></Move> -->

    <!-- <Move @add-move="addMove"></Move>
    <Move @add-move="addMove"></Move>
    <Move @add-move="addMove"></Move> -->
      <div class="move-container">
        <Move v-for="(move, index) in this.listOfMoves"
        :index="index"
        :listOfCards="move.listOfCards"
        >
        </Move>
      </div>
    <!-- <button @click="reverse">Reverse</button> -->


    <div class="floating-button-set">
      <!-- <RoundButton
        type="move"
        :onClickHandler="handleMoveButton"
      ></RoundButton> -->
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
    <!-- <Move v-bind:listOfCards="this.listOfMoves[0]"></Move>
    <Move v-bind:listOfCards="this.listOfMoves[1]"></Move> -->

  </div>
</template>

<script>
import MainFrame from './MainFrame.vue'
import RoundButton from './RoundButton.vue'
import Move from './Move.vue'
import { isCookieEnabled, getCookie, setCookie } from 'tiny-cookie'
import { validateCard, matchFrameIndex } from '../helper/cardHelper'
import preloadData from '../../static/preload.json'
import { download } from '../helper/fileHelper'
import axios from 'axios'

export default {
  data () {
    return {
      listOfMoves: [],
      enableTyping: false,
      // playing
      playing: false,
      currentCard: 0,
      currentMove: 0,
      clock: (new Date()).getTime(), // millieseconds since 1970-1-1
      playFrame: 0

    }
  },
  created() {
    if (this.listOfMoves.length === 0) {
      console.log('created called')
      for (let i = 0; i < 3; i+=1) {
        let move = {
          listOfCards: Array.from(preloadData, x => x),
          index: i
        }
        //console.log('this is one move', move)
        this.addMove(move)
      }
    }
  //   // console.log('listOf 0',this.listOfMoves[0])
  //   // console.log('listOf 1',this.listOfMoves[1])
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
    'Move': Move
  },
  // events: {
  //   addMove (move) {
  //     console.log('move added')
  //     this.listOfMoves.push(move)
  //     console.log('listOfMoves is of length', listOfMoves.length)
  //   },
  // },
  methods: {
    // button handlers
    addMove (move) {
      this.listOfMoves.push(move)
      this.addListOfMoves(this.listOfMoves)
    },
    // addMove(moves) {
    //   this.listOfMoves = moves
    // }
    addListOfMoves(list) {
      this.listOfMoves = list
    },
    // handleMoveButton () {
    //   console.log('move clicked', this.listOfMoves.length)
    //   for (let i = 0; i < this.listOfMoves.length; i++) {
    //     let oneMove = this.listOfMoves[i]
    //     console.log('move', oneMove)
    //     //setTimeout(this.handleOneMove(oneMove), 8000)
    //     this.handleOneMove(oneMove)
    //   }
    // },
    handleOneMove(oneMove) {
      // set playing flag and counter
      if (oneMove.length > 0) {
        this.playing = true
        this.currentCard = 0
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
          let currentDelay = parseFloat(oneMove[this.currentCard].delay)
          // convert into millieseconds
          let currentDelayMilli = currentDelay * 1000
          // get current time
          let currentClock = (new Date()).getTime()
          //time spent on this card is >= specified delay
          if (currentClock - this.clock >= currentDelayMilli) { // should end current card
            if (this.currentCard + 1 === oneMove.length) { //if last card in stack, end
              // end playing
              console.log('play end')
              this.playing = false
              this.playFrame = 0
            } else { //if not last card, go to the next card
              //console.log('current card', this.currentCard)
              // reset timer
              this.currentCard += 1
              this.clock = (new Date()).getTime()
              this.playFrame = matchFrameIndex(oneMove[this.currentCard])
              console.log('play card: ', this.currentCard)
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
        this.playFrame = matchFrameIndex(oneMove[this.currentCard])
        move()
      }
    },
    handleDanceButton () {
      var cur = 0
      // for (let i = 0; i < this.listOfMoves.length; i++) {
      //   for (let j = 0; j < this.listOfMoves[i].length; j++) {
      //     console.log(this.listOfMoves[i][j].title)
      //   }
      // }
      let move = () => {
        let oneMove = this.listOfMoves[cur].listOfCards
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
    // handleDanceButton () {
    //   console.log('starting loop')
    //   setTimeout(this.handleMoveButton(), 7000)
    // },
    handleClearButton () {
      this.cards = []
      this.playFrame = 0
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
.move-container {
  width: 22%;
  top: 1%;
  height: 99%;
  overflow: scroll;
}

</style>
