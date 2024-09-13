import { useTranslations } from 'next-intl';

import { Markdown } from '@/components/shared/markdown';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { getCourseBySlug } from '../../queries/get-course-by-slug';

import { ChaptersList } from './chapters-list';
import { CoursePurchaseCard } from './course-purchase-card';

interface Props {
	slug: string;
}

export const CourseDetails = async ({ slug }: Props) => {
	const course = await getCourseBySlug(slug);

	return (
		<section className="container mx-auto mt-12 px-4 py-8">
			<div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8">
				<article className="order-2 space-y-8 lg:order-1 lg:col-span-2">
					<Markdown source={course.description || ''} />
					<Separator />
					<ChaptersList chapters={course.chapters} />
				</article>
				<aside className="order-1 mb-8 lg:order-2 lg:mb-0">
					<CoursePurchaseCard course={course} />
				</aside>
			</div>
		</section>
	);
};

export const CourseDetailsSkeleton = () => {
	const t = useTranslations('components.shared.skeletons');

	return (
		<div
			aria-busy
			aria-label={t('ariaLabel')}
			role="status"
			className="container mx-auto mt-12 px-4 py-8"
		>
			<span className="sr-only">{t('loading')}</span>
			<div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8">
				<div className="order-2 space-y-8 lg:order-1 lg:col-span-2">
					<Skeleton className="h-10 w-3/4 max-w-lg" />
					<div className="space-y-3">
						<Skeleton className="h-8 w-3/4 max-w-xs" />
						{Array.from({ length: 5 }).map((_, index) => (
							<Skeleton
								key={index}
								className="h-5"
								style={{ width: `${Math.floor(Math.random() * (100 - 70) + 70)}%` }}
							/>
						))}
					</div>
					<div className="space-y-3">
						<Skeleton className="h-8 w-3/4 max-w-xs" />
						{Array.from({ length: 3 }).map((_, index) => (
							<Skeleton
								key={index}
								className="h-5"
								style={{ width: `${Math.floor(Math.random() * (100 - 50) + 50)}%` }}
							/>
						))}
					</div>
					<div className="space-y-3">
						<Skeleton className="h-8 w-3/4 max-w-xs" />
						{Array.from({ length: 4 }).map((_, index) => (
							<Skeleton
								key={index}
								className="h-5"
								style={{ width: `${Math.floor(Math.random() * (100 - 60) + 60)}%` }}
							/>
						))}
					</div>
					<div className="space-y-3">
						<Skeleton className="h-8 w-3/4 max-w-xs" />
						{Array.from({ length: 3 }).map((_, index) => (
							<Skeleton
								key={index}
								className="h-5"
								style={{ width: `${Math.floor(Math.random() * (100 - 60) + 60)}%` }}
							/>
						))}
					</div>
					<div className="space-y-3">
						<Skeleton className="h-8 w-3/4 max-w-xs" />
						{Array.from({ length: 5 }).map((_, index) => (
							<Skeleton
								key={index}
								className="h-5"
								style={{ width: `${Math.floor(Math.random() * (100 - 60) + 60)}%` }}
							/>
						))}
					</div>
				</div>
				<div className="order-1 mb-8 lg:order-2 lg:mb-0">
					<Card className="mx-auto max-w-2xl lg:sticky lg:top-4 lg:max-w-none">
						<Skeleton className="aspect-h-9 aspect-w-16 rounded-none rounded-t-lg" />
						<CardContent className="py-4">
							<Skeleton className="mb-6 h-8 w-4/5" />
							<Skeleton className="h-11 w-1/3" />
						</CardContent>
						<CardFooter className="flex flex-col space-y-4 px-4 py-6">
							<Skeleton className="h-10" />
							<Skeleton className="h-10" />
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
};
