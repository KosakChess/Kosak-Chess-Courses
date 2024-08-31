import { cn } from '@/lib/utils';

interface Props {
	percentage: number;
	variant?: 'default' | 'success';
}

export const Progress = ({ percentage, variant }: Props) => (
	<>
		<div className="mb-1 flex justify-between">
			<span className="text-headings/90 text-base font-medium">Progress</span>
			<span className="text-headings/90 text-sm font-medium">{percentage}%</span>
		</div>
		<div aria-hidden className="h-2.5 w-full rounded-full bg-secondary">
			<div
				className={cn('h-2.5 rounded-full', variant === 'success' ? 'bg-green-500' : 'bg-primary')}
				style={{ width: `${percentage}%` }}
			></div>
		</div>
	</>
);
