import { pick } from 'lodash';

import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

import { db } from '@/lib/db';
import { type Locale } from '@/lib/navigation';

import { CoursePaymentForm } from './_components/course-payment-form';
import { StripeElementsWrapper } from './_components/stripe-elements-wrapper';

interface Props {
	params: {
		locale: Locale;
		slug: string;
	};
	searchParams: {
		client_secret: string;
	};
}

export default async function CheckoutPage({ params, searchParams }: Props) {
	const { locale, slug } = params;
	const { client_secret } = searchParams;

	const messages = await getMessages();
	unstable_setRequestLocale(locale);

	const course = await db.course.findFirst({
		where: {
			slug: slug,
		},
		select: {
			imageUrl: true,
			translations: {
				where: {
					locale,
				},
				select: {
					title: true,
					price: true,
					locale: true,
				},
			},
		},
	});

	if (!course || !course.translations[0] || !client_secret) {
		notFound();
	}

	return (
		<NextIntlClientProvider
			messages={pick(messages, 'components.courses.course-details.payment-form')}
		>
			<StripeElementsWrapper clientSecret={client_secret}>
				<CoursePaymentForm course={course} />
			</StripeElementsWrapper>
		</NextIntlClientProvider>
	);
}
