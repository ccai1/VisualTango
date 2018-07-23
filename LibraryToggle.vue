<template>
  <div class="LibraryToggle">
    <h3>library toggle here: </h3>
    <button :class="[open ? $style.active : '', $style.button]" @click="handleClick">
      <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
      </svg>
    </button>
  </div>

</template>

<script>
import {TweenMax, Power4} from 'gsap'

export default {
  name: 'LibraryToggle',
  computed: {
    open () {
      return this.$store.state.ui.libraryOpen
    }
  },
  methods: {
    handleClick () {
      this.$store.dispatch('toggleLibrary')
    }
  }
}

</script>

<style>
</style>
