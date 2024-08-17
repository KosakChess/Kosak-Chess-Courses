import { type Route } from 'next';

import { Button } from '@/components/ui/button';

interface Props {
	label: string;
	href: Route;
}

export const NavLink = ({ href, label }: Props) => (
	<li>
		<Button
			href={href}
			size="sm"
			variant="text"
			className="text-sm font-medium shadow-none"
			activeClassName="text-primary"
		>
			{label}
		</Button>
	</li>
);
