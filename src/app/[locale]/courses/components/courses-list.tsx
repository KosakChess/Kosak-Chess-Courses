import { useTranslations } from 'next-intl';

import { Skeleton } from '@/components/ui/skeleton';

import { getCourses } from '../queries/get-courses';

import { CourseCard } from './course-card';

interface Props {
	category?: string;
}

export const CoursesList = async ({ category }: Props) => {
	const courses = await getCourses(category);

	return (
		<ul
			role="list"
			className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8"
		>
			{courses.map((course) => (
				<CourseCard key={course.slug} course={course} />
			))}
		</ul>
	);
};

export const CoursesListSkeleton = () => {
	const t = useTranslations('components.shared.skeletons');

	return (
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
	);
};
