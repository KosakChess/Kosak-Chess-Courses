'use server';

import { type Locale } from '@prisma/client';

import { getLocale } from 'next-intl/server';

import { db } from '@/lib/db';
import { redirect } from '@/lib/navigation';
import { stripe } from '@/lib/stripe';
import { getCurrentUser } from '@/queries/get-current-user';

export const handlePayment = async (courseSlug: string) => {
	const user = await getCurrentUser();
	const locale = (await getLocale()) as Locale;

	if (!user) {
		return redirect('/sign-in');
	}

	const course = await db.course.findFirst({
		where: {
			slug: courseSlug,
		},
		select: {
			id: true,
			translations: {
				where: {
					locale,
				},
				select: {
					currency: true,
					price: true,
				},
			},
		},
	});

	if (!course || !course.translations[0]) {
		throw new Error('Course not found');
	}

	const { price, currency } = course.translations[0];

	const paymentIntent = await stripe.paymentIntents.create({
		amount: price,
		currency,
		receipt_email: user?.email as string,
		metadata: {
			courseId: course.id,
			userId: user.id,
			courseSlug,
		},
	});

	if (!paymentIntent.client_secret) {
		throw new Error('Payment intent not created');
	}

	redirect(
		`/course/${courseSlug}/checkout?client_secret=${paymentIntent.client_secret}&intent_id=${paymentIntent.id}`,
	);
};
