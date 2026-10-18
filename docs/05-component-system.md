# 05 — Component System & Base UI Integration

## 1. Why Base UI (`@base-ui/react`)?

In `nmrisrl-v3`, we replace traditional Radix UI primitives with **Base UI** ([`@base-ui/react`](https://base-ui.com)), developed by the MUI team.

### Advantages for Neubrutalism:

1. **Zero Redundant Wrappers**: Base UI does not inject arbitrary layout `div` elements, eliminating margin collapse and shadow clipping issues.
2. **First-Class CSS Anchor Positioning**: Modern popovers, tooltips, and menus use native anchor positioning for high-performance positioning without jitter.
3. **Purely Unstyled**: Allows applying thick 2.5px borders, custom squircle shapes, and brutalist spring transitions without having to override stubborn library defaults.

---

## 2. Interactive Micro-Interactions (The Neubrutalist Click)

Neubrutalism mimics physical tactile switches. Buttons have physical depth (`3px 3px 0 0 #18181B`). When pressed:

- The button physically moves down and to the right: `transform: translate(2px, 2px)`
- The shadow collapses: `box-shadow: 1px 1px 0 0 #18181B`

```css
/* Standard Button Interaction */
.btn-neubrutal {
	border: 2px solid var(--color-ink);
	box-shadow: 3px 3px 0px 0px var(--color-ink);
	transition:
		transform 0.1s cubic-bezier(0.2, 0, 0, 1),
		box-shadow 0.1s cubic-bezier(0.2, 0, 0, 1);
}

.btn-neubrutal:hover {
	transform: translate(-1px, -1px);
	box-shadow: 4px 4px 0px 0px var(--color-ink);
}

.btn-neubrutal:active {
	transform: translate(2px, 2px);
	box-shadow: 1px 1px 0px 0px var(--color-ink);
}
```

---

## 3. Base UI Primitive Examples

### A. Accessible Dialog / Modal

```tsx
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";

interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description?: string;
	children: React.ReactNode;
}

export function NeubrutalDialog({ open, onOpenChange, title, description, children }: DialogProps) {
	return (
		<BaseDialog.Root open={open} onOpenChange={onOpenChange}>
			<BaseDialog.Portal>
				<BaseDialog.Backdrop className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-xs transition-opacity" />
				<BaseDialog.Popup className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl corner-squircle supports-[corner-shape:squircle]:rounded-[28px] border-[2.5px] border-ink bg-surface p-6 shadow-brutal-lg">
					<BaseDialog.Title className="font-heading text-2xl font-bold text-ink">
						{title}
					</BaseDialog.Title>
					{description && (
						<BaseDialog.Description className="mt-1 font-body text-sm text-ink-muted">
							{description}
						</BaseDialog.Description>
					)}
					<div className="mt-4">{children}</div>
					<BaseDialog.Close className="squircle-btn mt-6 inline-flex px-4 py-2 font-body text-sm font-bold text-white bg-coral">
						Close
					</BaseDialog.Close>
				</BaseDialog.Popup>
			</BaseDialog.Portal>
		</BaseDialog.Root>
	);
}
```

### B. Tooltip with Anchor Positioning

```tsx
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

export function NeubrutalTooltip({
	content,
	children,
}: {
	content: string;
	children: React.ReactNode;
}) {
	return (
		<BaseTooltip.Root>
			<BaseTooltip.Trigger>{children}</BaseTooltip.Trigger>
			<BaseTooltip.Portal>
				<BaseTooltip.Positioner sideOffset={6}>
					<BaseTooltip.Popup className="rounded-md corner-squircle supports-[corner-shape:squircle]:rounded-full border-[1.5px] border-ink bg-surface px-2.5 py-1 font-mono text-xs font-semibold text-ink shadow-brutal-xs">
						{content}
					</BaseTooltip.Popup>
				</BaseTooltip.Positioner>
			</BaseTooltip.Portal>
		</BaseTooltip.Root>
	);
}
```

---

## 4. Accessibility & Focus Rings

Always preserve accessibility standards (WCAG 2.2 AA):

- All interactive elements must show a distinct high-contrast focus outline when navigated via keyboard.
- Focus ring formula: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`.
- Click targets must maintain at least `44px x 44px` minimum hit area even when styled as compact pills.
