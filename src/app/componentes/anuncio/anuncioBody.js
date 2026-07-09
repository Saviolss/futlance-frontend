'use client'

export default function AdcashBanner() {
  return (
    <>
      {/* MOBILE */}
      <div className="block md:hidden w-full flex justify-center my-2">
        <iframe
          src="/ads/mobile.html"
          width="468"
          height="60"
          frameBorder="0"
          scrolling="no"
          className="max-w-full border-0"
        />
      </div>

      {/* ESQUERDA */}
      <div className="hidden md:block fixed left-3 top-1/2 -translate-y-1/2 z-50">
        <iframe
          src="/ads/desktop.html"
          width="160"
          height="300"
          frameBorder="0"
          scrolling="no"
          className="border-0"
        />
      </div>

      {/* DIREITA */}
      <div className="hidden md:block fixed right-3 top-1/2 -translate-y-1/2 z-50">
        <iframe
          src="/ads/desktop.html"
          width="160"
          height="300"
          frameBorder="0"
          scrolling="no"
          className="border-0"
        />
      </div>
    </>
  )
}