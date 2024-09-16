'use client';

import { SignUp as ClerkSignUp } from '@clerk/nextjs';
import { dark, experimental__simple } from '@clerk/themes';

import { useTheme } from 'next-themes';

export const SignUp = () => {
	const { resolvedTheme } = useTheme();

	return (
		<ClerkSignUp
			appearance={{
				baseTheme: resolvedTheme === 'dark' ? dark : experimental__simple,
			}}
		/>
	);
};
