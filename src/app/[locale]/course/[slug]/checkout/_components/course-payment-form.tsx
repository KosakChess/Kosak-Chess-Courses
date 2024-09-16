'use client';

import { PaymentElement } from '@stripe/react-stripe-js';
import { Loader } from 'lucide-react';

import NextImage from 'next/image';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { type Locale } from '@/lib/navigation';
import { formatPrice } from '@/lib/utils';

import { useCheckout } from '../hooks/useCheckout';

interface Props {
	course: {
		imageUrl: string | null;
		translations: {
			title: string;
			price: number;
			locale: Locale;
		}[];
	};
}

export const CoursePaymentForm = ({ course }: Props) => {
	const { handleSubmit, isLoading, message, stripe, elements } = useCheckout();
	const t = useTranslations('components.courses.course-details.payment-form');

	if (!course.translations[0]) {
		return null;
	}

	const { title, price, locale } = course.translations[0];

	return (
		<section className="mx-auto mt-12 max-w-lg lg:mt-20">
			<h1 className="sr-only">{t('header')}</h1>
			<div className="mb-6 flex items-center justify-center">
				<NextImage
					src={course.imageUrl || ''}
					alt={title}
					height={80}
					width={142}
					className="rounded-md object-cover object-center"
				/>
				<div className="ml-4">
					<h2 className="text-lg font-semibold">{title}</h2>
					<p>{formatPrice(price / 100, locale)}</p>
				</div>
			</div>

			<form
				id="payment-form"
				onSubmit={handleSubmit}
				className="flex flex-col justify-center space-y-6"
			>
				<div className="p-4">
					<PaymentElement
						id="payment-element"
						options={{
							layout: 'tabs',
						}}
					/>
				</div>

				<div className="flex justify-center">
					<Button
						type="submit"
						aria-disabled={!stripe || isLoading || !elements}
						size="lg"
						className="aria-disabled:hover:cursor-not-allowed"
					>
						<span id="button-text">
							{isLoading ? (
								<Loader className="me-2 size-5 animate-spin" aria-hidden />
							) : (
								t('payBtn')
							)}
						</span>
					</Button>
				</div>

				{message && (
					<p id="payment-message" className="text-center text-destructive">
						{message}
					</p>
				)}
			</form>
		</section>
	);
};
