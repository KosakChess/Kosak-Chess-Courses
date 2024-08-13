import { unstable_setRequestLocale } from 'next-intl/server';

import { About } from '@/components/homepage/about';
import { Features } from '@/components/homepage/features';
import { Hero } from '@/components/homepage/hero';

export default function HomePage({ params }: { params: { locale: string } }) {
	unstable_setRequestLocale(params.locale);

	return (
		<>
			<Hero />
			<Features />
			<About />
		</>
	);
}
