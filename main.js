import "./style.css";

import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
renderer.render(scene, camera);

const Texture = new THREE.TextureLoader().load("./normal.jpg");
const torusGeometry = new THREE.TorusGeometry( 7, 1.3, 2, 50 );
const torusMaterial = new THREE.MeshStandardMaterial({color: 0x3c1f40, normalMap: Texture});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);

scene.add(torus);

const sphereGeometry = new THREE.SphereGeometry( 5, 100, 20);
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x8e3142, normalMap: Texture});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

scene.add(sphere);

const hemisphereLight = new THREE.HemisphereLight(0x808080);
hemisphereLight.position.set(0,10,30);
const directionalLight = new THREE.DirectionalLight(0xffffff);
scene.add(hemisphereLight, );

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.12, 12, 12);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar);

const moonTexture = new THREE.TextureLoader().load("./moon.jpg");
const surfaceTexture = new THREE.TextureLoader().load("./normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: surfaceTexture
  })
);

moon.position.set(20,0,0);

const pivot = new THREE.Object3D();
pivot.add(moon);

scene.add(pivot);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.009;

  sphere.rotation.x = torus.rotation.x;
  sphere.rotation.y = torus.rotation.y;
  sphere.rotation.z = torus.rotation.z;

  moon.rotateX(0.01);
  moon.rotateY(0.01);

  pivot.rotateY(0.01);
  pivot.rotateZ(0.005);
  
  controls.update();

  renderer.render(scene, camera);
}

animate();