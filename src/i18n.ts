import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { isValidLocale } from './lib/navigation';

export default getRequestConfig(async ({ locale }) => {
	if (!isValidLocale(locale)) notFound();

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
	return { messages: (await import(`../dictionaries/${locale}.json`)).default };
});
