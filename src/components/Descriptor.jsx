import React from "react";

export default function Descriptor({ isActive = false }) {
	return (
		<section className='min-h-screen w-full flex items-center justify-center px-6 md:px-10 snap-start text-white'>
			<div
				className={
					`w-full max-w-5xl flex flex-col items-center justify-items-center ` +
					`transition-all duration-700 ease-out transform [will-change:transform,opacity] ` +
					`${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`
				}
			>
				<h2 className='text-3xl md:text-4xl font-bold tracking-tight text-center underline text-[#00FFFF] mb-6'>
					Key Point
				</h2>
				<p className='text-xl md:text-2xl px-28 mb-4'>
					<span className='font-bold'>
						&apos;Political risk&apos; <span className='italic'>is</span> policy risk and it lies in
						the difference between what:
					</span>{" "}
					Market Participants assume vs. what Policy Makers action
				</p>
				<p className='text-xl md:text-2xl px-28 font-bold'>Methodology Measures:</p>
				<p>i.) Market Assumptions; ii.) Policy Maker Intentions; iii.) Differentials</p>
				<hr className='w-full border-[#00FFFF] my-6' />
				<h2 className='text-3xl md:text-4xl font-bold tracking-tight text-center underline text-[#00FFFF] mb-6'>
					Key Risk Terms
				</h2>
				<p className='text-lg md:text-xl px-28 mb-2 font-bold'>Over-pricing:</p>
				<p className='text-lg md:text-xl px-28 mb-2'>
					The quantum by which Market Participants are more optimistic than Policymakers
				</p>
				<p className='text-lg md:text-xl px-28 mb-2 font-bold'>Under-pricing:</p>
				<p className='text-lg md:text-xl px-28 mb-2'>
					The quantum by which Market Participants are more pessimistic than Policymakers
				</p>
				<p className='text-lg md:text-xl px-28 mb-2 font-bold'>Risk Delta:</p>
				<p className='text-lg md:text-xl px-28 mb-2'>
					The margins between Market Participants and Policymaker expectations
				</p>
				<p className='text-lg md:text-xl px-28 mb-2 font-bold'>Policy Likelihood:</p>
				<p className='text-lg md:text-xl px-28 mb-2'>The assessment as to policy outcomes</p>
			</div>
		</section>
	);
}

// KEY RISK TERMS
//  Over-pricing:
// The quantum by which Market Participants are more optimistic than Policymakers
// Under-pricing:
// The quantum by which Market Participants are more pessimistic than Policymakers
// Risk Delta:
// The margins between Market Participants and Policymaker expectations
// Policy Likelihood:
// The assessment as to policy outcomes
