import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import createMiddleware from 'next-intl/middleware';

import { defaultLocale, localePrefix, locales } from './lib/navigation';

const protectedRoutes = createRouteMatcher([
	'/learn(.*)',
	'/course/:slug/checkout',
	'/course/:slug/checkout/success',
	'/profile',
]);

const intlMiddleware = createMiddleware({
	locales,
	defaultLocale,
	localePrefix,
});

export default clerkMiddleware((auth, req) => {
	const { userId } = auth();

	if (protectedRoutes(req) && !userId) {
		return auth().redirectToSignIn();
	}

	return intlMiddleware(req);
});

export const config = {
	// Skip all paths that should not be internationalized
	matcher: ['/((?!api|_next|.*\\..*).*)'],
};
