import { SignedIn, SignedOut } from '@clerk/nextjs';
import { UserRound } from 'lucide-react';

import { type Route } from 'next';
import { useTranslations } from 'next-intl';

import { IconButton } from '@/components/shared/icon-button';

import { LanguageSelector } from './language-selector';
import { ThemeToggle } from './theme-toggle';
import { UserButton } from './user-button';

export const HeaderActions = () => {
	const t = useTranslations('components.layout.header.signInLink');

	return (
		<div className="flex items-center gap-x-2">
			<SignedIn>
				<UserButton />
			</SignedIn>
			<SignedOut>
				<IconButton icon={UserRound} href={'/sign-in' as Route} label={t('label')} />
			</SignedOut>
			<LanguageSelector />
			<ThemeToggle />
		</div>
	);
};
