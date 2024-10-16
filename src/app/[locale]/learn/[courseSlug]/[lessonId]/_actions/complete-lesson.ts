'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/queries/get-current-user';

export async function completeLesson(lessonId: string) {
	const user = await getCurrentUser();

	if (!user) {
		throw new Error('Unauthorized');
	}

	const existingProgress = await db.userProgress.findUnique({
		where: {
			userId_lessonId: {
				userId: user.id,
				lessonId,
			},
		},
	});

	// If the lesson is already completed, do nothing
	if (existingProgress && existingProgress.isCompleted) return;

	// Mark the lesson as completed
	if (existingProgress) {
		await db.userProgress.update({
			where: {
				userId_lessonId: {
					userId: user.id,
					lessonId,
				},
			},
			data: {
				isCompleted: true,
			},
		});
	} else {
		await db.userProgress.create({
			data: {
				userId: user.id,
				lessonId,
				isCompleted: true,
			},
		});
	}
}
