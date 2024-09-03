import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { db } from '@/lib/db';
import { type Locale, locales } from '@/lib/navigation';

import { CategorySelect, CategorySelectSkeleton } from '../components/category-select';
import { CoursesList, CoursesListSkeleton } from '../components/courses-list';

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
			<div className="mb-6 flex items-center justify-between">
				<h1 id="courses-heading" className="text-3xl font-semibold tracking-tight">
					{t(`categories.${categorySlug}`)}
				</h1>
				<Suspense fallback={<CategorySelectSkeleton />}>
					<CategorySelect />
				</Suspense>
			</div>
			<p className="mb-10 max-w-3xl">{t('description')}</p>
			<Suspense fallback={<CoursesListSkeleton />}>
				<CoursesList category={categorySlug} />
			</Suspense>
		</>
	);
}
