// script.js

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

let width = window.innerWidth                                               // Set window size.
let height = window.innerHeight
const scene = new THREE.Scene()                                             // Create new scene.
scene.background = new THREE.Color(0xffffff)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)                  // Set up the lights.
scene.add(ambientLight)
const light = new THREE.DirectionalLight(0xffffff, 4.0)
light.position.set(0, 10, 20)
light.castShadow = true
light.shadow.mapSize.width = 512
light.shadow.mapSize.height = 512
light.shadow.camera.near = 0.5
light.shadow.camera.far = 100
scene.add(light)

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)    // Create a new camera.
camera.position.set(0, 0, 10)

const loader = new THREE.TextureLoader()                                    // Load textures.
const texture = loader.load('images/Basecolor.png')
const normalmap = loader.load('images/Normal.png')
const heightmap = loader.load('images/Height.png')
const roughmap = loader.load('images/Roughness.png')
const ambientOcclusionmap = loader.load('images/Ambient_Occlusion.png')
const metallicmap = loader.load('images/Metallic.png')

const planeGeometry = new THREE.PlaneGeometry(100, 100)                     // Construct a new plane.
const plane = new THREE.Mesh(
    planeGeometry,
    new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
)
plane.rotateX(-Math.PI / 2)
plane.position.y = -2.75
plane.receiveShadow = true
scene.add(plane)

const geometry = new THREE.SphereGeometry(1, 64, 64)                        // Objects.
const material1 = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide
})
const object1 = new THREE.Mesh(geometry, material1)
object1.position.set(-2.5, 1.5, 0)
object1.castShadow = true
scene.add(object1)

const material2 = new THREE.MeshStandardMaterial({                          // Normal map.
    color: 0xffffff,
    map: texture,
    side: THREE.DoubleSide,
    normalMap: normalmap
})
const object2 = new THREE.Mesh(geometry, material2)
object2.position.set(0, 1.5, 0)
object2.castShadow = true
scene.add(object2)

const material3 = new THREE.MeshStandardMaterial({                          // Displacement map.
    color: 0xffffff,
    map: texture,
    side: THREE.DoubleSide,
    normalMap: normalmap,
    displacementMap: heightmap,
    displacementScale: 0.05
})
const object3 = new THREE.Mesh(geometry, material3)
object3.position.set(2.5, 1.5, 0)
object3.castShadow = true
scene.add(object3)
console.log(object3)

const material4 = new THREE.MeshStandardMaterial({                          // Roughness map.
    color: 0xffffff,
    map: texture,
    side: THREE.DoubleSide,
    normalMap: normalmap,
    displacementMap: heightmap,
    displacementScale: 0.05,
    roughnessMap: roughmap,
    roughness: 0.5
})
const object4 = new THREE.Mesh(geometry, material4)
object4.position.set(-2.5, -1.5, 0)
object4.castShadow = true
scene.add(object4)
console.log(object4)

const material5 = new THREE.MeshStandardMaterial({                          // Ambient occlusion map.
    color: 0xffffff,
    map: texture,
    side: THREE.DoubleSide,
    normalMap: normalmap,
    displacementMap: heightmap,
    displacementScale: 0.05,
    roughnessMap: roughmap,
    roughness: 0.1,
    aoMap: ambientOcclusionmap
})
const object5 = new THREE.Mesh(geometry, material5)
object5.position.set(0, -1.5, 0)
object5.geometry.attributes.uv2 = object5.geometry.attributes.uv
object5.castShadow = true
scene.add(object5)
console.log(object5)

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {             // Environment maps.
    format: THREE.RGBFormat,
    generateMipMaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    encoding: THREE.sRGBEncoding
})
const cubeCamera = new THREE.CubeCamera(1, 10000, cubeRenderTarget)
cubeCamera.position.set(0, 100, 0)
scene.add(cubeCamera)

const material6 = new THREE.MeshStandardMaterial({                          // Metallic map.
    color: 0xffffff,
    map: texture,
    side: THREE.DoubleSide,
    normalMap: normalmap,
    displacementMap: heightmap,
    displacementScale: 0.15,
    roughnessMap: roughmap,
    roughness: 0.1,
    aoMap: ambientOcclusionmap,
    metalnessMap: metallicmap,
    metalness: 1,
    envMap: cubeRenderTarget.texture
})
const object6 = new THREE.Mesh(geometry, material6)
object6.position.set(2.5, -1.5, 0)
object6.geometry.attributes.uv2 = object6.geometry.attributes.uv
object6.castShadow = true
scene.add(object6)
console.log(object6)
cubeCamera.position.copy(object6.position)

window.addEventListener('resize', () => {                                   // Responsiveness.
    width = window.innerWidth
    height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})

const renderer = new THREE.WebGLRenderer({ antialias: true })               // Renderer. Anti-aliasing.
renderer.physicallyCorrectLights = true
renderer.setSize(width, height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
const controls = new OrbitControls(camera, renderer.domElement)

function animate() {                                                        // Main animation loop.
    requestAnimationFrame(animate)
    let objects = [object1, object2, object3, object4, object5, object6]
    objects.forEach((i) => {
        i.rotation.x += 0.005
        i.rotation.y += 0.01
    })
    controls.update()
    cubeCamera.update(renderer, scene)
    renderer.render(scene, camera)
}

const container = document.querySelector('#threejs-container')
container.append(renderer.domElement)

renderer.render(scene, camera)                                              // Render the scene.
requestAnimationFrame(animate)                                              // Start the animation loop.                                                           
