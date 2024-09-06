import { Markdown } from '@/components/shared/markdown';
import { Separator } from '@/components/ui/separator';

import { getCourseBySlug } from '../../queries/get-course-by-slug';

import { ChaptersList } from './chapters-list';
import { CoursePurchaseCard } from './course-purchase-card';

interface Props {
	slug: string;
}

export const CourseDetails = async ({ slug }: Props) => {
	const course = await getCourseBySlug(slug);

	return (
		<section className="container mx-auto mt-6 px-4 py-8">
			<div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8">
				<div className="order-2 space-y-8 lg:order-1 lg:col-span-2">
					<Markdown source={course.description || ''} />
					<Separator />
					<ChaptersList chapters={course.chapters} />
				</div>
				<div className="order-1 mb-8 lg:order-2 lg:mb-0">
					<CoursePurchaseCard course={course} />
				</div>
			</div>
		</section>
	);
};
