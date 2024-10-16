'use client';

import { useTransition } from 'react';
import { CircleCheck, Loader2 } from 'lucide-react';

// import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/lib/navigation';
import { cn } from '@/lib/utils';

import { completeLesson } from '../_actions/complete-lesson';

interface Props {
	lessonId: string;
	completed: boolean;
}

export const CompleteLessonButton = ({ lessonId, completed }: Props) => {
	// const t = useTranslations();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleClick = () => {
		if (completed) return;

		startTransition(async () => {
			await completeLesson(lessonId);
			router.refresh();
		});
	};

	return (
		<div className="text-center">
			<Button
				aria-disabled={isPending}
				onClick={handleClick}
				size="lg"
				variant="outline"
				className={cn('px-6 py-3', {
					'cursor-default border-green-300 bg-green-200 text-green-700 hover:bg-green-200 focus:ring-green-500':
						completed,
				})}
			>
				{isPending && <Loader2 className="mr-2 size-5 animate-spin" aria-hidden />}
				{completed && <CircleCheck className="mr-2 size-5 text-green-600" aria-hidden />}
				{completed ? 'Lesson completed' : 'Mark lesson as completed'}
			</Button>
		</div>
	);
};
