import { RefObject, useEffect, useState } from "react";

type HoverStatus = boolean;

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

export const useHover = <T extends HTMLElement = HTMLElement>(
	elementRef: RefObject<T>,
): HoverStatus => {
	const [hovered, setHovered] = useState<HoverStatus>(false);

	const handleMouseOver = () => setHovered(true);
	const handleMouseOut = () => setHovered(false);

	useEffect(() => {
		const node = elementRef.current;

		if (node) {
			node.addEventListener("mouseover", handleMouseOver);
			node.addEventListener("mouseout", handleMouseOut);

			return () => {
				node.removeEventListener("mouseover", handleMouseOver);
				node.removeEventListener("mouseout", handleMouseOut);
			};
		}
	}, [elementRef]);

	return hovered;
};
