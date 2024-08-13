import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { unstable_setRequestLocale } from 'next-intl/server';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { cn } from '@/lib/utils';
import { locales } from '@/navigation';
import { ThemeProvider } from '@/providers/theme-provider';

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

export default function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	unstable_setRequestLocale(params.locale);

	return (
		<html lang={params.locale} suppressHydrationWarning>
			<body
				className={cn(
					'flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground antialiased',
					poppins.className,
				)}
			>
				<ThemeProvider>
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
