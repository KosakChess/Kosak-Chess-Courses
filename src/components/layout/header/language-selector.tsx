'use client';

import { GlobeIcon } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, type Locale, usePathname } from '@/lib/navigation';

export const LanguageSelector = () => {
	const t = useTranslations('components.layout.header.LanguageSelector');
	const locale = useLocale() as Locale;
	let pathname = usePathname();

	pathname = pathname.includes('/pl') ? pathname.replace('pl', '') : pathname;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					aria-label={t('label')}
					title={t('label')}
					type="button"
					className="rounded-full"
					variant="text"
					size="icon"
				>
					<GlobeIcon className="size-6" aria-hidden="true" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel className="sr-only">{t('label')}</DropdownMenuLabel>
				<DropdownMenuCheckboxItem checked={locale === 'en'}>
					<Link href={pathname} locale="en" scroll={false}>
						{t('options.en')}
					</Link>
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem checked={locale === 'pl'}>
					<Link href={pathname} locale="pl" scroll={false}>
						{t('options.pl')}
					</Link>
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
