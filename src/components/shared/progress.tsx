import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

interface Props {
	percentage: number;
	variant?: 'default' | 'success';
}

export const Progress = ({ percentage, variant }: Props) => {
	const t = useTranslations('components.shared.progress');

	return (
		<>
			<div className="mb-1 flex justify-between">
				<span className="text-headings/90 text-base font-medium">{t('label')}</span>
				<span className="text-headings/90 text-sm font-medium">{percentage}%</span>
			</div>
			<div
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={percentage}
				role="progressbar"
				className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-secondary"
			>
				<div
					className={cn(
						'h-2.5 rounded-full',
						variant === 'success' ? 'bg-green-600 dark:bg-green-500' : 'bg-primary',
					)}
					style={{ width: `${percentage}%` }}
				></div>
			</div>
		</>
	);
};
