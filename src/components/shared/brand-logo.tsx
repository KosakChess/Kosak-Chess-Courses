import NextImage from 'next/image';

import logo from '@/assets/logo.png';
import { Link } from '@/lib/navigation';

interface Props {
	className?: string;
	priority?: boolean;
}

export const BrandLogo = ({ className, priority }: Props) => (
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
