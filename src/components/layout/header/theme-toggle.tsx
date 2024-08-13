'use client';

import { MoonIcon, SunIcon } from 'lucide-react';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { IconButton } from '@/components/shared/icon-button';

export const ThemeToggle = () => {
	const t = useTranslations('components.layout.header.ThemeToggle');
	const { theme, setTheme } = useTheme();

	return (
		<IconButton
			label={t('label')}
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			icon={
				<>
					<SunIcon className="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<MoonIcon className="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				</>
			}
		/>
	);
};
