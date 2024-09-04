'use client';

import { useId } from 'react';

import { type Route } from 'next';
import { useRouter } from 'next/navigation';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

interface Props {
	label: string;
	items: { href: Route; name: string }[];
	name?: string;
	placeholder?: string;
	parentRoute?: Route;
	className?: string;
}

export const SelectWithLinks = ({
	label,
	items,
	name,
	placeholder,
	parentRoute,
	className,
}: Props) => {
	const router = useRouter();
	const id = useId();

	const onChange = (href: Route) => {
		router.push(parentRoute ? `${parentRoute}/${href}` : href);
	};

	return (
		<Select onValueChange={(value) => onChange(value)}>
			<SelectTrigger id={id} name={name} className={className}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel className="sr-only">{label}</SelectLabel>
					{items.map((item) => (
						<SelectItem key={item.href} value={item.href || '#'}>
							{item.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
