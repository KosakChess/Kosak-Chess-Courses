import { unstable_setRequestLocale } from 'next-intl/server';

import { db } from '@/lib/db';
import { locales } from '@/lib/navigation';

import { CourseDetails } from './components/course-details';

export const dynamicParams = false;

export const generateStaticParams = async () => {
	const courses = await db.course.findMany({ select: { slug: true } });

	const paths = locales.flatMap((locale) =>
		courses.map((course) => ({
			locale,
			slug: course.slug,
		})),
	);

	return paths;
};

export default function CoursePage({ params }: { params: { locale: string; slug: string } }) {
	unstable_setRequestLocale(params.locale);

	return (
		<div className="mt-20 lg:mt-28">
			<CourseDetails slug={params.slug} />
		</div>
	);
}
