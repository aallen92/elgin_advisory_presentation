export default function Footer({ footer, theme }) {
	return (
		<section
			className='min-h-screen w-full flex items-center justify-center px-6 md:px-10 snap-start text-white'
			style={{
				background: theme?.background || "#0a0a0a",
				fontFamily:
					theme?.fontFamily ||
					'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
			}}
		>
			<div className='flex flex-col text-sm p-20'>
				<p className='text-xs px-10 mb-10'>{footer.moreInfo}</p>
				<p className='text-xs px-10 mb-10'>{footer.confidentialityDisclosure}</p>
				<p className='text-xs px-10 mb-10'>{footer.copywright}</p>
				<line className='w-full h-px bg-white/10 mb-8' />
				<p className='text-center text-white/80 mb-2'>{footer.footerOne}</p>
				<p className='text-center text-white/80'>{footer.footerTwo}</p>
			</div>
		</section>
	);
}
