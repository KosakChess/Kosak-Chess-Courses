import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { SelectWithLinks } from '@/components/shared/select-with-links';

import { getCategories } from '../queries/get-categories';

export const CategorySelect = async () => {
	const t = await getTranslations('components.courses.category-select');
	const categories = await getCategories();

	categories.unshift({ slug: '', translations: [{ name: t('allCategories') }] });

	const mappedCategories = categories.map((category) => ({
		href: category.slug,
		name: category.translations[0]?.name || '',
	}));

	return (
		<SelectWithLinks
			label={t('label')}
			placeholder={t('label')}
			name="category-select"
			items={mappedCategories}
			parentRoute="/courses"
			className="w-[160px]"
		/>
	);
};

export const CategorySelectSkeleton = () => {
	const t = useTranslations('components.shared.skeletons');

	return (
		<>
			<div
				aria-busy
				aria-label={t('ariaLabel')}
				role="status"
				className="h-9 w-[160px] animate-pulse rounded-md bg-slate-200 dark:bg-slate-700"
			/>
			<span className="sr-only">{t('loading')}</span>
		</>
	);
};
