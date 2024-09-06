import { MDXRemote } from 'next-mdx-remote/rsc';

export const Markdown = async ({ source }: { source: string }) => (
	<article className="prose prose-sm prose-slate max-w-none dark:prose-invert lg:prose-base">
		<MDXRemote source={source} options={{ mdxOptions: { format: 'md' } }} />
	</article>
);
