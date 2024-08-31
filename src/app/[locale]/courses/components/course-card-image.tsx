import NextImage, { type StaticImageData } from 'next/image';

interface Props {
	imageUrl: string | StaticImageData;
	alt: string;
}

export const CourseCardImage = ({ imageUrl, alt }: Props) => (
	<div className="aspect-h-9 aspect-w-16 overflow-hidden bg-slate-300 transition-transform group-hover:scale-105 group-hover:opacity-80">
		<NextImage src={imageUrl} alt={alt} fill className="size-full object-cover object-center" />
	</div>
);
