import React, { useEffect } from "react";

export default function MethodologyModal({ open, onClose, paragraphs = [], theme = {} }) {
	if (!open) return null;

	useEffect(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose?.();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);

	const accent = theme?.accent || theme?.foreground || "#ffffff";
	const bg = theme?.background || "#0a0a0a";
	const fg = theme?.foreground || "#ffffff";

	return (
		<div className='fixed inset-0 z-[100] flex items-center justify-center'>
			<div className='absolute inset-0 bg-black/70 backdrop-blur-sm' onClick={onClose} />
			<div
				className='relative w-[92vw] max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl border shadow-2xl p-8'
				style={{ background: bg, color: fg, borderColor: "rgba(255,255,255,0.15)" }}
			>
				<button
					aria-label='Close'
					onClick={onClose}
					className='absolute top-3 right-3 h-9 w-9 inline-flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 text-white/90 transition'
				>
					<svg viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5'>
						<path
							fillRule='evenodd'
							d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
							clipRule='evenodd'
						/>
					</svg>
				</button>

				<div className='px-6 pt-6 pb-2'>
					<h4 className='text-xl font-semibold mb-4' style={{ color: accent }}>
						Methodology
					</h4>
					<div className='space-y-4'>
						{Array.isArray(paragraphs) &&
							paragraphs.map((p, i) => (
								<p
									key={i}
									className='text-sm md:text-base leading-relaxed text-white/90 whitespace-pre-line'
								>
									{p}
								</p>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
