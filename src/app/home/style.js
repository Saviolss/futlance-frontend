'use client';
import React from "react";
import { motion } from "framer-motion";

export default function Background({ children }) {
	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-[#010056]">
			{/* Linha azul elétrica */}
			<motion.div
				className="absolute w-full h-[3px] blur-xl"
				style={{ background: "#0232FF" }}
				initial={{ opacity: 0.4, x: "-20%", y: "15%", scaleX: 0.8 }}
				animate={{ opacity: 0.7, scaleX: 1 }}
				transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
			/>

			{/* Linha ciano */}
			<motion.div
				className="absolute w-full h-[3px] blur-xl"
				style={{ background: "#00EEFF" }}
				initial={{ opacity: 0.3, x: "20%", y: "40%", scaleX: 0.7 }}
				animate={{ opacity: 0.55, scaleX: 1 }}
				transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
			/>

			{/* Linha roxa */}
			<motion.div
				className="absolute w-full h-[3px] blur-xl"
				style={{ background: "#9A00FF" }}
				initial={{ opacity: 0.25, x: "-10%", y: "70%", scaleX: 0.75 }}
				animate={{ opacity: 0.45, scaleX: 1 }}
				transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
			/>

			{/* Linha azul clara adicional */}
			<motion.div
				className="absolute w-full h-[3px] blur-xl"
				style={{ background: "#4D7BFF" }}
				initial={{ opacity: 0.25, x: "-15%", y: "30%", scaleX: 0.9 }}
				animate={{ opacity: 0.5, scaleX: 1 }}
				transition={{ duration: 9, repeat: Infinity, repeatType: "reverse" }}
			/>

			{/* Linha pink neon adicional */}
			<motion.div
				className="absolute w-full h-[3px] blur-xl"
				style={{ background: "#FF00C8" }}
				initial={{ opacity: 0.2, x: "10%", y: "55%", scaleX: 0.85 }}
				animate={{ opacity: 0.45, scaleX: 1 }}
				transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
			/>

			{/* Conteúdo acima do background */}
			<div className="relative z-10 w-full h-full">{children}</div>
		</div>
	);
}