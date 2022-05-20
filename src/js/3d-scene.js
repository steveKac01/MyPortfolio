
//---------------------------- Ini
//Can be edited
//object Config?
const PATH_TO_MODEL = "model/portfolioSpot.glb";
const PATH_TO_TEXTURES = ["model/light_texture.png", "model/dark_1.png"]

//Debug animation
//let PATH_TO_TEXTURE = []
let iFrameDark = 0
const SPEED_IFRAME = 10  //Check later to seamless animation
let moveFrame = 1;
let iTexture = 1;
//loading textures
PATH_TO_TEXTURE.push("model/light_texture.png")
for (let i = 1; i < 4; i++) { //Delete wasted textures
    PATH_TO_TEXTURE.push("model/dark_" + i + ".png")
}

//end debug

const CANVA_SIZE = [350, 250] //A virer
const IS_ALPHA = true;
const USE_ANTIALIASING = true;
const AMBIENT_LIGHT_INTENSITY = 1;
const SPEED_AMBIENT = 0.04
const LIMIT_SWITCH_AMBIENT_LIGHT = 0.2
const CAMERA_ZOOM = 30;
const CAMERA_POSITION = [0.2603, 2.8707, 4.5465]
const IS_AUTO_ROTATE = true;
const SPEED_AUTO_ROTATE = 0.4;
const SPEED_USER_ROTATE = 0.05;
const IS_ZOOM_ENABLE = false;
const camFactor = 6;
let switchTime = false; //Possible denlever ?
let isDarkMode = false;

//Renderer
const renderer = new THREE.WebGLRenderer({ alpha: IS_ALPHA, antialias: USE_ANTIALIASING })
renderer.setSize(CANVA_SIZE[0], CANVA_SIZE[1])
renderer.outputEncoding = THREE.sRGBEncoding //better color

//Camera
const camera = new THREE.OrthographicCamera(-CANVA_SIZE[0] / 2, CANVA_SIZE[0] / 2, CANVA_SIZE[1] / 2, - CANVA_SIZE[1] / 2, 1, 1000);
camera.position.set(CAMERA_POSITION[0], CAMERA_POSITION[1], CAMERA_POSITION[2])
camera.zoom = CAMERA_ZOOM;
camera.lookAt(0, -0.3, 0);

//Lights
//Ambient light
var ambientLight = new THREE.AmbientLight(0xffffff, AMBIENT_LIGHT_INTENSITY);

//Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true
controls.enablePan = false
controls.autoRotate = IS_AUTO_ROTATE;
controls.enableZoom = IS_ZOOM_ENABLE;
controls.autoRotateSpeed = SPEED_AUTO_ROTATE;
controls.rotateSpeed = SPEED_USER_ROTATE;
//UP DOWN
controls.maxPolarAngle = 1.06
controls.minPolarAngle = 0.9287
//LEFT RIGHT 
controls.maxAzimuthAngle = 0.565
controls.minAzimuthAngle = -0.305

//Scene
const myScene = new THREE.Scene()
const containerScene = document.querySelector(".container-3d")
containerScene.append(renderer.domElement)

myScene.add(camera);
myScene.add(ambientLight);

//Loaders model
var test;
const loader2 = new GLTFLoader();
loader2.load(PATH_TO_MODEL, function (gltf) {

    var model = gltf.scene;
    test = model;
    model.position.set(0, -0.8, 0);
    model.scale.set(1, 1, 1);
    myScene.add(gltf.scene);

}, undefined, function (error) {
    console.error("Problem when loading model: " + error);
});

//Load textures
const textureLoader = new THREE.TextureLoader();
/*
const textures = [];

for(let i=0; i<PATH_TO_TEXTURE.length;i++)
{
    textures.push = textureLoader.load(PATH_TO_TEXTURE[i])
}
textures.forEach(texture => {
    texture.encoding = THREE.sRGBEncoding;
    texture.flipY = false;
});
*/

const textures = [textureLoader.load(PATH_TO_TEXTURE[0], () => {
    console.log("loading texture")
}, () => {
    console.log("Impossible de charger la texture")

}), textureLoader.load(PATH_TO_TEXTURE[1]), textureLoader.load(PATH_TO_TEXTURE[2])
    , textureLoader.load(PATH_TO_TEXTURE[3])
    , textureLoader.load(PATH_TO_TEXTURE[4])
    , textureLoader.load(PATH_TO_TEXTURE[5])
    , textureLoader.load(PATH_TO_TEXTURE[6])
]

