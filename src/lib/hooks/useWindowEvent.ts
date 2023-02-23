import React from "react";

/**
 * Hook to react to events of the window object. Example:
 * ```tsx
 * import { useWindowEvent } from "iobroker-react/hooks";
 *
 * const MyComponent: React.FC<MyAppProps> = (props) => {
 *   const connection = useConnection();
 *   const [name, setName] = React.useState("World");
 *
 *   useWindowEvent("message", (msg) => {
 *     if (msg?.data != undefined) setName(msg.data);
 *   });
 *
 *   // Displays "Hello World!" at first.
 *   // When the current page receives a message with content { data: "you" },
 *   // switches to "Hello you!"
 *   return <div>Hello {name}!</div>
 * };
 * ```
 */

export const useWindowEvent = <W extends keyof WindowEventMap>(
	type: W,
	listener: (this: Window, ev: WindowEventMap[W]) => any,
	element?: Window | HTMLElement | null,
	options?: boolean | AddEventListenerOptions,
): void => {
	element = element || window;
	const listenerRef: React.MutableRefObject<
		| EventListener
		| ((this: Window, ev: WindowEventMap[W]) => any)
		| EventListenerObject
	> = React.useRef(listener);

	React.useEffect(() => {
		listenerRef.current = listener;
	}, [listener]);

	React.useEffect(() => {
		if (element == null) return;
		const handler = (e: Event): any => {
			if (typeof listenerRef.current === "function") {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				listenerRef.current(e);
			}
		};
		element.addEventListener(type, handler, options);
		return () => element?.removeEventListener(type, handler, options);
	}, [type, element, options]);
};
