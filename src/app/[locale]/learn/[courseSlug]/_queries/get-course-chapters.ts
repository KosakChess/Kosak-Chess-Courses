import { getLocale } from 'next-intl/server';

import { db } from '@/lib/db';
import { type Locale } from '@/lib/navigation';
import { getCurrentUser } from '@/queries/get-current-user';
import { type LessonType } from '@/types';

export const getCourseChapters = async (slug: string) => {
	const [locale, user] = await Promise.all([
		getLocale().then((l) => l as Locale),
		getCurrentUser(),
	]);

	if (!user) {
		throw new Error('User not authenticated');
	}

	const course = await db.course.findUnique({
		where: {
			slug,
		},
		select: {
			translations: {
				where: { locale },
				select: { title: true },
			},
			chapters: {
				where: { isPublished: true },
				orderBy: { order: 'asc' },
				select: {
					id: true,
					isFree: true,
					translations: {
						where: { locale },
						select: { title: true },
					},
					lessons: {
						where: { isPublished: true },
						orderBy: { order: 'asc' },
						select: {
							id: true,
							translations: {
								where: { locale },
								select: { title: true },
							},
							duration: true,
							videoUrl: true,
							chessPuzzle: true,
							userProgress: {
								where: { userId: user.id },
								select: { isCompleted: true },
							},
						},
					},
				},
			},
		},
	});

	if (!course) {
		throw new Error('Course not found');
	}

	return course.chapters.map((chapter) => ({
		id: chapter.id,
		title: chapter.translations[0]?.title ?? '',
		isFree: chapter.isFree,
		lessons: chapter.lessons.map((lesson) => ({
			id: lesson.id,
			title: lesson.translations[0]?.title ?? '',
			duration: lesson.duration ?? 0,
			type: lesson.videoUrl ? 'video' : ('puzzle' as LessonType),
			isCompleted: lesson.userProgress[0]?.isCompleted ?? false,
		})),
	}));
};
