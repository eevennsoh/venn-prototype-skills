import React from "react";
import AlignTextLeftIcon from "@atlaskit/icon/core/align-text-left";
import ClockIcon from "@atlaskit/icon/core/clock";
import MicrophoneIcon from "@atlaskit/icon/core/microphone";
import CameraIcon from "@atlaskit/icon/core/camera";
import SendIcon from "@atlaskit/icon/core/send";
import SmartLinkEmbedIcon from "@atlaskit/icon/core/smart-link-embed";
import AddIcon from "@atlaskit/icon/core/add";
import SearchIcon from "@atlaskit/icon/core/search";
import EditIcon from "@atlaskit/icon/core/edit";
import ShareIcon from "@atlaskit/icon/core/share";
import StarStarredIcon from "@atlaskit/icon/core/star-starred";
import TranslateIcon from "@atlaskit/icon/core/translate";
import ExpandHorizontalIcon from "@atlaskit/icon/core/expand-horizontal";
import ShrinkHorizontalIcon from "@atlaskit/icon/core/shrink-horizontal";
import TextSpellcheckIcon from "@atlaskit/icon/core/text-spellcheck";
import CalendarPlusIcon from "@atlaskit/icon/core/calendar-plus";
import ChartPieIcon from "@atlaskit/icon/core/chart-pie";
import ScreenPlusIcon from "@atlaskit/icon/core/screen-plus";
import AudioIcon from "@atlaskit/icon/core/audio";
import NotificationIcon from "@atlaskit/icon/core/notification";
import TaskToDoIcon from "@atlaskit/icon/core/task-to-do";
import SortAscendingIcon from "@atlaskit/icon/core/sort-ascending";
import CopyIcon from "@atlaskit/icon/core/copy";
import FilterIcon from "@atlaskit/icon/core/filter";

/**
 * Map of icon names to their corresponding Atlaskit icon components
 */
const iconMap: Record<string, React.ComponentType<{ label: string; size?: string }>> = {
	"align-text-left": AlignTextLeftIcon,
	clock: ClockIcon,
	microphone: MicrophoneIcon,
	video: CameraIcon,
	send: SendIcon,
	"smart-link-embed": SmartLinkEmbedIcon,
	add: AddIcon,
	search: SearchIcon,
	edit: EditIcon,
	share: ShareIcon,
	star: StarStarredIcon,
	translate: TranslateIcon,
	"expand-horizontal": ExpandHorizontalIcon,
	"shrink-horizontal": ShrinkHorizontalIcon,
	"text-spellcheck": TextSpellcheckIcon,
	"calendar-plus": CalendarPlusIcon,
	"chart-pie": ChartPieIcon,
	"screen-plus": ScreenPlusIcon,
	audio: AudioIcon,
	notification: NotificationIcon,
	"task-to-do": TaskToDoIcon,
	"sort-ascending": SortAscendingIcon,
	copy: CopyIcon,
	filter: FilterIcon,
};

/**
 * Get the React icon component for a given icon name
 * @param iconName - The name of the icon from the skills data
 * @param size - Optional size parameter for the icon (default: "small")
 * @returns React element with the icon component
 */
export function getIcon(iconName: string, size: string = "small"): React.ReactNode {
	const IconComponent = iconMap[iconName];

	if (!IconComponent) {
		console.warn(`Icon "${iconName}" not found in icon map. Using default icon.`);
		return <AddIcon label="" size={size} />;
	}

	return <IconComponent label="" size={size} />;
}

/**
 * Check if an icon exists in the icon map
 */
export function hasIcon(iconName: string): boolean {
	return iconName in iconMap;
}

/**
 * Get all available icon names
 */
export function getAvailableIcons(): string[] {
	return Object.keys(iconMap);
}
