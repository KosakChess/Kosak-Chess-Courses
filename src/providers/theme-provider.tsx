'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface Props {
	children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => (
	<NextThemesProvider attribute="class" defaultTheme="dark" disableTransitionOnChange enableSystem>
		{children}
	</NextThemesProvider>
);
