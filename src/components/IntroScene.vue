<template>
   <div >
<div class="container-3d">

</div>
<h2>SCENE 3D {{  isDarkMode? "Theme NUIT" : "theme JOUR" }}</h2>
</div> 
</template>

<script> 
 import * as THREE from "three";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default {
  name: 'IntroScene',
  props: {
    isDarkMode: Boolean
  },
  methods: {
 renderScene() {
      this.renderer.render(this.scene, this.camera);
    },
    init(){
  this.scene = new THREE.Scene();
  this.scene.background = null;
  this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  this.renderer.outputEncoding = THREE.sRGBEncoding;
  this.renderer.setPixelRatio(window.devicePixelRatio);
    }
  },created(){
this.init()
  },
  data:()=>({
  scene: undefined,
        camera: undefined,
        renderer: undefined

  })

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  text-align: center;
}
</style>
 