'use client';

import { Clock } from 'lucide-react';

import { useLocale } from 'next-intl';

import { IconBadge } from '@/components/shared/icon-badge';
import { type Locale } from '@/lib/navigation';
import { formatPrice, secondsToHours } from '@/lib/utils';

import { type getCourses } from '../queries/get-courses';

interface Props {
	course: Awaited<ReturnType<typeof getCourses>>[number];
}

export const CourseCardDescription = ({
	course: { title, category, duration, price, purchased },
}: Props) => {
	const locale = useLocale() as Locale;

	return (
		<div className="flex flex-1 flex-col gap-y-2 p-4">
			<h2 className="text-xl font-semibold">{title}</h2>
			<div className="flex items-center justify-between">
				<div className="mt-2 flex w-full flex-col space-y-1 text-muted-foreground">
					<p className="flex">{category}</p>
					<p className="flex space-x-2">
						<IconBadge icon={Clock} size="sm" /> <span>{secondsToHours(duration)}</span>
					</p>
				</div>
				{!purchased && (
					<span className="text-base font-medium text-green-500 md:text-lg">
						{price && price > 0 ? formatPrice(price / 100, locale) : 'Free'}
					</span>
				)}
			</div>
		</div>
	);
};
