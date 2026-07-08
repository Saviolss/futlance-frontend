'use client'

import { useEffect, useRef } from 'react'

export default function AdcashBanner() {
  const mobileRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const createBanner = (ref, zoneId) => {
      if (!ref.current || !window.aclib) return

      ref.current.innerHTML = ''

      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.text = `
        aclib.runBanner({
          zoneId: '${zoneId}'
        });
      `

      ref.current.appendChild(script)
    }

    const timer = setInterval(() => {
      if (!window.aclib) return

      clearInterval(timer)

      if (window.innerWidth < 768) {
        createBanner(mobileRef, '11642794')
      } else {
        createBanner(leftRef, '11642890')
        createBanner(rightRef, '11642890')
      }
    }, 300)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* Mobile */}
      <div className="block md:hidden w-full">
        <div ref={mobileRef} />
      </div>

      {/* Desktop esquerdo */}
      <div className="hidden md:block z-50 left-1.5 fixed top-1/2 transform -translate-y-1/2">
        <div ref={leftRef} />
      </div>

      {/* Desktop direito */}
      <div className="hidden md:block z-50 right-1.5 fixed top-1/2 transform -translate-y-1/2">
        <div ref={rightRef} />
      </div>
    </>
  )
}