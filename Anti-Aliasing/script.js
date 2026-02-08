// script.js

let width = window.innerWidth                                               // Sizes.
let height = window.innerHeight

window.addEventListener('resize', () => {                                   // Responsiveness.
    width = window.innerWidth
    height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})

const gui = new dat.GUI()                                                   // GUI panel.

const scene = new THREE.Scene()                                             // Scene.
scene.background = new THREE.Color(0x262626)

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)    // Camera.
camera.position.set(0, 0, 10)

const geometry = new THREE.BoxGeometry(3, 3, 3)                             // Cube.
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const renderer = new THREE.WebGLRenderer({ antialias: true })               // Renderer. Anti-aliasing.
renderer.physicallyCorrectLights = true
renderer.setSize(width, height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

function animate() {                                                        // Main animation loop.
    requestAnimationFrame(animate)                                          // Set up the next frame.

    cube.rotation.x += 0.005                                                // Rotate the cube.
    cube.rotation.y += 0.01
    renderer.render(scene, camera)                                          // Render the scene.
}

const container = document.querySelector('#threejs-container')              // Append canvas to HTML.
container.append(renderer.domElement)
renderer.render(scene, camera)                                              // Render the scene.
animate()                                                                   // Start the animation.

