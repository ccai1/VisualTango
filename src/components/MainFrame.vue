<template>
  <div class="main-frame">
  </div>
</template>

<script>
/* eslint-disable */
// load THREE.js
import * as THREE from 'three'
import OC from 'three-orbit-controls'

export default {
  data () {
    return {}
  },
  mounted () {
    const scene = new THREE.Scene()
    const OrbitControls = OC(THREE)

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50)
    camera.position.set(0, 10, 25)
    camera.lookAt(scene.position) // look at 0, 0, 0

    const renderer = new THREE.WebGLRenderer({ antialias : true })
    renderer.setSize(this.$el.clientWidth, this.$el.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.$el.appendChild(renderer.domElement)

    const control = new OrbitControls(camera, renderer.domElement)
    control.update()

    let mixer, set
    let clock = new THREE.Clock()

    // add some light sources
    let light1 = new THREE.PointLight(0xffffff, 0.5, 100)
    let light2 = new THREE.PointLight(0xffffff, 0.5, 100)
    let light3 = new THREE.PointLight(0xffffff, 0.5, 100)
    let light4 = new THREE.PointLight(0xffffff, 0.5, 100)
    let light5 = new THREE.PointLight(0xffffff, 0.5, 100)
    // four corner
    light1.position.set(20, 20, 20)
    light2.position.set(-20, 20, 20)
    light3.position.set(20, 20, -20)
    light4.position.set(-20, 20, -20)
    // one at bottom
    light5.position.set(0, -20, 0)
    scene.add(light1)
    scene.add(light2)
    scene.add(light3)
    scene.add(light4)
    scene.add(light5)

    // add a plane as floor
    let groundGeometry = new THREE.PlaneGeometry(20, 20, 8, 8)
    let groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x5f9ea0,
      side: THREE.DoubleSide,
      metalness: 0.0
    })
    let ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotateX( - Math.PI / 2)
    scene.add(ground)

    // add stickman model
    const loader = new THREE.JSONLoader()
    loader.load('static/model/stickman.json', (geometry) => {
      let female = new THREE.SkinnedMesh(geometry, 
        new THREE.MeshStandardMaterial({ 
          color: 0xff0080,
          skinning: true,
          metalness: 0.0
        })
      )
      scene.add(female)

      mixer = new THREE.AnimationMixer(female)
      let clips = geometry.animations
      let walkingClip = clips[0]
      let walkCycle = mixer.clipAction(walkingClip)
      walkCycle.play()

      mixer.update(1)

      // set = true
    })

    let animate = function () {
      if (set) {
        mixer.update(2)
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
  border-radius: 3px;
  box-shadow: 0px 0px 10px 1px;
}
</style>
