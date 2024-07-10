import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import type { LocalePrefix } from 'next-intl/routing';

export const locales = ['en', 'pl'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';
export const localePrefix: LocalePrefix = 'as-needed';

export const isValidLocale = (locale: unknown): locale is Locale =>
	locales.some((l) => l === locale);

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
	locales,
	localePrefix,
});
