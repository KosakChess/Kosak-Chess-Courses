import { Badge as LucideBadge, BadgeCheck, Lock, Puzzle } from 'lucide-react';

import { useTranslations } from 'next-intl';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { type LessonType } from '@/types';

import { ActiveLink } from './active-link';

interface Chapter {
	title: string;
	isFree?: boolean;
	lessons: {
		id?: string;
		title: string;
		duration: number;
		type: LessonType;
		isCompleted?: boolean;
	}[];
}

type HasLessonId<T> = T extends { lessons: { id: string }[] } ? true : false;

interface Props<T extends Chapter> {
	chapters: T[];
	courseSlug: HasLessonId<T> extends true ? string : undefined;
	showProgress?: boolean;
	hasPurchasedCourse?: boolean;
}

export const ChaptersList = <T extends Chapter>({
	chapters,
	courseSlug,
	showProgress,
	hasPurchasedCourse = true,
}: Props<T>) => {
	const t = useTranslations('components.courses.course-details');
	// 68 linijka dodajemy tłumaczenie dla komponentu
	return (
		<>
			<h2 id="chapters-list-header" className="sr-only">
				{t('chapterListHeader')}
			</h2>
			<Accordion type="multiple" className="w-full divide-y divide-slate-200 dark:divide-slate-700">
				{chapters.map((chapter, index) => (
					<AccordionItem key={index} value={`chapter-${index + 1}`}>
						<AccordionTrigger className="w-full bg-slate-100 px-4 py-3 dark:bg-slate-700">
							<div className="flex w-full items-center justify-between">
								<h3 className="flex gap-x-2 text-lg font-medium text-slate-900 dark:text-slate-100">
									{chapter.title}
									{chapter.isFree && <Badge variant="success">{t('free')}</Badge>}
									{!chapter.isFree && !hasPurchasedCourse && (
										<span>
											<p className="sr-only">This chapter isn&apos;t free</p>
											<Lock className="size-5 text-slate-600 dark:text-slate-400" aria-hidden />
										</span>
									)}
								</h3>
								<span className="pr-2 text-sm text-foreground">
									{showProgress
										? `${chapter.lessons.filter((l) => l.isCompleted).length}/${chapter.lessons.length}`
										: `${chapter.lessons.length} lessons`}
								</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className="bg-slate-50 py-4 dark:bg-slate-800">
							<ul className="divide-y dark:divide-slate-700">
								{chapter.lessons.map((lesson, lessonIndex) => (
									<li
										key={lessonIndex}
										className="flex items-center space-x-3 p-4 first:pt-0 last:pb-0"
									>
										{showProgress && (
											<>
												{lesson.isCompleted ? (
													<BadgeCheck className="size-5 text-success" aria-hidden />
												) : (
													<LucideBadge className="size-5" aria-hidden />
												)}
												<ActiveLink
													href={`/learn/${courseSlug}/${lesson.id}`}
													className="text-slate-900 dark:text-slate-200"
													activeClassName="font-extrabold !text-primary"
												>
													{lesson.title}
												</ActiveLink>
											</>
										)}
										{!showProgress && (
											<span className="text-slate-900 dark:text-slate-200">{lesson.title}</span>
										)}
										{lesson.type === 'video' ? (
											<time className="text-xs">
												{Math.floor(lesson.duration / 60)}:
												{(lesson.duration % 60).toString().padStart(2, '0')}
											</time>
										) : (
											<Puzzle className="size-4" aria-hidden />
										)}
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
