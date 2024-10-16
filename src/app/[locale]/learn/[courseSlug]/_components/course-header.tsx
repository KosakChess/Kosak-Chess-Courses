import { Clock, GraduationCap } from 'lucide-react';

import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Link } from '@/lib/navigation';
import { secondsToHours } from '@/lib/utils';

interface Props {
	title: string;
	slug: string;
	img: string;
	duration: number;
	lessonsCount: number;
}

export const CourseHeader = ({ title, slug, img, duration, lessonsCount }: Props) => {
	// const t = useTranslations('components.courses.course-details');

	return (
		<header className="mx-auto flex max-w-fit flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6">
			<div className="mx-auto flex-shrink-0">
				<Image
					src={img}
					alt={`Cover image for ${title}`}
					width={150}
					height={Math.round((150 * 9) / 16)}
					className="rounded-lg object-cover"
				/>
			</div>

			<div className="flex w-full flex-col justify-between">
				<h1 className="text-2xl font-bold">{title}</h1>
				<div className="mt-2 flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400 sm:flex-row sm:items-center">
					<div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
						<div className="flex items-center gap-2">
							<Clock className="size-4" aria-hidden />
							<span>{secondsToHours(duration, 'short')}</span>
						</div>
						<div className="flex items-center gap-2">
							<GraduationCap className="size-4" aria-hidden />
							<span>{lessonsCount} lessons</span>
						</div>
					</div>
					<Badge variant="outline" className="mx-auto mt-1 max-w-fit sm:mt-0">
						<Link href={`/course/${slug}`} className="hover:underline">
							View course page
						</Link>
					</Badge>
				</div>
			</div>
		</header>
	);
};
