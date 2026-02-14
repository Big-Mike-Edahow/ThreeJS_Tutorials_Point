// script.js

import * as THREE from 'three'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

let width = window.innerWidth                                               // Set window size.
let height = window.innerHeight

const gui = new GUI()                                                       // Create new GUI.

const scene = new THREE.Scene()                                             // Create new scene.
scene.background = new THREE.Color(0xFFFFFF)

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)    // Create new camera.
camera.position.set(0, 0, 10)
const camFolder = gui.addFolder('Camera')
camFolder.add(camera.position, 'z').min(10).max(60).step(10)
camFolder.open()

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 5)                    // Set up ambient lighting.
scene.add(ambientLight)

const planeSize = 10                                                        // Textures.
const loader = new THREE.TextureLoader()
const texture = loader.load('images/checkerboard.png')
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.magFilter = THREE.NearestFilter
const repeats = planeSize / 2
texture.repeat.set(repeats, repeats)

class StringToNumberHelper {
    constructor(obj, prop) {
        this.obj = obj
        this.prop = prop
    }
    get value() {
        return this.obj[this.prop]
    }
    set value(v) {
        this.obj[this.prop] = parseFloat(v)
    }
}

const wrapModes = {
    ClampToEdgeWrapping: THREE.ClampToEdgeWrapping,
    RepeatWrapping: THREE.RepeatWrapping,
    MirroredRepeatWrapping: THREE.MirroredRepeatWrapping
}

function updateTexture() {
    texture.needsUpdate = true
}

gui
    .add(new StringToNumberHelper(texture, 'wrapS'), 'value', wrapModes)
    .name('texture.wrapS')
    .onChange(updateTexture)
gui
    .add(new StringToNumberHelper(texture, 'wrapT'), 'value', wrapModes)
    .name('texture.wrapT')
    .onChange(updateTexture)
gui.add(texture.repeat, 'x', 0, 5, 0.01).name('texture.repeat.x')
gui.add(texture.repeat, 'y', 0, 5, 0.01).name('texture.repeat.y')

const geometry = new THREE.PlaneGeometry(planeSize, planeSize)              // Construct new plane.
const material = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide
})

const board = new THREE.Mesh(geometry, material)
board.position.set(0, 0, 0)
scene.add(board)

window.addEventListener('resize', () => {                                   // Responsiveness.
    width = window.innerWidth
    height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})

const renderer = new THREE.WebGLRenderer()                                  // Renderer.
renderer.setSize(width, height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

function animate() {                                                        // Main animation loop.
    requestAnimationFrame(animate)                                          // Set up the next frame.
    renderer.render(scene, camera)                                          // Render the scene.
}

const container = document.querySelector('#threejs-container')              // Append canvas to HTML.
container.append(renderer.domElement)

renderer.render(scene, camera)
console.log(scene.children)

animate()
