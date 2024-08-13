import { pick } from 'lodash';

import { NextIntlClientProvider, useMessages } from 'next-intl';

import { Logo } from '@/components/shared/logo';

import { HeaderActions } from './header-actions';
import { Navigation } from './navigation';

export const Header = () => {
	const messages = useMessages();

	return (
		<NextIntlClientProvider messages={pick(messages, 'components.layout.header')}>
			<header className="bg-background/90 fixed inset-x-0 top-0 z-40 w-full px-4 py-4 backdrop-blur-lg lg:px-12">
				<div className="mx-auto max-w-screen-xl">
					<div className="flex w-full items-center justify-between">
						<div className="flex flex-row-reverse items-center gap-x-2 lg:flex-row lg:gap-x-16">
							<Logo priority className="h-auto w-20" />
							<Navigation />
						</div>
						<HeaderActions />
					</div>
				</div>
			</header>
		</NextIntlClientProvider>
	);
};
