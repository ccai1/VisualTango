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

      <button style="border: 0px; background-color: #DC143C" @click="removeCard(index)">remove</button>
      <br /><br />
    </div>
  </div>
  <div v-else-if="type === 'card' && initialized && !expended"
    class="card"
    @click="expendCard(index)"
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
      <select v-model="selected.direction">
        <option v-for="opts in selectOptions.direction" :key="opts" :value="opts">{{ opts }}</option>
      </select>
      <br />

      <strong>height:</strong>
      <select v-model="selected.height">
        <option v-for="opts in selectOptions.height" :key="opts" :value="opts">{{ opts }}</option>
      </select>
      <br />

      <strong>weighted:</strong>
      <select v-model="selected.weighted">
        <option v-for="opts in selectOptions.weighted" :key="opts" :value="opts">{{ opts }}</option>
      </select>
      <br />

      <strong>unweighted:</strong>
      <select v-model="selected.unweighted">
        <option v-for="opts in selectOptions.unweighted" :key="opts" :value="opts">{{ opts }}</option>
      </select>
      <br />

      <strong>learning:</strong>
      <select v-model="selected.learning">
        <option v-for="opts in selectOptions.learning" :key="opts" :value="opts">{{ opts }}</option>
      </select>
      <br />

      <button
        style="border: 0px; background-color: #228B22"
        @click="onAddingNewSubmit(
          name,
          selected.direction,
          selected.height,
          selected.weighted,
          selected.unweighted,
          selected.learning
        )"
      >submit</button>
      <button
        style="border: 0px; background-color: #FFD700"
        @click="onAddingNewCancel()"
      >cancel</button>
      <br /><br />
    </div>
  </div>
  <div v-else
    class="card"
    style="color: gray"
  >
    + add new
  </div>
</template>

<script>
export default {
  data () {
    return {
      // title of this card
      name: '',
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
    'removeCard'
  ]
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
</style>
