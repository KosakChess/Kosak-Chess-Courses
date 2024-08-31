'use client';

import { Video } from 'lucide-react';

import { IconBadge } from '@/components/shared/icon-badge';
import { formatPrice } from '@/lib/utils';

interface Props {
	title: string;
	category: string;
	price: number;
	chapters: number;
	purchased?: boolean;
}

export const CourseCardDescription = ({ title, category, price, chapters, purchased }: Props) => (
	<div className="flex flex-1 flex-col gap-y-2 p-4">
		<h2 className="text-xl font-semibold">{title}</h2>
		<div className="flex items-center justify-between">
			<div className="mt-2 flex w-full flex-col space-y-1 text-muted-foreground">
				<p className="flex" title="Category">
					{category}
				</p>
				<p className="flex space-x-2" title="Length">
					<IconBadge icon={Video} size="sm" /> <span>{chapters} chapters</span>
				</p>
			</div>
			{!purchased && (
				<span className="text-base font-medium text-green-500 md:text-lg">
					{price > 0 ? formatPrice(price / 100) : 'Free'}
				</span>
			)}
		</div>
	</div>
);
