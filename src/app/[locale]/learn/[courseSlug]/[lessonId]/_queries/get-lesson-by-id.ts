import { getLocale } from 'next-intl/server';

import { db } from '@/lib/db';
import { type Locale } from '@/lib/navigation';
import { getCurrentUser } from '@/queries/get-current-user';

export const getLessonById = async (lessonId: string, courseSlug: string) => {
	const [locale, user] = await Promise.all([getLocale() as Promise<Locale>, getCurrentUser()]);

	const lesson = await db.lesson.findUnique({
		where: {
			id: lessonId,
			isPublished: true,
			chapter: {
				course: {
					slug: courseSlug,
				},
			},
		},
		select: {
			id: true,
			translations: {
				where: {
					locale,
				},
				select: {
					title: true,
				},
			},
			videoUrl: true,
			chessPuzzle: true,
			duration: true,
			order: true,
			chapter: {
				select: {
					id: true,
					isFree: true,
					order: true,
					course: {
						select: {
							id: true,
							chapters: {
								where: {
									isPublished: true,
								},
								orderBy: {
									order: 'asc',
								},
								select: {
									id: true,
									order: true,
									lessons: {
										where: {
											isPublished: true,
										},
										orderBy: {
											order: 'asc',
										},
										select: {
											id: true,
											order: true,
											userProgress: user
												? {
														where: {
															userId: user.id,
														},
														select: {
															isCompleted: true,
														},
													}
												: undefined,
										},
									},
								},
							},
						},
					},
				},
			},
			userProgress: user
				? {
						where: {
							userId: user.id,
						},
						select: {
							isCompleted: true,
						},
					}
				: undefined,
		},
	});

	if (!lesson) {
		throw new Error('Lesson not found');
	}

	const course = lesson.chapter.course;
	const allLessons = course.chapters
		.flatMap((chapter) =>
			chapter.lessons.map((l) => ({
				...l,
				chapterId: chapter.id,
				chapterOrder: chapter.order,
				isCompleted: l.userProgress?.[0]?.isCompleted ?? false,
			})),
		)
		.sort((a, b) =>
			a.chapterOrder === b.chapterOrder ? a.order - b.order : a.chapterOrder - b.chapterOrder,
		);

	const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
	const nextLesson = allLessons[currentIndex + 1];
	const prevLesson = allLessons[currentIndex - 1];

	const allLessonsCompleted = allLessons.every((l) => l.isCompleted);

	return {
		title: lesson.translations[0]?.title || 'Untitled',
		videoUrl: lesson.videoUrl,
		chessPuzzle: lesson.chessPuzzle,
		duration: lesson.videoUrl ? lesson.duration : null,
		isCompleted: lesson.userProgress?.[0]?.isCompleted ?? false,
		isChapterFree: lesson.chapter.isFree,
		nextLessonId: nextLesson?.id || null,
		prevLessonId: prevLesson?.id || null,
		allLessonsCompleted,
	};
};
