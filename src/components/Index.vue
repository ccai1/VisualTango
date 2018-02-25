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
      canvas: '<div></div>'
    }
  },
  mounted () {
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.set(0, 0, 15)
    camera.lookAt(scene.position)

    const renderer = new THREE.WebGLRenderer({ antialias : true })
    renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9)
    document.body.appendChild(renderer.domElement)

    const loader = new THREE.JSONLoader()
    loader.load('static/model/stickman.json', (geometry) => {
      let male = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x0080ff }))
      let female = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0080 }))
      scene.add(male)
      scene.add(female)
      male.position.set(5, 0, 0)
      female.position.set(-5, 0, 0)
    })

    let animate = function () {
      requestAnimationFrame(animate)
      // cube.rotation.x += 0.1
      // cube.rotation.y += 0.1
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
