import { unstable_setRequestLocale } from 'next-intl/server';

import { type LayoutProps } from '@/types';

export default function CoursesLayout({ children, params: { locale } }: LayoutProps) {
	unstable_setRequestLocale(locale);

	return (
		<section
			aria-labelledby="courses-heading"
			className="mx-auto mt-28 max-w-2xl px-4 lg:mt-36 lg:max-w-7xl lg:px-8"
		>
			{children}
		</section>
	);
}
