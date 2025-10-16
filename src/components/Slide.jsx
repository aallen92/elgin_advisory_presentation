import React from "react";

export default function Slide({
	heading,
	subheading,
	body,
	image,
	theme,
	isActive = false,
	tables = [],
}) {
	return (
		<section
			className='min-h-screen w-full flex items-center justify-center px-6 md:px-10 snap-start'
			style={{
				background: theme?.background || "#0a0a0a",
				color: theme?.foreground || "#ffffff",
				fontFamily:
					theme?.fontFamily ||
					'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
			}}
		>
			<div
				className={
					`w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center justify-items-center ` +
					`transition-all duration-700 ease-out transform [will-change:transform,opacity] ` +
					`${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`
				}
			>
				{image && (
					<div className='order-2 md:order-1'>
						<img
							src={image}
							alt={heading || "Slide image"}
							className='w-full h-64 md:h-[26rem] object-cover rounded-xl shadow-2xl shadow-black/40 border border-white/10'
							loading='lazy'
						/>
					</div>
				)}
				<div
					className={`space-y-6 ${image ? "order-1 md:order-2" : "md:col-span-2"} ${
						image ? "text-center md:text-left" : "text-center"
					}`}
				>
					{heading && (
						<h2
							className='text-3xl md:text-4xl font-bold tracking-tight text-center'
							style={{ color: theme?.accent || theme?.foreground || "#ffffff" }}
						>
							{heading}
						</h2>
					)}
					{subheading && (
						<h3
							className='text-2xl md:text-3xl font-bold tracking-tight text-center'
							style={{ color: theme?.accent || theme?.foreground || "#ffffff" }}
						>
							{subheading}
						</h3>
					)}
					{body && (
						<p
							className='text-base md:text-lg leading-relaxed max-w-3xl mx-auto md:mx-0'
							style={{ color: theme?.foreground || "#ffffff" }}
						>
							{body}
						</p>
					)}

					{Array.isArray(tables) && tables.length > 0 && (
						<div className='space-y-6'>
							{tables.map((t, idx) => (
								<div
									key={idx}
									className='overflow-x-auto rounded-xl border border-white/10 bg-black/20 backdrop-blur max-h-[70vh] overflow-y-auto mx-auto '
								>
									<table className='min-w-full table-auto text-sm'>
										{Array.isArray(t?.headers) && t.headers.length > 0 && (
											<thead>
												<tr className='border-b border-white/10  '>
													{t.headers.map((h, hi) => (
														<th key={hi} className='px-4 py-2 font-semibold'>
															{h}
														</th>
													))}
												</tr>
											</thead>
										)}
										{Array.isArray(t?.rows) && t.rows.length > 0 && (
											<tbody>
												{t.rows.map((r, ri) => (
													<tr key={ri} className='border-b border-white/5 last:border-0 text-white'>
														{r.map((cell, ci) => {
															const accent = theme?.accent || theme?.foreground || "#ffffff";
															const isObj = cell && typeof cell === "object" && "type" in cell;
															if (
																isObj &&
																(cell.type === "Score" ||
																	cell.type === "Category" ||
																	cell.type === "Pricing") &&
																"value" in cell
															) {
																return (
																	<td key={ci} className='px-4 py-2 align-top'>
																		<span className='group inline-block relative w-full min-h-[2.25rem] text-center'>
																			<span className='block opacity-100 transition-opacity duration-500 ease-out group-hover:opacity-0'>
																				{cell.label}
																			</span>
																			<span
																				className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 p-4 cursor-help w-fit mx-auto whitespace-pre-line text-center'
																				style={{
																					borderColor: accent,
																					borderWidth: "1px",
																					borderRadius: "0.25rem",
																				}}
																			>
																				{cell.value}
																			</span>
																		</span>
																	</td>
																);
															}
															if (isObj && "value" in cell) {
																return (
																	<td key={ci} className='px-4 py-2 align-top'>
																		<span className='whitespace-pre-line'>{cell.value}</span>
																	</td>
																);
															}
															return (
																<td key={ci} className='px-4 py-2 align-top'>
																	<span className='whitespace-pre-line'>{String(cell)}</span>
																</td>
															);
														})}
													</tr>
												))}
											</tbody>
										)}
									</table>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
