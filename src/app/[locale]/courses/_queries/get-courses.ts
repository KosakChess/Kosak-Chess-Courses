import { getLocale } from 'next-intl/server';

import { db } from '@/lib/db';
import { type Locale } from '@/lib/navigation';
import { getCurrentUser } from '@/queries/get-current-user';

export const getCourses = async (category?: string) => {
	const [user, locale] = await Promise.all([
		getCurrentUser(),
		getLocale().then((l) => l as Locale),
	]);

	const courses = await db.course.findMany({
		where: {
			isPublished: true,
			...(category && {
				category: { slug: category },
			}),
			// Exclude courses that the user has already purchased
			NOT: {
				purchases: {
					some: {
						userId: user?.id || '',
					},
				},
			},
		},
		select: {
			id: true,
			slug: true,
			imageUrl: true,
			minElo: true,
			maxElo: true,
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
							id: true,
							duration: true,
						},
					},
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const courseList = courses.map((course) => {
		const totalDuration = course.chapters.reduce((total, chapter) => {
			return total + chapter.lessons.reduce((sum, lesson) => sum + (lesson.duration ?? 0), 0);
		}, 0);

		return {
			slug: course.slug,
			imageUrl: course.imageUrl,
			title: course.translations[0]?.title ?? '',
			price: course.translations[0]?.price ?? 0,
			category: course.category?.translations[0]?.name ?? '',
			duration: totalDuration,
			minElo: course.minElo,
			maxElo: course.maxElo,
		};
	});

	return courseList;
};
