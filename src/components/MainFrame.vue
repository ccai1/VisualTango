<template>
  <div class="main-frame">
  </div>
</template>

<script>
/* eslint-disable */
// load THREE.js
import * as THREE from 'three'

export default {
  data () {
    return {}
  },
  mounted () {
    const scene = new THREE.Scene()
    // add axis for debugging
    // x is red, y is green, z is blue
    const axesHelper = new THREE.AxesHelper(10)
    scene.add(axesHelper)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.set(10, 10, 10)
    camera.lookAt(scene.position) // look at 0, 0, 0

    const renderer = new THREE.WebGLRenderer({ antialias : true })
    renderer.setSize(this.$el.clientWidth, this.$el.clientHeight)
    this.$el.appendChild(renderer.domElement)

    let mixer, set
    let clock = new THREE.Clock()

    const loader = new THREE.JSONLoader()
    loader.load('static/model/stickman_animated.json', (geometry) => {
      let male = new THREE.SkinnedMesh(geometry, 
        new THREE.MeshBasicMaterial({ 
          color: 0x0080ff,
          skinning: true
        })
      )
      // let female = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0080 }))
      scene.add(male)
      // scene.add(female)
      // console.log(male.position)
      // male.position.set(3, 0, -6)
      // female.position.set(-3, 0, -6)

      mixer = new THREE.AnimationMixer(male)
      let clips = geometry.animations
      let walkingClip = clips[0]
      let walkCycle = mixer.clipAction(walkingClip)
      walkCycle.play()

      set = true
    })

    let animate = function () {
      if (set) {
        mixer.update(clock.getDelta())
      }
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    animate()
  }
}
</script>

<style scoped>
.main-frame {
  position: relative;
  top: 1%;
  bottom: 1%;
  right: 1%;
  width: 77%;
  height: 98%;
  background-color: #000000;
  float: right;
}
canvas {
  position: relative;
  width: 100%;
  height: 100%
}
</style>
