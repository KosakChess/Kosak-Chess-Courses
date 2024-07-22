import { type Route } from 'next';

import { Button } from '@/components/ui/button';

interface Props {
	label: string;
	href: Route;
}

export const NavigationLink = ({ href, label }: Props) => (
	<li>
		<Button
			href={href}
			size="sm"
			variant="outline"
			className="border-none bg-transparent text-sm font-medium text-slate-700 shadow-none outline-none transition hover:bg-slate-700/20 hover:text-slate-700 focus:bg-slate-700/30 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:text-slate-200 dark:hover:bg-slate-200/20 dark:hover:text-slate-200 dark:focus:bg-slate-200/30"
			activeClassName="bg-slate-700/10 dark:bg-slate-200/10 text-slate-700 dark:text-slate-200"
		>
			{label}
		</Button>
	</li>
);
