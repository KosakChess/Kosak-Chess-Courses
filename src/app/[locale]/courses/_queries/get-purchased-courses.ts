import { getLocale } from 'next-intl/server';

import { db } from '@/lib/db';
import { type Locale } from '@/lib/navigation';
import { getCurrentUser } from '@/queries/get-current-user';

export const getPurchasedCourses = async () => {
	const currentUser = await getCurrentUser();
	const locale = (await getLocale()) as Locale;

	if (!currentUser) {
		return [];
	}

	const user = await db.user.findUnique({
		where: {
			id: currentUser.id,
		},
		select: {
			purchases: {
				include: {
					course: {
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
					},
				},
			},
		},
	});

	if (!user) {
		return [];
	}

	const courseList = await Promise.all(
		user.purchases.map(async (purchase) => {
			const course = purchase.course;
			const totalDuration = course.chapters.reduce((total, chapter) => {
				return total + chapter.lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0);
			}, 0);

			const userProgress = await getUserProgress(currentUser.id, course.id);

			return {
				slug: course.slug,
				imageUrl: course.imageUrl,
				title: course.translations[0]?.title,
				price: null, // Price is null for purchased courses
				category: course.category?.translations[0]?.name,
				duration: totalDuration,
				minElo: course.minElo,
				maxElo: course.maxElo,
				purchased: true,
				userProgress,
			};
		}),
	);

	return courseList;
};

const getUserProgress = async (userId: string, courseId: string) => {
	const completedLessons = await db.userProgress.count({
		where: {
			userId,
			isCompleted: true,
			lesson: {
				chapter: {
					courseId,
				},
			},
		},
	});

	const totalLessons = await db.lesson.count({
		where: {
			chapter: {
				courseId,
			},
		},
	});

	return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
};
