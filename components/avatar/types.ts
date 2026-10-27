export type AvatarDirection = "left" | "right" | "up" | "down";

export interface LookClipDef {
	id: AvatarDirection;
	name: string;
	dir: [number, number]; // [x, y]
	src: string;
	maxTurnTime: number;
}

export const LOOK_CLIPS: LookClipDef[] = [
	{ id: "left", name: "look-left", dir: [-1, 0], src: "/avatar/look-left.webm", maxTurnTime: 2.2 },
	{
		id: "right",
		name: "look-right",
		dir: [1, 0],
		src: "/avatar/look-right.webm",
		maxTurnTime: 2.2,
	},
	{ id: "up", name: "look-up", dir: [0, -1], src: "/avatar/look-up.webm", maxTurnTime: 2.2 },
	{ id: "down", name: "look-down", dir: [0, 1], src: "/avatar/look-down.webm", maxTurnTime: 3.8 },
];

export type AvatarAction = "idle" | "coding" | "thumbsup" | "fingerheart" | "thinking" | "wave";
export type ActionPriority = "idle" | "hover" | "click";

export interface ActionClipDef {
	id: Exclude<AvatarAction, "idle">;
	src: string;
	loop: boolean;
	label: string;
}

export const ACTION_CLIPS: Record<Exclude<AvatarAction, "idle">, ActionClipDef> = {
	coding: {
		id: "coding",
		src: "/avatar/avatar-coding.webm",
		loop: true,
		label: "Coding at terminal",
	},
	thumbsup: {
		id: "thumbsup",
		src: "/avatar/avatar-thumbsup.webm",
		loop: false,
		label: "Thumbs up approval",
	},
	fingerheart: {
		id: "fingerheart",
		src: "/avatar/avatar-fingerheart.webm",
		loop: false,
		label: "K-pop finger heart",
	},
	thinking: {
		id: "thinking",
		src: "/avatar/avatar-thinking.webm",
		loop: true,
		label: "Pondering in thought",
	},
	wave: {
		id: "wave",
		src: "/avatar/avatar-wave.webm",
		loop: false,
		label: "Welcome greeting wave",
	},
};

export const ACTION_KEYS = (Object.keys(ACTION_CLIPS) as Exclude<AvatarAction, "idle">[]).filter(
	(key) => key !== "wave", // wave has dedicated welcome ref on load
);
