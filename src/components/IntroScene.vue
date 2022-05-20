<template>
   <div >
<div id="container">

</div>
<h2>SCENE 3D {{  isDarkMode? "Theme NUIT" : "theme JOUR" }}</h2>
</div> 
</template>

<script> 
 
import * as THREE from "three";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default {
  name: 'IntroScene',
  props: {
    isDarkMode: Boolean
  },
  methods: {
  },
 
  created(){
    console.clear();
    this.scene= new THREE.Scene();
    this.scene.background = new THREE.Color('skyblue');
        

  
  },
 mounted(){

//Configuration
const IS_ALPHA = true;
const USE_ANTIALIASING = true;
const CANVA_SIZE = [350, 250] //A virer
const CAMERA_ZOOM = 30;
const CAMERA_POSITION = [0.2603, 2.8707, 4.5465]
const AMBIENT_LIGHT_INTENSITY = 1;
//const PATH_TO_MODEL = require(`../assets/resource/portfolioSpot.glb`)
const PATH_TO_MODEL = "portfolioSpot.glb"
const container = document.querySelector("#container")

//Camera
const camera = new THREE.OrthographicCamera(-CANVA_SIZE[0] / 2, CANVA_SIZE[0] / 2, CANVA_SIZE[1] / 2, - CANVA_SIZE[1] / 2, 1, 1000);
camera.position.set(CAMERA_POSITION[0], CAMERA_POSITION[1], CAMERA_POSITION[2])
camera.zoom = CAMERA_ZOOM;
//camera.lookAt(0, -0.3, 0);


//Renderer
const renderer = new THREE.WebGLRenderer({ alpha: IS_ALPHA, antialias: USE_ANTIALIASING })
renderer.setSize(CANVA_SIZE[0], CANVA_SIZE[1])
renderer.setPixelRatio(window.devicePixelRatio) //on test
renderer.outputEncoding = THREE.sRGBEncoding //better color

//Lights
//Ambient light
var ambientLight = new THREE.AmbientLight(0xffffff, AMBIENT_LIGHT_INTENSITY);

//append
//const containerScene = document.querySelector(".container-3d")
//containerScene.append(renderer.domElement)

//Scene
this.scene.add(camera)
this.scene.add(ambientLight)


//Loader GTFL
const loader = new GLTFLoader();

loader.load(PATH_TO_MODEL, function (gltf)  {
//let test
    var model = gltf.scene;
  //  test = model;
    model.position.set(0, -0.8, 0);
    model.scale.set(1, 1, 1);
    this.scene.add(gltf.scene);

}, undefined, function (error) {
    console.error("Problem when loading model: " + error);
});

container.append(renderer.domElement);
renderer.render(this.scene, camera);

/*

// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth,container.clientHeight);

// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

// render, or 'create a still image', of the scene
renderer.render(this.scene, camera);
  */},
  data:()=>({
    scene:undefined,  
  })

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  text-align: center;
}
</style>
 