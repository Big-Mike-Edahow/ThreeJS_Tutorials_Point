// script.js

const gui = new dat.GUI()                                                   // Create a new dat.GUI.

let width = window.innerWidth                                               // Set the window size.
let height = window.innerHeight

window.addEventListener('resize', () => {                                   // Update camera on resize.
    width = window.innerWidth
    height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})

const scene = new THREE.Scene()                                             // Create a new scene.
scene.background = new THREE.Color(0x262626)

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)   // Create a new camera.
camera.position.set(0, 0, 10)
const camFolder = gui.addFolder('Camera')
camFolder.add(camera.position, 'z', 10, 80, 1)
camFolder.open()

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)                  // Set up the lighting.
scene.add(ambientLight)
const light = new THREE.DirectionalLight()
light.position.set(2.5, 2, 2)
light.castShadow = true
light.shadow.mapSize.width = 512
light.shadow.mapSize.height = 512
light.shadow.camera.near = 0.5
light.shadow.camera.far = 100
scene.add(light)
const helper = new THREE.DirectionalLightHelper(light)
scene.add(helper)

const lightColor = {                                                        // Lighting controls.
    color: light.color.getHex()
}
const lightFolder = gui.addFolder('Directional Light')
lightFolder.addColor(lightColor, 'color').onChange(() => {
    light.color.set(lightColor.color)
})
lightFolder.add(light, 'intensity', 0, 1, 0.01)
lightFolder.open()
const directionalLightFolder = gui.addFolder('Position of Light')
directionalLightFolder.add(light.position, 'x', -10, 10, 0.1)
directionalLightFolder.add(light.position, 'y', -10, 10, 0.1)
directionalLightFolder.add(light.position, 'z', -10, 10, 0.1)
directionalLightFolder.open()

const planeGeometry = new THREE.PlaneGeometry(100, 20)                      // Construct a new plane.
const plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial({ color: 0xffffff }))
plane.rotateX(-Math.PI / 2)
plane.position.y = -1.75
plane.receiveShadow = true
scene.add(plane)

const geometry = new THREE.BoxGeometry(2, 2, 2)                             // Cube.
const material = new THREE.MeshStandardMaterial({
    color: 0x87ceeb
})
const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'wireframe')
materialFolder.open()
const cube = new THREE.Mesh(geometry, material)
cube.position.set(0, 0.5, 0)
cube.castShadow = true
cube.receiveShadow = true
scene.add(cube)

const renderer = new THREE.WebGL1Renderer()                                 // Renderer.
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

function animate() {                                                        // Main animation loop.
    requestAnimationFrame(animate)                                          // Set up the next frame.
    cube.rotation.x += 0.005                                                // Rotate the cube.
    cube.rotation.y += 0.01
    renderer.render(scene, camera)                                          // Render the scene.
}

const container = document.querySelector('#container')                      // Append the canvas to HTML.
container.append(renderer.domElement)

renderer.render(scene, camera)                                              // Render the scene.
animate()                                                                   // Start the animation loop.
