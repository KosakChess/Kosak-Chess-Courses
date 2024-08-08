'use client';

import { Menu } from 'lucide-react';

import { type Route } from 'next';
import { useTranslations } from 'next-intl';

import { IconButton } from '@/components/shared/IconButton';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { useMedia } from '@/hooks/useMedia';

import { NavigationLink } from './NavigationLink';

export const Navigation = () => {
	const t = useTranslations('components.layout.header');
	const isMobile = useMedia('(max-width: 1024px)', false);

	const routes = {
		courses: t('routes.courses'),
		articles: t('routes.articles'),
		about: t('routes.about'),
		contact: t('routes.contact'),
	};

	if (!isMobile) {
		return (
			<nav>
				<ul className="hidden items-center gap-x-3 lg:flex">
					{Object.entries(routes).map(([key, value]) => (
						<NavigationLink key={key} href={`/${key}` as Route} label={value} />
					))}
				</ul>
			</nav>
		);
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<IconButton icon={Menu} label={t('mobileNav.open')} />
			</SheetTrigger>
			<SheetContent side="left" className="px-2">
				<SheetHeader>
					<SheetTitle className="sr-only">{t('mobileNav.title')}</SheetTitle>
					<SheetDescription className="sr-only">{t('mobileNav.description')}</SheetDescription>
				</SheetHeader>
				<nav className="pt-6">
					<ul className="flex flex-col gap-y-2">
						{Object.entries(routes).map(([key, value]) => (
							<li key={key}>
								<Button
									href={`/${key}` as Route}
									variant="ghost"
									className="w-full justify-start"
									activeClassName="bg-primary text-primary-foreground shadow-sm hover:bg-primary/80"
								>
									{value}
								</Button>
							</li>
						))}
					</ul>
				</nav>
			</SheetContent>
		</Sheet>
	);
};
