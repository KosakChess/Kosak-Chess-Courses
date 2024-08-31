import { unstable_setRequestLocale } from 'next-intl/server';

import { type PageProps } from '@/types';

import { CoursesList } from './components/courses-list';
import { SortSelect } from './components/sort-select';

export default function CoursesPage({ params }: PageProps) {
	unstable_setRequestLocale(params.locale);

	return (
		<section
			aria-labelledby="courses-heading"
			className="mx-auto mt-40 max-w-2xl px-4 lg:max-w-7xl lg:px-8"
		>
			<div className="mb-6 flex items-center justify-between">
				<h1 id="courses-heading" className="text-3xl font-semibold tracking-tight">
					Courses
				</h1>
				<SortSelect />
			</div>
			<p className="mb-10 max-w-3xl">
				Whether you&apos;re just starting out or looking to sharpen your skills, my engaging lessons
				will guide you through the strategies and tactics needed to dominate the board. Dive into
				the courses today and take your game to the next level!
			</p>
			<CoursesList />
		</section>
	);
}
