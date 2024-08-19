import { unstable_setRequestLocale } from 'next-intl/server';

import { type PageProps } from '@/types';

import { SignUp } from './components/sign-up';

export default function SignUpPage({ params }: PageProps) {
	unstable_setRequestLocale(params.locale);

	return <SignUp />;
}
