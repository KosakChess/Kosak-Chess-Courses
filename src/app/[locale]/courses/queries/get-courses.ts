import { auth } from '@clerk/nextjs/server';

import { getLocale } from 'next-intl/server';

import { db } from '@/lib/db';
import { type Locale } from '@/lib/navigation';

export const getCourses = async (category?: string) => {
	const { userId } = auth();
	const locale = (await getLocale()) as Locale;

	const courses = await db.course.findMany({
		where: {
			isPublished: true,
			...(category && {
				category: { slug: category },
			}),
		},
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
					price: true,
					currency: true,
				},
			},
			chapters: {
				select: {
					id: true,
					lessons: {
						select: {
							duration: true,
						},
					},
				},
			},
			purchases: userId
				? {
						where: { userId },
						select: {
							id: true,
						},
					}
				: false,
		},
	});

	const courseList = await Promise.all(
		courses.map(async (course) => {
			const totalDuration = course.chapters.reduce((total, chapter) => {
				return total + chapter.lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0);
			}, 0);

			const chapterCount = course.chapters.length;

			return {
				slug: course.slug,
				imageUrl: course.imageUrl,
				title: course.translations[0]?.title,
				price:
					course.purchases && course.purchases.length > 0 ? null : course.translations[0]?.price,
				category: course.category?.translations[0]?.name,
				duration: totalDuration,
				chaptersCount: chapterCount, // Add the chapters count here
				purchased: course.purchases && course.purchases.length > 0,
				userProgress:
					course.purchases && course.purchases.length > 0
						? await getUserProgress(userId!, course.id)
						: null,
			};
		}),
	);

	return courseList;
};

const getUserProgress = async (userId: string, courseId: string) => {
	const progress = await db.userProgress.findMany({
		where: {
			lesson: {
				chapter: {
					courseId,
				},
			},
			userId,
		},
		select: {
			isCompleted: true,
		},
	});

	const completedLessons = progress.filter((p) => p.isCompleted).length;
	const totalLessons = await db.lesson.count({
		where: {
			chapter: {
				courseId,
			},
		},
	});

	return (completedLessons / totalLessons) * 100;
};
