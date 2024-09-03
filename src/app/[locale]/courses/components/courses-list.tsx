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

export const CoursesListSkeleton = () => (
	<div
		role="status"
		className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8"
	>
		{Array.from({ length: 3 }).map((_, index) => (
			<div
				key={index}
				className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/80"
			>
				<span className="sr-only">Loading...</span>
				<div className="animate-pulse">
					<div className="h-48 w-full bg-slate-200 dark:bg-slate-700" />
					<div className="p-4">
						<div className="mb-2 h-6 w-3/4 bg-slate-200 dark:bg-slate-700" />
						<div className="mb-4 h-4 w-1/2 bg-slate-200 dark:bg-slate-700" />
						<div className="flex justify-between">
							<div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700" />
							<div className="h-6 w-16 bg-slate-200 dark:bg-slate-700" />
						</div>
					</div>
				</div>
			</div>
		))}
	</div>
);
