import { unstable_setRequestLocale } from 'next-intl/server';

import { type PageProps } from '@/types';

export default function CourseLearnPage({ params }: PageProps) {
	unstable_setRequestLocale(params.locale);

	return <p className="text-center text-lg">Not yet</p>;
}
