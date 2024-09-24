import { Captions, Controls, Gesture } from '@vidstack/react';

import { cn } from '@/lib/utils';

import * as Buttons from '../buttons';
import * as Menus from '../menus';
import * as Sliders from '../sliders';
import { TimeGroup } from '../time-group';
import { Title } from '../title';

import captionStyles from './captions.module.css';
import styles from './video-layout.module.css';

export const VideoLayout = () => {
	return (
		<>
			<Gestures />
			<Captions
				className={cn(
					'absolute inset-0 bottom-2 z-10 select-none break-words opacity-0 transition-[opacity,bottom] duration-300 media-captions:opacity-100 media-controls:bottom-[85px] media-preview:opacity-0',
					captionStyles.captions,
				)}
			/>
			<Controls.Root
				className={cn(
					'absolute inset-0 z-10 flex size-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity media-controls:opacity-100',
					styles.controls,
				)}
			>
				<div className="flex-1" />
				<Controls.Group className="flex w-full items-center px-2">
					<Sliders.Time />
				</Controls.Group>
				<Controls.Group className="-mt-0.5 flex w-full items-center px-2 pb-2">
					<Buttons.Play tooltipPlacement="top start" />
					<Buttons.Mute tooltipPlacement="top" />
					<Sliders.Volume />
					<TimeGroup />
					<Title />
					<div className="flex-1" />
					<Buttons.Caption tooltipPlacement="top" />
					<Menus.Settings placement="top end" tooltipPlacement="top" />
					<Buttons.PIP tooltipPlacement="top" />
					<Buttons.Fullscreen tooltipPlacement="top end" />
				</Controls.Group>
			</Controls.Root>
		</>
	);
};

const Gestures = () => {
	return (
		<>
			<Gesture
				className="absolute inset-0 z-0 block size-full"
				event="pointerup"
				action="toggle:paused"
			/>
			<Gesture
				className="absolute inset-0 z-0 block size-full"
				event="dblpointerup"
				action="toggle:fullscreen"
			/>
			<Gesture
				className="absolute left-0 top-0 z-10 block h-full w-1/5"
				event="dblpointerup"
				action="seek:-10"
			/>
			<Gesture
				className="absolute right-0 top-0 z-10 block h-full w-1/5"
				event="dblpointerup"
				action="seek:10"
			/>
		</>
	);
};