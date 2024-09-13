import { CheckCircle } from 'lucide-react';

import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { type Locale, redirect } from '@/lib/navigation';
import { stripe } from '@/lib/stripe';

interface Props {
	params: {
		locale: Locale;
		slug: string;
	};
	searchParams: {
		intent_id: string;
	};
}

export default async function CheckoutSuccessPage({ params, searchParams }: Props) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('pages.courses.checkout/success');

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error('Stripe secret key not set');
	}

	const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.intent_id);

	if (
		!paymentIntent ||
		paymentIntent.status !== 'succeeded' ||
		!paymentIntent.metadata.userId ||
		!paymentIntent.metadata.courseId
	) {
		redirect('/courses');
	}

	return (
		<section className="mt-14 flex flex-col items-center justify-center text-center lg:mt-20">
			<h1 className="flex items-center gap-x-2 text-4xl font-extrabold text-green-500">
				<CheckCircle aria-hidden className="size-7" />
				{t('title')}
			</h1>
			<p className="mt-5 text-2xl font-semibold">{t('thankYou')}</p>
			<p className="text-foreground/90 text-lg italic">{t('receiptSent')}</p>
			<Button href={`/learn/${paymentIntent.metadata.courseSlug}`} className="mt-8">
				{t('startLearning')}
			</Button>
		</section>
	);
}
