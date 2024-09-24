'use client';

import { MediaPlayer, MediaProvider, Poster, Track } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

import { textTracks } from './tracks';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

interface Props {
	src?: string;
	poster?: string;
	title?: string;
}

export const VideoPlayer = ({
	src = 'https://files.vidstack.io/sprite-fight/720p.mp4',
	poster = 'https://files.vidstack.io/sprite-fight/poster.webp',
	title = 'Sprite Fight',
}: Props) => {
	return (
		<MediaPlayer
			src={src}
			viewType="video"
			streamType="on-demand"
			logLevel="warn"
			crossOrigin
			playsInline
			title={title}
			poster={poster}
		>
			<MediaProvider>
				<Poster className="vds-poster" />
				{textTracks.map((track) => (
					<Track {...track} key={track.src} />
				))}
			</MediaProvider>
			<DefaultVideoLayout
				thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
				icons={defaultLayoutIcons}
			/>
		</MediaPlayer>
	);
};
