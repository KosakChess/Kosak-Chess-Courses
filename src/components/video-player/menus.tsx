import React, { type ReactElement } from 'react';
import {
	Menu,
	type MenuPlacement,
	Tooltip,
	type TooltipPlacement,
	useCaptionOptions,
} from '@vidstack/react';
import {
	CaptionsIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	Radius,
	SettingsIcon,
} from 'lucide-react';

import { buttonClass, tooltipClass } from './buttons';

export interface SettingsProps {
	placement: MenuPlacement;
	tooltipPlacement: TooltipPlacement;
}

export const menuClass =
	'animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4 flex h-[var(--menu-height)] max-h-[400px] min-w-[260px] flex-col overflow-y-auto overscroll-y-contain rounded-md border border-white/10 bg-black/95 p-2.5 font-sans text-[15px] font-medium outline-none backdrop-blur-sm transition-[height] duration-300 will-change-[height] data-[resizing]:overflow-hidden';

export const submenuClass =
	'hidden w-full flex-col items-start justify-center outline-none data-[keyboard]:mt-[3px] data-[open]:inline-block';

export const Settings = ({ placement, tooltipPlacement }: SettingsProps) => {
	return (
		<Menu.Root className="parent">
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<Menu.Button className={buttonClass}>
						<SettingsIcon className="size-8 transform transition-transform duration-200 ease-out group-data-[open]:rotate-90" />
					</Menu.Button>
				</Tooltip.Trigger>
				<Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
					Settings
				</Tooltip.Content>
			</Tooltip.Root>
			<Menu.Content className={menuClass} placement={placement}>
				<CaptionSubmenu />
			</Menu.Content>
		</Menu.Root>
	);
};

const CaptionSubmenu = () => {
	const options = useCaptionOptions(),
		hint = options.selectedTrack?.label ?? 'Off';
	return (
		<Menu.Root>
			<SubmenuButton
				label="Captions"
				hint={hint}
				disabled={options.disabled}
				icon={<CaptionsIcon />}
			/>
			<Menu.Content className={submenuClass}>
				<Menu.RadioGroup className="flex w-full flex-col" value={options.selectedValue}>
					{options.map(({ label, value, select }) => (
						<Radio value={value} onSelect={select} key={value}>
							{label}
						</Radio>
					))}
				</Menu.RadioGroup>
			</Menu.Content>
		</Menu.Root>
	);
};

const Radio = ({ children, ...props }: Menu.RadioProps) => {
	return (
		<Menu.Radio
			className="group relative flex w-full cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none ring-ring data-[hocus]:bg-white/10 data-[focus]:ring-[3px]"
			{...props}
		>
			<Radius className="size-4 text-white group-data-[checked]:hidden" />
			<Radius className="hidden size-4 text-slate-100 group-data-[checked]:block" />
			<span className="ml-2">{children}</span>
		</Menu.Radio>
	);
};

export interface SubmenuButtonProps {
	label: string;
	hint: string;
	disabled?: boolean;
	icon: ReactElement;
}

const SubmenuButton = ({ label, hint, icon: Icon, disabled }: SubmenuButtonProps) => {
	return (
		<Menu.Button
			className="parent left-0 z-10 flex w-full cursor-pointer select-none items-center justify-start rounded-sm bg-black/60 p-2.5 outline-none ring-inset ring-ring aria-disabled:hidden data-[open]:sticky data-[open]:-top-2.5 data-[hocus]:bg-white/10 data-[focus]:ring-[3px]"
			disabled={disabled}
		>
			<ChevronLeftIcon className="parent-data-[open]:block -ml-0.5 mr-1.5 hidden size-[18px]" />
			<div className="parent-data-[open]:hidden contents">
				{React.cloneElement(Icon, { className: 'size-5' })}
			</div>
			<span className="parent-data-[open]:ml-0 ml-1.5">{label}</span>
			<span className="ml-auto text-sm text-white/50">{hint}</span>
			<ChevronRightIcon className="parent-data-[open]:hidden ml-0.5 size-[18px] text-sm text-white/50" />
		</Menu.Button>
	);
};
