'use client';

import { SignIn as ClerkSignIn } from '@clerk/nextjs';
import { dark, experimental__simple } from '@clerk/themes';

import { useTheme } from 'next-themes';

export const SignIn = () => {
	const { resolvedTheme } = useTheme();

	return (
		<ClerkSignIn
			appearance={{
				baseTheme: resolvedTheme === 'dark' ? dark : experimental__simple,
			}}
		/>
	);
};
