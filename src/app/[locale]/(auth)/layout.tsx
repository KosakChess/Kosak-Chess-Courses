import { unstable_setRequestLocale } from 'next-intl/server';

import { type LayoutProps } from '@/types';

export default function AuthLayout({ children, params }: LayoutProps) {
	unstable_setRequestLocale(params.locale);

	return <section className="flex justify-center p-12 pt-24 sm:pb-16 sm:pt-28">{children}</section>;
}
