import { db } from '@/lib/db';

import { getCurrentUser } from './get-current-user';

interface Props {
	courseId?: string;
	courseSlug?: string;
	userId?: string;
}

export const hasPurchasedCourse = async ({ courseId, courseSlug, userId }: Props) => {
	if (!courseId && !courseSlug) {
		return false;
	}

	const user = userId ? { id: userId } : await getCurrentUser();

	if (!user) {
		return false;
	}

	const course = courseId
		? { id: courseId }
		: await db.course.findUnique({
				where: { slug: courseSlug },
				select: { id: true },
			});

	if (!course || !course.id) {
		return false;
	}

	const purchase = await db.purchase.findUnique({
		where: {
			userId_courseId: {
				userId: user.id,
				courseId: course.id,
			},
		},
	});

	return !!purchase;
};
