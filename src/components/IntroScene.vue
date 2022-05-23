<template>
  <div class="container-3d">
    <div class="container-about">
      <div class="intro">
        <div class="left">
          <div>
            <h2>Steve Kaci</h2>
          </div>
          <div>Développeur Web en devenir | Dark mode : {{ isDarkMode }}</div>
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
    //turnOffLight:false,
    oldSwitch: false,
    iFrameDark: 1, //mon tableau de texture sombre commence à 1 se termine a 2 pour le moment
    timerSwitch:0
  }),
  methods: {

    /**
     * Animation du mode sombre, deux états possibles.
     */
    animateDarkMode() {
      const SPEED_IFRAME = 1;
      const LIMIT_SWITCH_FRAME = 20; //j'aimerais un random ici a modif
      this.timerSwitch += SPEED_IFRAME;

      // Changement de texture de la scène. 
      if(this.timerSwitch>LIMIT_SWITCH_FRAME)
      { 
        //Changement de frame.
        this.iFrameDark= this.iFrameDark == 1 ? 2 : 1

        //reset du timer.
        this.timerSwitch = 0
      
        //Changement de texture.
        this.scene.children[1].children[1].material.map = this.textures[this.iFrameDark]
      }
    },

    /**
     * Change la texture de la scene 3D selon le thème sélectionné.
     * Une limière omni diminue avant de passer au sombre.
     */
    switchTheme() {
      // const SPEED_AMBIENT = 0.04
      // const LIMIT_SWITCH_AMBIENT_LIGHT = 0.2

      if (this.isDarkMode) {
        //get ambient light

        //Thème sombre
        this.applyTexture(1);
      }

      if (!this.isDarkMode) {
        //Thème light
        this.applyTexture(0);
      }
    },

    applyTexture(itexture) {
      this.scene.children[1].children[1].material.map = this.textures[itexture];
    },

    /**
     * Mise à jour de la taille de la scène 3D au redimensionnement de la fenêtre
     */
    changeDimensions() {
      const camFactor = 6;

      if (window.innerHeight > window.innerWidth) {
        //mobile
        this.render.setSize(window.innerWidth, window.innerHeight);
      } else {
        this.render.setSize(window.innerWidth, window.innerHeight);
      }
      // update the camera
      this.camera.left = -window.innerWidth / camFactor;
      this.camera.right = window.innerWidth / camFactor;
      this.camera.top = window.innerHeight / camFactor;
      this.camera.bottom = -window.innerHeight / camFactor;
      this.camera.updateProjectionMatrix();

      if (window.innerWidth < 760) {
        this.controls.enabled = false;
      } else {
        this.controls.enabled = true;
      }
    },

    /**
     * La boucle principal de l'animation de la scène 3D
     */
    animate() {

      //Changement de thème.
      if (this.oldSwitch != this.isDarkMode) {
        this.switchTheme();
      }

      //Animation du mode sombre.
      if(this.isDarkMode)
      {
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
  },
  mounted() {
    window.addEventListener("resize", this.changeDimensions);

    /**
     * Configuration de la scène
     */
    const PATH_TO_MODEL = "model/portfolioSpot.glb";
    const PATH_TO_TEXTURES = "model/textures/";
    const CANVA_SIZE = [350, 250]; //A virer
    const IS_ALPHA = true;
    const USE_ANTIALIASING = true;
    const AMBIENT_LIGHT_INTENSITY = 1;
    //const SPEED_AMBIENT = 0.04;
    //const LIMIT_SWITCH_AMBIENT_LIGHT = 0.2;
    const CAMERA_ZOOM = 30;
    const CAMERA_POSITION = [0.2603, 2.8707, 4.5465];
    const IS_AUTO_ROTATE = true;
    const SPEED_AUTO_ROTATE = 0.4;
    const SPEED_USER_ROTATE = 0.05;
    const IS_ZOOM_ENABLE = false;

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
    /** Pour de meilleurs couleurs */
    this.render.outputEncoding = THREE.sRGBEncoding;
    this.render.setPixelRatio(window.devicePixelRatio);
    this.render.setSize(window.innerWidth, window.innerHeight);

    /**
     * Chargement des textures
     * todo: use webpack & optimisation
     */
    const textureLoader = new THREE.TextureLoader();
    this.textures = [
      textureLoader.load(
        //    require( "../assets/logo.png" )
        PATH_TO_TEXTURES + "light_texture.png"
      ),
      textureLoader.load(PATH_TO_TEXTURES + "dark_1.png"),
      textureLoader.load(PATH_TO_TEXTURES + "dark_2.png"),
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
    });

    /**
     * Initialisation des lumières
     */
    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      AMBIENT_LIGHT_INTENSITY
    );

    /**
     * Initialisation des contrôles
     */
    this.controls = new OrbitControls(this.camera, this.render.domElement);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.autoRotate = IS_AUTO_ROTATE;
    this.controls.enableZoom = IS_ZOOM_ENABLE;
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
  },
};
</script>


<style scoped>
.container-3d {
  display: flex;
  justify-content: center;
  position: relative;

  min-height: 500px;
}

.intro {
  display: flex;
  justify-content: space-between;
  padding: 5%;
}

.container-about {
  background-color: var(--alpha-background);
  color: #cccccc;
  position: absolute;
  /*Si on veut revenir sup ca*/
  bottom: 0;
  width: 100%;
  /* transition: var(--background-color) 3s;*/
}

.container-about > p {
  padding: 0 5%;
}

h2 {
  font-size: 1.7em;
}

.left {
  font-size: 1.2em;
}

.photo {
  width: 100px;
  height: 100px;
}

.photo > img {
  border-radius: 80%;
  width: 100%;
  border: #ffffff solid 2px;
}

@media screen and (min-width: 768px) {
  .container-global {
    padding: 0 23%;
  }

  canvas {
    /*overflow: unset;*/
  }

  .navBar {
    margin-right: 10%;
  }

  .container-about {
    /*Si on veut revenir sup ca*/
    bottom: 30px;
    max-width: 810px;
  }

  .list-contact {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .space-icone {
    padding: 0 6%;
  }
}
</style>
 