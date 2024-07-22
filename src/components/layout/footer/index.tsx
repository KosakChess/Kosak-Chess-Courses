import { useTranslations } from 'next-intl';

import { Discord } from '@/components/icons/Discord';
import { Facebook } from '@/components/icons/Facebook';
import { Youtube } from '@/components/icons/Youtube';

import { FooterNav } from './FooterNav';
import { SocialLink } from './SocialLink';

const socialLinks = [
	{
		icon: <Facebook className="size-6" aria-hidden="true" />,
		href: 'https://www.facebook.com/kosakchess',
		label: 'Facebook',
	},
	{
		icon: <Youtube className="size-6" aria-hidden="true" />,
		href: 'https://twitter.com/kosakchess',
		label: 'Youtube',
	},
	{
		icon: <Discord className="size-6" aria-hidden="true" />,
		href: 'https://www.discord.com/kosakchess',
		label: 'Discord',
	},
] as const;

export const Footer = () => {
	const t = useTranslations('components.layout.footer');

	return (
		<footer aria-labelledby="footer-heading">
			<h4 id="footer-heading" className="sr-only">
				{t('header')}
			</h4>
			<div className="mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-8">
				<FooterNav />
				<div className="my-10 flex justify-center space-x-10 md:my-12">
					{socialLinks.map((link) => (
						<SocialLink key={link.href} {...link} />
					))}
				</div>
				<p className="text-center text-xs leading-5">
					&copy; {new Date().getFullYear()} Kosak Chess. {t('copyright')}
				</p>
			</div>
		</footer>
	);
};