import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';
import { locales } from '@/navigation';

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
	return (
		<html lang={params.locale}>
			<body className={cn('flex min-h-screen flex-col', poppins.className)}>
				<main className="flex-grow">{children}</main>
			</body>
		</html>
	);
}
