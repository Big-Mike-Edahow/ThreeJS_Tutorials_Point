// script.js

const width = window.innerWidth                                             // Sizes.
const height = window.innerHeight

const scene = new THREE.Scene()                                             // Scene.
scene.background = new THREE.Color(0x262626)

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)    // Camera.
camera.position.set(0, 0, 10)

const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5)                             // Cube.
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const renderer = new THREE.WebGL1Renderer()                                 // Renderer.
renderer.setSize(width, height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const container = document.querySelector('#threejs-container')              // Rendering the scene.
container.append(renderer.domElement)
renderer.render(scene, camera)
