import { BlurredImage } from '@/components/shared/blurred-image';

interface Props {
	imageUrl: string | null;
	alt: string;
}

export const CourseCardImage = ({ imageUrl, alt }: Props) => (
	<div className="aspect-h-9 aspect-w-16 overflow-hidden bg-slate-300 transition-transform group-hover:scale-105 group-hover:opacity-80 dark:bg-slate-800">
		<BlurredImage
			src={imageUrl || ''}
			alt={alt}
			fill
			className="size-full object-cover object-center"
		/>
	</div>
);
