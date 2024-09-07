import { cn } from '@/lib/utils';

export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn('w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700', className)}
		{...props}
	/>
);
