import { type getCourses } from '@/app/[locale]/courses/queries/get-courses';
import { type Locale } from '@/lib/navigation';

export interface PageProps {
	params: {
		locale: Locale;
	};
}

export interface LayoutProps extends PageProps {
	children: React.ReactNode;
}

export type Course = Awaited<ReturnType<typeof getCourses>>[number] & {
	purchased?: boolean;
	userProgress?: number;
};
