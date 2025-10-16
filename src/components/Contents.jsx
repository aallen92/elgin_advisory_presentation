export default function Contents({ contentsArray, isActive = false, setActive }) {
	return (
		<section className='min-h-screen w-full flex items-center justify-center px-6 md:px-10 snap-start'>
			<div
				className={
					`w-full max-w-5xl flex flex-col gap-8 items-center justify-items-center ` +
					`transition-all duration-700 ease-out transform [will-change:transform,opacity] ` +
					`${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`
				}
			>
				<h2 className='text-3xl md:text-4xl font-bold tracking-tight text-center snap-start'>
					Pricing Policy Risk | <span className='text-2xl md:text-3xl'>Content</span>
				</h2>
				<div className='flex flex-col border border-white/10'>
					{contentsArray.map((c, i) => (
						<div
							key={i}
							onClick={() => setActive(c.orderIndex)}
							className='grid grid-cols-2 cursor-pointer text-white hover:bg-white/10 rounded-xl'
						>
							<h2 className='text-xl font-bold border-r-4 border-[#00FFFF] p-4'>{c.content[0]}</h2>
							<p className='text-sm p-4'>{c.content[1]}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
