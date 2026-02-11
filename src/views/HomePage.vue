<template>
    <div id="page" class="h-full">
      <canvas class="-z-10 fixed top-0 left-0 bg-blue-200 " ref="canvas">
      </canvas>
    </div>
    <button class="bg-red-400 rounded-2xl h-15 w-100 absolute bottom-10 left-190" @click="Play">Крутить Наггетс!</button>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let model;
const canvas = ref(null);
function Play(){
  gsap.to(model.rotation,{
    y:model.rotation.y + Math.PI * 2
  })
}
onMounted(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 1, 16);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    antialias: true,
    alpha: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  // lights
  scene.add(new THREE.AmbientLight(0xffffff, 1));

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(5, 5, 5);
  scene.add(light);

  // load GLB
  const loader = new GLTFLoader();

  loader.load("/models/nuggets.glb", (gltf) => {
    model = gltf.scene;
    model.position.y=1
    scene.add(model);
    // rotation animation
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
</script>