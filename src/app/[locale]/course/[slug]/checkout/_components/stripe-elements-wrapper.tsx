'use client';

import { Elements } from '@stripe/react-stripe-js';
import {
	loadStripe,
	type StripeElementLocale,
	type StripeElementsOptions,
} from '@stripe/stripe-js';

import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';

import { type Locale } from '@/lib/navigation';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
	throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY env variable');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

interface Props {
	clientSecret: string;
	children: React.ReactNode;
}

export const StripeElementsWrapper = ({ clientSecret, children }: Props) => {
	const currentLocale = useLocale() as Locale;
	const { resolvedTheme } = useTheme();

	const locale = supportedStripeLocales.includes(currentLocale) ? currentLocale : ('auto' as const);

	const options = {
		clientSecret,
		locale,
		appearance: {
			labels: 'above',
			theme: resolvedTheme === 'dark' ? 'night' : 'flat',
			variables: {
				colorDanger: '#ff0000',
				colorPrimary: '#1b6ff5',
				fontFamily: `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
				fontSizeSm: '0.875rem',
			},
		},
	} satisfies StripeElementsOptions;

	return (
		<Elements stripe={stripePromise} options={options}>
			{children}
		</Elements>
	);
};

// This was taken from `StripeElementLocale` in `@stripe/react-stripe-js`:
const supportedStripeLocales = [
	'ar',
	'bg',
	'cs',
	'da',
	'de',
	'el',
	'en',
	'en-AU',
	'en-CA',
	'en-NZ',
	'en-GB',
	'es',
	'es-ES',
	'es-419',
	'et',
	'fi',
	'fil',
	'fr',
	'fr-CA',
	'fr-FR',
	'he',
	'hu',
	'hr',
	'id',
	'it',
	'it-IT',
	'ja',
	'ko',
	'lt',
	'lv',
	'ms',
	'mt',
	'nb',
	'nl',
	'no',
	'pl',
	'pt',
	'pt-BR',
	'ro',
	'ru',
	'sk',
	'sl',
	'sv',
	'th',
	'tr',
	'vi',
	'zh',
	'zh-HK',
	'zh-TW',
] satisfies StripeElementLocale[];
