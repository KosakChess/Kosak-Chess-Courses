import NextImage from 'next/image';

import { Link } from '@/navigation';

import logo from '/public/logo.png';

interface Props {
	className?: string;
	priority?: boolean;
}

export const Logo = ({ className, priority }: Props) => (
	<Link href="/">
		<NextImage
			src={logo}
			alt="Kosak Chess Logo"
			placeholder="blur"
			priority={priority}
			className={className}
		/>
	</Link>
);
