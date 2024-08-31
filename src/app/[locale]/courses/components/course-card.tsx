import { ArrowRight } from 'lucide-react';

import { type StaticImageData } from 'next/image';
import Link from 'next/link';

import { Progress } from '@/components/shared/progress';

import { CourseCardDescription } from './course-card-description';
import { CourseCardImage } from './course-card-image';

interface Props {
	id: string;
	category: string;
	chapters: number;
	imageUrl: string | StaticImageData;
	published?: boolean;
	purchased: boolean;
	price: number;
	progress?: number;
	title: string;
}

export const CourseCard = (props: Props) => {
	const href = `/${props.purchased ? 'courses' : 'learn'}/${props.id}`;

	return (
		<li className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/80">
			<Link href={href}>
				<div className="overflow-hidden border-b">
					<CourseCardImage imageUrl={props.imageUrl} alt={props.title} />
				</div>
				<CourseCardDescription {...props} />
				{props.purchased ? (
					<div className="px-4 pb-4">
						<Progress
							percentage={props.progress || 0}
							variant={props.progress === 100 ? 'success' : 'default'}
						/>
					</div>
				) : (
					<div className="mt-4 flex items-center justify-between px-4">
						<span aria-hidden></span>
						<span className="flex items-center text-xs text-muted-foreground sm:text-sm">
							Learn more <ArrowRight className="size-5 pl-1" aria-hidden />
						</span>
					</div>
				)}
			</Link>
		</li>
	);
};
