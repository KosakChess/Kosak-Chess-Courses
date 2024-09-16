import { ArrowRight } from 'lucide-react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Progress } from '@/components/shared/progress';
import { type Course } from '@/types';

import { CourseCardDescription } from './course-card-description';
import { CourseCardImage } from './course-card-image';

interface Props {
	course: Course;
}

export const CourseCard = ({ course }: Props) => {
	const t = useTranslations('components.courses.course-card');
	const href = `/${course.purchased ? 'learn' : 'course'}/${course.slug}`;

	return (
		<li className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/80">
			<Link href={href}>
				<div className="overflow-hidden border-b">
					<CourseCardImage imageUrl={course.imageUrl} alt={course.title || ''} />
				</div>
				<CourseCardDescription course={course} />
				{course.purchased ? (
					<div className="px-4 pb-4">
						<Progress
							percentage={course.userProgress || 0}
							variant={course.userProgress === 100 ? 'success' : 'default'}
						/>
					</div>
				) : (
					<div className="mt-4 flex items-center justify-between px-4 pb-4">
						<span aria-hidden></span>
						<span className="flex items-center text-xs text-muted-foreground transition-colors group-hover:text-primary sm:text-sm">
							{t('learnMore')} <ArrowRight className="size-5 pl-1" aria-hidden />
						</span>
					</div>
				)}
			</Link>
		</li>
	);
};
