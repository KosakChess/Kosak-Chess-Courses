import { unstable_setRequestLocale } from 'next-intl/server';

import { type PageProps } from '@/types';

import { About } from './_components/about';
import { Features } from './_components/features';
import { Hero } from './_components/hero';

export default function HomePage({ params }: PageProps) {
	unstable_setRequestLocale(params.locale);

	return (
		<>
			<Hero />
			<Features />
			<About />
		</>
	);
}
