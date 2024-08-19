import { unstable_setRequestLocale } from 'next-intl/server';

import { type PageProps } from '@/types';

import { UserProfile } from './components/user-profile';

export default function UserProfilePage({ params }: PageProps) {
	unstable_setRequestLocale(params.locale);

	return <UserProfile />;
}
