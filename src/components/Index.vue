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
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    let geometry = new THREE.BoxGeometry(1, 1, 1)
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    let cube = new THREE.Mesh(geometry, material)
    console.log(scene)
    scene.add(cube)

    camera.position.z = 5

    let animate = function () {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.1
      cube.rotation.y += 0.1
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
