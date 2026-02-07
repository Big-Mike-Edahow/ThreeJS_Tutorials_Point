// script.js

let width = window.innerWidth                                               // Sizes.
let height = window.innerHeight
const gui = new dat.GUI()

const scene = new THREE.Scene()                                             // Scene.
scene.background = new THREE.Color(0x262626)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)                  // Lights.
scene.add(ambientLight)
const light = new THREE.PointLight(0xffffff, 0.5)
light.position.set(-10, 10, -10)

light.castShadow = true                                                     // Shadow.
light.shadow.mapSize.width = 1024
light.shadow.mapSize.height = 1024
light.shadow.camera.near = 0.1
light.shadow.camera.far = 1000
scene.add(light)

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)   // Camera.
camera.position.set(0, 10, 40)
camera.lookAt(0, 0, 0)
gui.add(camera.position, 'z', 10, 200, 1).name('camera-z')

const planeGeometry = new THREE.PlaneGeometry(100, 100)                     // Plane.
const plane = new THREE.Mesh(
    planeGeometry,
    new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
)
plane.rotateX(Math.PI / 2)
plane.position.y = -1.75
plane.receiveShadow = true
scene.add(plane)

function addCube() {
    const cubeSize = Math.ceil(Math.random() * 3)
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
    const cubeMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff
    })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true
    cube.name = 'cube-' + scene.children.length
    cube.position.x = -30 + Math.round(Math.random() * 50)
    cube.position.y = Math.round(Math.random() * 5)
    cube.position.z = -20 + Math.round(Math.random() * 50)
    scene.add(cube)
}
const add = document.querySelector('.add')
add.addEventListener('click', () => {
    addCube()
    console.log('cube added')
})

function removeCube() {
    const allChildren = scene.children
    const lastObject = allChildren[allChildren.length - 1]
    if (lastObject.name) {
        scene.remove(lastObject)
    }
}
const remove = document.querySelector('.rem')
remove.addEventListener('click', () => {
    removeCube()
    console.log('cube removed')
})

console.log(scene.children)
window.addEventListener('resize', () => {
    width = window.innerWidth
    height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})

const renderer = new THREE.WebGL1Renderer()                                 // Renderer.
renderer.setSize(width, height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

function animate() {                                                        // Animation.
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

const container = document.querySelector('#threejs-container')              // Rendering the scene.
container.append(renderer.domElement)
renderer.render(scene, camera)
animate()
