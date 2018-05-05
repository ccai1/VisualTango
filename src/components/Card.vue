<template>
  <div v-if="type === 'card' && initialized && expended"
    class="card"
  >
    <strong>{{ this.title }}</strong><br />
    <div style="text-align: left; padding-left: 5px">
      <strong>direction:</strong> {{ this.direction }}<br />
      <strong>height:</strong> {{ this.height }}<br />
      <strong>weighted:</strong> {{ this.weighted }}<br />
      <strong>unweighted:</strong> {{ this.unweighted }}<br />
      <strong>learning:</strong> {{ this.learning }}<br />
      <strong>delay:</strong> <input type="text" :value="this.timeDelay" style="width: 40px" @change="onChangeDelay" /> sec<br />

      <button class="card-button" style="border: 0px; background-color: #DC143C" @click="removeCard(index)">remove</button>
      <br /><br />
    </div>
  </div>
  <div v-else-if="type === 'card' && initialized && !expended"
    class="card"
    @click="expendCard(index)"
    style="cursor: pointer"
  >
    {{ this.title }}
  </div>
  <div v-else-if="type === 'card' && !initialized"
    class="card"
  >
    <div style="text-align: left; padding-left: 5px">
      <strong>title:</strong>
      <input type="text" v-model="name" />
      <br />

      <strong>direction:</strong>
      <input v-if="this.enableTyping" type="text" v-model="selected.direction" />
      <select v-else v-model="selected.direction">
        <option v-for="opts in selectOptions.direction" :key="opts" :value="opts">{{ opts }}</option>
      </select>
      <br />

      <strong>height:</strong>
      <input v-if="this.enableTyping" type="text" v-model="selected.height" />
      <select v-else v-model="selected.height">
        <option v-for="opts in selectOptions.height" :key="opts" :value="opts">{{ opts }}</option>
      </select>
      <br />

      <strong>weighted:</strong>
      <input v-if="this.enableTyping" type="text" v-model="selected.weighted" />
      <select v-else v-model="selected.weighted">
        <option v-for="opts in selectOptions.weighted" :key="opts" :value="opts">{{ opts }}</option>
      </select>
      <br />

      <strong>unweighted:</strong>
      <input v-if="this.enableTyping" type="text" v-model="selected.unweighted" />
      <select v-else v-model="selected.unweighted">
        <option v-for="opts in selectOptions.unweighted" :key="opts" :value="opts">{{ opts }}</option>
      </select>
      <br />

      <strong>learning:</strong>
      <input v-if="this.enableTyping" type="text" v-model="selected.learning" />
      <select v-else v-model="selected.learning">
        <option v-for="opts in selectOptions.learning" :key="opts" :value="opts">{{ opts }}</option>
      </select>
      <br />

      <strong>delay:</strong>
      <input type="text" v-model="delay" style="width: 40px" /> sec
      <br />

      <button
        class="card-button"
        style="border: 0px; background-color: #228B22"
        @click="onAddingNewSubmit(
          name,
          selected.direction,
          selected.height,
          selected.weighted,
          selected.unweighted,
          selected.learning,
          delay
        )"
      >submit</button>
      <button
        class="card-button"
        style="border: 0px; background-color: #FFD700"
        @click="onAddingNewCancel()"
      >cancel</button>
      <br /><br />
    </div>
  </div>
  <div v-else
    class="card"
    style="color: gray; cursor: pointer;"
  >
    + add new
  </div>
</template>

<script>
export default {
  beforeUpdate () {
    this.selected.direction = this.enableTyping ? '' : 'north'
    this.selected.height = this.enableTyping ? '' : 'high'
    this.selected.weighted = this.enableTyping ? '' : 'left'
    this.selected.unweighted = this.enableTyping ? '' : 'collected'
    this.selected.learning = this.enableTyping ? '' : 'neutral'
  },
  data () {
    return {
      // title of this card
      name: '',
      // time delay for a new card
      delay: '',
      // dropdowns for adding a new card
      selected: {
        direction: 'north',
        height: 'high',
        weighted: 'left',
        unweighted: 'collected',
        learning: 'neutral'
      },
      selectOptions: {
        direction: [
          'north',
          'northwest',
          'northeast'
        ],
        height: [
          'high',
          'low'
        ],
        weighted: [
          'left',
          'right'
        ],
        unweighted: [
          'collected',
          'crossed-forward',
          'forward',
          'backward',
          'in-air-forward',
          'in-air-backward',
          'slide-out-side',
          'wrapped-around-front'
        ],
        learning: [
          'neutral',
          'forward',
          'backward',
          'toward-weighted',
          'toward-unweighted'
        ]
      }
    }
  },
  props: [
    'index',
    'title',
    'type', // card or add new
    'initialized', // true or false
    'expended', // true or false

    // pose description
    'direction', // north, northwest, northeast
    'height', // high or low
    'weighted', // left or right
    'unweighted', // collected, crossed forward, forward, backward, in air forward
    // in air backward, slide out, wrapped around front leg
    'learning', // neutral, forward, backward, towards weighted, towards unweighted

    // submit and cancel buttons handlers for adding new card
    'onAddingNewSubmit',
    'onAddingNewCancel',

    // expend a card
    'expendCard',

    // remove button
    'removeCard',

    // typing flag
    'enableTyping',

    // time delay for a initialized card
    'timeDelay',
    // a callback to update delay
    'updateDelay'
  ],
  methods: {
    onChangeDelay (event) {
      this.updateDelay(this.index, event.target.value)
    }
  }
}
</script>

<style scoped>
.card {
  position: relative;
  width: 96%;
  top: 2%;
  left: 2%;
  bottom: 2%;
  background-color: #FFEBCD;
  box-shadow: 0px 0px 5px 1px gray;
  border-radius: 3px;
}
.card-button {
  border-radius: 3px;
  box-shadow: 0px 0px 1px 1px gray;
  margin: 3px;
  cursor: pointer;
}
</style>
