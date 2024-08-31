'use client';

import { SelectLabel } from '@radix-ui/react-select';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useQueryParams } from '@/hooks/use-query-params';

export const SortSelect = () => {
	const { queryParams, setQueryParams } = useQueryParams<{ sort?: string }>();

	const currentSort = queryParams.get('orderBy');

	return (
		<Select
			onValueChange={(option) => setQueryParams({ sort: option })}
			defaultValue={currentSort || undefined}
		>
			<SelectTrigger id="sort-select" className="w-[160px]">
				<SelectValue placeholder="Sort by" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel className="sr-only">Sort by</SelectLabel>
					{sortingOptions.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

const sortingOptions = [
	{ label: 'Newest', value: 'createdAt_DESC' },
	{ label: 'Purchased', value: 'purchased' },
	{ label: 'Cheapest', value: 'price_ASC' },
];
