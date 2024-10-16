import { getLocale } from 'next-intl/server';

import { db } from '@/lib/db';
import { type Locale } from '@/lib/navigation';
import { getCurrentUser } from '@/queries/get-current-user';
import { type LessonType } from '@/types';

export const getCourseBySlug = async (slug: string) => {
	const [locale, user] = await Promise.all([getLocale() as Promise<Locale>, getCurrentUser()]);

	// const existingPurchase = user
	// 	? await db.purchase.findFirst({
	// 			where: {
	// 				course: { slug },
	// 				user: { id: user.id },
	// 			},
	// 		})
	// 	: null;

	const course = await db.course.findUnique({
		where: { isPublished: true, slug },
		select: {
			id: true,
			slug: true,
			imageUrl: true,
			category: {
				select: {
					translations: {
						where: { locale },
						select: { name: true },
					},
				},
			},
			translations: {
				where: { locale },
				select: {
					title: true,
					description: true,
					price: true,
				},
			},
			chapters: {
				orderBy: { order: 'asc' },
				select: {
					isFree: true,
					translations: {
						where: { locale },
						select: { title: true },
					},
					lessons: {
						orderBy: { order: 'asc' },
						select: {
							id: true,
							translations: {
								where: { locale },
								select: { title: true },
							},
							duration: true,
							chessPuzzle: true,
							videoUrl: true,
							userProgress: {
								where: { userId: user?.id || undefined },
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

	const duration = course.chapters.reduce((totalDuration, chapter) => {
		return (
			totalDuration +
			chapter.lessons.reduce((chapterDuration, lesson) => {
				return chapterDuration + (lesson.duration || 0);
			}, 0)
		);
	}, 0);

	const lessonsCount = course.chapters.reduce((count, chapter) => {
		return count + chapter.lessons.length;
	}, 0);

	return {
		id: course.id,
		slug: course.slug,
		imageUrl: course.imageUrl ?? '',
		title: course.translations[0]?.title ?? '',
		description: course.translations[0]?.description ?? '',
		price: course.translations[0]?.price ?? 0,
		duration,
		lessonsCount,
		chapters: course.chapters.map((chapter) => ({
			title: chapter.translations[0]?.title ?? '',
			isFree: chapter.isFree,
			lessons: chapter.lessons.map((lesson) => ({
				id: lesson.id,
				title: lesson.translations[0]?.title ?? '',
				duration: lesson.duration ?? 0,
				type: lesson.chessPuzzle ? 'puzzle' : ('video' as LessonType),
				isCompleted:
					Array.isArray(lesson.userProgress) && lesson.userProgress.length > 0
						? (lesson.userProgress[0]?.isCompleted ?? false)
						: false,
			})),
		})),
	};
};
