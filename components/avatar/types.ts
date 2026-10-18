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
