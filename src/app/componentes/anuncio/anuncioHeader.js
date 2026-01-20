'use client';

import { useEffect } from "react";

export default function AnuncioHeader() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);

  return (
    <div className="w-full h-16 flex justify-center bg-[#010056]">
      <ins
        className="adsbygoogle w-full max-w-7xl"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1636369633058499"
        data-ad-slot="9261822396"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
