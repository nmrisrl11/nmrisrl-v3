"use client";

import { useSyncExternalStore } from "react";
import type { ActionPriority, AvatarAction } from "./types";

export interface AvatarState {
	activeAction: AvatarAction;
	priority: ActionPriority;
	requestedBy: string | null;
	requestId: number;
}

const initialState: AvatarState = {
	activeAction: "idle",
	priority: "idle",
	requestedBy: null,
	requestId: 0,
};

let state: AvatarState = { ...initialState };

type Listener = () => void;
const listeners = new Set<Listener>();

function emitChange() {
	listeners.forEach((listener) => listener());
}

export const avatarStore = {
	getState: (): AvatarState => state,
	subscribe: (listener: Listener): (() => void) => {
		listeners.add(listener);
		return () => {
			listeners.delete(listener);
		};
	},
	requestAction: (
		action: AvatarAction,
		options?: {
			priority?: ActionPriority;
			source?: string;
		},
	) => {
		const priority = options?.priority ?? "hover";
		const source = options?.source ?? null;

		// A 'click' gesture action is protected and cannot be preempted by 'idle' or 'hover'
		if (state.activeAction !== "idle" && state.priority === "click" && priority !== "click") {
			return;
		}

		if (state.activeAction === action && state.priority === priority) {
			return;
		}

		state = {
			activeAction: action,
			priority,
			requestedBy: source,
			requestId: state.requestId + 1,
		};
		emitChange();
	},
	clearAction: (sourceOrAction?: string) => {
		if (state.activeAction === "idle") return;

		// If caller provided a specific filter, only clear if it matches the current request
		if (
			sourceOrAction &&
			state.requestedBy !== sourceOrAction &&
			state.activeAction !== sourceOrAction
		) {
			return;
		}

		state = {
			activeAction: "idle",
			priority: "idle",
			requestedBy: null,
			requestId: state.requestId + 1,
		};
		emitChange();
	},
};

export function useAvatarStore<T>(selector: (state: AvatarState) => T): T {
	return useSyncExternalStore(
		avatarStore.subscribe,
		() => selector(avatarStore.getState()),
		() => selector(initialState),
	);
}
