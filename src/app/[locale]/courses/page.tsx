import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { type PageProps } from '@/types';

import { CategorySelect, CategorySelectSkeleton } from './components/category-select';
import { CoursesList, CoursesListSkeleton } from './components/courses-list';

export default function CoursesPage({ params }: PageProps) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('pages.courses');

	return (
		<>
			<div className="mb-6 flex items-center justify-between">
				<h1 id="courses-heading" className="text-3xl font-semibold tracking-tight">
					{t('header')}
				</h1>
				<Suspense fallback={<CategorySelectSkeleton />}>
					<CategorySelect />
				</Suspense>
			</div>
			<p className="mb-10 max-w-3xl">{t('description')}</p>
			<Suspense fallback={<CoursesListSkeleton />}>
				<CoursesList />
			</Suspense>
		</>
	);
}
