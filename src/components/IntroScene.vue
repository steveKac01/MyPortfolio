<template>
  <div class="container-3d" id="about"  >
    <div class="container-about">
      <div class="intro">
        <div class="left">
          <div>
            <h2>Steve Kaci</h2>
          </div>
          <div class="sub-title">Développeur Web en devenir |</div>
        </div>
        <div class="right">
          <div class="photo">
            <img :src="require(`../assets/img/photo.png`)" alt="" />
          </div>
        </div>
      </div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt vel
        ipsam sint eum veniam, ea soluta debitis unde? Atque quas quae quos ad
        repellat expedita cumque vero architecto obcaecati suscipit explicabo
        libero fugit, ratione magnam dolorem recusandae nobis soluta quis
        exercitationem perspiciatis reprehenderit!
      </p>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default {
  name: "IntroScene",
  props: {
    isDarkMode: {
      type: Boolean,
      default: false,
    },
    mousePosition: {
      type: Object,
    }
  },

  data: () => ({
    scene: undefined,
    render: undefined,
    camera: undefined,
    controls: undefined,
    textures: undefined,
    modelScene: undefined,
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    oldSwitch: false,
    iFrameDark: 1,
    timerSwitch: 0,
    switchFrameDark: 0,
    clock: new THREE.Clock(),
    clock2: new THREE.Clock(),
    mixer: undefined,    
    mixer2: undefined,
//SOURIS ANIMATION
    mouse:undefined,
    neck:undefined,
  }),
  methods: {
    /**
     * Obtenir un nombre aléatoire pour switch de frame en mode sombre.
     */
    getRandomSwitchFrameTimer() {
      const min = 80;
      const max = 200;
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    /**
     * Animation du mode sombre, deux états possibles.
     */
    animateDarkMode() {
      const SPEED_IFRAME = 1;
      this.timerSwitch += SPEED_IFRAME;

      // Changement de texture de la scène.
      if (this.timerSwitch > this.switchFrameDark) {
        /**
         * Changement de texture avec la lumière adaptée.
         */
        if (this.iFrameDark == 1) {
          this.iFrameDark = 2;
          this.scene.children[0].intensity = 0.8;
        } else {
          this.iFrameDark = 1;
          this.scene.children[0].intensity = 1;
        }

        //reset du timer.
        this.timerSwitch = 0;
        this.switchFrameDark = this.getRandomSwitchFrameTimer();

        //Changement de texture.
        this.scene.children[1].children[3].material.map =
          this.textures[this.iFrameDark];
      }
    },

    /**
     * Change la texture de la scene 3D selon le thème sélectionné.
     * Une limière omni diminue avant de passer au sombre.
     */
    switchTheme() {
      if (this.isDarkMode) {
        //Thème dark
        this.applyTexture(1);
      }

      if (!this.isDarkMode) {
        //Thème daytime
        this.applyTexture(0);
        this.scene.children[0].intensity = 1;
      }
    },

    /**
     * Modifie la texture du modèle.
     * iTexture l'index de la texture à appliquer.
     */
    applyTexture(iTexture) {
      this.scene.children[1].children[3].material.map = this.textures[iTexture];
    },

    /**
     * Mise à jour de la taille de la scène 3D
     */
    changeDimensions() {
      const camFactor = 6;

      if (window.innerHeight > window.innerWidth) {
        //mobile
        this.render.setSize(window.innerWidth, window.innerHeight);
      } else {
        this.render.setSize(window.innerWidth, window.innerHeight);
      }
      // maj de la camera
      this.camera.left = -window.innerWidth / camFactor;
      this.camera.right = window.innerWidth / camFactor;
      this.camera.top = window.innerHeight / camFactor;
      this.camera.bottom = -window.innerHeight / camFactor;
      this.camera.updateProjectionMatrix();

      /**
       * Disable la caméra pour le mobile.
       */

      /*
      if (window.innerWidth < 760) {
        this.controls.enabled = false
      } else {
        this.controls.enabled = true
      }*/
    },

    /**
     * La boucle principal de l'animation de la scène 3D
     */
    animate() {
   
   //console.log(this.mousePosition)
   
   if(this.mousePosition != undefined){
    this.moveBone(this.mousePosition,this.neck,40,30)
   }
      //Changement de thème.
      if (this.oldSwitch != this.isDarkMode) {
        this.switchTheme();
      }

      //Animations.
      if (this.mixer) {
        this.mixer.update(this.clock.getDelta());
        this.mixer2.update(this.clock2.getDelta());
      }

      //Animation du mode sombre.
      if (this.isDarkMode) {
        this.animateDarkMode();
      }

      requestAnimationFrame(this.animate);
      this.cameraRotateBounce();
      this.controls.update();
      this.render.render(this.scene, this.camera);
      this.oldSwitch = this.isDarkMode;

    },

    /**
     * Rebond de la caméra de la scène 3D
     */
    cameraRotateBounce() {
      if (this.controls.getAzimuthalAngle() < -0.3) {
        if (this.controls.autoRotateSpeed > 0.0) {
          this.controls.autoRotateSpeed *= -1;
        }
      }
      if (this.controls.getAzimuthalAngle() > 0.55) {
        if (this.controls.autoRotateSpeed < 0.0) {
          this.controls.autoRotateSpeed *= -1;
        }
      }
    },
    /**
     * TEST SOURIS a enlever todo
     */
      mouseEnter() {
                console.log('mouseneter');
                this.popup = true;
                this.$el.addEventListener('mousemove', this.mouseMove());
            },
            mouseLeave() {
                console.log('mouseleave');
                this.popup = false;
                this.$el.removeEventListener('mousemove', this.mouseMove());
            },
            mouseMove() {
            this.mouse ={ x:event.clientX, y:event.clientY}
              if(this.neck){
               this.moveBone(this.mouse,this.neck,40,30)
              }

            },
 moveBone(mouse, bone, degreeLimitX, degreeLimitY) {
  let degrees = this.getMouseDegrees(mouse.x, mouse.y, degreeLimitX, degreeLimitY);
  if(bone){
  bone.rotation.y = THREE.Math.degToRad(degrees.x);
  bone.rotation.x = THREE.Math.degToRad(degrees.y);
  }
},
getMouseDegrees(x, y,  degreeLimitX, degreeLimitY) {
  let dx = 0,
      dy = 0,
      xdiff,
      xPercentage,
      ydiff,
      yPercentage;

  let w = { x: window.innerWidth, y: window.innerHeight };

// Tête regarde à gauche (rotation entre 0 et - degreeLimitX)
  
   // 1. If cursor is in the left half of screen
  if (x <= w.x / 2) {
    // 2. Get the difference between middle of screen and cursor position
    xdiff = w.x / 2 - x;  
    // 3. Find the percentage of that difference (percentage toward edge of screen)
    xPercentage = (xdiff / (w.x / 2)) * 100;
    // 4. Convert that to a percentage of the maximum rotation we allow for the neck
    dx = ((degreeLimitX * xPercentage) / 100) * -1; }
// Tête regarde à droite (rotation entre 0 et degreeLimitX)
  if (x >= w.x / 2) {
    xdiff = x - w.x / 2;
    xPercentage = (xdiff / (w.x / 2)) * 100;
    dx = (degreeLimitX * xPercentage) / 100;
  }

  // Tête levée (entre 0 et -degreeLimitY)
  if (y <= w.y / 2) {
    ydiff = w.y / 2 - y;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    // Je multiplie les degrés limites pour faire monter la tête plus haut
    dy = (((degreeLimitY * 1.2) * yPercentage) / 100) * -1;
    }
  
  // Tête baissée (entre 0 et degreeLimitY)
  if (y >= w.y / 2) {
    ydiff = y - w.y / 2;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    dy = ((degreeLimitY*0 ) * yPercentage) / 100;
  }
  return { x: dx, y: dy };
}

  },

  mounted() {
    window.addEventListener("resize", this.changeDimensions);
 
    /**
     * Configuration de la scène
     */
    const PATH_TO_MODEL = "model/portfolioSpotAnimation.glb";
    const CANVA_SIZE = [350, 250];
    const IS_ALPHA = true;
    const USE_ANTIALIASING = true;
    const CAMERA_ZOOM = 30;
    const CAMERA_POSITION = [0.2603, 2.8707, 4.5465];
    const IS_AUTO_ROTATE = true;
    const SPEED_AUTO_ROTATE = 0.4;
    const SPEED_USER_ROTATE = 0.05;
    const IS_ZOOM_ENABLED = false;
    const AMBIENT_LIGHT = 1;
    this.switchFrameDark = this.getRandomSwitchFrameTimer();

    /**
     * Initialisation de la scène
     */
    this.scene = new THREE.Scene();

    /**
     * Initialisation du moteur de rendu
     */
    this.render = new THREE.WebGLRenderer({
      alpha: IS_ALPHA,
      antialias: USE_ANTIALIASING,
    });
    this.render.setSize(CANVA_SIZE[0], CANVA_SIZE[1]);
    this.render.outputEncoding = THREE.sRGBEncoding;
    this.render.setPixelRatio(window.devicePixelRatio);
    this.render.setSize(window.innerWidth, window.innerHeight);

    /**
     * Chargement des textures
     * todo: use webpack & optimisation
     */
    const textureLoader = new THREE.TextureLoader();
    this.textures = [
      textureLoader.load(require(`../assets/scene/light_texture.png`)),
      textureLoader.load(require(`../assets/scene/dark_1.png`)),
      textureLoader.load(require(`../assets/scene/dark_6.png`)),
    ];

    this.textures.forEach((texture) => {
      //Obtenir un meilleur rendu.
      texture.encoding = THREE.sRGBEncoding;
      texture.flipY = false;
    });

    /**
     * Initialisation de la caméra
     */
    this.camera = new THREE.OrthographicCamera(
      -CANVA_SIZE[0] / 2,
      CANVA_SIZE[0] / 2,
      CANVA_SIZE[1] / 2,
      -CANVA_SIZE[1] / 2,
      1,
      1000
    );
    this.camera.position.set(
      CAMERA_POSITION[0],
      CAMERA_POSITION[1],
      CAMERA_POSITION[2]
    );
    this.camera.zoom = CAMERA_ZOOM;
    this.camera.lookAt(0, -0.3, 0);

    /**
     * Chargement du modèle 3D
     */
    const loader = new GLTFLoader();

    loader.load(PATH_TO_MODEL, (gltf) => {
      const model = gltf.scene;
      model.position.set(0, -0.8, 0);
      model.scale.set(1, 1, 1);

      this.scene.add(model);

      this.mixer = new THREE.AnimationMixer(model);
      this.mixer2 = new THREE.AnimationMixer(model);

      //let test = new THREE.AnimationMixer(model);
      let fileAnimations = gltf.animations;
      let fileAnimations2 = gltf.animations;

      let clip2 = THREE.AnimationClip.findByName(fileAnimations2, "plante-move");
        let clip = THREE.AnimationClip.findByName(fileAnimations, "perso-idle");
        
      clip = this.mixer.clipAction(clip);
      clip2 = this.mixer2.clipAction(clip2);
      clip.play();
      clip2.play();

      //get the bone neck
      model.traverse(o => {
 
  if (o.isBone && o.name === 'neck') { 
    this.neck = o;
  }
  
});
    
    });

    //animations
    /*
 mixer = new THREE.AnimationMixer(this.scene.children[1]);
  console.log("false")
 console.log(mixer)
*/

    //console.log(this.scene)
    /**
     * Initialisation des lumières
     */
    const ambientLight = new THREE.AmbientLight(0xffffff, AMBIENT_LIGHT);

    /**
     * Initialisation des contrôles
     */
    this.controls = new OrbitControls(this.camera, this.render.domElement);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.autoRotate = IS_AUTO_ROTATE;
    this.controls.enableZoom = IS_ZOOM_ENABLED;
    this.controls.autoRotateSpeed = SPEED_AUTO_ROTATE;
    this.controls.rotateSpeed = SPEED_USER_ROTATE;

    /**
     * Restriction de la caméra
     */
    /** Limitation Haut et bas de la caméra */
    this.controls.maxPolarAngle = 1.06;
    this.controls.minPolarAngle = 0.9287;
    /** Limitation gauche et droite de la caméra */
    this.controls.maxAzimuthAngle = 0.565;
    this.controls.minAzimuthAngle = -0.305;

    /**
     * Ajouter les éléments à la scène et l'attacher au DOM
     */
    this.scene.add(ambientLight);
    const container = document.querySelector(".container-3d");
    container.append(this.render.domElement);

    /**
     * Initialisation au chargement
     */
    this.changeDimensions();
    this.animate();

    console.log(this.scene);
  },
  Animation() {},
};
</script>

<style scoped>
@import "@/assets/style/scene.css";
</style>