import React, { useEffect, useMemo, useRef, useState } from "react";
import Slide from "./Slide.jsx";
import Contents from "./Contents.jsx";

export default function SlideDeck() {
	const [active, setActive] = useState(0);
	const sectionRefs = useRef([]);
	const containerRef = useRef(null);

	const [theme, setTheme] = useState({});
	const [slides, setSlides] = useState([]);

	useEffect(() => {
		async function load() {
			try {
				const res = await fetch("/content.json", { cache: "no-cache" });
				const data = await res.json();
				setTheme(data.theme || {});
				setSlides(data.slides || []);
			} catch (e) {
				console.error("Failed to load content.json", e);
			}
		}
		load();
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const idx = Number(entry.target.getAttribute("data-index"));
						setActive(idx);
					}
				});
			},
			{ root: null, threshold: 0.6 }
		);

		sectionRefs.current.forEach((el) => el && observer.observe(el));
		return () => observer.disconnect();
	}, [slides]);

	const handleDotClick = (idx) => {
		const el = sectionRefs.current[idx];
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	const goTo = (idx) => {
		if (idx < 0 || idx >= slides.length) return;
		const el = sectionRefs.current[idx];
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	const next = () => goTo(active + 1);
	const prev = () => goTo(active - 1);

	useEffect(() => {
		const onKey = (e) => {
			if (!slides.length) return;
			const key = e.key;
			if (key === "ArrowDown" || key === "ArrowRight" || key === "PageDown" || key === " ") {
				e.preventDefault();
				next();
			} else if (key === "ArrowUp" || key === "ArrowLeft" || key === "PageUp") {
				e.preventDefault();
				prev();
			} else if (key === "Home") {
				e.preventDefault();
				goTo(0);
			} else if (key === "End") {
				e.preventDefault();
				goTo(slides.length - 1);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [active, slides.length]);

	const bg = theme?.deckBackground || theme?.background || "#0a0a0a";
	const fg = theme?.deckForeground || theme?.foreground || "#ffffff";
	const accent = theme?.accent || "#60A5FA";

	return (
		<div
			ref={containerRef}
			className='h-screen overflow-y-scroll snap-y snap-mandatory'
			style={{ background: bg, color: fg }}
		>
			{slides.map((s, i) => (
				<div key={i} ref={(el) => (sectionRefs.current[i] = el)} data-index={i}>
					{s.contents ? (
						<Contents contentsArray={s.contentsArray} isActive={active === i} setActive={goTo} />
					) : (
						<Slide
							heading={s.heading}
							subheading={s.subheading}
							body={s.body}
							image={s.image}
							theme={theme}
							isActive={active === i}
							tables={s.tables || (s.table ? [s.table] : undefined)}
						/>
					)}
				</div>
			))}

			{/* Dots nav */}
			<div className='fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50'>
				{slides.map((_, i) => (
					<button
						key={i}
						aria-label={`Go to slide ${i + 1}`}
						onClick={() => handleDotClick(i)}
						className={`h-2.5 w-2.5 rounded-full transition-all border border-white/40 ${
							active === i ? "scale-125 bg-white" : "bg-white/30 hover:bg-white/60"
						}`}
					/>
				))}
			</div>

			{/* Counter */}
			<div className='fixed left-4 bottom-4 text-sm px-2 py-1 rounded-md bg-black/30 backdrop-blur border border-white/10'>
				{slides.length ? `${active + 1} / ${slides.length}` : "Loading..."}
			</div>

			{/* Next Arrow Button */}
			{slides.length > 0 && (
				<div className='fixed left-1/2 -translate-x-1/2 bottom-6 z-50'>
					<button
						onClick={next}
						disabled={active >= slides.length - 1}
						className={
							`group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium shadow-lg ring-1 ring-white/20 backdrop-blur transition-all ` +
							`${
								active >= slides.length - 1
									? "opacity-50 cursor-not-allowed bg-white/10 text-white"
									: "hover:translate-y-[-2px]"
							}`
						}
						style={{
							background: active >= slides.length - 1 ? "rgba(255,255,255,0.1)" : accent,
							color: "#0b1220",
						}}
						aria-label='Next slide'
						title={active >= slides.length - 1 ? "End of deck" : "Next (→, ↓, Space)"}
					>
						<span className='text-black '>Next</span>
						<span className='relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/20 text-black'>
							{/* Arrow icon */}
							<svg
								className='h-4 w-4 transition-transform group-hover:translate-x-0.5'
								viewBox='0 0 20 20'
								fill='currentColor'
								aria-hidden='true'
							>
								<path
									fillRule='evenodd'
									d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 11-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
									clipRule='evenodd'
								/>
							</svg>
						</span>
					</button>
				</div>
			)}
		</div>
	);
}
