import Sizes from './Sizes'

const resize = (camera, renderer) => {
    window.addEventListener('resize', () => {
        // Update sizes
        Sizes.width = window.innerWidth
        Sizes.height = window.innerHeight

        // Update camera
        camera.aspect = Sizes.width / Sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(Sizes.width, Sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
}

export default {
    resize: resize
}