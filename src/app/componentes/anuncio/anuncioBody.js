'use client';

import { useEffect } from "react";

export default function AnuncioBody() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-6">
      <ins
        className="adsbygoogle w-full max-w-[300px] h-[250px]"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1636369633058499"
        data-ad-slot="8679368467"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
