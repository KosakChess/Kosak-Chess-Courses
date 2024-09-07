import { enUS, plPL } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { unstable_setRequestLocale } from 'next-intl/server';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { locales } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme-provider';
import { type LayoutProps } from '@/types';

import '../globals.css';

const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-poppins',
});

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const metadata: Metadata = {
	title: 'Kosak Chess',
	description: 'Chess courses, lessons, and resources for all levels of play.',
};

export default function RootLayout({ children, params: { locale } }: LayoutProps) {
	unstable_setRequestLocale(locale);

	return (
		<ClerkProvider
			signInFallbackRedirectUrl={`/${locale}/courses`}
			signUpFallbackRedirectUrl={`/${locale}/courses`}
			afterSignOutUrl={`/${locale}/sign-in`}
			signInUrl={`/${locale}/sign-in`}
			signUpUrl={`/${locale}/sign-up`}
			localization={locale === 'pl' ? plPL : enUS}
			appearance={{
				variables: {
					colorPrimary: '#1b6ff5',
					fontFamily: 'var(--font-poppins)',
				},
				elements: {
					formButtonPrimary:
						'rounded-md bg-primary text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
					formFieldInput:
						'flex h-10 rounded-md bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
					formFieldLabel: 'text-sm font-medium leading-none',
					logoImage: 'w-20 h-auto',
				},
			}}
		>
			<html lang={locale} suppressHydrationWarning>
				<body
					className={cn(
						'flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground antialiased',
						poppins.className,
					)}
				>
					<ThemeProvider>
						<div className="relative">
							<Header />
							<main className="flex-1">{children}</main>
						</div>
						<Footer />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
