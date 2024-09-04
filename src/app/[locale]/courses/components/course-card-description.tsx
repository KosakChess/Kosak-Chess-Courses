import { Clock, Video } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { IconBadge } from '@/components/shared/icon-badge';
import { type Locale } from '@/lib/navigation';
import { formatPrice, secondsToHours } from '@/lib/utils';

import { type getCourses } from '../queries/get-courses';

interface Props {
	course: Awaited<ReturnType<typeof getCourses>>[number];
}

export const CourseCardDescription = ({
	course: { title, category, chaptersCount, duration, price, purchased },
}: Props) => {
	const locale = useLocale() as Locale;
	const t = useTranslations('components.courses.course-card');

	return (
		<div className="flex flex-1 flex-col gap-y-2 p-4">
			<h2 className="text-xl font-semibold">{title}</h2>
			<div className="flex items-center justify-between">
				<div className="mt-2 flex w-full flex-col space-y-2 text-muted-foreground">
					<p className="flex">{category}</p>
					<p className="flex space-x-2">
						<IconBadge icon={Clock} size="sm" /> <span>{secondsToHours(duration)}</span>
					</p>
					<p className="flex space-x-2">
						<IconBadge icon={Video} size="sm" />
						<span>
							{t('chaptersCount')}: {chaptersCount}
						</span>
					</p>
				</div>
				{!purchased && (
					<span className="text-base font-medium text-green-500 md:text-lg">
						{price && price > 0 ? formatPrice(price / 100, locale) : t('free')}
					</span>
				)}
			</div>
		</div>
	);
};
