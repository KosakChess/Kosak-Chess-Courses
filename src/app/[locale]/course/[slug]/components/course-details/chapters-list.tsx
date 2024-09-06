import { Lock, Puzzle } from 'lucide-react';

import { useTranslations } from 'next-intl';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { secondsToHours } from '@/lib/utils';

import { type getCourseBySlug } from '../../queries/get-course-by-slug';

interface Props {
	chapters: Awaited<ReturnType<typeof getCourseBySlug>>['chapters'];
}

export const ChaptersList = ({ chapters }: Props) => {
	const t = useTranslations('components.courses.course-details');

	return (
		<>
			<h3 className="sr-only">{t('chapterListHeader')}</h3>
			<Accordion type="single" collapsible className="mx-auto w-full max-w-xl">
				{chapters.map((chapter, index) => (
					<AccordionItem key={index} value={`chapter-${index}`}>
						<AccordionTrigger className="w-full border-b border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-700">
							<div className="flex items-center gap-x-3">
								<h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
									{chapter.title}
								</h3>
								{chapter.isFree ? (
									<span>
										<Badge variant="success">{t('free')}</Badge>
									</span>
								) : (
									<Lock className="size-5 text-slate-600 dark:text-slate-400" aria-hidden />
								)}
							</div>
						</AccordionTrigger>
						<AccordionContent className="bg-slate-50 py-4 dark:bg-slate-800">
							<ul className="divide-y dark:divide-slate-700">
								{chapter.lessons.map((lesson, lessonIndex) => (
									<li
										key={lessonIndex}
										className="flex items-center justify-between p-4 first:pt-0 last:pb-0"
									>
										<span className="text-slate-900 dark:text-slate-200">{lesson.title}</span>
										<span className="text-sm text-slate-600 dark:text-slate-400">
											{lesson.type === 'video' ? (
												secondsToHours(lesson.duration || 0, 'digital')
											) : (
												<Puzzle className="size-5" aria-hidden />
											)}
										</span>
									</li>
								))}
							</ul>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</>
	);
};
