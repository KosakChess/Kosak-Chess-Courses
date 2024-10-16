import { unstable_setRequestLocale } from 'next-intl/server';

import { ChaptersList } from '@/components/shared/chapters-list';
import { type Locale } from '@/lib/navigation';
import { hasPurchasedCourse } from '@/queries/has-purchased-course';

import { getCourseBySlug } from '../../course/[slug]/_queries/get-course-by-slug';

import { CourseHeader } from './_components/course-header';

interface Props {
	params: {
		locale: Locale;
		courseSlug: string;
	};
}

export default async function LearnPage({ params }: Props) {
	unstable_setRequestLocale(params.locale);

	const [course, hasPurchased] = await Promise.all([
		getCourseBySlug(params.courseSlug),
		hasPurchasedCourse({ courseSlug: params.courseSlug }),
	]);

	return (
		<article className="mx-auto sm:max-w-fit">
			<CourseHeader
				title={course.title}
				slug={course.slug}
				img={course.imageUrl}
				duration={course.duration}
				lessonsCount={course.lessonsCount}
			/>
			<div className="mt-8 max-w-prose px-5">
				<ChaptersList
					chapters={course.chapters}
					courseSlug={course.slug}
					showProgress
					hasPurchasedCourse={hasPurchased}
				/>
			</div>
		</article>
	);
}
