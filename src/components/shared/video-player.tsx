'use client';

import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

import { completeLesson } from '@/app/[locale]/learn/[courseSlug]/[lessonId]/_actions/complete-lesson';
import { useRouter } from '@/lib/navigation';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

interface Props {
	src: string;
	title: string;
	lessonId: string;
	completed: boolean;
}

export const VideoPlayer = ({ src, title, lessonId, completed }: Props) => {
	const router = useRouter();

	const handleVideoEnd = async () => {
		if (completed) return;

		await completeLesson(lessonId);
		router.refresh();
	};

	return (
		<MediaPlayer
			src={src}
			viewType="video"
			streamType="on-demand"
			logLevel="warn"
			volume={0.5}
			crossOrigin
			playsInline
			title={title}
			onEnd={handleVideoEnd}
		>
			<MediaProvider />
			<DefaultVideoLayout icons={defaultLayoutIcons} />
		</MediaPlayer>
	);
};
