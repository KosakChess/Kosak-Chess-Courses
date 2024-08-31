import zdj from '@/app/[locale]/(homepage)/assets/hero.webp';

import { CourseCard } from './course-card';

const courses = [
	{
		id: '1',
		title: 'React for Beginners',
		category: 'Web Development',
		price: 2999,
		chapters: 12,
		progress: 50,
		purchased: true,
		imageUrl: zdj,
	},
	{
		id: '3',
		title: 'React for Beginners',
		category: 'Web Development',
		price: 0,
		chapters: 12,
		progress: 50,
		purchased: true,
		imageUrl: zdj,
	},
	{
		id: '4',
		title: 'Agresywne debiuty białymi',
		category: 'Debiuty',
		price: 1999,
		chapters: 12,
		purchased: false,
		imageUrl: zdj,
	},
];

export const CoursesList = () => {
	// fetch courses

	return (
		<ul
			role="list"
			className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8"
		>
			{courses.map((course) => (
				<CourseCard key={course.id} {...course} />
			))}
		</ul>
	);
};
