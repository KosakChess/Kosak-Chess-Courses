'use client';

import { type UrlObject } from 'url';

import { type Route } from 'next';
import { type LinkProps } from 'next/link';

import { Link, type Locale, usePathname } from '@/lib/navigation';
import { cn } from '@/lib/utils';

interface Props<T extends string> extends LinkProps<T> {
	href: Route<T> | UrlObject;
	children?: React.ReactNode;
	exact?: boolean;
	className?: string;
	activeClassName?: string;
	locale?: Locale | undefined;
}

export const ActiveLink = <T extends string>({
	href,
	children,
	exact = true,
	className,
	activeClassName,
	locale,
	...rest
}: Props<T>) => {
	const pathname = usePathname();

	const url = typeof href === 'object' ? href.pathname : href;
	const query = typeof href === 'object' ? href.query : {};
	const isActive = exact ? pathname === url : pathname.includes(url!);

	return (
		<Link
			href={{
				pathname: url,
				query,
			}}
			locale={locale}
			aria-current={isActive ? 'page' : undefined}
			className={cn(className, isActive && activeClassName)}
			{...rest}
		>
			{children}
		</Link>
	);
};
