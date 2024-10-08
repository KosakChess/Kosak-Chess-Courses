import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { type LucideIcon } from 'lucide-react';
import { type UrlObject } from 'url';

import { type Route } from 'next';

import { cn } from '@/lib/utils';

import { ActiveLink } from '../shared/active-link';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring aria-disabled:pointer-events-none aria-disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
				destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline: 'border border-input bg-background shadow-sm hover:bg-border',
				secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost: 'hover:bg-primary hover:text-primary-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				text: 'bg-transparent text-foreground hover:text-primary',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	href?: Route | UrlObject;
	activeClassName?: string;
	leadingIcon?: LucideIcon;
	trailingIcon?: LucideIcon;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			href,
			activeClassName,
			leadingIcon: LeadingIcon,
			trailingIcon: TrailingIcon,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';

		if (href) {
			return (
				<ActiveLink
					href={href}
					exact={false}
					aria-label={props['aria-label']}
					className={cn(buttonVariants({ variant, size, className }))}
					activeClassName={activeClassName}
				>
					{LeadingIcon && <LeadingIcon className="me-2 size-5" aria-hidden />}
					{props.children}
					{TrailingIcon && <TrailingIcon className="ms-2 size-5" aria-hidden />}
				</ActiveLink>
			);
		}

		return (
			<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
