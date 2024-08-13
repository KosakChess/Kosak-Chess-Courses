import * as LucideIcons from 'lucide-react';

import { useTranslations } from 'next-intl';

export const Features = () => {
	const t = useTranslations('components.homepage.features');

	return (
		<section className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
			<div className="mx-auto max-w-2xl lg:text-center">
				<h2 className="text-base font-semibold leading-7 text-primary">{t('header')}</h2>
				<p className="mt-2 text-3xl font-bold tracking-tight text-headings sm:text-4xl">
					{t('subheader')}
				</p>
				<p className="mt-6 text-lg leading-8">{t('description')}</p>
			</div>
			<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
				<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
					{['videos', 'articles', 'practice'].map((key) => {
						const Icon = LucideIcons[
							t(`items.${key}.icon`) as keyof typeof LucideIcons
						] as React.ElementType;

						return (
							<div key={key} className="flex flex-col">
								<dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-headings">
									{Icon && <Icon aria-hidden className="size-5 flex-none text-primary" />}
									{t(`items.${key}.title`)}
								</dt>
								<dd className="mt-4">
									<p className="text-base leading-7">{t(`items.${key}.description`)}</p>
								</dd>
							</div>
						);
					})}
				</dl>
			</div>
		</section>
	);
};
