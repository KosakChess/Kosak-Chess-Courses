import createNextIntlPlugin from 'next-intl/plugin';
import withPlaiceholder from '@plaiceholder/next';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	pageExtensions: ['ts', 'tsx'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				port: '',
				hostname: 'res.cloudinary.com',
				pathname: '/**',
			},
		],
	},
};

export default withPlaiceholder(withNextIntl(nextConfig));
