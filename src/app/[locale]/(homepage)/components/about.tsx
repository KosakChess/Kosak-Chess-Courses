import { ArrowRight } from 'lucide-react';

import NextImage from 'next/image';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import about from '../assets/about.png';

export const About = () => {
	const t = useTranslations('components.homepage.about');

	return (
		<section className="relative isolate overflow-hidden">
			<svg
				aria-hidden="true"
				className="absolute inset-0 -z-10 size-0 stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:size-full"
			>
				<defs>
					<pattern
						x="50%"
						y={-1}
						id="pattern-bg"
						width={200}
						height={200}
						patternUnits="userSpaceOnUse"
					>
						<path d="M.5 200V.5H200" fill="none" />
					</pattern>
				</defs>
				<svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
					<path
						d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
						strokeWidth={0}
					/>
				</svg>
				<rect fill="url(#pattern-bg)" width="100%" height="100%" strokeWidth={0} />
			</svg>
			<div
				aria-hidden
				className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
			>
				<div
					style={{
						clipPath:
							'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
					}}
					className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-primary opacity-20"
				/>
			</div>
			<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:flex lg:px-8 lg:py-32">
				<div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
					<h2 className="text-red text-3xl font-bold tracking-tight sm:text-6xl">{t('header')}</h2>
					<p className="mt-6 text-justify text-lg leading-8">{t('description')}</p>
					<div className="mt-10 flex items-center gap-x-6">
						<Button href="/about">{t('cta.continueReading')}</Button>
						<Button href="/contact" variant="text" trailingIcon={ArrowRight}>
							{t('cta.contact')}
						</Button>
					</div>
				</div>
				<div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
					<div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
						<NextImage
							alt="Jakub Kosakowski"
							src={about}
							placeholder="blur"
							className="object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};
