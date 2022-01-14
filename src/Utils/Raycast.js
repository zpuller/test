import * as THREE from 'three'

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const raycaster = new THREE.Raycaster()
const rayOrigin = new THREE.Vector3(- 3, 10, 0)
const rayDirection = new THREE.Vector3(10, 10, 0)
raycaster.set(rayOrigin, rayDirection)

const raycastMouse = new THREE.Vector2()

export default class Raycast {
    constructor(camera, sectionMeshes) {
        this.camera = camera
        this.clicked = null
        this.raycaster = raycaster
        this.raycastMouse = raycastMouse
        this.sectionMeshes = sectionMeshes

        window.addEventListener('mousemove', (event) => {
            raycastMouse.x = event.clientX / sizes.width * 2 - 1
            raycastMouse.y = - (event.clientY / sizes.height) * 2 + 1
        })

        window.addEventListener('mousedown', (event) => {
            if (!this.clicked) {
                return
            }
            const linkedinAddr = "https://www.linkedin.com/in/zach-puller-443982a5/"
            const gmailAddr = "mailto:zach.puller@gmail.com"

            let mesh2 = sectionMeshes[1]
            let mesh3 = sectionMeshes[2]
            if (this.clicked.object.parent === mesh2) {
                window.open(linkedinAddr)
            }
            if (this.clicked.object.parent === mesh3) {
                window.open(gmailAddr)
            }
        })
    }

    update() {
        this.raycaster.setFromCamera(this.raycastMouse, this.camera)
        const intersects = this.raycaster.intersectObjects(this.sectionMeshes)

        this.clicked = null
        for (const intersect of intersects) {
            this.clicked = intersect
        }
    }
}