import { cva, type VariantProps } from 'class-variance-authority';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const backgroundVariants = cva('rounded-full flex items-center justify-center', {
	variants: {
		variant: {
			default: 'bg-blue-500/15',
			success: 'bg-emerald-100 dark:bg-emerald-700',
		},
		iconVariant: {
			default: 'text-blue-700/85 dark:text-blue-400',
			success: 'text-emerald-700 dark:text-emerald-100',
		},
		size: {
			default: 'p-2',
			sm: 'p-1',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
});

const iconVariants = cva('', {
	variants: {
		variant: {
			default: 'text-blue-700/85 dark:text-blue-400',
			success: 'text-emerald-700 dark:text-emerald-100',
		},
		size: {
			default: 'size-8',
			sm: 'size-4',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface Props extends BackgroundVariantsProps, IconVariantsProps {
	icon: LucideIcon;
	bgClassName?: string;
	iconClassName?: string;
}

export const IconBadge = ({ icon: Icon, bgClassName, iconClassName, variant, size }: Props) => {
	return (
		<span className={cn(backgroundVariants({ variant, size }), bgClassName)}>
			<Icon className={cn(iconVariants({ variant, size }), iconClassName)} aria-hidden />
		</span>
	);
};
