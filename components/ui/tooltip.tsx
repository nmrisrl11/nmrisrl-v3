"use client";

import * as React from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = BaseTooltip.Provider;
const Tooltip = BaseTooltip.Root;
const TooltipTrigger = BaseTooltip.Trigger;
const TooltipPortal = BaseTooltip.Portal;

const TooltipContent = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup> & { sideOffset?: number }
>(({ className, sideOffset = 6, children, ...props }, ref) => (
	<BaseTooltip.Portal>
		<BaseTooltip.Positioner sideOffset={sideOffset}>
			<BaseTooltip.Popup
				ref={ref}
				className={cn(
					"z-50 rounded-md border-[1.5px] border-ink bg-surface px-3 py-1 font-mono text-xs font-semibold text-ink shadow-brutal-xs duration-150 corner-squircle data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 supports-[corner-shape:squircle]:rounded-full",
					className,
				)}
				{...props}
			>
				{children}
			</BaseTooltip.Popup>
		</BaseTooltip.Positioner>
	</BaseTooltip.Portal>
));
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipPortal };
