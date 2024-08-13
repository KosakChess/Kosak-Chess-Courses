import { UserRound } from 'lucide-react';

import { type Route } from 'next';
import { useTranslations } from 'next-intl';

import { IconButton } from '@/components/shared/icon-button';

import { LanguageSelector } from './language-selector';
import { ThemeToggle } from './theme-toggle';

export const HeaderActions = () => {
	const t = useTranslations('components.layout.header.signInLink');

	return (
		<div className="flex items-center gap-x-2">
			<IconButton icon={UserRound} href={'/sign-in' as Route} label={t('label')} />
			<ThemeToggle />
			<LanguageSelector />
		</div>
	);
};
