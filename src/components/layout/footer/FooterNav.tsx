import { type Route } from 'next';
import { useTranslations } from 'next-intl';

import { ActiveLink } from '@/components/shared/ActiveLink';

export const FooterNav = () => {
	const t = useTranslations('components.layout.footer');

	const routes = {
		courses: t('routes.courses'),
		articles: t('routes.articles'),
		about: t('routes.about'),
		contact: t('routes.contact'),
		'privacy-policy': t('routes.privacyPolicy'),
		'terms-of-service': t('routes.termsOfService'),
		cookies: t('routes.cookies'),
	};

	return (
		<nav aria-label={t('navHeader')}>
			<ul className="flex flex-wrap justify-center gap-x-12 gap-y-4">
				{Object.entries(routes).map(([key, value]) => (
					<li key={key}>
						<ActiveLink
							href={key as Route}
							className="text-sm leading-6 underline-offset-4 hover:text-headings hover:underline"
							activeClassName="text-headings underline underline-offset-4"
						>
							{value}
						</ActiveLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
