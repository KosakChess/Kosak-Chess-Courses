import { unstable_setRequestLocale } from 'next-intl/server';

import { VideoPlayer } from '@/components/shared/video-player';
import { type Locale } from '@/lib/navigation';
import { hasPurchasedCourse } from '@/queries/has-purchased-course';

import { CompleteLessonButton } from './_components/complete-lesson-button';
import { LessonNavigation } from './_components/lesson-navigation';
import { PurchaseCourseDialog } from './_components/purchase-course-dialog';
import { getLessonById } from './_queries/get-lesson-by-id';

interface Props {
	params: {
		locale: Locale;
		courseSlug: string;
		lessonId: string;
	};
}

export default async function LessonPage({ params }: Props) {
	const { locale, courseSlug, lessonId } = params;
	unstable_setRequestLocale(locale);

	const [lesson, hasPurchased] = await Promise.all([
		getLessonById(lessonId, courseSlug),
		hasPurchasedCourse({ courseSlug }),
	]);

	return (
		<article className="container mx-auto p-6">
			<header className="mb-6 flex flex-col items-center gap-y-4 text-center sm:flex-row sm:justify-between">
				<h1 className="text-2xl font-semibold md:text-3xl">{lesson.title}</h1>
				<LessonNavigation
					prevLessonId={lesson.prevLessonId}
					nextLessonId={lesson.nextLessonId}
					courseSlug={courseSlug}
					allLessonsCompleted={lesson.allLessonsCompleted}
					hasPurchasedCourse={hasPurchased}
				/>
			</header>
			<div className="mx-auto mb-6 max-w-5xl">
				{!lesson.isChapterFree && !hasPurchased ? (
					<PurchaseCourseDialog courseSlug={courseSlug} />
				) : lesson.videoUrl ? (
					<VideoPlayer
						src={lesson.videoUrl}
						title={lesson.title}
						lessonId={lessonId}
						completed={lesson.isCompleted}
					/>
				) : (
					'Puzzle will be here'
				)}
			</div>
			{lesson.videoUrl && (
				<CompleteLessonButton lessonId={lessonId} completed={lesson.isCompleted} />
			)}
		</article>
	);
}
