<template>
  <div class="main-frame">
  </div>
</template>

<script>
// load THREE.js
import * as THREE from 'three'
import { matchFrameIndex } from '../helper/cardHelper'
import OC from 'three-orbit-controls'

export default {
  data () {
    return {
      scene: undefined,
      camera: undefined,
      control: undefined,
      renderer: undefined,
      mixer0: undefined,
      mixer1: undefined,
      prevFrame0: 0,
      prevFrame1: 0,
    }
  },
  mounted () {
    this.scene = new THREE.Scene()
    let OrbitControls = OC(THREE)

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50)
    this.camera.position.set(0, 10, 25)
    this.camera.lookAt(this.scene.position) // look at 0, 0, 0

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.$el.appendChild(this.renderer.domElement)

    this.control = new OrbitControls(this.camera, this.renderer.domElement)
    this.control.update()

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
    this.scene.add(light1)
    this.scene.add(light2)
    this.scene.add(light3)
    this.scene.add(light4)
    this.scene.add(light5)

    // add a plane as floor
    let groundGeometry = new THREE.PlaneGeometry(18, 18, 8, 8)
    let groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x966f33,
      side: THREE.DoubleSide,
      metalness: 0.0
    })
    let ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotateX(- Math.PI / 2)
    ground.rotateZ(- Math.PI / 4)
    ground.position.y = 2
    this.scene.add(ground)

    // add stickman model
    let loader0 = new THREE.JSONLoader()
    loader0.load('static/model/stickman.json', (geometry) => {
      let female = new THREE.SkinnedMesh(geometry,
        new THREE.MeshStandardMaterial({
          color: 0xff0080,
          skinning: true,
          metalness: 0.0
        })
      )

      female.position.x = 1
      female.position.z = 4
      female.position.y = 2
      female.rotation.y = 5 * Math.PI / 4

      this.scene.add(female)

      this.mixer0 = new THREE.AnimationMixer(female)
      let clips = geometry.animations
      let clip = clips[0]
      let cycle = this.mixer0.clipAction(clip)
      cycle.play()

      // use standing as the initial pose
      console.log('initial frame 0: ', this.cPlayFrame)
      this.mixer0.update(this.cPlayFrame || 0)
      this.prevFrame0 = this.cPlayFrame || 0
    })

    let loader1 = new THREE.JSONLoader()
    loader1.load('static/model/stickman.json', (geometry) => {
      let male = new THREE.SkinnedMesh(geometry,
        new THREE.MeshStandardMaterial({
          color: 0x39b7cd,
          skinning: true,
          metalness: 0.0
        })
      )

      male.position.x = 0
      male.position.z = 1
      male.position.y = 2
      male.rotation.y = Math.PI / 4

      this.scene.add(male)
      // this.scene.add(male)

      this.mixer1 = new THREE.AnimationMixer(male)
      let clips = geometry.animations
      let clip = clips[0]
      let cycle = this.mixer1.clipAction(clip)
      cycle.play()

      // use standing as the initial pose
      console.log('initial frame 1: ', this.playFrame)
      this.mixer1.update(this.playFrame || 0)
      this.prevFrame1 = this.playFrame || 0

    })

    this.animate()
  },
  watch: {
    playFrame: function (val) {
      console.log('switch to frame: ', val)
      this.mixer0.update((val - this.prevFrame0) || (-this.prevFrame0))
      this.prevFrame0 = val
    },
    cPlayFrame: function (val) {
      console.log('switch to frame: ', val)
      this.mixer1.update((val - this.prevFrame1) || (-this.prevFrame1))
      this.prevFrame1 = val
    },
  },
  props: [
    'playFrame',
    'cPlayFrame',
  ],
  methods: {
    animate () {
      requestAnimationFrame(this.animate)
      this.control.update()
      this.renderer.render(this.scene, this.camera)
    },
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
