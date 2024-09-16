import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { type PageProps } from '@/types';

import { CategorySelect } from './components/category-select';
import { CoursesList, CoursesListSkeleton } from './components/courses-list';

export default function CoursesPage({ params }: PageProps) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('pages.courses');

	return (
		<Suspense fallback={<CoursesListSkeleton />}>
			<CoursesList title={t('availableHeader')}>
				<CategorySelect />
			</CoursesList>
		</Suspense>
	);
}
