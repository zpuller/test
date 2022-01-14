import * as THREE from 'three'

import Materials from './Materials'

const distance = 4
const numMeshes = 3
const particlesCount = 200
const positions = new Float32Array(particlesCount * 3)


for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = distance * 0.5 - Math.random() * distance * numMeshes
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

const particles = new THREE.Points(particlesGeometry, Materials.particlesMaterial)

export default {
    particles: particles
}