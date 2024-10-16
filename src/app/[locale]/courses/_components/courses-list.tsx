import { useId } from 'react';

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Skeleton } from '@/components/ui/skeleton';
import { type Course } from '@/types';

import { getCourses } from '../_queries/get-courses';
import { getPurchasedCourses } from '../_queries/get-purchased-courses';

import { CategorySelectSkeleton } from './category-select';
import { CourseCard } from './course-card';

interface Props {
	title: string;
	category?: string;
	purchased?: boolean;
	children?: React.ReactNode;
}

export const CoursesList = async ({ title, category, purchased, children }: Props) => {
	const id = useId();
	const t = await getTranslations('components.courses.courses-list');
	const courses = purchased ? await getPurchasedCourses() : await getCourses(category);

	if (courses.length === 0) {
		if (purchased) {
			return null;
		}

		if (category) {
			return (
				<section aria-labelledby={id}>
					<h2 id={id} className="mb-10 text-3xl font-semibold tracking-tight">
						{/* {t('noCoursesFound', { category })} */}
					</h2>
				</section>
			);
		}

		return (
			<section aria-labelledby={id}>
				<h2 className="text-headings/90 mx-auto mt-12 max-w-xl text-center text-xl font-medium">
					{t('allPurchased')}
				</h2>
			</section>
		);
	}

	return (
		<section aria-labelledby={id}>
			{children ? (
				<div className="mb-10 flex flex-col items-center gap-y-6 sm:flex-row sm:justify-between">
					<h2 id={id} className="text-3xl font-semibold tracking-tight">
						{title}
					</h2>
					{children}
				</div>
			) : (
				<h2 id={id} className="mb-10 text-3xl font-semibold tracking-tight">
					{title}
				</h2>
			)}
			<ul
				role="list"
				className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8"
			>
				{courses.map((course) => (
					<CourseCard key={course.slug} course={course as Course} />
				))}
			</ul>
		</section>
	);
};

export const CoursesListSkeleton = () => {
	const t = useTranslations('components.shared.skeletons');

	return (
		<section>
			<div className="mb-10 flex flex-col items-center gap-y-6 sm:flex-row sm:justify-between">
				<Skeleton className="h-9 w-48" />
				<CategorySelectSkeleton />
			</div>
			<div
				aria-busy
				aria-label={t('ariaLabel')}
				role="status"
				className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8"
			>
				<span className="sr-only">{t('loading')}</span>
				{Array.from({ length: 3 }).map((_, index) => (
					<div
						key={index}
						className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/80"
					>
						<div className="animate-pulse">
							<Skeleton className="h-48" />
							<div className="p-4">
								<Skeleton className="mb-2 h-6 w-3/4" />
								<Skeleton className="mb-4 h-4 w-1/2" />
								<div className="flex justify-between">
									<Skeleton className="h-4 w-1/3" />
									<Skeleton className="h-6 w-16" />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
