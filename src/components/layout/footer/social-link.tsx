interface Props {
	icon: JSX.Element;
	href: string;
	label: string;
}

export const SocialLink = ({ icon, href, label }: Props) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		aria-label={label}
		className="transition-colors duration-200 ease-in-out hover:text-headings"
	>
		{icon}
	</a>
);
