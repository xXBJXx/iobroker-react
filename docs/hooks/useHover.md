# `useHover` hook

The `useHover` hook is used to detect when the mouse hovers over an element.
This would normally be done by using the `onMouseEnter` and `onMouseLeave` event handlers.

```ts
import { useHover } from "iobroker-react/hooks";
```

## Example

```tsx
import React from "react";
import { useHover } from "iobroker-react/hooks";

const MyComponent: React.FC = () => {
	const elementRef = useRef();
	const hovered = useHover(elementRef);
  
    // Displays "Not hovered" at first.
	// When the mouse hovers over the box, the output switches to "Hovered"
	return (
		<>
			<Box
				ref={elementRef}
				sx={{
					backgroundColor: hovered
						? "primary.main"
						: "secondary.main",
					color: "white",
					p: 2,
					m: 2,
					borderRadius: 1,
					width: 100,
					textAlign: "center",
					height: 100,
				}}
			>
				{hovered ? "Hovered" : "Not hovered"}
			</Box>
		</>
	);
};
```
