<template>

  <!-- one card -->

  <div v-if="type === 'card' && initialized && expended"
    class="card"
  >

  <!-- card name -->

    <strong>{{ this.title }}</strong><br />
    <div style="text-align: left; padding-left: 5px">

      <!-- direction -->

      <strong>direction:</strong>
      <input v-if="this.enableTyping" type="text" v-model="selected.direction" @change="onChangeData" />
      <select v-else v-model="selected.direction" @change="onChangeData">
        <option v-for="opts in selectOptions.direction" :key="opts" :value="opts">{{ opts }}</option>
      </select>
      <br />

      <!-- height -->

      <strong>height:</strong>
      <input v-if="this.enableTyping" type="text" v-model="selected.height" @change="onChangeData" />
      <select v-else v-model="selected.height" @change="onChangeData">
        <option v-for="opts in selectOptions.height" :key="opts" :value="opts">{{ opts }}</option>
      </select>
      <br />

      <!-- weighted -->

      <strong>weighted:</strong>
      <input v-if="this.enableTyping" type="text" v-model="selected.weighted" @change="onChangeData" />
      <select v-else v-model="selected.weighted" @change="onChangeData">
        <option v-for="opts in selectOptions.weighted" :key="opts" :value="opts">{{ opts }}</option>
      </select>
      <br />

      <!-- unweighted -->

      <strong>unweighted:</strong>
      <input v-if="this.enableTyping" type="text" v-model="selected.unweighted" @change="onChangeData" />
      <select v-else v-model="selected.unweighted" @change="onChangeData">
        <option v-for="opts in selectOptions.unweighted" :key="opts" :value="opts">{{ opts }}</option>
      </select>
      <br />

      <!-- leaning -->

      <strong>leaning:</strong>
      <input v-if="this.enableTyping" type="text" v-model="selected.leaning" @change="onChangeData" />
      <select v-else :value="this.leaning" @change="onChangeData">
        <option v-for="opts in selectOptions.leaning" :key="opts" :value="opts">{{ opts }}</option>
      </select>
      <br />

      <!-- delay -->

      <strong>delay:</strong> <input type="text" v-model="delay" style="width: 40px" @change="onChangeData" /> sec<br />

      <button v-if="this.hasChanges" class="card-button" style="border: 0px; background-color: #FFD700" @click="onClickSubmitChanges">submit</button>
      <button v-if="this.hasChanges" class="card-button" style="border: 0px; background-color: #F8F8FF" @click="onClickCancelChanges">cancel</button>
      <button class="card-button" style="border: 0px; background-color: #DC143C; color: white;" @click="removeCard(index)">remove</button>
      <br /><br />
    </div>
  </div>


<!-- not expended -->

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

      <strong>leaning:</strong>
      <input v-if="this.enableTyping" type="text" v-model="selected.leaning" />
      <select v-else v-model="selected.leaning">
        <option v-for="opts in selectOptions.leaning" :key="opts" :value="opts">{{ opts }}</option>
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
          selected.leaning,
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
  <div v-else-if="!isSample"
    class="card"
    style="color: #2c3e50; cursor: pointer;"
  >
    + add new
  </div>
</template>

<script>
export default {
  data () {
    let d = {
      // title of this card
      name: '',
      // time delay for a new card
      delay: '',
      // a flag whether there are changes to the card
      hasChanges: false,
      // dropdowns for adding a new card
      selected: {
        direction: 'north',
        height: 'high',
        weighted: 'left',
        unweighted: 'collected',
        leaning: 'neutral'
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
        leaning: [
          'neutral',
          'forward',
          'backward',
          'toward-weighted',
          'toward-unweighted'
        ]
      }
    }

    if (this.timeDelay) {
      d.delay = this.timeDelay
    }
    if (this.direction) {
      d.selected.direction = this.direction
    }
    if (this.height) {
      d.selected.height = this.height
    }
    if (this.weighted) {
      d.selected.weighted = this.weighted
    }
    if (this.unweighted) {
      d.selected.unweighted = this.unweighted
    }
    if (this.leaning) {
      d.selected.leaning = this.leaning
    }

    return d
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
    'leaning', // neutral, forward, backward, towards weighted, towards unweighted

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

    // callback to update card
    'submitChanges',

    //in library?
    'isSample',

  ],
  methods: {
    onChangeData (event) {
      this.hasChanges = true
    },
    onClickSubmitChanges (event) {
      let changes = {
        direction: this.selected.direction,
        height: this.selected.height,
        weighted: this.selected.weighted,
        unweighted: this.selected.unweighted,
        leaning: this.selected.leaning,
        delay: this.delay
      }
      if (this.submitChanges(this.index, changes)) {
        this.hasChanges = false
      }
    },
    onClickCancelChanges (event) {
      if (this.timeDelay) {
        this.delay = this.timeDelay
      }
      if (this.direction) {
        this.selected.direction = this.direction
      }
      if (this.height) {
        this.selected.height = this.height
      }
      if (this.weighted) {
        this.selected.weighted = this.weighted
      }
      if (this.unweighted) {
        this.selected.unweighted = this.unweighted
      }
      if (this.leaning) {
        this.selected.leaning = this.leaning
      }
      this.hasChanges = false
    }
  }
}
</script>

<style scoped>
.card {
  position: center;
  width: 95%;
  top: 2%;
  left: 2%;
  bottom: 2%;
  background-color: #FFFAF0;
  color: #2c3e50;
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
