import { auth } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const getCurrentUser = async () => {
	const { userId: clerkId } = auth();

	if (!clerkId) {
		return null;
	}

	const user = await db.user.findUnique({
		where: { clerkId },
		select: {
			id: true,
			email: true,
		},
	});

	return user ? user : null;
};
