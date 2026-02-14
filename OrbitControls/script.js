// script.js

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'dat.gui';

// Set window size.
let width = window.innerWidth
let height = window.innerHeight

// Create new GUI.
const gui = new GUI()
console.log('start')

// Scene.
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x262626)
console.log(scene.children)

// Renderer.
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Lights.
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const light = new THREE.PointLight(0xffffff, 0.5)
light.position.set(0, 10, 10)

// Shadow.
light.castShadow = true
light.shadow.mapSize.width = 1024
light.shadow.mapSize.height = 1024
light.shadow.camera.near = 0.5
light.shadow.camera.far = 100
scene.add(light)

// Camera.
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
camera.position.set(0, 0, 10)
const camFolder = gui.addFolder('Camera')
camFolder.add(camera.position, 'z', 10, 80, 1)
camFolder.open()
const controls = new OrbitControls(camera, renderer.domElement)
controls.autoRotate = true
const ocFolder = gui.addFolder('Orbit Controls')
ocFolder.add(controls, 'enabled')
ocFolder.add(controls, 'enableZoom')
ocFolder.add(controls, 'enableRotate')
ocFolder.add(controls, 'enablePan')
ocFolder.add(controls, 'autoRotate')
ocFolder.add(controls, 'autoRotateSpeed', 1, 100, 1)
ocFolder.open()

// Responsiveness.
window.addEventListener('resize', () => {
    width = window.innerWidth
    height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})

// Axes.
const axesHelper = new THREE.AxesHelper(20)
scene.add(axesHelper)

// Plane.
const planeGeometry = new THREE.PlaneGeometry(1000, 1000)
const plane = new THREE.Mesh(
    planeGeometry,
    new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
)
plane.rotateX(-Math.PI / 2)
plane.position.y = -1.75
plane.receiveShadow = true
scene.add(plane)

// Cube.
console.log('cube')
const geometry = new THREE.BoxGeometry(2, 2, 2)
const matArray = [
    new THREE.MeshPhongMaterial({ color: 0xff8b8b }),
    new THREE.MeshPhongMaterial({ color: 0xf5ffa2 }),
    new THREE.MeshPhongMaterial({ color: 0xb5dccd }),
    new THREE.MeshPhongMaterial({ color: 0xaaffa2 }),
    new THREE.MeshPhongMaterial({ color: 0x9fd1ff }),
    new THREE.MeshPhongMaterial({ color: 0xffaef7 }),
]
const cube = new THREE.Mesh(geometry, matArray)
cube.position.set(0, 0.5, 0)
cube.rotateX(Math.PI / 6)
cube.castShadow = true
cube.receiveShadow = true
camera.lookAt(cube.position)
scene.add(cube)

// Animation.
function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.005
    cube.rotation.y += 0.01
    controls.update()
    renderer.render(scene, camera)
}

// Rendering the scene.
const container = document.querySelector('#container')
container.append(renderer.domElement)
renderer.render(scene, camera)

animate()
console.log(scene.children)
