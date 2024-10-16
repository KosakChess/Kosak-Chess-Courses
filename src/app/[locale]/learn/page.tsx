import { unstable_setRequestLocale } from 'next-intl/server';

import { type Locale } from '@/lib/navigation';

interface Props {
	params: {
		locale: Locale;
	};
}

export default function LearnPage({ params }: Props) {
	unstable_setRequestLocale(params.locale);
}
