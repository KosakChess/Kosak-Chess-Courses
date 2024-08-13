import { unstable_setRequestLocale } from 'next-intl/server';

import { About } from './components/about';
import { Features } from './components/features';
import { Hero } from './components/hero';

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
