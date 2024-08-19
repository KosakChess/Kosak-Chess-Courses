import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import createMiddleware from 'next-intl/middleware';

import { defaultLocale, localePrefix, locales } from './lib/navigation';

const protectedRoutes = createRouteMatcher(['/:locale/checkout', '/:locale/profile']);

const intlMiddleware = createMiddleware({
	locales,
	defaultLocale,
	localePrefix,
});

export default clerkMiddleware((auth, req) => {
	if (protectedRoutes(req)) {
		auth().protect();
	}

	return intlMiddleware(req);
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
};
