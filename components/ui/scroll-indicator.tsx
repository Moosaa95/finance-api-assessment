"use client"

import { useState, useEffect } from "react"

export function ScrollIndicator() {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollTop = window.pageYOffset
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = (scrollTop / docHeight) * 100
            setScrollProgress(progress)
        }

        window.addEventListener("scroll", updateScrollProgress)
        return () => window.removeEventListener("scroll", updateScrollProgress)
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
            <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    )
}
