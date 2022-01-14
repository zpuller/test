import gsap from 'gsap'
import Sizes from './Sizes'

let currentSection = 0

const addScrollAnimation = (sectionMeshes) => {
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY
        const newSection = Math.round(scrollY / Sizes.height)

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
}

export default {
    addScrollAnimation: addScrollAnimation
}