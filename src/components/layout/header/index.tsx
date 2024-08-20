import { pick } from 'lodash';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { BrandLogo } from '@/components/shared/brand-logo';
import { checkUser } from '@/lib/check-user';

import { HeaderActions } from './header-actions';
import { Nav } from './nav';

export const Header = async () => {
	const messages = await getMessages();
	await checkUser();

	return (
		<NextIntlClientProvider messages={pick(messages, 'components.layout.header')}>
			<header className="bg-background/90 fixed inset-x-0 top-0 z-40 w-full px-4 py-4 backdrop-blur-lg lg:px-12">
				<div className="mx-auto max-w-screen-xl">
					<div className="flex w-full items-center justify-between">
						<div className="flex flex-row-reverse items-center gap-x-2 lg:flex-row lg:gap-x-16">
							<BrandLogo priority className="h-auto w-20" />
							<Nav />
						</div>
						<HeaderActions />
					</div>
				</div>
			</header>
		</NextIntlClientProvider>
	);
};
