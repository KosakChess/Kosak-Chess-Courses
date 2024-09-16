import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { type LayoutProps } from '@/types';

import { CoursesList, CoursesListSkeleton } from './_components/courses-list';

export default function CoursesLayout({ children, params: { locale } }: LayoutProps) {
	unstable_setRequestLocale(locale);
	const t = useTranslations('pages.courses');

	return (
		<div className="mx-auto mt-16 max-w-2xl px-4 lg:max-w-7xl lg:px-8">
			<div className="mx-auto mb-20 max-w-3xl space-y-8 text-center">
				<h1 className="text-4xl font-bold tracking-tight">{t('mainHeader')}</h1>
				<p className="text-lg leading-relaxed">{t('description')}</p>
			</div>
			<Suspense fallback={<CoursesListSkeleton />}>
				<CoursesList title={t('purchasedHeader')} purchased />
			</Suspense>
			<div className="mt-24">{children}</div>
		</div>
	);
}
