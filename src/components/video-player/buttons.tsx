import {
	CaptionButton,
	FullscreenButton,
	isTrackCaptionKind,
	MuteButton,
	PIPButton,
	PlayButton,
	Tooltip,
	type TooltipPlacement,
	useMediaState,
} from '@vidstack/react';
import {
	CaptionsIcon,
	CaptionsOffIcon,
	FullscreenIcon,
	PauseIcon,
	PictureInPicture,
	PictureInPictureIcon,
	PlayIcon,
	VolumeIcon,
} from 'lucide-react';

export interface MediaButtonProps {
	tooltipPlacement: TooltipPlacement;
}

export const buttonClass =
	'group ring-ring relative inline-flex size-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4';

export const tooltipClass =
	'animate-out fade-out slide-out-to-bottom-2 data-[visible]:animate-in data-[visible]:fade-in data-[visible]:slide-in-from-bottom-4 z-10 rounded-sm bg-black/90 px-2 py-0.5 text-sm font-medium text-white parent-data-[open]:hidden';

export const Play = ({ tooltipPlacement }: MediaButtonProps) => {
	const isPaused = useMediaState('paused');
	return (
		<Tooltip.Root>
			<Tooltip.Trigger asChild>
				<PlayButton className={buttonClass}>
					{isPaused ? <PlayIcon className="size-8" /> : <PauseIcon className="size-8" />}
				</PlayButton>
			</Tooltip.Trigger>
			<Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
				{isPaused ? 'Play' : 'Pause'}
			</Tooltip.Content>
		</Tooltip.Root>
	);
};

export const Mute = ({ tooltipPlacement }: MediaButtonProps) => {
	const volume = useMediaState('volume'),
		isMuted = useMediaState('muted');

	return (
		<Tooltip.Root>
			<Tooltip.Trigger asChild>
				<MuteButton className={buttonClass}>
					{isMuted || volume == 0 ? (
						<VolumeIcon className="size-8" />
					) : volume < 0.5 ? (
						<VolumeIcon className="size-8" />
					) : (
						<VolumeIcon className="size-8" />
					)}
				</MuteButton>
			</Tooltip.Trigger>
			<Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
				{isMuted ? 'Unmute' : 'Mute'}
			</Tooltip.Content>
		</Tooltip.Root>
	);
};

export const Caption = ({ tooltipPlacement }: MediaButtonProps) => {
	const track = useMediaState('textTrack'),
		isOn = track && isTrackCaptionKind(track);

	return (
		<Tooltip.Root>
			<Tooltip.Trigger asChild>
				<CaptionButton className={buttonClass}>
					{isOn ? <CaptionsIcon className="size-8" /> : <CaptionsOffIcon className="size-8" />}
				</CaptionButton>
			</Tooltip.Trigger>
			<Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
				{isOn ? 'Closed-Captions Off' : 'Closed-Captions On'}
			</Tooltip.Content>
		</Tooltip.Root>
	);
};

export const PIP = ({ tooltipPlacement }: MediaButtonProps) => {
	const isActive = useMediaState('pictureInPicture');

	return (
		<Tooltip.Root>
			<Tooltip.Trigger asChild>
				<PIPButton className={buttonClass}>
					{isActive ? (
						<PictureInPicture className="size-8" />
					) : (
						<PictureInPictureIcon className="size-8" />
					)}
				</PIPButton>
			</Tooltip.Trigger>
			<Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
				{isActive ? 'Exit PIP' : 'Enter PIP'}
			</Tooltip.Content>
		</Tooltip.Root>
	);
};

export const Fullscreen = ({ tooltipPlacement }: MediaButtonProps) => {
	const isActive = useMediaState('fullscreen');

	return (
		<Tooltip.Root>
			<Tooltip.Trigger asChild>
				<FullscreenButton className={buttonClass}>
					{isActive ? <FullscreenIcon className="size-8" /> : <FullscreenIcon className="size-8" />}
				</FullscreenButton>
			</Tooltip.Trigger>
			<Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
				{isActive ? 'Exit Fullscreen' : 'Enter Fullscreen'}
			</Tooltip.Content>
		</Tooltip.Root>
	);
};
