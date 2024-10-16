import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { defaultLocale, localePrefix, locales } from './lib/navigation';

const protectedRoutes = createRouteMatcher([
	'/:locale/learn(.*)',
	'/:locale/course/:slug/checkout',
	'/:locale/course/:slug/checkout/success',
	'/:locale/user-profile',
]);

const intlMiddleware = createMiddleware({
	locales,
	defaultLocale,
	localePrefix,
});

export default clerkMiddleware((auth, req) => {
	const { userId } = auth();

	if (protectedRoutes(req) && !userId) {
		const signInUrl = new URL('/sign-in', req.url);
		return NextResponse.redirect(signInUrl);
	}

	return intlMiddleware(req);
});

export const config = {
	// Skip all paths that should not be internationalized
	matcher: ['/((?!api|_next|.*\\..*).*)'],
};
