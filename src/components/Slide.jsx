import { useState } from "react";
import MethodologyModal from "./MethodologyModal.jsx";

function renderWithDeboldIndicative(text) {
	if (!text) return null;
	return String(text)
		.split(/(\|\s*Indicative\s*\(60\s*Days\)|Indicative)/gi)
		.map((part, i) =>
			/^(\|\s*indicative\s*\(60\s*days\)|indicative)$/i.test(part) ? (
				<span key={i} className='font-normal'>
					{part}
				</span>
			) : (
				<span key={i}>{part}</span>
			)
		);
}

function getCellAlignClass(table, ci, colCount, cell) {
	// 1) Per-cell override: cell.align = 'left' | 'center' | 'right'
	if (cell && typeof cell === "object" && "align" in cell) {
		const a = cell.align;
		if (a === "left" || a === "center" || a === "right") return `text-${a}`;
	}
	// 2) Per-column array: table.columnAlignments[ci] = 'left' | 'center' | 'right'
	if (Array.isArray(table?.columnAlignments)) {
		const a = table.columnAlignments[ci];
		if (a === "left" || a === "center" || a === "right") return `text-${a}`;
	}
	// 3) Per-column map: table.align = { [index]: 'left' | 'center' | 'right' }
	if (table?.align && typeof table.align === "object") {
		const a = table.align[ci];
		if (a === "left" || a === "center" || a === "right") return `text-${a}`;
	}
	// 4) Convenience flags for first/last columns
	if (table?.alignFirstColumnLeft && ci === 0) return "text-left";
	if (table?.alignLastColumnRight && ci === colCount - 1) return "text-right";
	return "";
}

function computeColumnWidths(table) {
	const headerCount = Array.isArray(table?.headers) ? table.headers.length : 0;
	const rowCount =
		Array.isArray(table?.rows) && Array.isArray(table.rows[0]) ? table.rows[0].length : 0;
	const colCount = headerCount || rowCount;
	if (!colCount) return [];
	if (Array.isArray(table?.columnWidths) && table.columnWidths.length === colCount) {
		const nums = table.columnWidths.map((w) => Number(w) || 0);
		const sum = nums.reduce((a, b) => a + b, 0) || colCount;
		return nums.map((n) => `${(n / sum) * 100}%`);
	}
	if (table?.centreDivide) {
		const pct = 100 / colCount;
		return Array(colCount).fill(`${pct}%`);
	}
	return [];
}

function renderHeaderWithStyles(text) {
	if (text == null) return null;
	// Only underline exact phrases with trailing colon for view labels; keep case-insensitive
	const pattern =
		/(Most\s+Under[- ]?Priced|Most\s+Over[- ]?Priced|Market\s+Participant\s+View:|Policymaker\s+View:|UK\s+Budget\s+Measures:\s*Top\s*\[5\]|Indicative)/gi;
	return String(text)
		.split(pattern)
		.map((part, i) => {
			if (!part) return null;
			const lower = part.toLowerCase();
			if (lower === "indicative") {
				return (
					<span key={i} className='font-normal'>
						{part}
					</span>
				);
			}
			if (
				/^(most\s+under[- ]?priced|most\s+over[- ]?priced|market\s+participant\s+view:|policymaker\s+view:|uk\s+budget\s+measures:\s*top\s*\[5\])$/i.test(
					part
				)
			) {
				return (
					<span key={i} className='underline underline-offset-2'>
						{part}
					</span>
				);
			}
			return <span key={i}>{part}</span>;
		});
}

export default function Slide({
	heading,
	subheading,
	body,
	image,
	theme,
	methodology,
	isActive = false,
	tables = [],
}) {
	const [showMethodology, setShowMethodology] = useState(false);
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
							{renderWithDeboldIndicative(heading)}
						</h2>
					)}
					{subheading && (
						<h3
							className='text-2xl md:text-3xl font-bold tracking-tight text-center'
							style={{ color: theme?.accent || theme?.foreground || "#ffffff" }}
						>
							{renderWithDeboldIndicative(subheading)}
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
									className='w-full overflow-x-auto rounded-xl border border-white/10 bg-black/20 backdrop-blur max-h-[70vh] overflow-y-auto mx-auto'
								>
									<table
										className='w-full min-w-full table-fixed text-sm'
										style={{ width: "100%" }}
									>
										{(() => {
											const widths = computeColumnWidths(t);
											if (!widths.length) return null;
											return (
												<colgroup>
													{widths.map((w, i) => (
														<col key={i} style={{ width: w }} />
													))}
												</colgroup>
											);
										})()}
										{Array.isArray(t?.headers) && t.headers.length > 0 && (
											<thead>
												<tr className='border-b-4 border-[#00FFFF] '>
													{t.headers.map((h, hi) => (
														<th
															key={hi}
															className='px-1 py-2 text-[1.17rem] font-semibold whitespace-pre-line'
														>
															{renderHeaderWithStyles(h)}
														</th>
													))}
												</tr>
											</thead>
										)}
										{Array.isArray(t?.rows) && t.rows.length > 0 && (
											<tbody>
												{t.rows.map((r, ri) => (
													<tr
														key={ri}
														className='border-b-2 border-white/20 text-[1.1rem] last:border-0 text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer'
													>
														{r.map((cell, ci) => {
															const colCount = Array.isArray(r) ? r.length : 0;
															const dividerIndex = Math.floor((colCount - 1) / 2); // add border on right of middle cell
															const tdBase = "px-4 py-2 align-top truncate max-w-0";
															const alignClass = getCellAlignClass(t, ci, colCount, cell);
															const tdClass =
																ci === dividerIndex && t.centreDivide
																	? `${tdBase} border-r-4 border-[#00FFFF] ${alignClass}`
																	: `${tdBase} ${alignClass}`;
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
																	<td key={ci} className={tdClass}>
																		<span className='group inline-block relative w-full min-h-[2.25rem] text-center'>
																			<span className='block opacity-100 transition-opacity duration-500 ease-out group-hover:opacity-0'>
																				{cell.label}
																			</span>
																			<span
																				className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 p-4 w-fit mx-auto whitespace-pre-line text-center'
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
																	<td key={ci} className={tdClass}>
																		<span className='whitespace-pre-line text-wrap'>
																			{cell.value}
																		</span>
																	</td>
																);
															}
															return (
																<td key={ci} className={tdClass}>
																	<span className='whitespace-pre-line text-wrap'>
																		{String(cell)}
																	</span>
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
				{methodology && (
					<div className='md:col-span-2 w-full'>
						<button
							type='button'
							onClick={() => setShowMethodology(true)}
							className='underline underline-offset-4 hover:opacity-80 transition text-sm'
							style={{ color: theme?.accent || theme?.foreground || "#ffffff" }}
						>
							View methodology
						</button>
					</div>
				)}
			</div>
			<MethodologyModal
				open={!!showMethodology}
				onClose={() => setShowMethodology(false)}
				paragraphs={Array.isArray(methodology) ? methodology : []}
				theme={theme}
			/>
		</section>
	);
}
