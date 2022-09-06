import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import * as dat from 'dat.gui';

// Debeg
const gui  = new dat.GUI();


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
    width: window.innerWidth ,
    height: window.innerHeight 
};

// Cursor
const cursor = {
    x: 0,
    y: 0
};

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
});

// Scene
const scene = new THREE.Scene();



// Object
function createFloor(){
  const textures_floor = new THREE.TextureLoader().load('/textures/floor_tiles.jpg')
  textures_floor.wrapS = textures_floor.wrapT = THREE.RepeatWrapping;
  textures_floor.offset.set( 0, 0 );
  textures_floor.repeat.set( 8, 8 );

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshBasicMaterial( {map: textures_floor, side: THREE.DoubleSide}),
  )

  mesh.rotation.x = 1.57;
  mesh.position.y = -1.06;

  gui.add(mesh.position,'y',-3,3,0.01);

  document.addEventListener("keydown", onDocumentKeyDown, false);
  function onDocumentKeyDown(event) {

      var speed = 1

      var keyCode = event.which
      if (keyCode == 87) {
        mesh.position.x -= speed
      } else if (keyCode == 83) {
        mesh.position.x += speed
      }	

    };
    mesh.receiveShadow = true;

  return mesh
}

const floor = createFloor();
scene.add(floor)


function createWheels() {
  const geometry = new THREE.CylinderGeometry(7, 7, 4, 50);
  //const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
  const materials = [
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('/textures/wheel_side.jpg'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('/textures/wheel.png'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('/textures/wheel.png'), side: THREE.DoubleSide}),
  ]    
  const wheel = new THREE.Mesh(geometry, materials);
  wheel.castShadow = true;
  return wheel;
}



function createCar() {
  const car = new THREE.Group();
  
  const rearRightWheel = createWheels();
  rearRightWheel.position.y = 6;
  rearRightWheel.position.x = -18;
  rearRightWheel.position.z = 15;
  rearRightWheel.rotation.x = 1.57;
  car.add(rearRightWheel);
  
  const frontRightWheel = createWheels();
  frontRightWheel.position.y = 6;  
  frontRightWheel.position.x = 18;
  frontRightWheel.position.z = 15;
  frontRightWheel.rotation.x = 1.57;
  car.add(frontRightWheel);

  const rearLeftWheel = createWheels();
  rearLeftWheel.position.y = 6;  
  rearLeftWheel.position.x = -18;
  rearLeftWheel.position.z = -15;
  rearLeftWheel.rotation.x = 1.57;
  car.add(rearLeftWheel);

  const frontLeftWheel = createWheels();
  frontLeftWheel.position.y = 6;  
  frontLeftWheel.position.x = 18;
  frontLeftWheel.position.z = -15;
  frontLeftWheel.rotation.x = 1.57;
  car.add(frontLeftWheel);


  const extraWheel = createWheels();
  extraWheel.position.y = 20;  
  extraWheel.position.x = -32;
  extraWheel.position.z = -5;
  extraWheel.rotation.z = 1.57;
  car.add(extraWheel);

var flag;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {

    var speed = 0.1

    var keyCode = event.which
    
    if (keyCode == 87) {
      frontRightWheel.rotation.y -= speed
      rearRightWheel.rotation.y -= speed
      rearLeftWheel.rotation.y -= speed
      frontLeftWheel.rotation.y -= speed
    } else if (keyCode == 83) {
      frontRightWheel.rotation.y += speed
      rearRightWheel.rotation.y += speed
      rearLeftWheel.rotation.y += speed
      frontLeftWheel.rotation.y += speed
    }else if(keyCode == 65){
      
      if(frontRightWheel.rotation.z < 0.3){
        frontRightWheel.rotation.z += speed
        frontLeftWheel.rotation.z += speed
      }

    }else if(keyCode == 68){
      if(frontRightWheel.rotation.z > -0.3){
        frontRightWheel.rotation.z -= speed
        frontLeftWheel.rotation.z -= speed
      }
      
    }
    

    if(keyCode == 32)
    {
      console.log('space here')
      
 
      if(lightX == 300 && lightZ == 300)
      {
        flag = 1;
      }
      else if(lightX==-300 && lightZ == 300)
      {
        flag = 2
      }
      else if(lightX == -300 && lightZ == -300)
      {
        flag = 3
      }
         else if(lightX == 300 && lightZ == -300)
      {
        flag = 4
      }
      lightRotate(flag)    
      console.log('lightX'+lightX+' lightY'+lightZ)
      directionalLight.position.x = lightX
      directionalLight.position.z = lightZ
      directionalLight.updateMatrix()
      directionalLight.updateMatrixWorld()
    }
  };



  const main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 15, 30),
    new THREE.MeshLambertMaterial({ color: 0xA91B0D })
  );
  main.position.y = 12;
  car.add(main);

  const cabin = new THREE.Mesh(
    new THREE.BoxBufferGeometry(40, 12, 30),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
  );
  cabin.position.x = -10;
  cabin.position.y = 25.5;
  car.add(cabin);

  return car;
}




const car = createCar();
scene.add(car);


var lightX = 300;
var lightY = 500;
var lightZ = 300;

const lightRotate = (f) => {
var lightShift = 10
  if(f == 1)
  {
    lightX -= lightShift

  }
  else if(f == 2)
  {
    lightZ -= lightShift
  }
  else if(f == 3)
  {
    lightX += lightShift

  }
  else if(f == 4)
  {
    lightZ += lightShift
  }
}

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(lightX, lightY, lightZ);
directionalLight.castShadow = true;

directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight); 

gui.add(directionalLight.position,'x',-300,300,0.01);
gui.add(directionalLight.position,'y',-600,600,0.01);
gui.add(directionalLight.position,'z',-1400,1400,0.01);


// Camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
const aspectRatio = sizes.width / sizes.height;
const cameraWidth = 150;

// const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(directionalLightCameraHelper)

const cameraHeight = cameraWidth/ aspectRatio;
const camera = new THREE.OrthographicCamera(
  cameraWidth / -2, // left
     cameraWidth / 2 , // right
     cameraHeight / 2 , // top
     cameraHeight / - 2 , // bottom
     -100, 
     10000)
camera.position.set(400, 200, 500)
camera.up.set(0,1,0);
camera.lookAt(0, 0, 0);
scene.add(camera)

const textture_background = new THREE.TextureLoader().load('/textures/background_2.jpg')
scene.background = textture_background





// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 2
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true

renderer.render(scene, camera)
camera.lookAt(0, 10, 0);

// Animate
const clock = new THREE.Clock()


// function getMousePos(e) {
//     return {x:e.clientX,y:e.clientY};
// }

// document.onmousemove=function(e) {
//     var mousecoords = getMousePos(e);
//     console.log('x:'+ mousecoords.x +'y:'+ mousecoords.y);
// };

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()