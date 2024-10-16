import { Menu } from 'lucide-react';

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import { LessonNavigationButton } from './lesson-navigation-button';

interface Props {
	children: React.ReactNode;
}

export const ChaptersSidebar = async ({ children }: Props) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<LessonNavigationButton icon={Menu} label="Show chapters" />
			</SheetTrigger>
			<SheetContent side="right" className="px-0">
				<SheetHeader className="px-4">
					<SheetTitle>Course Content</SheetTitle>
					<SheetDescription className="sr-only">
						All chapters and lesson&apos;s of the course
					</SheetDescription>
				</SheetHeader>
				{children}
			</SheetContent>
		</Sheet>
	);
};
