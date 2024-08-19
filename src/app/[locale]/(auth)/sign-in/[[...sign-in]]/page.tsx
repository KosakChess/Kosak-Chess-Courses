import { unstable_setRequestLocale } from 'next-intl/server';

import { type PageProps } from '@/types';

import { SignIn } from './components/sign-in';

export default function SignInPage({ params }: PageProps) {
	unstable_setRequestLocale(params.locale);

	return <SignIn />;
}
