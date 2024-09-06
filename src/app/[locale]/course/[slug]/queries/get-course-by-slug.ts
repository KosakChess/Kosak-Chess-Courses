import { getLocale } from 'next-intl/server';

import { db } from '@/lib/db';
import { type Locale } from '@/lib/navigation';

export const getCourseBySlug = async (slug: string) => {
	const locale = (await getLocale()) as Locale;

	const course = await db.course.findUnique({
		where: { isPublished: true, slug },
		select: {
			id: true,
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
				select: {
					isFree: true,
					translations: {
						where: { locale },
						select: { title: true },
					},
					lessons: {
						select: {
							translations: {
								where: { locale },
								select: { title: true },
							},
							duration: true,
							chessPuzzle: true,
							videoUrl: true,
						},
					},
				},
			},
		},
	});

	if (!course) {
		throw new Error('Course not found');
	}

	const totalDuration = course.chapters.reduce((totalDuration, chapter) => {
		return (
			totalDuration +
			chapter.lessons.reduce((chapterDuration, lesson) => {
				return chapterDuration + (lesson.duration || 0);
			}, 0)
		);
	}, 0);

	return {
		id: course.id,
		imageUrl: course.imageUrl,
		title: course.translations[0]?.title,
		description: course.translations[0]?.description,
		price: course.translations[0]?.price,
		duration: totalDuration,
		chapters: course.chapters.map((chapter) => ({
			title: chapter.translations[0]?.title,
			isFree: chapter.isFree,
			lessons: chapter.lessons.map((lesson) => ({
				title: lesson.translations[0]?.title,
				duration: lesson.duration,
				type: lesson.chessPuzzle ? 'puzzle' : 'video',
			})),
		})),
	};
};
