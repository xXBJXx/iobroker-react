import { RefObject, useState } from "react";
import { useWindowEvent } from "./useWindowEvent"; // need the new version of useWindowEvent

/**
 * Hook to react to mouseover and mouseout events of a specific element. Example:
 * import { useHover } from "iobroker-react/hooks";
 * import React from "react";
 *
 * const MyComponent: React.FC = () => {
 * 	const elementRef = useRef();
 * 	const hovered = useHover(elementRef);
 *
 * 	// Displays "Not hovered" at first.
 * 	// When the mouse hovers over the box, the output switches to "Hovered"
 * 	return (
 * 		<>
 * 			<Box
 * 				ref={elementRef}
 * 				sx={{
 * 					backgroundColor: hovered
 * 						? "primary.main"
 * 						: "secondary.main",
 * 					color: "white",
 * 					p: 2,
 * 					m: 2,
 * 					borderRadius: 1,
 * 					width: 100,
 * 					textAlign: "center",
 * 					height: 100,
 * 				}}
 * 			>
 * 				{hovered ? "Hovered" : "Not hovered"}
 * 			</Box>
 * 		</>
 * 	);
 * };
 */

export const useHover = (ref: RefObject<HTMLElement | undefined>) => {
	const [hovered, setHovered] = useState(false);

	useWindowEvent(
		"mouseover",
		() => setHovered(true),
		ref.current ?? undefined,
	);
	useWindowEvent(
		"mouseout",
		() => setHovered(false),
		ref.current ?? undefined,
	);
	return hovered;
};
