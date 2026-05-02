'use client';
import React from "react";

export default function Background({ children }) {
	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-[#000]">
			{/* Conteúdo acima do background */}
			<div className="relative z-10 w-full h-full">{children}</div>
		</div>
	);		
}