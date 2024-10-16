'use client';

import { handlePayment } from '@/app/[locale]/course/[slug]/_actions/handle-payment';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from '@/lib/navigation';

interface Props {
	courseSlug: string;
}

export const PurchaseCourseDialog = ({ courseSlug }: Props) => {
	const router = useRouter();

	return (
		<Dialog open onOpenChange={() => router.push(`/learn/${courseSlug}`)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="mb-2 text-center text-2xl">Lesson Locked</DialogTitle>
					<DialogDescription>
						This lesson is not free. You need to purchase the course to continue.
					</DialogDescription>
				</DialogHeader>

				<p className="text-sm text-headings">
					Unlock this and all other lessons by purchasing the full course. Enjoy lifetime access and
					improve your skills!
				</p>
				<div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-end">
					<Button href={`/learn/${courseSlug}`} variant="outline">
						Cancel
					</Button>
					<Button
						onClick={async () => {
							await handlePayment(courseSlug);
						}}
						className="order-first sm:order-2"
					>
						Purchase Course
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
