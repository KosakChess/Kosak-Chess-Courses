import React from 'react';
import { type LucideIcon } from 'lucide-react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props extends Omit<ButtonProps, 'asChild' | 'leadingICon' | 'trailingICon'> {
	icon: LucideIcon | React.JSX.Element;
	label: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, Props>(
	({ icon, label, className, ...rest }, ref) => {
		return (
			<Button
				ref={ref}
				aria-label={label}
				title={label}
				type="button"
				className={cn('rounded-full', className)}
				variant="text"
				size="icon"
				{...rest}
			>
				{React.isValidElement(icon)
					? icon
					: React.createElement(icon as LucideIcon, { className: 'size-6', 'aria-hidden': 'true' })}
			</Button>
		);
	},
);

IconButton.displayName = 'IconButton';
