import * as THREE from 'three'

import Materials from './Materials'


const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(0.8, 0.4, 64, 64),
    Materials.toonMaterial
)

const addLogo = (logoMaterial, colorMat) => {
    const boxWidth = 1.5
    const boxDepth = 0.25
    const logo1 = new THREE.Mesh(
        new THREE.PlaneGeometry(boxWidth, boxWidth, 128, 128),
        logoMaterial
    )
    const logo2 = new THREE.Mesh(
        new THREE.PlaneGeometry(boxWidth, boxWidth, 128, 128),
        logoMaterial
    )
    logo1.position.z = 0.001 + 0.5 * boxDepth
    logo2.position.z = -1 * logo1.position.z
    logo2.rotation.y = Math.PI

    const smallBoxWidth = 0.75 * boxWidth
    const box1 = new THREE.Mesh(
        new THREE.BoxGeometry(smallBoxWidth, boxWidth, boxDepth, 8, 8, 8),
        colorMat
    )
    const box2 = new THREE.Mesh(
        new THREE.BoxGeometry(boxWidth, smallBoxWidth, boxDepth, 8, 8, 8),
        colorMat
    )

    const group = new THREE.Group()
    group.add(logo1)
    group.add(logo2)
    group.add(box1)
    group.add(box2)

    const radius = 0.253
    const cylinderOffset = 0.5
    const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, boxDepth, 64, 16)

    const addCylinder = (flipX = 1, flipY = 1) => {
        const cylinder = new THREE.Mesh(cylinderGeometry, colorMat)
        cylinder.rotation.x = Math.PI * 0.5
        cylinder.position.x = flipX * cylinderOffset
        cylinder.position.y = flipY * cylinderOffset

        group.add(cylinder)
    }
    for (const flipX of [1, -1]) {
        for (const flipY of [1, -1]) {
            addCylinder(flipX, flipY)
        }
    }

    return group
}

const mesh2 = addLogo(Materials.linkedinMaterial, Materials.liColorMat)
const mesh3 = addLogo(Materials.gmailMaterial, Materials.gmColorMat)

export default {
    mesh1: mesh1,
    mesh2: mesh2,
    mesh3: mesh3
}