'use client'

import { useEffect, useRef, useState } from 'react'

export default function AdcashBanner() {
  const bannerRef = useRef(null)
  const [fixed, setFixed] = useState(false)
  const [topPosition, setTopPosition] = useState(0)

  useEffect(() => {
    if (window.innerWidth >= 768) return

    const banner = bannerRef.current
    if (!banner) return

    const initialTop =
      banner.getBoundingClientRect().top + window.scrollY

    setTopPosition(initialTop)

    const onScroll = () => {
      if (window.scrollY >= initialTop) {
        setFixed(true)
      } else {
        setFixed(false)
      }
    }

    window.addEventListener('scroll', onScroll)
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div
        style={{
          height: fixed ? 68 : 0,
        }}
        className="md:hidden"
      />

      <div
        ref={bannerRef}
        className={`flex md:hidden justify-center w-full my-0 ${fixed
            ? 'fixed top-0 left-0 z-50 bg-[#121112] py-0'
            : ''
          }`}
      >
        <iframe
          src="/ads/mobile.html"
          width="468"
          height="60"
          frameBorder="0"
          scrolling="no"
          className="max-w-full border-0"
          title="Publicidade Mobile"
        />
      </div>

      <div className="hidden md:flex justify-center w-full my-4">
        <iframe
          src="/ads/desktop.html"
          width="728"
          height="90"
          frameBorder="0"
          scrolling="no"
          className="border-0"
          title="Publicidade Desktop"
        />
      </div>
    </>
  )
}