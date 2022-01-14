import * as THREE from 'three'
import { Material } from 'three'

const textureLoader = new THREE.TextureLoader()

const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter

const linkedinTexture = textureLoader.load('textures/linkedin.png')
const gmailTexture = textureLoader.load('textures/gmail.png')

const parameters = {
    materialColor: '#ffeded',
    liColor: '#0077b7',
    gmColor: '#ffffff'
}

const toonMaterial = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})

const linkedinMaterial = new THREE.MeshBasicMaterial({
    map: linkedinTexture,
    transparent: true
})
const gmailMaterial = new THREE.MeshBasicMaterial({
    map: gmailTexture,
    transparent: true
})

const liColorMat = new THREE.MeshToonMaterial({
    color: parameters.liColor
})
const gmColorMat = new THREE.MeshToonMaterial({
    color: parameters.gmColor
})

const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: textureLoader,
    size: 0.0

})

export default {
    toonMaterial: toonMaterial,
    linkedinMaterial: linkedinMaterial,
    gmailMaterial: gmailMaterial,
    liColorMat: liColorMat,
    gmColorMat: gmColorMat,
    particlesMaterial: particlesMaterial,
}