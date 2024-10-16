import { ArrowLeft, ArrowRight } from 'lucide-react';

import { ChaptersList } from '@/components/shared/chapters-list';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { getCourseChapters } from '../../_queries/get-course-chapters';

import { ChaptersSidebar } from './chapters-sidebar';
import { LessonNavigationButton } from './lesson-navigation-button';

interface Props {
	prevLessonId: string | null;
	nextLessonId: string | null;
	courseSlug: string;
	allLessonsCompleted: boolean;
	hasPurchasedCourse: boolean;
}

export const LessonNavigation = async ({
	prevLessonId,
	nextLessonId,
	courseSlug,
	allLessonsCompleted,
	hasPurchasedCourse,
}: Props) => {
	const chapters = await getCourseChapters(courseSlug);
	const isNextDisabled = !allLessonsCompleted && !nextLessonId;

	return (
		<nav aria-label="Lesson navigation" className="flex items-center gap-x-3">
			<LessonNavigationButton
				href={prevLessonId ? `/learn/${courseSlug}/${prevLessonId}` : undefined}
				icon={ArrowLeft}
				label="Previous lesson"
				disabled={!prevLessonId}
			/>

			<ChaptersSidebar>
				<nav aria-labelledby="chapters-list-header" className="pt-6">
					<ChaptersList
						chapters={chapters}
						courseSlug={courseSlug}
						showProgress
						hasPurchasedCourse={hasPurchasedCourse}
					/>
				</nav>
			</ChaptersSidebar>

			{isNextDisabled ? (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div>
								<LessonNavigationButton
									href={undefined}
									icon={ArrowRight}
									label="Next lesson"
									disabled
								/>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>You must complete all previous lessons to continue.</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			) : (
				<LessonNavigationButton
					href={
						allLessonsCompleted && !nextLessonId
							? `/learn/${courseSlug}/completed`
							: `/learn/${courseSlug}/${nextLessonId}`
					}
					icon={ArrowRight}
					label="Next lesson"
				/>
			)}
		</nav>
	);
};
