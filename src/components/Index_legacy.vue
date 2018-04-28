<template>
  <div class="index">
  </div>
</template>

<script>
/* eslint-disable */
/// Import and initialize three.js
import * as THREE from 'three'

export default {
  name: 'VisualTango',
  data () {
    return {
    }
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
    const trackballControls = new THREE.TrackballControls(camera)

    const renderer = new THREE.WebGLRenderer({ antialias : true })
    renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
}
canvas {
  width: 100%;
  height: 100%
}
</style>
