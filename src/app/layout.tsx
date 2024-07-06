import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

import './globals.css';

const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-poppins',
});

export const metadata: Metadata = {
	title: 'Kosak Chess',
	description: 'Chess courses, lessons, and resources for all levels of play.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn('flex min-h-screen flex-col', poppins.className)}>
				<main className="flex-grow">{children}</main>
			</body>
		</html>
	);
}
