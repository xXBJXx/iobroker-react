import { useRef } from "react";

export const usePrevious = (value: unknown): unknown => {
	const currentRef = useRef(value);
	const previousRef = useRef<unknown>();

	if (currentRef.current !== value) {
		previousRef.current = currentRef.current;
		currentRef.current = value;
	}

	return previousRef.current;
};
