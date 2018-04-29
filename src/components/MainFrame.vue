<template>
  <div class="main-frame">
  </div>
</template>

<script>
/* eslint-disable */
// load THREE.js
import * as THREE from 'three'
const OrbitControls = require('three-orbit-controls')(THREE);

export default {
  data () {
    return {}
  },
  mounted () {
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50)
    camera.position.set(0, 10, 25)
    camera.lookAt(scene.position) // look at 0, 0, 0

    const renderer = new THREE.WebGLRenderer({ antialias : true })
    renderer.setSize(this.$el.clientWidth, this.$el.clientHeight)
    this.$el.appendChild(renderer.domElement)

    const control = new OrbitControls(camera, renderer.domElement)
    control.update()

    let mixer, set
    let clock = new THREE.Clock()

    // add a plane as floor
    let groundGeometry = new THREE.PlaneGeometry(20, 20, 8, 8)
    let groundMaterial = new THREE.MeshBasicMaterial({
      color: 0x5f9ea0,
      side: THREE.DoubleSide
    })
    let ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotateX( - Math.PI / 2)
    scene.add(ground)

    // add stickman model
    const loader = new THREE.JSONLoader()
    loader.load('static/model/stickman.json', (geometry) => {
      let female = new THREE.SkinnedMesh(geometry, 
        new THREE.MeshBasicMaterial({ 
          color: 0xff0080,
          skinning: true
        })
      )
      scene.add(female)

      // mixer = new THREE.AnimationMixer(female)
      // let clips = geometry.animations
      // console.log(clips.length)
      // let walkingClip = clips[0]
      // let walkCycle = mixer.clipAction(walkingClip)
      // walkCycle.play()

      // set = true
    })

    let animate = function () {
      if (set) {
        mixer.update(clock.getDelta())
      }
      requestAnimationFrame(animate)
      control.update()
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
