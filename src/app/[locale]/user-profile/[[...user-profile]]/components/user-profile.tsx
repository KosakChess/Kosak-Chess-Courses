'use client';

import { UserProfile as ClerkUserProfile } from '@clerk/nextjs';
import { dark, experimental__simple } from '@clerk/themes';

import { useTheme } from 'next-themes';

export const UserProfile = () => {
	const { resolvedTheme } = useTheme();

	return (
		<section className="mx-auto flex max-w-md justify-center p-12 pt-24 sm:max-w-2xl sm:pb-16 sm:pt-28 md:max-w-4xl lg:max-w-7xl">
			<ClerkUserProfile
				appearance={{
					baseTheme: resolvedTheme === 'dark' ? dark : experimental__simple,
				}}
			/>
		</section>
	);
};
