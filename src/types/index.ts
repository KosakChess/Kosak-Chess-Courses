import { type Locale } from '@/lib/navigation';

export interface PageProps {
	params: {
		locale: Locale;
	};
}

export interface LayoutProps extends PageProps {
	children: React.ReactNode;
}