textures.forEach(texture => {
    texture.encoding = THREE.sRGBEncoding;
    texture.flipY = false;
});

console.log(textures)

const applyTexture = (number)=>{
    test.traverse(function (obj) {
        if (obj.name == "voxel") {
            obj.material.map = textures[number];
        }
    })
}

//Change textures
function changeTexture() {
    if (isDarkMode) {
        applyTexture(1);
    } else {
        applyTexture(0);
    }

    /*
    test.traverse(function (obj) {
        if (obj.name == "voxel") {
            if (isDarkMode) {
                obj.material.map = textures[1];
            } else {
                obj.material.map = textures[0];
            }
            obj.material.needsUpdate = true;
            obj.material.map.needsUpdate = true;
        }*//* else if (obj.name == "Plane") {

        //isDarkMode?obj.visible=false:obj.visible=true;
        if (isDarkMode) {
           obj.visible = false;
 
       } else {
           obj.visible = true;
       }
    }
});*/
}

//Helper GUI
//const axesHelper = new THREE.AxesHelper( 5 );
//myScene.add( axesHelper );


controls.update()

function animate() {

    requestAnimationFrame(animate)
    CameraRotateBounce()
    controls.update();
    renderer.render(myScene, camera);
    if (switchTime) {
        if (isDarkMode) {
            if (ambientLight.intensity > LIMIT_SWITCH_AMBIENT_LIGHT) {
                ambientLight.intensity -= SPEED_AMBIENT;
            } else {

                changeTexture(isDarkMode)
                ambientLight.intensity = 1;
                switchTime = false;
            }
        } else {
            changeTexture(isDarkMode)
            switchTime = false;
            ambientLight.intensity = 1;

        }
    }
    animateDarkMode(isDarkMode)
}

/*

controls.maxAzimuthAngle = 0.55
controls.minAzimuthAngle = -0.300
*/

function CameraRotateBounce() {
    if (controls.getAzimuthalAngle() < -0.300) {
        if (controls.autoRotateSpeed > 0.0) {
            controls.autoRotateSpeed *= -1
        }
    }
    if (controls.getAzimuthalAngle() > 0.55) {
        if (controls.autoRotateSpeed < 0.0) {
            controls.autoRotateSpeed *= -1
        }
    }
}

//Resize
window.onresize = function () {

    if (window.innerHeight > window.innerWidth) { //mobile
        renderer.setSize(window.innerWidth, window.innerHeight);
    } else {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    // update the camera
    camera.left = -window.innerWidth / camFactor;
    camera.right = window.innerWidth / camFactor;
    camera.top = window.innerHeight / camFactor;
    camera.bottom = -window.innerHeight / camFactor;
    camera.updateProjectionMatrix();


    if (window.innerWidth < 760) {
        controls.enabled = false;
    } else {
        controls.enabled = true;

    }
};

/* debug methode.
function logIt() {
    //console.log(camera.position) //Debug pour placer la camera a la bonne position
    //console.log(controls.getPolarAngle());
    //console.log(camera.position);
    //console.log(camera.zoom)
    //console.log(controls.getAzimuthalAngle())
    //controls.maxAzimuthAngle = 0.57
}*/


window.onresize()

animate();






let btnTheme = document.querySelector(".btn-theme")
const iconesTheme = document.querySelectorAll(".right-items > div")

btnTheme.addEventListener("click", () => {
    switchTheme()

})

function switchTheme() {
    if (isDarkMode) {
        isDarkMode = false;
        iFrameDark = 0;
        iTexture = 1;
        moveFrame = 1;
        switchTime = true;
    } else {
        isDarkMode = true;
        switchTime = true;
    }
    // changeTexture(isDarkMode);
    document.documentElement.classList.toggle("dark-mode")
    toggleIcon()
}



function animateDarkMode(isDarkMode) {
    if (isDarkMode) {
        iFrameDark++;
        if (iFrameDark > SPEED_IFRAME) {
            iTexture += moveFrame;
            //Changer ca ne va pas
            if (iTexture == PATH_TO_TEXTURE.length - 1) {
                moveFrame *= -1
            } else if (iTexture == 1) {
                moveFrame *= -1
            }

            //APPLY NEW TEXTURE HERE 
        applyTexture(iTexture)


            iFrameDark = 0
        }

    }
   

}



function toggleIcon() {
    iconesTheme.forEach(icone => {

        icone.classList.toggle("hide")

    });

}

