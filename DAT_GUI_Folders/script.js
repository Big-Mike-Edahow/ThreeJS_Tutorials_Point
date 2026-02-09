// script.js

let width = window.innerWidth                                               // Window size.
let height = window.innerHeight

window.addEventListener('resize', () => {                                   // Update camera on resize.
    width = window.innerWidth
    height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})

const gui = new dat.GUI()                                                   // Create new DAT GUI.

const scene = new THREE.Scene()                                             // Create new scene.
scene.background = new THREE.Color(0x262626)

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)    // Create new camera.
camera.position.set(0, 0, 10)
const camFolder = gui.addFolder('Camera')
camFolder.add(camera.position, 'z').min(10).max(60).step(10)

const geometry = new THREE.BoxGeometry(2, 2, 2)                             // Cube.
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const cubeColor = {                                                         // Initial cube color.
    color: 0xffffff
}
const materialFolder = gui.addFolder('Material')                            // GUI Material folder.
materialFolder.add(material, 'wireframe')
materialFolder.addColor(cubeColor, 'color').onChange(() => {
    material.color.set(cubeColor.color)                                     // Callback function for color.
})
materialFolder.open()
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
const cubeFolder = gui.addFolder('Cube')                                    // GUI Cube folder.

const posFolder = cubeFolder.addFolder('position')                          // Cube Position folder.
posFolder.add(cube.position, 'x', 0, 5, 0.1)
posFolder.add(cube.position, 'y', 0, 5, 0.1)
posFolder.add(cube.position, 'z', 0, 5, 0.1)
posFolder.open()

const scaleFolder = cubeFolder.addFolder('Scale')                           // Cube Scale folder.
scaleFolder.add(cube.scale, 'x', 0, 5, 0.1).name('Width')
scaleFolder.add(cube.scale, 'y', 0, 5, 0.1).name('Height')
scaleFolder.add(cube.scale, 'z', 0, 5, 0.1).name('Depth')
scaleFolder.open()
cubeFolder.open()

const renderer = new THREE.WebGL1Renderer()                                 // Renderer.
renderer.setSize(width, height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

function animate() {                                                        // Main animation loop.
    requestAnimationFrame(animate)                                          // Set up next frame.

    cube.rotation.x += 0.005                                                // Rotate cube.
    cube.rotation.y += 0.01

    renderer.render(scene, camera)                                          // Render the scene.
}
const container = document.querySelector('#threejs-container')              // Append canvas to HTML.
container.append(renderer.domElement)

renderer.render(scene, camera)                                              // Render the scene.
animate()                                                                   // Start the animation loop.
