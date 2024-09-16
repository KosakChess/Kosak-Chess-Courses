import { type FormEvent, useEffect, useState } from 'react';
import { useElements, useStripe } from '@stripe/react-stripe-js';

import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const useCheckout = () => {
	const stripe = useStripe();
	const elements = useElements();
	const searchParams = useSearchParams();
	const intentId = searchParams?.get('intent_id') ?? '';
	const params = useParams<{ slug: string }>();
	const t = useTranslations('components.courses.course-details.payment-form');

	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe || !elements) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret',
		);

		if (!clientSecret) {
			return;
		}

		stripe
			.retrievePaymentIntent(clientSecret)
			.then(({ paymentIntent }) => {
				switch (paymentIntent?.status) {
					case 'succeeded':
						setMessage(t('paymentSucceeded'));
						break;
					case 'processing':
						setMessage(t('paymentProcessing'));
						break;
					case 'requires_payment_method':
						setMessage(t('paymentFailed'));
						break;
					default:
						setMessage(t('somethingWentWrong'));
						break;
				}
			})
			.catch(console.error);
	}, [elements, stripe, t]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/course/${params?.slug}/checkout/success?intent_id=${intentId}`,
			},
		});

		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message ?? t('somethingWentWrong'));
		} else {
			setMessage(t('unexpectedError'));
		}

		setIsLoading(false);
	};

	return {
		handleSubmit,
		elements,
		isLoading,
		message,
		stripe,
	};
};
