import { useLocale, useTranslations } from 'next-intl';

import { ActionButton } from '@/components/shared/action-button';
import { BlurredImage } from '@/components/shared/blurred-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { type Locale } from '@/lib/navigation';
import { formatPrice } from '@/lib/utils';

import { handlePayment } from '../../_actions/handle-payment';
import { type getCourseBySlug } from '../../_queries/get-course-by-slug';

interface Props {
	course: Awaited<ReturnType<typeof getCourseBySlug>>;
}

export const CoursePurchaseCard = ({ course: { slug, title, price, imageUrl } }: Props) => {
	const locale = useLocale() as Locale;
	const t = useTranslations('components.courses.course-details');

	const handlePaymentWithSlug = handlePayment.bind(null, slug);

	return (
		<Card className="mx-auto max-w-2xl lg:sticky lg:top-20 lg:max-w-none">
			<header className="aspect-h-9 aspect-w-16 relative overflow-hidden rounded-t-lg bg-slate-300 dark:bg-slate-800">
				<BlurredImage
					src={imageUrl || ''}
					alt={title || ''}
					fill
					className="size-full rounded-t-lg object-cover object-center"
				/>
				<h2 className="sr-only">{title}</h2>
			</header>
			<CardContent className="py-0">
				<h3 className="my-4 text-xl font-bold lg:text-2xl">{title}</h3>
				<p className="mb-2 text-2xl font-bold text-green-600 dark:text-green-500 lg:text-3xl">
					{price && formatPrice(price / 100, locale)}
				</p>
			</CardContent>
			<CardFooter className="flex flex-col space-y-4 px-4 py-6">
				<form action={handlePaymentWithSlug} className="w-full px-0">
					<ActionButton className="w-full">{t('buyBtn')}</ActionButton>
				</form>
				<Button variant="outline" size="lg" className="w-full">
					{t('freeChapterBtn')}
				</Button>
			</CardFooter>
		</Card>
	);
};
