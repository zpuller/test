import './style.css'
import * as THREE from 'three'
// import * as dat from 'lil-gui'
import gsap from 'gsap'

/**
 * Debug
 */
// const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

// gui
//     .addColor(parameters, 'materialColor')
//     .onChange(() => {
//         material.color.set(parameters.materialColor)
//         particlesMaterial.color.set(parameters.materialColor)
//     })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// Texture
const textureLoader = new THREE.TextureLoader()

const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter

const linkedinTexture = textureLoader.load('textures/linkedin.png')
const gmailTexture = textureLoader.load('textures/gmail.png')

// Material
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})
const liColorMat = new THREE.MeshToonMaterial({
    color: '#0077b7'
})
const gmColorMat = new THREE.MeshToonMaterial({
    // color: '#1e1a20'
    color: '#ffffff'
})
const linkedinMaterial = new THREE.MeshBasicMaterial({
    map: linkedinTexture,
    transparent: true
})
const gmailMaterial = new THREE.MeshBasicMaterial({
    map: gmailTexture,
    transparent: true
})

// Objects
const objectsDistance = 4
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(0.8, 0.4, 64, 64),
    material
)
mesh1.rotateZ(Math.PI)

const addLogo = (logoMaterial, colorMat) => {
    const boxWidth = 1.5
    const boxDepth = 0.25
    const mesh2logo = new THREE.Mesh(
        new THREE.PlaneGeometry(boxWidth, boxWidth, 128, 128),
        logoMaterial
    )
    const mesh2logo2 = new THREE.Mesh(
        new THREE.PlaneGeometry(boxWidth, boxWidth, 128, 128),
        logoMaterial
    )
    mesh2logo.position.z = 0.001 + 0.5 * boxDepth
    mesh2logo2.position.z = -1 * mesh2logo.position.z
    mesh2logo2.rotation.y = Math.PI

    const smallBoxWidth = 0.75 * boxWidth
    const mesh2box = new THREE.Mesh(
        new THREE.BoxGeometry(smallBoxWidth, boxWidth, boxDepth, 8, 8, 8),
        colorMat
    )
    const mesh2box2 = new THREE.Mesh(
        new THREE.BoxGeometry(boxWidth, smallBoxWidth, boxDepth, 8, 8, 8),
        colorMat
    )

    const mesh2 = new THREE.Group()
    mesh2.add(mesh2logo)
    mesh2.add(mesh2logo2)
    mesh2.add(mesh2box)
    mesh2.add(mesh2box2)

    const radius = 0.253
    const cylinderOffset = 0.5
    const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, boxDepth, 64, 16)

    const addCylinder = (flipX = 1, flipY = 1) => {
        const mesh2Cylinder = new THREE.Mesh(cylinderGeometry, colorMat)
        mesh2Cylinder.rotation.x = Math.PI * 0.5
        mesh2Cylinder.position.x = flipX * cylinderOffset
        mesh2Cylinder.position.y = flipY * cylinderOffset

        mesh2.add(mesh2Cylinder)
    }
    addCylinder(1, 1)
    addCylinder(1, -1)
    addCylinder(-1, 1)
    addCylinder(-1, -1)

    return mesh2
}
const mesh2 = addLogo(linkedinMaterial, liColorMat)
const mesh3 = addLogo(gmailMaterial, gmColorMat)

mesh1.position.x = 2
mesh2.position.x = - 2
mesh3.position.x = 2

mesh1.position.y = - objectsDistance * 0
mesh2.position.y = - objectsDistance * 1
mesh3.position.y = - objectsDistance * 2

scene.add(mesh1, mesh2, mesh3)

const sectionMeshes = [mesh1, mesh2, mesh3]

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

/**
 * Particles
 */
// Geometry
const particlesCount = 200
const positions = new Float32Array(particlesCount * 3)

for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * sectionMeshes.length
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: textureLoader,
    size: 0.03
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */
let scrollY = window.scrollY
let currentSection = 0

const arrow = document.querySelector('#arrow')
arrow.addEventListener('mousedown', () => {
    const bar = document.querySelector('#linkedin').scrollIntoView({ behavior: 'smooth' })
})

window.addEventListener('scroll', () => {
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height)

    if (newSection != currentSection) {
        currentSection = newSection

        gsap.to(
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3',
                z: '+=1.5'
            }
        )
    }
})

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Animate camera
    camera.position.y = - scrollY / sizes.height * objectsDistance

    const parallaxX = cursor.x * 0.5
    const parallaxY = - cursor.y * 0.5
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