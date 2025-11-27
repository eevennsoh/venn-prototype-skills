import React from "react";
import { token } from "@atlaskit/tokens";
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
import ProjectIcon from "@atlaskit/icon/core/project";
import RoadmapIcon from "@atlaskit/icon/core/roadmap";
import SprintIcon from "@atlaskit/icon/core/sprint";
import EpicIcon from "@atlaskit/icon/core/epic";
import DashboardIcon from "@atlaskit/icon/core/dashboard";
import BranchIcon from "@atlaskit/icon/core/branch";
import BugIcon from "@atlaskit/icon/core/bug";
import ShieldIcon from "@atlaskit/icon/core/shield";
import PersonIcon from "@atlaskit/icon/core/person";
import DataFlowIcon from "@atlaskit/icon/core/data-flow";
import PenIcon from "@atlaskit/icon/core/pen";
import PaintBucketIcon from "@atlaskit/icon/core/paint-bucket";
import ImageFullscreenIcon from "@atlaskit/icon/core/image-fullscreen";
import PanelRightIcon from "@atlaskit/icon/core/panel-right";
import CloudArrowUpIcon from "@atlaskit/icon/core/cloud-arrow-up";
import LockUnlockedIcon from "@atlaskit/icon/core/lock-unlocked";
import ComponentIcon from "@atlaskit/icon/core/component";
import KeyResultIcon from "@atlaskit/icon/core/key-result";
import FeedbackIcon from "@atlaskit/icon/core/feedback";
import SupportIcon from "@atlaskit/icon/core/support";
import AlertIcon from "@atlaskit/icon/core/alert";
import ScreenIcon from "@atlaskit/icon/core/screen";
import PhoneIcon from "@atlaskit/icon/core/phone";
import EmailIcon from "@atlaskit/icon/core/email";
import ScalesIcon from "@atlaskit/icon/core/scales";
import PeopleGroupIcon from "@atlaskit/icon/core/people-group";
import ChatWidgetIcon from "@atlaskit/icon/core/chat-widget";
import ChartBarIcon from "@atlaskit/icon/core/chart-bar";
import DatabaseIcon from "@atlaskit/icon/core/database";
import FileIcon from "@atlaskit/icon/core/file";
import FolderClosedIcon from "@atlaskit/icon/core/folder-closed";
import SettingsIcon from "@atlaskit/icon/core/settings";
import EditBulkIcon from "@atlaskit/icon/core/edit-bulk";
import AngleBracketsIcon from "@atlaskit/icon/core/angle-brackets";

/**
 * Map of icon names to their corresponding Atlaskit icon components
 */
const iconMap: Record<string, React.ComponentType<{ label: string; size?: string; color?: string }>> = {
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
	project: ProjectIcon,
	roadmap: RoadmapIcon,
	sprint: SprintIcon,
	epic: EpicIcon,
	dashboard: DashboardIcon,
	branch: BranchIcon,
	bug: BugIcon,
	shield: ShieldIcon,
	person: PersonIcon,
	"data-flow": DataFlowIcon,
	pen: PenIcon,
	"paint-bucket": PaintBucketIcon,
	"image-fullscreen": ImageFullscreenIcon,
	"panel-right": PanelRightIcon,
	"cloud-arrow-up": CloudArrowUpIcon,
	"lock-unlocked": LockUnlockedIcon,
	component: ComponentIcon,
	"key-result": KeyResultIcon,
	feedback: FeedbackIcon,
	support: SupportIcon,
	alert: AlertIcon,
	screen: ScreenIcon,
	phone: PhoneIcon,
	email: EmailIcon,
	scales: ScalesIcon,
	"people-group": PeopleGroupIcon,
	"chat-widget": ChatWidgetIcon,
	"chart-bar": ChartBarIcon,
	database: DatabaseIcon,
	file: FileIcon,
	"folder-closed": FolderClosedIcon,
	settings: SettingsIcon,
	"edit-bulk": EditBulkIcon,
	"angle-brackets": AngleBracketsIcon,
};

/**
 * Get the React icon component for a given icon name
 * @param iconName - The name of the icon from the skills data
 * @param size - Optional size parameter for the icon (default: "small")
 * @param fill - Optional color token string (e.g., "color.icon.accent.blue") to apply to the icon
 * @param isInsideBlueBackground - Whether the icon is rendered inside a blue background
 * @returns React element with the icon component
 */
export function getIcon(iconName: string, size: string = "small", fill?: string, isInsideBlueBackground: boolean = false): React.ReactNode {
	const IconComponent = iconMap[iconName];

	// For blue icons inside blue background, use the subtle blue token instead
	let actualFill = fill;
	if (isInsideBlueBackground && fill === "color.icon.accent.blue") {
		actualFill = "color.background.accent.blue.subtle";
	}

	if (!IconComponent) {
		console.warn(`Icon "${iconName}" not found in icon map. Using default icon.`);
		return <AddIcon label="" size={size} color={actualFill ? token(actualFill) : undefined} />;
	}

	return <IconComponent label="" size={size} color={actualFill ? token(actualFill) : undefined} />;
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
