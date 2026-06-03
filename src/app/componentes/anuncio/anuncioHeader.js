'use client';

// import { useEffect } from "react";

// export default function AnuncioHeader() {
//   useEffect(() => {
//     try {
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     } catch (e) {
//       console.error("Adsense error", e);
//     }
//   }, []);

//   return (
//     <div className="w-full h-16 flex justify-center bg-[#010056]">
//       <ins
//         className="adsbygoogle w-full max-w-7xl"
//         style={{ display: "block" }}
//         data-ad-client="ca-pub-1636369633058499"
//         data-ad-slot="9261822396"
//         data-ad-format="auto"
//         data-full-width-responsive="true"
//       />
//     </div>
//   );
// }

export default function AnuncioHeaderLauri() {
  return (
    <div
      className="
        w-full
        max-w-7xl
        mx-auto
        px-2
        py-3
      "
    >
      <a
        href="https://www.awin1.com/cread.php?s=4483565&v=118977&q=578734&r=2918211"
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="
          block
          overflow-hidden
          rounded-2xl
          border
          border-orange-400/20
          bg-linear-to-br
          from-[#0b0f1a]
          via-[#0f172a]
          to-[#020617]
          shadow-[0_0_25px_rgba(255,165,0,0.08)]
          hover:shadow-[0_0_30px_rgba(255,165,0,0.15)]
          transition-all
          duration-300
        "
      >
        <img
          src="https://www.awin1.com/cshow.php?s=4483565&v=118977&q=578734&r=2918211"
          alt="Lauri Esporte"
          loading="lazy"
          className="
            w-full
            h-auto
            object-contain
            block
          "
        />
      </a>
    </div>
  )
}