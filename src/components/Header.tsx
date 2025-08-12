'use client'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function Header() {
    const container = useRef(null)

    useGSAP(() => {
        const tl = gsap.timeline()
        tl.to('#title', { duration: 1, left: 20, top: 20, transform: 'translateX(0)', ease: "power2.out" }
        ).to('#screen-circle', { duration: 1, scale: 0 })
    }, { scope: container })

    return (
        <header ref={container} className="h-20 overflow-hidden flex items-center justify-center shadow-lg">
            <h2 id="title" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold font-serif text-indigo-950 z-20">LinkShield</h2>
            <div id='screen-circle' className='absolute rounded-full z-10   h-[200vw] w-[200vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-0% from-[#d4ddf9] to-100% to-white'></div>
        </header>
    )
}
