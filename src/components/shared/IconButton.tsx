import React from 'react';
import { type LucideIcon } from 'lucide-react';

import { Button, type ButtonProps } from '@/components/ui/button';

interface Props extends Pick<ButtonProps, 'href'> {
	icon: LucideIcon | React.JSX.Element;
	label: string;
	onClick?: () => void;
}

export const IconButton = React.forwardRef<HTMLButtonElement, Props>(
	({ icon, label, onClick, href }, ref) => {
		return (
			<Button
				ref={ref}
				aria-label={label}
				type="button"
				className="rounded-full"
				variant="text"
				size="icon"
				href={href}
				onClick={onClick}
			>
				{React.isValidElement(icon)
					? icon
					: React.createElement(icon as LucideIcon, { className: 'size-6', 'aria-hidden': 'true' })}
			</Button>
		);
	},
);

IconButton.displayName = 'IconButton';
