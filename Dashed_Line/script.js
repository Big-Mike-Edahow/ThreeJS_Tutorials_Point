// script.js

import * as THREE from 'three'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

const gui = new GUI()                                                       // GUI.

let width = window.innerWidth                                               // Window.
let height = window.innerHeight

const scene = new THREE.Scene()                                             // Scene.
scene.background = new THREE.Color(0x262626)

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)    // Camera.
camera.position.set(0, 0, 50)
camera.lookAt(0, 0, 0)
const camFolder = gui.addFolder('Camera')
camFolder.add(camera.position, 'z', 10, 100)
camFolder.open()

const points = []                                                           // Lines.
points.push(new THREE.Vector3(-10, 0, 0))
points.push(new THREE.Vector3(0, -20, 0))
points.push(new THREE.Vector3(10, 0, 0))
const folders = [gui.addFolder('Poin 1'), gui.addFolder('Poin 2'), gui.addFolder('Poin 3')]
folders.forEach((folder, i) => {
    folder.add(points[i], 'x', -30, 30, 1).onChange(redraw)
    folder.add(points[i], 'y', -30, 30, 1).onChange(redraw)
    folder.add(points[i], 'z', -30, 30, 1).onChange(redraw)
    folder.open()
})
const geometry = new THREE.BufferGeometry().setFromPoints(points)
const material = new THREE.LineDashedMaterial({
    color: 0xFF0000,
    linewidth: 10,
    scale: 1,
    dashSize: 3,
    gapSize: 2
})
const line = new THREE.Line(geometry, material)
line.computeLineDistances()
line.position.set(0, 10, 0)
scene.add(line)
console.log(line)
function redraw() {
    let newGeometry = new THREE.BufferGeometry().setFromPoints(points)
    line.geometry.dispose()
    line.geometry = newGeometry
}

window.addEventListener('resize', () => {                                   // Responsiveness.
    width = window.innerWidth
    height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})

const renderer = new THREE.WebGLRenderer()                                 // Renderer.
renderer.setSize(width, height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

function animate() {                                                        // Main animation loop.
    requestAnimationFrame(animate)                                          // Set up the next frame.                                        
    renderer.render(scene, camera)                                          // Render the scene.
}

const container = document.querySelector('#threejs-container')              // Append the canvas to HTML.
container.append(renderer.domElement)

renderer.render(scene, camera)                                              // Render the scene.
requestAnimationFrame(animate)                                              // Start the animation.       
