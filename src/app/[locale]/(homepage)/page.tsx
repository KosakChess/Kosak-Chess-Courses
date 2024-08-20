import { unstable_setRequestLocale } from 'next-intl/server';

import { type PageProps } from '@/types';

import { About } from './components/about';
import { Features } from './components/features';
import { Hero } from './components/hero';

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
