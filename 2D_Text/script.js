// script.js

import * as THREE from 'three'                                              // Import Three JS libraries.

let width = window.innerWidth                                               // Set window size.
let height = window.innerHeight

const canvas = document.createElement('canvas')                             // Create 2D canvas.
const ctx = canvas.getContext('2d')                                         // Get canvas 2D context.
const size = 256                                                            // Width & Height of canvas.

const scene = new THREE.Scene()                                             // Scene
scene.background = new THREE.Color(0x20B2AA)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)                    // Lights.
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 20
pointLight.position.y = 30
pointLight.position.z = 40
scene.add(pointLight)

const camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000)     // New Perspective Camera.
camera.position.z = 500
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true })               // New WebGL Renderer.
renderer.setSize(width, height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
const container = document.querySelector('#threejs-container')              // Append canvas to HTML.
container.append(renderer.domElement)

const texture = new THREE.Texture(canvas)                                   // Cube.
const material = new THREE.MeshStandardMaterial({ map: texture })
const geometry = new THREE.BoxGeometry(250, 250, 250)
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
canvas.width = canvas.height = size

window.addEventListener('resize', () => {                                   // Responsiveness.
    width = window.innerWidth
    height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})

function changeCanvas() {                                                   // Write the text on canvas.
    ctx.font = '35pt Arial'
    ctx.fillStyle = 'blue'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Three JS!', canvas.width / 2, canvas.height / 2)
}

function animate() {                                                        // Main animation loop.
    requestAnimationFrame(animate)
    changeCanvas()
    texture.needsUpdate = true
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    renderer.render(scene, camera)
}

renderer.render(scene, camera)                                              // Render the scene.
requestAnimationFrame(animate)                                              // Start the animation loop.
