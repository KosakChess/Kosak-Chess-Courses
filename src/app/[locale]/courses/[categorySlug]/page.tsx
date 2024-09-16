import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { db } from '@/lib/db';
import { type Locale, locales } from '@/lib/navigation';

import { CategorySelect } from '../_components/category-select';
import { CoursesList, CoursesListSkeleton } from '../_components/courses-list';

export const dynamicParams = false;

export const generateStaticParams = async () => {
	const categories = await db.category.findMany({
		select: {
			slug: true,
		},
	});

	const paths = locales.flatMap((locale) =>
		categories.map((category) => ({
			locale,
			categorySlug: category.slug,
		})),
	);

	return paths;
};

export default function CoursesPage({
	params,
}: {
	params: { locale: Locale; categorySlug: string };
}) {
	const { locale, categorySlug } = params;

	unstable_setRequestLocale(locale);
	const t = useTranslations('pages.courses');

	return (
		<>
			<Suspense fallback={<CoursesListSkeleton />}>
				<CoursesList title={t('availableHeader')} category={categorySlug}>
					<CategorySelect />
				</CoursesList>
			</Suspense>
		</>
	);
}
