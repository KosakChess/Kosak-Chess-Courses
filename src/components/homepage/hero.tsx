import { ArrowRight } from 'lucide-react';

import NextImage from 'next/image';
import { useTranslations } from 'next-intl';

import hero from '@/assets/hero.webp';

import { Button } from '../ui/button';

export const Hero = () => {
	const t = useTranslations('components.homepage.hero');

	return (
		<section className="relative isolate flex h-screen w-screen items-center justify-center overflow-hidden pt-14">
			<NextImage
				src={hero}
				alt={t('bgImageAlt')}
				priority
				className="absolute inset-0 -z-10 size-full object-cover"
			/>
			<div className="absolute inset-0 -z-10 bg-black opacity-75" />
			<div
				aria-hidden
				className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
			>
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
					className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
				/>
			</div>
			<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
				<div className="px-8 text-center">
					<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{t('title')}</h1>
					<p className="mt-6 text-lg leading-8 text-[#cbd5e1]">{t('description')}</p>
					<div className="mt-10 flex items-center justify-center gap-x-3 sm:gap-x-6">
						<Button href="/sign-up">{t('cta.signUpBtn')}</Button>
						<Button href="/courses" variant="text" trailingIcon={ArrowRight} className="text-white">
							{t('cta.coursesBtn')}
						</Button>
					</div>
				</div>
			</div>
			<div
				aria-hidden
				className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
			>
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
					className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
				/>
			</div>
		</section>
	);
};
