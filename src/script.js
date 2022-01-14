import './style.css'
import * as THREE from 'three'

import Meshes from './Assets/Meshes'
import Particles from './Assets/Particles'
import Raycast from './Utils/Raycast'
import Resize from './Utils/Resize'
import Scroll from './Utils/Scroll'
import Sizes from './Utils/Sizes'


const arrow = document.querySelector('#arrow')
arrow.addEventListener('mousedown', () => {
    document.querySelector('#linkedin').scrollIntoView({ behavior: 'smooth' })
})

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

const mesh1 = Meshes.mesh1
const mesh2 = Meshes.mesh2
const mesh3 = Meshes.mesh3

mesh1.position.x = 2
mesh2.position.x = - 2
mesh3.position.x = 2

const objectsDistance = 4
mesh1.position.y = - objectsDistance * 0
mesh2.position.y = - objectsDistance * 1
mesh3.position.y = - objectsDistance * 2

scene.add(mesh1, mesh2, mesh3)

const sectionMeshes = [mesh1, mesh2, mesh3]

// Lights
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

// Particles
const particles = Particles.particles
scene.add(particles)

// Camera
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

const camera = new THREE.PerspectiveCamera(35, Sizes.width / Sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(Sizes.width, Sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Resize
Resize.resize(camera, renderer)

// Scroll Animation
Scroll.addScrollAnimation(sectionMeshes)

// Parallax
const parallaxCursor = {}
parallaxCursor.x = 0
parallaxCursor.y = 0

window.addEventListener('mousemove', (event) => {
    parallaxCursor.x = event.clientX / Sizes.width - 0.5
    parallaxCursor.y = event.clientY / Sizes.height - 0.5
})

const raycast = new Raycast(camera, sectionMeshes)

// Tick!
const clock = new THREE.Clock()
let previousTime = 0
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    raycast.update()

    // Animate camera
    camera.position.y = - window.scrollY / Sizes.height * objectsDistance

    const parallaxX = parallaxCursor.x * 0.5
    const parallaxY = - parallaxCursor.y * 0.5
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

    // Animate meshes
    for (const mesh of sectionMeshes) {
        mesh.rotation.x += deltaTime * 0.2
        mesh.rotation.y += deltaTime * 0.24
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()