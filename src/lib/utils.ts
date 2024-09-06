import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type Locale } from './navigation';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatPrice = (price: number, locale?: Locale) => {
	if (locale === 'pl') {
		return new Intl.NumberFormat('pl-PL', {
			style: 'currency',
			currency: 'PLN',
		}).format(price);
	}

	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(price);
};

type TimeFormat = 'short' | 'digital';

export const secondsToHours = (seconds: number, format: TimeFormat = 'short') => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	if (format === 'digital') {
		const paddedHours = String(hours).padStart(2, '0');
		const paddedMinutes = String(minutes).padStart(2, '0');
		return `${paddedHours}:${paddedMinutes}`;
	}

	return `${hours}h ${minutes}m`;
};
