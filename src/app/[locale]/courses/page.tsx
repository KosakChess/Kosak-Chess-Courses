import { unstable_setRequestLocale } from 'next-intl/server';

import { type PageProps } from '@/types';

export default function CoursesPage({ params }: PageProps) {
	unstable_setRequestLocale(params.locale);

	return (
		<div className="flex flex-col items-center justify-center gap-y-4 pt-24">
			<h1>Courses</h1>
			<p>Here are the courses</p>
		</div>
	);
}
