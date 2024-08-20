'use client';

import { UserButton as ClerkUserButton } from '@clerk/nextjs';
import { dark, experimental__simple } from '@clerk/themes';

import { useParams } from 'next/navigation';
import { useTheme } from 'next-themes';

import { type Locale } from '@/lib/navigation';

export const UserButton = () => {
	const { resolvedTheme } = useTheme();
	const params = useParams<{ locale: Locale }>();

	return (
		<ClerkUserButton
			userProfileMode="navigation"
			userProfileUrl={`/${params.locale}/user-profile`}
			appearance={{
				baseTheme: resolvedTheme === 'dark' ? dark : experimental__simple,
			}}
		/>
	);
};
