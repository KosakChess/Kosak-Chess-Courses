import NextImage from 'next/image';

import logo from '@/assets/logo.png';
import { Link } from '@/navigation';

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
