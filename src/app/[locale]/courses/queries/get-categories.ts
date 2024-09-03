import { getLocale } from 'next-intl/server';

import { db } from '@/lib/db';
import { type Locale } from '@/lib/navigation';

export const getCategories = async () => {
	const locale = (await getLocale()) as Locale;

	const categories = await db.category.findMany({
		select: {
			slug: true,
			translations: {
				where: { locale },
				select: {
					name: true,
				},
			},
		},
	});

	return categories;
};
