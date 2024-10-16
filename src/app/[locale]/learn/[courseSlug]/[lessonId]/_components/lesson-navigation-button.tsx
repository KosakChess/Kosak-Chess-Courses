import { type LucideIcon } from 'lucide-react';

import { IconButton } from '@/components/shared/icon-button';

interface Props {
	icon: LucideIcon | React.JSX.Element;
	label: string;
	href?: string;
	disabled?: boolean;
}

export const LessonNavigationButton = ({ icon, label, href, disabled }: Props) => {
	return (
		<IconButton
			variant="outline"
			href={href}
			label={label}
			icon={icon}
			aria-disabled={disabled}
			className="border-slate-900/90 text-slate-900 dark:border-white/90 dark:text-white"
		/>
	);
};
